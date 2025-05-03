import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CalibresAutorisesComponent } from "./calibres-autorises/calibres-autorises.component";

@Component({
  selector: 'app-regelement-equipement',
  imports: [CalibresAutorisesComponent],
  templateUrl: './equipement.component.html',
  styleUrls: ['./equipement.component.css', './../reglements.component.css']
})
export class EquipementComponent {
  constructor(private router: Router) {}

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
