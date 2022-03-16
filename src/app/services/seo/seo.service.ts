import { Injectable, Inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

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
        let link: HTMLLinkElement = this.document.createElement('link');
        link.setAttribute('rel', 'canonical');
        this.document.head.appendChild(link);
        link.setAttribute('href', canURL);
    }
}