import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarabinesAutoriseesComponent } from "./carabines-autorisees/carabines-autorisees.component";
import { AccessoiresAutorisesComponent } from "./accessoires-autorises/accessoires-autorises.component";
import { MaterielSecuriteObligatoireComponent } from "./materiel-securite-obligatoire/materiel-securite-obligatoire.component";
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-regelement-equipement',
  imports: [CarabinesAutoriseesComponent, AccessoiresAutorisesComponent, MaterielSecuriteObligatoireComponent, CommonModule, TranslateModule],
  templateUrl: './equipement.component.html',
  styleUrls: ['./equipement.component.css', './../reglements.component.css']
})
export class EquipementComponent {
  constructor(private router: Router) { }

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
