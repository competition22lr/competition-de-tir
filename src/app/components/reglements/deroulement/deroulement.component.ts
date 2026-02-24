import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-deroulement',
  imports: [TranslateModule],
  templateUrl: './deroulement.component.html',
  styleUrl: './deroulement.component.css'
})
export class DeroulementComponent {
  constructor(private router: Router, public translate: TranslateService) { }

  goToAnchor(anchor: string) {
    // S'assure que l'utilisateur est bien sur /reglements
    this.router.navigate([], { fragment: anchor }).then(() => {
      const el = document.getElementById(anchor);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}
