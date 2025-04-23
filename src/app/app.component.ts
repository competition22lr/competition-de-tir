import { Component, ViewEncapsulation } from '@angular/core';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { HeaderComponent } from "./components/header/header.component"; // adapte le chemin selon ton projet

import { RouterModule } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { FooterComponent } from "./components/footer/footer.component";


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,  // <- Désactive l'encapsulation CSS
  imports: [HeaderComponent, SideNavComponent, RouterModule, FooterComponent]
})
export class AppComponent {
  showClassement = true;

  constructor(private router: Router) {
    // ecoute les changements de route
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showClassement = !event.url.includes('/reglements');
    });
  }
}
