import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { ClassService } from '../services/classes/class.service';
import { ClassData } from '../shared/class/class';
import { Review, ratingsToStrings } from '../shared/review/review';
import { Firestore, collection } from '@angular/fire/firestore';
import { DocumentData, getDocs, limit, orderBy, OrderByDirection, 
    query, QueryDocumentSnapshot, startAfter, where } from '@angular/fire/firestore';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReviewDetailComponent } from './review-detail/review-detail.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector: 'app-reviews',
    templateUrl: './reviews.component.html',
    styleUrls: ['./reviews.component.scss'],
    standalone: true,
    imports: [MatFormFieldModule, ReviewDetailComponent,  MatOptionModule, MatSelectModule]
})
export class ReviewsComponent implements OnInit {
    constructor(
        private afs: Firestore,
        private auth: AuthService,
        private classService: ClassService,
    ) { }

    reviewData: Review[] = []
    latestDoc: any | null = null
    limit: number = 12
    pageLength: number = 55
    isLoggedIn: boolean = false
    noMore: boolean = false
    courses: ClassData[] = []
    courseId: string = ''
    orderByOptions = [
        { displayText: "Newest", field: "timestamp", order: "desc" },
        { displayText: "Oldest", field: "timestamp", order: "asc" },
        // { displayText: "Most Helpful", field: "wilsonScore", order: "desc" },
        // { displayText: "Least Helpful", field: "wilsonScore", order: "asc" },
    ]

    selectedSort: { displayText: string, field: string, order: string } = this.orderByOptions[0]
    selectedCourseFilter: ClassData[] | '' = ''

    get reviewedCourses() {
        var ret: (ClassData | '')[] = this.courses.filter((el) => {
            return el.RatingCount > 0
        });
        ret.unshift('')
        return ret
    }

    ngOnInit(): void {
        this.auth.isLoggedIn.subscribe(state => { this.isLoggedIn = state })
        this.classService.classes.subscribe(data => { this.courses = data })
        this.initLoad()
    }

    onCourseChange(value: any) {
        if (value !== '') {
            this.courseId = value.courseId
        } else {
            this.courseId = ''
        }
        this.initLoad()
    }

    initLoad() {
        this.latestDoc = null
        this.reviewData = []
        this.getMore()
    }

    updateReviewArray(docs: Array<QueryDocumentSnapshot<DocumentData>>) {
        for (let item of docs) {
            const review = item.data() as Review
            review.reviewId = item.id
            const course = this.courses.find(item => item.courseId == review.classId)
            if (course) {
                review.classNumber = course.CourseNumber
            }
            this.reviewData.push(review)
        }
        this.reviewData = ratingsToStrings(this.reviewData)
    }

    async getMore() {
        const ref = collection(this.afs, 'Reviews')

        var q = query(ref)
        if (this.courseId) {
            q = query(q, where("classId", "==", this.courseId))
        }

        q = query(q,
            orderBy(this.selectedSort.field,
                this.selectedSort.order as
                OrderByDirection)
        )

        if (this.latestDoc) {
            // console.log("latestDoc", this.latestDoc)
            q = query(q, startAfter(this.latestDoc))
        }

        q = query(q, limit(this.limit))
        const response = await getDocs(q)
        if (response.empty) {
            this.noMore = true
            return
        }
        var docs = response.docs as Array<QueryDocumentSnapshot<DocumentData>>
        this.noMore = docs.length < this.limit
        this.latestDoc = docs[docs.length - 1]
        this.updateReviewArray(docs)
    }
}
