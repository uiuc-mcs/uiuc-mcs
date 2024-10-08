import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout'

import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import {
    initializeFirestore, provideFirestore, persistentLocalCache,
    persistentMultipleTabManager
} from '@angular/fire/firestore';
import { getAnalytics, provideAnalytics, UserTrackingService, ScreenTrackingService } from '@angular/fire/analytics';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';

import { NavbarComponent } from './navigation/navbar/navbar.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';

import { CourseDetailComponent } from './courses/course-detail/course-detail.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { CourseGridComponent } from './courses/course-grid/course-grid.component';
import { EditCourseComponent } from './courses/course-edit/course-edit.component';
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

import { CustomUrlSerializer } from './app-routing.module'
import { UrlSerializer } from '@angular/router';
import { CourseChartComponent } from './courses/course-chart/course-chart.component';

import { importProvidersFrom } from '@angular/core';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        NavbarComponent,
        LoginComponent,
        SettingsComponent,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        NothingHereComponent,
        PandaPartyComponent,
        ReviewHelpfulnessComponent,
        CreateCourseComponent,
        DialogReviewTooShort,
        DialogNotLoggedIn,
        DialogNotVerified,
        EditCourseComponent,
        SidenavComponent,
        SadPandaComponent,
        CourseChartComponent,
        PrivacyComponent,
        TermsComponent,
        ForgotPasswordComponent,
        VerifyEmailComponent,
        CourseListComponent,
        CourseGridComponent,
        LogoutComponent,
        CreateReviewComponent,
        DialogReviewSubmission,
        ReviewsComponent,
        CourseDetailComponent,
        ReviewDetailComponent,
        DialogOnDelete,
        RegisterComponent,
    ],
    providers: [
        ScreenTrackingService,
        UserTrackingService,
        { provide: UrlSerializer, useClass: CustomUrlSerializer },
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => initializeFirestore(getApp(), {
            localCache: persistentLocalCache({
                tabManager: persistentMultipleTabManager(),
            }),
            experimentalForceLongPolling: true
        })
        ),
        provideAuth(() => getAuth()),
        provideAnalytics(() => getAnalytics()),
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
