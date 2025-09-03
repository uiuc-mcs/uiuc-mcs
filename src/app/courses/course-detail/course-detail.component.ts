import {
    Component, OnInit, ViewChild, ElementRef, Renderer2,
    AfterViewInit, ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ClassService } from 'src/app/services/classes/class.service';
import { ClassData } from 'src/app/shared/class/class';
import { ratingsToStrings, Review } from '../../shared/review/review';
import { environment } from 'src/environments/environment'
import {
    Firestore, collection, getDocs, limit, orderBy, OrderByDirection,
    query, startAfter, where
} from '@angular/fire/firestore';

import { SEOService } from '../../services/seo/seo.service';
import { ReviewDetailComponent } from 'src/app/reviews/review-detail/review-detail.component';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-course-detail',
    templateUrl: './course-detail.component.html',
    styleUrls: ['./course-detail.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [ReviewDetailComponent, MatOptionModule, MatFormFieldModule, MatSelectModule, MatProgressSpinnerModule, MatChipsModule, CommonModule, MatIconModule, RouterModule]
})
export class CourseDetailComponent implements OnInit, AfterViewInit {
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private afs: Firestore,
        private auth: AuthService,
        private renderer: Renderer2,
        private classService: ClassService,
        private seoService: SEOService
    ) { }

    courseName: string = ""
    courseNumber: string = ""
    course?: ClassData
    cards = [
        { title: 'Reviews', subtitle: '', value: 0 },
        { title: 'Avg. Difficulty', subtitle: '', value: 0 },
        { title: 'Avg. Workload', subtitle: 'Hours Per Week', value: 0 },
        { title: 'Avg. Rating', subtitle: '', value: 0 },
    ]
    orderByOptions = [
        { displayText: "Newest", field: "timestamp", order: "desc" },
        { displayText: "Oldest", field: "timestamp", order: "asc" },
        // { displayText: "Most Helpful", field: "wilsonScore", order: "desc" },
        // { displayText: "Least Helpful", field: "wilsonScore", order: "asc" },
    ]
    reviewDataStack: any[] = []
    reviewData: Review[] = []
    disableNext: boolean = false
    disablePrev: boolean = false
    pageLength: number = 55
    maxLength: number = 99999
    isLoggedIn: boolean = false
    selectedSort: { displayText: string, field: string, order: string } = this.orderByOptions[0]
    objectKeys = Object.keys
    loading: boolean = true

    @ViewChild('imageContainer') imageContainer!: ElementRef;

    ngAfterViewInit(): void {
        this.updateGraphicStyles()
    }

    ngOnInit(): void {
        const param = this.route.snapshot.paramMap.get('courseId') || ""
        if (param != "") {
            const pos = param.split('-', 2).join('-').length;
            this.courseName = param.substring(pos + 1).replace(/-/g, ' ')
        }
        this.auth.isLoggedIn.subscribe(state => { this.isLoggedIn = state })
        this.getClassData()
        this.getFirstPage()
        document.getElementsByClassName("mat-drawer-content")[0].scroll(0, 0) // Ensures that we start from the top
    }

    setTitle() {
        var preTitle = ""
        if (this.courseName != "" && this.courseName != "") {
            preTitle = `${this.courseNumber} - ${this.courseName}`
        }
        else if (this.courseName != "") {
            preTitle = this.courseName
        }
        else if (this.courseNumber != "") {
            preTitle = this.courseNumber
        }
        else {
            preTitle = ""
        }
        var title = ""
        if (preTitle != "") {
            title = `${preTitle} | ${environment.websiteName}`
        } else {
            title = environment.websiteName
        }
        this.seoService.updateTitle(title);
    }
    
    getClassData(): void {
        this.classService.classes.subscribe(data => {
            this.course = data.find(x => x.ClassName == this.courseName)
            if (!this.course) {
                this.router.navigate(['404'])
            }
            else {
                this.courseNumber = this.course!.CourseNumber
                this.setTitle()
                if (this.course.Description) {
                    this.seoService.updateDescription(this.course.Description);
                }
                this.updateCards(this.course!)
                this.updateGraphicStyles()
            }
        })
    }

    updateGraphicStyles(): void {
        if (this.imageContainer?.nativeElement) {
            this.renderer.setStyle(this.imageContainer?.nativeElement, 'background-image', this.course?.GraphicUrl)
        }
    }

    async getFirstPage() {
        this.loading = true
        this.disablePrev = true
        this.disableNext = false
        this.reviewDataStack = []
        const ref = collection(this.afs, 'Reviews')
        var q = query(ref)
        q = query(q,
            where("course", '==', this.courseName),
            limit(this.pageLength),
            orderBy(this.selectedSort.field, this.selectedSort.order as
                OrderByDirection))

        const response = await getDocs(q)
        this.reviewData = []
        if (!response.docs.length) {
            // console.warn("Course Detail: No reviews exist")
            this.disableNext = true
            this.disablePrev = true
            this.loading = false
            return
        }
        for (let item of response.docs) {
            const review = item.data() as Review
            review.reviewId = item.id
            this.reviewData.push(review)
        }
        this.reviewDataStack.push(response)
        if (response.docs.length < 5) {
            this.disableNext = true
            this.maxLength = this.reviewData.length
        }
        this.reviewData = ratingsToStrings(this.reviewData)
        this.loading = false
    }

    async nextPage() {
        this.loading = true
        this.disablePrev = false
        const lastReview = this.reviewDataStack[this.reviewDataStack.length - 1].docs[this.pageLength - 1]

        const ref = collection(this.afs, 'Reviews')
        var q = query(ref)
        q = query(q,
            where("course", '==', this.courseName),
            limit(this.pageLength),
            orderBy(this.selectedSort.field, this.selectedSort.order as
                OrderByDirection),
            startAfter(lastReview))

        const response = await getDocs(q)
        if (!response.docs.length) {
            // console.warn("Course Detail: No reviews exist")
            this.disableNext = true
            this.loading = false
            return
        }
        for (let item of response.docs) {
            const review = item.data() as Review
            review.reviewId = item.id
            this.reviewData.push(review)
        }
        this.reviewDataStack.push(response)
        if (response.docs.length < 5 || this.reviewData.length >= this.course!.RatingCount) {
            this.disableNext = true
            this.maxLength = this.reviewData.length
        }
        this.reviewData = ratingsToStrings(this.reviewData)
        this.loading = false
    }

    updateCards(course: ClassData): void {
        this.cards[0].value = course.RatingCount
        this.cards[1].value = course.DifficultyAvg
        this.cards[2].value = course.WorkloadAvg
        this.cards[3].value = course.RatingAvg
    }

    semesterMatch(season: string, semesters: string[]): string {
        return semesters.filter(function (k) { return ~k.indexOf(season) }).toString().split(',').join('\n')
    }

    newSort(event: any): void {
        this.getFirstPage()
    }
}
