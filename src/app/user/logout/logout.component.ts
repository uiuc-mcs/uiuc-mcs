import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatError } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.scss'],
    standalone: true,
    imports: [ MatCardModule, MatError]
})
export class LogoutComponent implements OnInit {
    timeRemaining: number = 3

    constructor(
        private router: Router,
        private auth: AuthService
    ) { }

    ngOnInit(): void {
        this.auth.logout()
        setTimeout(() => { this.timeRemaining = 2 }, 1000)
        setTimeout(() => { this.timeRemaining = 1 }, 2000)
        setTimeout(() => {
            if (this.router.url == '/logout') this.router.navigate([''])
        }, 3000);
    }
}
