import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout'

// import { AngularFireModule } from "@angular/fire/compat"
// import { AngularFireAuthModule } from "@angular/fire/compat/auth"
// import { AngularFirestoreModule } from "@angular/fire/compat/firestore"
// import { AngularFireAnalyticsModule, ScreenTrackingService, UserTrackingService } from '@angular/fire/compat/analytics';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAnalytics, provideAnalytics, UserTrackingService, ScreenTrackingService } from '@angular/fire/analytics';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';

import { NavbarComponent } from './navigation/navbar/navbar.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';

import { CourseDetailComponent } from './courses/course-detail/course-detail.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { CourseGridComponent } from './courses/course-grid/course-grid.component';
import { EditCourseMetadataComponent } from './courses/course-edit/course-edit.component';
import { CreateCourseComponent } from './courses/course-create/course-create.component';

import { ReviewsComponent } from './reviews/reviews.component';
import { ReviewDetailComponent } from './reviews/review-detail/review-detail.component';
import { ReviewHelpfulnessComponent } from './reviews/review-detail/review-helpfulness/review-helpfulness.component';
import { CreateReviewComponent } from './reviews/review-create/review-create.component';

import { LoginComponent } from './user/login/login.component';
import { SettingsComponent } from './user/settings/settings.component';
import { RegisterComponent } from './user/register/register.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './user/verify-email/verify-email.component';
import { LogoutComponent } from './user/logout/logout.component';

import { DialogNotLoggedIn } from './shared/dialog/not-logged-in/dialog-not-logged-in.component';
import { DialogNotVerified } from './shared/dialog/not-verified/dialog-not-verified.component';
import { DialogReviewSubmission } from './shared/dialog/review-submission/dialog-review-submission.component';
import { DialogReviewTooShort } from './shared/dialog/review-too-short/dialog-review-too-short.component';
import { DialogOnDelete } from './shared/dialog/review-delete/dialog-on-delete.component';

import { SadPandaComponent } from './misc/sad-panda/sad-panda.component';
import { NothingHereComponent } from './misc/nothing-here/nothing-here.component';
import { PandaPartyComponent } from './misc/panda-party/panda-party.component';
import { PrivacyComponent } from './privacy/privacy.component'
import { TermsComponent } from './terms/terms.component'

import { SEOService } from './services/seo/seo.service';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        LoginComponent,
        SettingsComponent,
        ReviewsComponent,
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
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        // AngularFireModule.initializeApp(environment.firebase),
        // AngularFirestoreModule,
        // AngularFireAuthModule,
        // AngularFireAnalyticsModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
        provideAuth(() => getAuth()),
        provideAnalytics(() => getAnalytics()),
    ],
    providers: [
        ScreenTrackingService,
        UserTrackingService,
        SEOService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
