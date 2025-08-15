import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { routes } from './app/app.routes';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { importProvidersFrom, Injectable } from '@angular/core';
import { forkJoin, map } from 'rxjs';
import { multiTranslateLoaderFactory } from './app/multi-translate-loader';



bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes, withEnabledBlockingInitialNavigation()),
    {
      provide: TranslateLoader,
      useFactory: multiTranslateLoaderFactory,
      deps: [HttpClient]
    },
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: multiTranslateLoaderFactory,
          deps: [HttpClient]
        }
      })
    )
  ]
})
  .then(appRef => {
    const translate = appRef.injector.get(TranslateService);
    translate.setDefaultLang('fr');
    translate.use('fr');
  })
  .catch(err => console.error(err));
