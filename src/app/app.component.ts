import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment'
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(private router: Router,
        private activatedRoute: ActivatedRoute,
        private titleService: Title) {
    }

    currentYear: any = new Date().getFullYear()
    properName: string = environment.websiteName

    ngOnInit() {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
        )
            .subscribe(() => {
                var rt = this.getChild(this.activatedRoute)
                rt.data.subscribe(data => {
                    console.log(data);
                    this.titleService.setTitle(data.title)
                })
            })

    }

    getChild(activatedRoute: ActivatedRoute): ActivatedRoute {
        if (activatedRoute.firstChild) {
            return this.getChild(activatedRoute.firstChild);
        }
        return activatedRoute;
    }
}