import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClassementComponent } from './classement/classement.component';
import { EquipementComponent } from './equipement/equipement.component';
import { CategoriesComponent } from './categories/categories.component';
import { FeuillePointageComponent } from './feuille-pointage/feuille-pointage.component';
import { CalculPointsComponent } from "./calcul-points/calcul-points.component";
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-reglements',
  standalone: true,
  imports: [CommonModule, ClassementComponent, EquipementComponent, CategoriesComponent,
    FeuillePointageComponent, CalculPointsComponent, RouterModule, TranslateModule, MatIconModule],
  templateUrl: './reglements.component.html',
  styleUrls: ['./reglements.component.css']
})
export class ReglementsComponent {

  constructor(private router: Router, private translate: TranslateService) { }

  sectionStates: { [key: string]: boolean } = {
    deroulement: false,
    categories: false,
    feuillePoints: false,
    calculPoints: false,
    classement: false,
    equipement: false
  };

  goToAnchor(anchor: string) {
    // S'assure que l'utilisateur est bien sur /reglements
    this.router.navigate([], { fragment: anchor }).then(() => {
      const el = document.getElementById(anchor);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        this.collapsAll();
        this.toggleSection(anchor);
      }
    });
  }

  collapsAll() {
    for (let key in this.sectionStates) {
      this.sectionStates[key] = false;
    }
  }

  toggleSection(section: string): void {
    this.sectionStates[section] = !this.sectionStates[section];
  }

}
