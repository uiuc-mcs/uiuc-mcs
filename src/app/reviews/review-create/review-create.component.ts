import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ClassService } from 'src/app/services/classes/class.service';
import { ClassData, Difficulties, Ratings, Semesters, getRouterLink } from 'src/app/shared/class/class';
import { DialogReviewSubmission } from 'src/app/shared/dialog/review-submission/dialog-review-submission.component';
import { DialogReviewTooShort } from 'src/app/shared/dialog/review-too-short/dialog-review-too-short.component';
import { Review, SemesterYear } from 'src/app/shared/review/review';
import { FbUser } from 'src/app/shared/user/user';

@Component({
    selector: 'app-create-review',
    templateUrl: './review-create.component.html',
    styleUrls: ['./review-create.component.scss']
})

export class CreateReviewComponent implements OnInit {
    headerText: string = "Create Review"
    reviewId: string = ""
    error: any
    loading: boolean = false
    submitted: boolean = false
    pros: string[] = ["test"]
    cons: string[] = []
    currentYear: number = (new Date()).getFullYear()
    years: number[] = [this.currentYear, this.currentYear - 1,
    this.currentYear - 2, this.currentYear - 3, this.currentYear - 4
    ]
    semesters: string[] = Semesters.reverse()
    semesterYears: SemesterYear[] = []
    difficulties = Difficulties
    ratings = Ratings

    // reviewPlaceholder = 'The good:\n1.\n2.\n\nThe bad:\n1.\n2.\n\nDetailed Review:\nI highly recommend this course. Here\'s why:'
    // Unfortunately the html5 spec doesn't support multiline placeholders.
    reviewPlaceholder = 'I highly recommend this course. Here\'s why:'

    courses: ClassData[] | undefined
    reviewForm: FormGroup = new FormGroup({})
    completedReviews: string[] = []
    userData: FbUser | undefined
    minRating: number = 1
    maxRating: number = 5
    minWorkload: number = 1
    maxWorkload: number = 168

    minReviewCharLength: number = 100
    recommendedWordCount: number = 100
    wordCountEnforced: boolean = false

