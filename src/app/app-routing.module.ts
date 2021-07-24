import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseDetailComponent } from './courses/course-detail/course-detail.component';
import { CourseGridComponent } from './courses/course-grid/course-grid.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReviewDetailComponent } from './reviews/review-detail/review-detail.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { CreateReviewComponent } from './reviews/create-review/create-review.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { SettingsComponent } from './user/settings/settings.component';
import { VerifyEmailComponent } from './user/verify-email/verify-email.component';
import { AuthguardGuard } from './user/authguard.guard';
import { LogoutComponent } from './user/logout/logout.component';
import { EditComponent } from './user/edit/edit.component';
import { EditCourseMetadataComponent } from './courses/course-detail/edit-course-metadata/edit-course-metadata.component';
import { NothingHereComponent } from './misc/nothing-here/nothing-here.component';
import { CreateCourseComponent } from './courses/create-course/create-course.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'home', redirectTo: '', pathMatch: 'full'},
  {path: 'courses', component: CourseGridComponent},
  {path: 'courses/create', component: CreateCourseComponent},
  {path: 'courses/:courseId', component: CourseDetailComponent},
  {path: 'courses/edit/:courseId', component: EditCourseMetadataComponent, canActivate: [AuthguardGuard]},
  {path: 'reviews', component: ReviewsComponent},
  {path: 'review/:id', component: ReviewDetailComponent},
  {path: 'review/edit/:id', component: CreateReviewComponent},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthguardGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'passwordReset', component: ForgotPasswordComponent},
  {path: 'verifyEmail', component: VerifyEmailComponent},
  {path: 'createReview', component: CreateReviewComponent, canActivate: [AuthguardGuard]},
  {path: 'user/edit', component: EditComponent, canActivate: [AuthguardGuard]},
  {path: 'privacy', component: PrivacyComponent},
  {path: 'terms', component: TermsComponent},
  {path: '**', component: NothingHereComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
