import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment'
import { filter, map, mergeMap } from 'rxjs/operators';
import { SEOService } from './services/seo/seo.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})

export class AppComponent {
    constructor(private router: Router,
        private activatedRoute: ActivatedRoute,
        private seoService: SEOService) { }

    currentYear: any = new Date().getFullYear()
    properName: string = environment.websiteName

    ngOnInit() {
        this.router.events.pipe(
            filter((event) => event instanceof NavigationEnd),
            map(() => this.activatedRoute),
            map((route) => {
                while (route.firstChild) route = route.firstChild;
                return route;
            }),
            filter((route) => route.outlet === 'primary'),
            mergeMap((route) => route.data)
        )
            .subscribe((event) => {
                this.seoService.updateTitle(event['title']);
                this.seoService.updateDescription(event['description'])
                this.seoService.updateOgUrl();
                this.seoService.updateCanonical();
            });
    }
}