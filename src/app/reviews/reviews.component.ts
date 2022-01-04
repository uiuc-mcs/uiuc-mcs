import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../services/auth/auth.service';
import { ClassService } from '../services/classes/class.service';
import { ClassData } from '../shared/class/class';
import { Review, ratingsToStrings } from '../shared/review/review';
import firebase from 'firebase/app'

@Component({
    selector: 'app-reviews',
    templateUrl: './reviews.component.html',
    styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
    constructor(
        private afs: AngularFirestore,
        private auth: AuthService,
        private classService: ClassService,
    ) { }

    reviewData: Review[] = []
    pageLength: number = 55
    isLoggedIn: boolean = false
    courses: ClassData[] = []
    courseId: string = ''
    nothingHere: boolean = false
    orderByOptions = [
        { displayText: "Newest", field: "timestamp", order: "desc" },
        { displayText: "Oldest", field: "timestamp", order: "asc" },
        { displayText: "Most Helpful", field: "wilsonScore", order: "desc" },
        { displayText: "Least Helpful", field: "wilsonScore", order: "asc" },
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
        this.getFirstPage()
    }

    onCourseChange(value: any): void {
        if (value !== '') {
            this.courseId = value.courseId
        } else {
            this.courseId = ''
        }
        this.getFirstPage()
    }

    newSort(): void {
        this.getFirstPage()
    }

    getFirstPage() {
        this.nothingHere = false
        this.afs.collection('Reviews', ref => {
            let query = ref.limit(this.pageLength)
            if (this.courseId) {
                query = query.where("classId", "==", this.courseId)
            }
            return query.orderBy(this.selectedSort.field,
                this.selectedSort.order as
                firebase.firestore.OrderByDirection)
        }).get().subscribe(response => {
            if (!response.docs.length) {
                this.reviewData = []
                this.nothingHere = true
                return
            }
            this.reviewData = []
            for (let item of response.docs) {
                const review = item.data() as Review
                review.reviewId = item.id
                const course = this.courses.find(item => item.courseId == review.classId)
                if (course) {
                    review.classNumber = course.CourseNumber
                }
                this.reviewData.push(review)
            }
            this.reviewData = ratingsToStrings(this.reviewData)
        }, error => { console.error("Reviews:", error) })
    }
}
