import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs/operators';
import { FooterComponent } from "./components/footer/footer.component";
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { HeaderComponent } from './components/header/header.component';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [HeaderComponent, SideNavComponent, RouterModule, FooterComponent, CommonModule]
})
export class AppComponent {

  currentUrl: string = '';

  constructor(private router: Router, private viewportScroller: ViewportScroller,
      public translate: TranslateService) {
    
    translate.use('fr'); // Force le français au démarrage

     // ecoute les changements de route
     this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(() => {
      const fragment = window.location.hash;
      if (fragment) {
        const id = fragment.substring(1); // enlever le #
        setTimeout(() => {
          this.viewportScroller.scrollToAnchor(id);
        }, 0);
      }
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.urlAfterRedirects;
      }
    });
  }

  isImpressionRoute(): boolean {
    return this.currentUrl.startsWith('/impression');
  }
}
