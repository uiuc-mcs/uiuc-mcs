import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatriculateSemYear } from 'src/app/shared/class/class'


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    registerForm!: FormGroup
    loading: boolean = false
    submitted: boolean = false
    returnUrl: string = '/'
    error: string = ''
    emailRegex: string = "^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?illinois\.edu"
    semesters: string[] = MatriculateSemYear

    constructor(
        private auth: AuthService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this.registerForm = this.formBuilder.group({
            // email: ['', [Validators.required]],
            // email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
            email: ['', [Validators.required, ]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            firstSemester: ['', Validators.required],
        })
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/verifyEmail';

    }

    get f() {
        return this.registerForm?.controls
    }

    onSubmit() {
        this.submitted = true
        if (this.registerForm?.invalid) {
            return
        }
        this.loading = true
        this.auth.signUp(this.f.email.value,
            this.f.password.value,
            this.f.firstName.value,
            this.f.lastName.value,
            this.f.firstSemester.value)
            .then(() => { this.loading = false })
            .catch(error => {
                this.loading = false
                this.error = error
            })
    }

}
