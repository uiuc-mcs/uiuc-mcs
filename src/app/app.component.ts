import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    currentYear: any = new Date().getFullYear()
    title = 'uiucmcs.org';

    degreeName: string = "Computer Science"
    websiteName: string = "UIUC MCS"
    properName: string = "uiucmcs.org"
    redditName: string = "/r/UIUC_MCS"
    redditURL: string = "https://www.reddit.com/r/UIUC_MCS"
    githubURL: string = "https://github.com/uiuc-mcs/uiuc-mcs"
}