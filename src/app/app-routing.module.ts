import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseDetailComponent } from './courses/course-detail/course-detail.component';
import { CourseGridComponent } from './courses/course-grid/course-grid.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { ReviewDetailComponent } from './reviews/review-detail/review-detail.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { CreateReviewComponent } from './reviews/review-create/review-create.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { SettingsComponent } from './user/settings/settings.component';
import { VerifyEmailComponent } from './user/verify-email/verify-email.component';
import { AuthguardGuard } from './user/authguard.guard';
import { LogoutComponent } from './user/logout/logout.component';
import { EditCourseMetadataComponent } from './courses/course-edit/course-edit.component';
import { NothingHereComponent } from './misc/nothing-here/nothing-here.component';
import { CreateCourseComponent } from './courses/course-create/course-create.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';
import { environment } from 'src/environments/environment'

const routes: Routes = [
    { path: '', component: CourseListComponent, data: {title: environment.websiteName}},
    { path: 'home', redirectTo: '', pathMatch: 'full' },
    { path: 'courses', component: CourseGridComponent, data: {title: `Course Grid | ${environment.websiteName}` }},
    { path: 'courses/create', component: CreateCourseComponent, canActivate: [AuthguardGuard] },
    { path: 'courses/:courseId', component: CourseDetailComponent },
    { path: 'courses/edit/:courseId', component: EditCourseMetadataComponent, canActivate: [AuthguardGuard] },
    { path: 'reviews', component: ReviewsComponent, data: {title: `Course Reviews | ${environment.websiteName}`}},
    { path: 'review/:id', component: ReviewDetailComponent },
    { path: 'review/edit/:id', component: CreateReviewComponent },
    { path: 'settings', component: SettingsComponent, canActivate: [AuthguardGuard], data: {title: `Profile | ${environment.websiteName}`}},
    { path: 'login', component: LoginComponent, data: {title: `Sign In | ${environment.websiteName}`}},
    { path: 'logout', component: LogoutComponent, data: {title: `Sign Out | ${environment.websiteName}`}},
    { path: 'register', component: RegisterComponent, data: {title: `Sign Up | ${environment.websiteName}`}},
    { path: 'passwordReset', component: ForgotPasswordComponent, data: {title: `Reset Password | ${environment.websiteName}`}},
    { path: 'verifyEmail', component: VerifyEmailComponent },
    { path: 'createReview', component: CreateReviewComponent, canActivate: [AuthguardGuard], data: {title: `Create Review | ${environment.websiteName}`}},
    { path: 'privacy', component: PrivacyComponent, data: {title: `Privacy Policy | ${environment.websiteName}`}},
    { path: 'terms', component: TermsComponent, data: {title: `Terms of Use | ${environment.websiteName}`}},
    { path: '404', component: NothingHereComponent, data: {title: `Error | ${environment.websiteName}`}},
    { path: '**', component: NothingHereComponent, data: {title: `Error | ${environment.websiteName}`}}
];

export type ScrollPositionRestoration =
    "disabled" | "enabled" | "top"

let routerOptions = {
    scrollPositionRestoration: <ScrollPositionRestoration>'enabled',
    // anchorScrolling: <AnchorScrolling>'enabled',
}

@NgModule({
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
