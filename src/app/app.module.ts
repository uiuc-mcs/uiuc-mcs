import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout'

import { AppComponent } from './app.component';
import { NavbarComponent } from './navigation/navbar/navbar.component';
import { LoginComponent } from './user/login/login.component';
import { SettingsComponent } from './user/settings/settings.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { LoadingComponent } from './loading/loading.component';

// Firebase
import { AngularFireModule } from "@angular/fire"
import { AngularFireAuthModule } from "@angular/fire/auth"
import { AngularFirestoreModule } from "@angular/fire/firestore"
import { AngularFireAnalyticsModule, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { environment } from '../environments/environment';


import { CourseDetailComponent } from './courses/course-detail/course-detail.component';
import { ReviewDetailComponent } from './reviews/review-detail/review-detail.component';
import { RegisterComponent } from './user/register/register.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './user/verify-email/verify-email.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { CourseGridComponent } from './courses/course-grid/course-grid.component';
import { LogoutComponent } from './user/logout/logout.component';
import { CreateReviewComponent } from './reviews/create-review/create-review.component';
import { DialogNotLoggedIn } from './shared/dialog/not-logged-in/dialog-not-logged-in.component';
import { DialogNotVerified } from './shared/dialog/not-verified/dialog-not-verified.component';
// import { DialogSendFeedback } from './shared/dialog/send-feedback/dialog-send-feedback.component';
import { DialogReviewSubmission } from './shared/dialog/review-submission/dialog-review-submission.component';
import { DialogReviewTooShort } from './shared/dialog/review-too-short/dialog-review-too-short.component';
import { DialogOnDelete } from './shared/dialog/review-delete/dialog-on-delete.component';
import { EditCourseMetadataComponent } from './courses/course-detail/edit-course-metadata/edit-course-metadata.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { SadPandaComponent } from './misc/sad-panda/sad-panda.component';
import { NothingHereComponent } from './misc/nothing-here/nothing-here.component';
import { PandaPartyComponent } from './misc/panda-party/panda-party.component';
import { ReviewHelpfulnessComponent } from './reviews/review-detail/review-helpfulness/review-helpfulness.component';
import { CreateCourseComponent } from './courses/create-course/create-course.component';
import { PrivacyComponent } from './privacy/privacy.component'
import { TermsComponent } from './terms/terms.component'

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        LoginComponent,
        SettingsComponent,
        ReviewsComponent,
        LoadingComponent,
        CourseDetailComponent,
        ReviewDetailComponent,
        DialogOnDelete,
        RegisterComponent,
        ForgotPasswordComponent,
        VerifyEmailComponent,
        CourseListComponent,
        CourseGridComponent,
        LogoutComponent,
        CreateReviewComponent,
        DialogReviewSubmission,
        DialogReviewTooShort,
        DialogNotLoggedIn,
        DialogNotVerified,
        // DialogSendFeedback,
        EditCourseMetadataComponent,
        SidenavComponent,
        SadPandaComponent,
        NothingHereComponent,
        PandaPartyComponent,
        ReviewHelpfulnessComponent,
        CreateCourseComponent,
        PrivacyComponent,
        TermsComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireAnalyticsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
    ],
    providers: [
        ScreenTrackingService,
        UserTrackingService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
