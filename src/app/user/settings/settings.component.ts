import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FbUser } from 'src/app/shared/user/user';
import { Clipboard } from '@angular/cdk/clipboard';
import { Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogOnDelete } from 'src/app/shared/dialog/review-delete/dialog-on-delete.component';
import { Review } from 'src/app/shared/review/review';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatriculateSemYear } from 'src/app/shared/class/class'
import { collection, deleteDoc, doc, getDocs, query, where }  from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelect } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { MatLabel } from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule, 
        MatIconModule, 
        MatSelect, 
        RouterModule, 
        MatLabel, 
        MatOption, 
        MatFormField, 
        MatInput, 
        MatButton,
        ReactiveFormsModule,
        MatListModule
    ]
})
export class SettingsComponent implements OnInit {
    editUserDataForm: FormGroup
    userData: FbUser | undefined
    reviewData: Review[] = []
    durationInSeconds = 3
    Semesters = MatriculateSemYear
    editing = false

    userInfo = {
        a_email: { name: "email", displayName: "Email", value: "test@test.com", is_input: true },
        b_firstName: { name: "firstName", displayName: "First Name", value: "Test Name", is_input: true },
        c_lastName: { name: "lastName", displayName: "Last Name", value: "Name Test", is_input: true },
        d_firstSemester: { name: "firstSemester", displayName: "First Semester", value: "Fall 2020", is_input: false },
    }

    constructor(
        private auth: AuthService,
        private afs: Firestore,
        private clipboard: Clipboard,
        private _snackBar: MatSnackBar,
        public dialog: MatDialog,
        private formBuilder: FormBuilder,
    ) {
        this.editUserDataForm = this.formBuilder.group({
            firstName: [{ value: '', disabled: true }, Validators.required],
            lastName: [{ value: '', disabled: true }, Validators.required],
            firstSemester: [{ value: '', disabled: true }, Validators.required],
        })
    }
    controlNames = ['firstName', 'lastName', 'firstSemester']
    // savedInputs = {
    //   firstName: '',
    //   lastName: '',
    //   firstSemester: ''
    // }
    savedInputs: any = this.controlNames.reduce(
        (o, key) => Object.assign(o, { [key]: '' }), {});

    enableFormInputs() {
        for (let x of this.controlNames) {
            this.editUserDataForm.controls[x].enable()
        }
    }

    disableFormInputs() {
        for (let x of this.controlNames) {
            this.editUserDataForm.controls[x].disable()
        }
    }

    onEditClick() {
        this.editing = true
        for (let x of this.controlNames) {
            this.savedInputs[x] = this.editUserDataForm.controls[x].value
        }
        this.enableFormInputs()
    }

    onCancelEditClick() {
        this.editing = false
        for (let x of this.controlNames) {
            this.editUserDataForm.controls[x].setValue(this.savedInputs[x])
        }
        this.disableFormInputs()
    }

    ngOnInit(): void {
        this.auth.userData.subscribe(user => {
            if (user) {
                this.userData = user
                this.userInfo.a_email.value = user.email || ''
                this.userInfo.b_firstName.value = user.firstName || ''
                this.userInfo.c_lastName.value = user.lastName || ''
                this.userInfo.d_firstSemester.value = user.firstSemester || ''
                this.f.firstName.setValue(user.firstName)
                this.f.lastName.setValue(user.lastName)
                this.f.firstSemester.setValue(user.firstSemester)
                this.getUserReviews()
            }
        })
    }

    get f() {
        return this.editUserDataForm?.controls
    }

    onSubmit(): void {
        if (this.f.invalid) {
            return
        }
        this.auth.updateUserExtraData(
            this.f.firstName.value,
            this.f.lastName.value,
            this.f.firstSemester.value
        )
        this.editing = false
        this.disableFormInputs()
    }

    async getUserReviews() {
        const ref = collection(this.afs, 'Reviews')
        var q = query(ref, where("userId", '==', this.userData?.uid))
        const response = await getDocs(q)
        if (!response.docs.length) {
            // console.warn("View User Reviews: getUserReviews - No reviews exist")
            // console.warn("View User Reviews: getUserReviews - No reviews exist")
        }
        this.reviewData = []
        for (let item of response.docs) {
            const review = item.data() as Review
            review.reviewId = item.id
            this.reviewData.push(review)
        }
    }

    openSnackBar(message: string, action: string = "Dismiss") {
        this.clipboard.copy(window.location.host)
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
        dialogRef.afterClosed().subscribe(
            async (result) => {
                if (result) {
                    const ref = doc(this.afs, "Reviews", reviewId as string)
                    await deleteDoc(ref)
                    let index = this.reviewData.findIndex(x => x.reviewId == reviewId)
                    this.reviewData.splice(index, 1)
                }
            })
    }
}
