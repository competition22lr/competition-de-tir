import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { routes } from './app/app.routes';
import { provideTranslate } from './app/translate.providers';

bootstrapApplication(AppComponent, {
  providers: [
    ...provideTranslate(),  // ✅ CORRECT : déstructure les providers
    provideHttpClient(),
    provideRouter(
      routes,
      withEnabledBlockingInitialNavigation()
    )
  ]
}).catch((err) => console.error(err));
