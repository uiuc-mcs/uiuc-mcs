// material.module.ts
import { ModuleWithProviders } from "@angular/core";
import { NgModule } from "@angular/core";
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CustomIconRegistry } from '../shared/custom-icons/custom-icon-registry';
import { SVG_ICONS } from '../shared/custom-icons/custom-icon-registry';


// These are the hardcoded inline svg sources to be used by the `<mat-icon>` component.
// tslint:disable: max-line-length
export const svgIconProviders = [
    {
        provide: SVG_ICONS,
        useValue: {
            name: 'menu',
            svgSource:
                '<svg focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
                '<path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />' +
                '</svg>',
        },
        multi: true,
    },
    {
        provide: SVG_ICONS,
        useValue: {
            namespace: 'icons',
            name: 'check',
            svgSource: `
 <svg version="1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48" enable-background="new 0 0 48 48">
 <polygon fill="#43A047" points="40.6,12.1 17,35.7 7.4,26.1 4.6,29 17,41.3 43.4,14.9"/>
 </svg>
 `
        },
        multi: true
    },
    {
        provide: SVG_ICONS,
        useValue: {
            namespace: 'icons',
            name: 'summer',
            svgSource:
                `
 <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 512 512">
 <g>
 <path d="M377.139 259.492c0 66.637-54.020 120.658-120.658 120.658-66.637 0-120.658-54.021-120.658-120.658 0-66.637 54.020-120.658 120.658-120.658 66.637 0 120.658 54.020 120.658 120.658z" fill="#ebbc00"/>
 <path d="M228.352 100.669l30.27-77.906 25.979 77.906z" fill="#ebbc00"/>
 <path d="M228.352 411.341l30.27 77.895 25.979-77.895z" fill="#ebbc00"/>
 <path xmlns="http://www.w3.org/2000/svg" d="M100.659 287.601l-77.895-30.29 77.895-25.959z" fill="#ebbc00"/>
 <path d="M411.361 287.601l77.875-30.29-77.875-25.959z" fill="#ebbc00"/>
 <path d="M126.597 165.703l-33.659-76.472 73.442 36.7z" fill="#ebbc00"/>
 <path d="M346.276 385.423l76.524 33.639-36.741-73.442z" fill="#ebbc00"/>
 <path d="M168.499 388.199l-76.493 33.639 36.72-73.442z" fill="#ebbc00"/>
 <path d="M388.199 168.499l33.618-76.513-73.4 36.751z" fill="#ebbc00"/>
 </g>
 </svg>
 `
        },
        multi: true,
    },
    {
        provide: SVG_ICONS,
        useValue: {
            namespace: 'icons',
            name: 'spring',
            svgSource: `
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90" width="24" height="24">
 <defs>
 <style>
 .cls-1 {fill: #7ba60d;}
 .cls-2 {fill: #9cc925;}
 .cls-3 {fill: #ffa400;}
 .cls-4 {fill: #ffd900;}
 </style>
 </defs>
 <title>orange-flower</title>
 <g id="orange-flower">
 <path class="cls-1"
 d="M63.09,55.21a1.6,1.6,0,0,0-2.27,0l-6.06,5.79a2.06,2.06,0,0,0-.13.18c-.06,0-.12.07-.17.12l-9,9.24-9-9.24a1.24,1.24,0,0,0-.17-.12,1.43,1.43,0,0,0-.13-.18l-6.05-5.79a1.61,1.61,0,1,0-2.22,2.32L34,63.27a1.42,1.42,0,0,0,.14.09,1.05,1.05,0,0,0,.09.13l9.32,9.59a1.59,1.59,0,0,0,1.15.48,1.61,1.61,0,0,0,.82-.26,1.57,1.57,0,0,0,.81.26,1.59,1.59,0,0,0,1.15-.48l9.33-9.59a.68.68,0,0,0,.08-.13.82.82,0,0,0,.14-.08L63,57.48A1.61,1.61,0,0,0,63.09,55.21Z" />
 <path class="cls-1" d="M43.86,37.53V83.39a1.6,1.6,0,1,0,3.21,0V37.53Z" />
 <path class="cls-2"
 d="M21.17,49.05S21.35,67.13,33,67.14a6.65,6.65,0,0,0,6.64-6.64C39.61,50.6,21.17,49.05,21.17,49.05Z" />
 <path class="cls-2"
 d="M50.39,60.49A6.65,6.65,0,0,0,57,67.14c11.62,0,11.8-18.09,11.8-18.09S50.39,50.6,50.39,60.49Z" />
 <path class="cls-3"
 d="M69.17,27.15c-.23-7.56-11.55-7.27-11.55-7.27s6.74-8.7-.52-13.63S45,12.61,45,12.61,40.83,1.94,33,6.25s-.52,13.63-.52,13.63-12.62-2-11.54,7.27,11.54,7.27,11.54,7.27S25.7,43.12,33,48.05,45,41.69,45,41.69s4.21,10.67,12.07,6.36.52-13.63.52-13.63S69.4,34.72,69.17,27.15Z" />
 <circle class="cls-4" cx="45" cy="27.15" r="8.53" />
 </g>
 </svg>
 `
        },
        multi: true
    },
    {
        provide: SVG_ICONS,
        useValue: {
            namespace: 'icons',
            name: 'fall',
            svgSource: `
 <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="24" height="24"
 viewBox="0 0 1182.000000 1280.000000" preserveAspectRatio="xMidYMid meet">
 <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)" fill="#98482b" stroke="none">
 <path
 d="M5630 12278 c-150 -282 -386 -722 -522 -978 -271 -506 -290 -534 -386 -570 -134 -50 -200 -28 -707 235 -227 118 -415 215 -417 215 -2 0 10 -78 28 -172 51 -267 428 -2277 490 -2603 58 -313 65 -403 38 -495 -32 -107 -122 -162 -228 -140 -115 24 -113 22 -840 838 -373 419 -681 761 -683 759 -2 -2 -53 -177 -113 -388 -65 -225 -119 -397 -133 -416 -31 -47 -99 -90 -161 -103 -63 -13 -7 -23 -994 185 -409 86 -745 155 -747 153 -2 -2 21 -94 51 -203 408 -1487 441 -1609 454 -1689 20 -123 -14 -194 -115 -244 -22 -11 -173 -82 -335 -158 -162 -76 -298 -140 -301 -143 -4 -3 632 -526 1413 -1161 781 -635 1438 -1174 1460 -1198 22 -24 52 -69 66 -100 23 -48 27 -71 27 -142 -1 -77 -8 -108 -79 -340 -122 -397 -175 -574 -173 -576 1 -1 639 72 1417 162 778 90 1430 162 1448 159 18 -4 47 -19 65 -34 28 -26 32 -35 35 -97 2 -38 -6 -226 -17 -419 -23 -383 -65 -1112 -111 -1920 -16 -286 -32 -559 -36 -607 l-6 -88 392 0 392 0 -6 87 c-4 49 -20 324 -36 613 -47 825 -88 1535 -111 1915 -11 193 -19 381 -17 419 3 62 7 71 35 97 18 15 47 30 65 34 18 3 670 -69 1448 -159 778 -90 1416 -163 1417 -162 2 2 -51 179 -173 576 -71 232 -78 263 -79 340 0 71 4 94 27 142 14 31 44 76 66 100 22 24 679 563 1460 1198 781 635 1417 1158 1413 1161 -3 3 -139 67 -301 143 -162 76 -313 147 -335 158 -101 50 -135 121 -115 244 13 80 46 202 454 1689 30 109 53 201 51 203 -2 2 -338 -67 -747 -153 -987 -208 -931 -198 -994 -185 -62 13 -130 56 -161 103 -14 19 -68 191 -133 416 -60 211 -111 386 -113 388 -2 2 -310 -340 -683 -759 -727 -816 -725 -814 -840 -838 -71 -15 -127 1 -175 49 -73 73 -86 194 -45 422 20 108 381 2033 519 2762 18 97 31 177 29 177 -2 0 -190 -97 -417 -215 -451 -234 -519 -261 -630 -253 -72 6 -126 32 -177 85 -32 32 -397 706 -1038 1911 -24 45 -47 82 -50 82 -3 0 -129 -231 -280 -512z" />
 </g>
 </svg>
 `
        },
        multi: true
    },
];

@NgModule({
    imports: [
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDividerModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatSidenavModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatToolbarModule,
        MatTooltipModule,
    ],
    exports: [
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDividerModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatSidenavModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatToolbarModule,
        MatTooltipModule,
    ],
    providers: [
        { provide: MatIconRegistry, useClass: CustomIconRegistry },
        { provide: MAT_DATE_LOCALE, useValue: 'en-US' },
        svgIconProviders
    ]
})
export class MaterialModule {
    constructor(public matIconRegistry: MatIconRegistry) {
    }

    static forRoot(): ModuleWithProviders<MaterialModule> {
        return {
            ngModule: MaterialModule,
            providers: [MatIconRegistry]
        };
    }
}