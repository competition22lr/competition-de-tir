import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-carabines-autorisees',
  imports: [TranslateModule],
  templateUrl: './carabines-autorisees.component.html',
  styleUrls: ['./carabines-autorisees.component.css', './../../reglements.component.css']
})
export class CarabinesAutoriseesComponent {

  constructor(private router: Router, private translate: TranslateService) { }

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
