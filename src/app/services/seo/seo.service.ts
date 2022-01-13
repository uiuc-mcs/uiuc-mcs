import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';

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
        this.meta.updateTag({ name: 'og:title', content: title })
    }

    updateDescription(description: string) {
        this.meta.updateTag({ name: 'description', content: description })
        this.meta.updateTag({ name: 'og:description', content: description })
    }

    updateOgUrl() {
        this.meta.updateTag({ name: 'og:url', content: this.document.URL })
    }
}