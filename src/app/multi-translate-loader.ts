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
            `assets/i18n/long-gong/${lang}.json`
        ];
        return forkJoin(paths.map(path => this.http.get(path))).pipe(
            map(responses => Object.assign({}, ...responses))
        );
    }
}

export function multiTranslateLoaderFactory(http: HttpClient) {
    return new MultiTranslateLoader(http);
}
