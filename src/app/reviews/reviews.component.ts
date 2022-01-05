import { Component, OnInit } from '@angular/core';
import { AngularFirestore, DocumentData, QueryDocumentSnapshot } from '@angular/fire/firestore';
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
    latestDoc: any | null = null
    limit: number = 10
    pageLength: number = 55
    isLoggedIn: boolean = false
    courses: ClassData[] = []
    courseId: string = ''
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

    updateReviewArray(docs: Array<QueryDocumentSnapshot<DocumentData>>) {
        this.reviewData = []
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

    getFirstPage() {
        this.afs.collection('Reviews', ref => {
            let query = ref.limit(this.pageLength)
            if (this.courseId) {
                query = query.where("classId", "==", this.courseId)
            }
            return query.orderBy(this.selectedSort.field,
                this.selectedSort.order as
                firebase.firestore.OrderByDirection)
                .limit(this.limit)
        }).get().subscribe(response => {
            if (response.empty) {
                this.reviewData = []
                return
            }
            var docs = response.docs as Array<QueryDocumentSnapshot<DocumentData>>
            this.latestDoc = docs[docs.length - 1]
            console.log('updated latestDoc', this.latestDoc)
            this.updateReviewArray(docs)
        }, error => { console.error("Reviews:", error) })
    }

    getMore() {
        this.afs.collection('Reviews', ref => {
            let query = ref.limit(this.pageLength)
            if (this.courseId) {
                query = query.where("classId", "==", this.courseId)
            }
            if (this.latestDoc) {
                console.log(this.latestDoc)
                return query.orderBy(this.selectedSort.field,
                    this.selectedSort.order as
                    firebase.firestore.OrderByDirection)
                    .startAfter(this.latestDoc).limit(this.limit)
                // .startAfter(this.latestDoc || 0).limit(3)
            }
            return query.orderBy(this.selectedSort.field,
                this.selectedSort.order as
                firebase.firestore.OrderByDirection)
                .limit(this.limit)
        }).get().subscribe(response => {
            if (!response.docs.length) {
                this.reviewData = []
                return
            }
            this.latestDoc = response.docs[response.docs.length - 1]
            console.log('updated latestDoc', this.latestDoc)
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

    // getFirstPage() {
    //     this.afs.collection('Reviews', ref => {
    //         let query = ref.limit(this.pageLength)
    //         if (this.courseId) {
    //             query = query.where("classId", "==", this.courseId)
    //         }
    //         return query.orderBy(this.selectedSort.field,
    //             this.selectedSort.order as
    //             firebase.firestore.OrderByDirection)
    //     }).get().subscribe(response => {
    //         if (!response.docs.length) {
    //             this.reviewData = []
    //             return
    //         }
    //         this.reviewData = []
    //         for (let item of response.docs) {
    //             const review = item.data() as Review
    //             review.reviewId = item.id
    //             const course = this.courses.find(item => item.courseId == review.classId)
    //             if (course) {
    //                 review.classNumber = course.CourseNumber
    //             }
    //             this.reviewData.push(review)
    //         }
    //         this.reviewData = ratingsToStrings(this.reviewData)
    //     }, error => { console.error("Reviews:", error) })
    // }
}
