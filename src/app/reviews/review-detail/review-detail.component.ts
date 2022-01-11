import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { courseRouterLink, Review, ratingsToStrings } from 'src/app/shared/review/review';
import { FbUser } from 'src/app/shared/user/user';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatDialog } from '@angular/material/dialog';
import { DialogOnDelete } from 'src/app/shared/dialog/review-delete/dialog-on-delete.component';
import { ClassService } from 'src/app/services/classes/class.service';
import { ClassData } from 'src/app/shared/class/class';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-review-detail',
    templateUrl: './review-detail.component.html',
    styleUrls: ['./review-detail.component.scss']
})
export class ReviewDetailComponent implements OnInit {
    @Input() reviewId: string = ""
    @Input() author: string = ""
    @Input() class: string = ""
    @Input() query: string = ""
    @Input() pageLength: number = 55
    @Input() reviewData: Review[] = []
    @Input() dataLength: number = 0
    @Input() showEmptyMsg: boolean = true
    @Input() links: boolean = true
    isLoggedIn: boolean = false
    userData: FbUser | undefined
    durationInSeconds: number = 3
    loading: boolean = true
    courseRouterLink = courseRouterLink

    constructor(
        private route: ActivatedRoute,
        private afs: AngularFirestore,
        private auth: AuthService,
        private _snackBar: MatSnackBar,
        private clipboard: Clipboard,
        public dialog: MatDialog,
        private router: Router,
        private classService: ClassService,
        private titleService: Title
    ) { }

    ngOnInit(): void {
        this.auth.isLoggedIn.subscribe(status => { this.isLoggedIn = status })
        this.auth.userData.subscribe(data => {
            this.userData = data
        })
        this.reviewId = this.route.snapshot.paramMap.get('id') || this.reviewId
        if (this.reviewId != "") {
            this.getSingleReview(this.reviewId)
        }
    }

    getSingleReview(reviewId: string) {
        this.loading = true;
        this.afs.collection("Reviews").doc(reviewId).get().subscribe(doc => {
            if (!doc.exists) {
                this.router.navigate(['404'])
                return
            }
            const rev = doc.data() as Review
            rev.reviewId = doc.id

            var courses: ClassData[] = []
            this.classService.classes.subscribe(data => { courses = data })
            const course = courses.find(item => item.courseId == rev.classId)
            
            if (course) {
                rev.classNumber = course.CourseNumber
            }
            this.reviewData.push(rev)
            this.reviewData = ratingsToStrings(this.reviewData)
            this.loading = false;
            const title = `${rev.course} (${rev.semester} ${rev.year}) Course Review | ${environment.websiteName}`
            this.titleService.setTitle(title);
        })
    }

    openSnackBar(message: string, reviewId?: string, action: string = "Dismiss") {
        const protocol = window.location.protocol
        const host = window.location.host
        this.clipboard.copy(`${protocol}//${host}/review/${reviewId}`)
        this._snackBar.open(message, action, {
            duration: this.durationInSeconds * 1000,
        });
    }

    removeReview(reviewId: string | undefined): void {
        if (!reviewId) return
        this.openDialog(reviewId)
    }

    openDialog(reviewId: string) {
        const dialogRef = this.dialog.open(DialogOnDelete)
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.afs.collection("Reviews").doc(reviewId).delete()
                let index = this.reviewData.findIndex(x => x.reviewId == reviewId)
                this.reviewData.splice(index, 1)
            }
        })
    }

    getFeedbackValue(reviewId: string): string[] {
        if (!this.userData?.reviewFeedback) return [""]
        if (reviewId in this.userData?.reviewFeedback!) {
            let feedback = this.userData?.reviewFeedback![reviewId]
            if (feedback) return ["yes"]
            else return ["no"]
        }
        return [""]
    }
}
