// src/app/multi-translate-loader.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { forkJoin, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MultiTranslateLoader implements TranslateLoader {
    constructor(private http: HttpClient) { }

    getTranslation(lang: string) {
        const paths = [
            `assets/i18n/${lang}.json`,
            `assets/i18n/politique-confidentialite/${lang}.json`,
            `assets/i18n/reglements/${lang}.json`,
            `assets/i18n/long-gong/${lang}.json`,
            `assets/i18n/long-gong/securite/${lang}.json`,
            `assets/i18n/long-gong/ordre_passage/${lang}.json`,
            `assets/i18n/long-gong/jeu/${lang}.json`,
            `assets/i18n/long-gong/pointage/${lang}.json`,
            `assets/i18n/long-gong/deroulement/${lang}.json`,
            `assets/i18n/long-gong/mise_en_place/${lang}.json`,
            `assets/i18n/long-gong/calibres/${lang}.json`,
            `assets/i18n/long-gong/feuille_cible/${lang}.json`
        ];
        return forkJoin(paths.map(path => this.http.get(path))).pipe(
            map(responses => Object.assign({}, ...responses))
        );
    }
}

export function multiTranslateLoaderFactory(http: HttpClient) {
    return new MultiTranslateLoader(http);
}