    constructor(
        private courseService: ClassService,
        private formBuilder: FormBuilder,
        private auth: AuthService,
        public dialog: MatDialog,
        private afs: AngularFirestore,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    compareSemyear(o1: SemesterYear, o2: SemesterYear): boolean {
        return (o1.semester === o2.semester) && (o1.year === o2.year);
    }

    ngOnInit(): void {
        for (var i = 0; i < this.years.length; i++) {
            for (var j = 0; j < this.semesters.length; j++) {
                this.semesterYears.push(
                    {
                        year: this.years[i],
                        semester: this.semesters[j]
                    }
                )
            }
        }
        this.reviewId = this.route.snapshot.paramMap.get('id') || ""
        this.courseService.classes.subscribe(data => {
            this.courses = data
            this.courses.sort((a, b) => (a.ClassName > b.ClassName) ? 1 : -1)
        })
        this.auth.userData.subscribe(data => {
            this.userData = data
            this.getUserReviews()
        }).unsubscribe()
        this.initializeReviewForm()
        this.loadReview()
    }

    loadReview() {
        if (this.reviewId) {
            this.headerText = "Edit Review"
            this.afs.collection("Reviews").doc(this.reviewId).get().subscribe(doc => {
                var docData = doc.data() as Review
                docData.semyear = { semester: docData.semester, year: docData.year }
                this.reviewForm.setValue(docData)
            })
            this.f.course.disable()
        }
    }

    getUserReviews(): void {
        this.afs.collection('Reviews', ref =>
            ref.where("userId", '==', this.userData?.uid)
        ).get().subscribe(response => {
            if (!response.docs.length) return
            this.completedReviews = []
            for (let item of response.docs) {
                const review = item.data() as Review
                this.completedReviews.push(review.course)
            }
        }, error => { console.error("Create Review:", error) }).unsubscribe();
    }

    initializeReviewForm() {
        this.reviewForm = this.formBuilder.group({
            course: ['', Validators.required],
            semyear: ['', Validators.required],
            semester: [''],
            year: ['', [Validators.min(2010), Validators.max(this.currentYear + 1)]],
            difficulty: ['', [Validators.required, Validators.max(this.maxRating), Validators.min(this.minRating)]],
            workload: ['', [Validators.required, Validators.max(this.maxWorkload), Validators.min(this.minWorkload)]],
            rating: ['', [Validators.required, Validators.max(this.maxRating), Validators.min(this.minRating)]],
            title: ['', Validators.required],
            review: ['', [Validators.required, Validators.minLength(this.minReviewCharLength)]],
            userId: ['', Validators.required],
            timestamp: [new Date(), Validators.required],
            classId: ['', Validators.required],
            helpfulPositive: [1, Validators.required],
            helpfulNegative: [0, Validators.required],
            wilsonScore: [0.8, Validators.required],
            lastUpdated: [''],
        })
        this.reviewForm.controls['timestamp'].setValue(new Date())
        this.auth.userData.subscribe(user => {
            this.reviewForm.controls['userId'].setValue(user.uid)
        }).unsubscribe();
    }

    get f() {
        return this.reviewForm?.controls
    }

    countReviewChars() {
        const len = this.f.review.value.length
        if (len == 1) {
            return "1 character"
        }
        return len + " characters"
    }

    countWords(s: string) {
        s = s.replace(/(^\s*)|(\s*$)/gi, "");//exclude  start and end white-space
        s = s.replace(/[ ]{2,}/gi, " ");//2 or more space to 1
        s = s.replace(/\n /, "\n"); // exclude newline with a start spacing
        return s.split(' ').filter(function (str) { return str != ""; }).length;
    }

    onSubmit() {
        const courseName = this.reviewForm.controls['course'].value
        const course = this.courses?.find(item => item.ClassName === courseName)
        const classId = course?.courseId
        this.reviewForm.controls['classId'].setValue(classId)
        this.submitted = true
        if (this.reviewForm?.invalid) {
            this.error = this.reviewForm.errors
            return
        }
        if (this.wordCountEnforced && this.countWords(this.f.review.value as string) < this.recommendedWordCount) {
            this.openShortReviewDialog()
            return
        }
        this.loading = true

        this.reviewForm.value.year = this.reviewForm.value.semyear.year
        this.reviewForm.value.semester = this.reviewForm.value.semyear.semester
        if (this.reviewId) {
            this.afs.collection('Reviews')
                .doc(this.reviewId)
                .update(this.reviewForm.value)
                .then(result => {
                    this.loading = false
                    this.openSubmittedDialog(course)
                }, error => {
                    console.error("Create Review Failed: ", error)
                    this.loading = false
                    this.error = error.message
                })
        } else {
            this.afs.collection('Reviews')
                .add(this.reviewForm.value)
                .then(result => {
                    this.loading = false
                    this.openSubmittedDialog(course)
                }, error => {
                    console.error("Create Review Failed: ", error)
                    this.loading = false
                    this.error = error.message
                })
        }
    }

    openSubmittedDialog(course?: ClassData) {
        // const classId = this.courses?.find(item => item.ClassName === courseName)?.courseId
        this.courseService.updateCourseData()
        const dialogRef = this.dialog.open(DialogReviewSubmission)
        dialogRef.afterClosed().subscribe(result => {
            if (course) {
                const link = getRouterLink(course)
                // this.router.navigate(['courses', this.reviewForm.controls['course'].value])
                this.router.navigate([link])
            }
            else {
                this.router.navigate(['home'])
            }
        })
    }

    openShortReviewDialog() {
        const dialogRef = this.dialog.open(DialogReviewTooShort)
        dialogRef.afterClosed().subscribe(result => {
            this.wordCountEnforced = result
            if (result) {
                window.location.hash = ""
                window.location.hash = "semester"
            }
        }).unsubscribe();
    }
}