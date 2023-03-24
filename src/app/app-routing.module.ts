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
import { EditCourseComponent } from './courses/course-edit/course-edit.component';
import { NothingHereComponent } from './misc/nothing-here/nothing-here.component';
import { CreateCourseComponent } from './courses/course-create/course-create.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';
import { environment } from 'src/environments/environment'

import { DefaultUrlSerializer, UrlSerializer, UrlTree } from '@angular/router';
import { CourseChartComponent } from './courses/course-chart/course-chart.component';

export interface NavItem {
    title: string,
    url: string,
    show: boolean
}
export const NavInfo = new Map<string, NavItem>([
    ['courses', { title: 'Courses', url: '/', show: true }],
    ['chart', { title: 'Chart', url: '/chart', show: true }],
    ['grid', { title: 'Grid', url: '/grid', show: true }],
    ['reviews', { title: 'Reviews', url: '/reviews', show: true }],
    ['createReview', { title: 'Create Review', url: '/createReview', show: false }],
    ['settings', { title: 'Profile', url: '/settings', show: false }],
    ['login', { title: 'Sign in', url: '/login', show: false }],
    ['logout', { title: 'Sign out', url: '/logout', show: false }],
])

export class CustomUrlSerializer implements UrlSerializer {
    private _defaultUrlSerializer: DefaultUrlSerializer = new DefaultUrlSerializer();

    parse(url: string): UrlTree {
        // Encode parentheses
        url = url.replace(/\(/g, '%28').replace(/\)/g, '%29');
        // Use the default serializer.
        return this._defaultUrlSerializer.parse(url)
    }

    serialize(tree: UrlTree): string {
        return this._defaultUrlSerializer.serialize(tree).replace(/%28/g, '(').replace(/%29/g, ')');
    }
}

const routes: Routes = [
    {
        path: '', component: CourseListComponent,
        data: {
            title: 'UIUC Master of Computer Science Course Reviews',
            description: 'Course Reviews and information about the Master of Computer Science programs at the University of Illinois at Urbana-Champaign.',
        }
    },
    {
        path: 'courses', redirectTo: '', pathMatch: 'full',
        data: { title: '', description: '' },
    },
    {
        path: 'courses/create', component: CreateCourseComponent,
        data: { title: 'Create Course', description: '' },
        canActivate: [AuthguardGuard]
    },
    {
        path: 'courses/:courseId', component: CourseDetailComponent,
        data: { title: '', description: '' }
    },
    {
        path: 'courses/edit/:courseId', component: EditCourseComponent,
        data: { title: '', description: '' },
        canActivate: [AuthguardGuard]
    },
    {
        path: 'grid', component: CourseGridComponent,
        data: { title: `Course Grid | ${environment.websiteName}`, description: '' }
    },
    {
        path: 'chart', component: CourseChartComponent,
        data: { title: `Course Chart | ${environment.websiteName}`, description: '' }
    },
    {
        path: 'reviews', component: ReviewsComponent,
        data: { title: `Course Reviews | ${environment.websiteName}`, description: '' }
    },
    {
        path: 'review/:id', component: ReviewDetailComponent,
        data: { title: '', description: '' }
    },
    {
        path: 'review/edit/:id', component: CreateReviewComponent,
        data: { title: '', description: '' }
    },
    {
        path: 'settings', component: SettingsComponent,
        data: { title: `Profile | ${environment.websiteName}`, description: '' },
        canActivate: [AuthguardGuard],
    },
    {
        path: 'login', component: LoginComponent,
        data: { title: `Sign In | ${environment.websiteName}`, description: '' }
    },
    {
        path: 'logout', component: LogoutComponent,
        data: { title: `Sign Out | ${environment.websiteName}`, description: '' }
    },
    {
        path: 'register', component: RegisterComponent,
        data: { title: `Sign Up | ${environment.websiteName}`, description: '' }
    },
    {
        path: 'passwordReset', component: ForgotPasswordComponent,
        data: { title: `Reset Password | ${environment.websiteName}`, description: '' }
    },
    {
        path: 'verifyEmail', component: VerifyEmailComponent,
        data: { title: `Create Review | ${environment.websiteName}`, description: '' },
    },
    {
        path: 'createReview', component: CreateReviewComponent,
        data: { title: `Create Review | ${environment.websiteName}`, description: '' },
        canActivate: [AuthguardGuard],
    },
    {
        path: 'privacy', component: PrivacyComponent,
        data: { title: `Privacy Policy | ${environment.websiteName}`, description: '' }
    },
    {
        path: 'terms', component: TermsComponent,
        data: { title: `Terms of Use | ${environment.websiteName}`, description: '' }
    },
    {
        path: '404', component: NothingHereComponent,
        data: { title: `Error | ${environment.websiteName}`, description: '' }
    },
    {
        path: '**', component: NothingHereComponent,
        data: { title: `Error | ${environment.websiteName}`, description: '' }
    }
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
