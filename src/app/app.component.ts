import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    currentYear: any = new Date().getFullYear()

    properName: string = "uiucmcs.org"
}