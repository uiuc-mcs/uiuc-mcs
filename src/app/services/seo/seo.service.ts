import { Injectable, Inject, DOCUMENT } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';


@Injectable({
    providedIn: 'root'
})
export class SEOService {
    constructor(private title: Title,
        private meta: Meta,
        @Inject(DOCUMENT) private document: any,
    ) { }


    updateTitle(title: string) {
        this.title.setTitle(title);
        this.meta.updateTag({ property: 'og:title', content: title })
    }

    updateDescription(description: string) {
        this.meta.updateTag({ name: 'description', content: description })
        this.meta.updateTag({ property: 'og:description', content: description })
    }

    updateOgUrl() {
        this.meta.updateTag({ property: 'og:url', content: this.document.URL })
    }

    updateCanonical(url?: string) {
        let canURL = url == undefined ? this.document.URL : url;
        var links = document.getElementsByTagName("link");
        var can_link = null;
        for (var i = 0; i < links.length; i ++) {
            if (links[i].getAttribute("rel") === "canonical") {
                can_link = links[i]
            }
        }
        if ( can_link === null ) {
            can_link = this.document.createElement('link');
            this.document.head.appendChild(can_link);
        }
        can_link.setAttribute('rel', 'canonical');
        can_link.setAttribute('href', canURL);
    }
}