import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClassementComponent } from './classement/classement.component';
import { EquipementComponent } from './equipement/equipement.component';
import { CategoriesComponent } from './categories/categories.component';
import { FeuillePointageComponent } from './feuille-pointage/feuille-pointage.component';

@Component({
  selector: 'app-reglements',
  standalone: true,
  imports: [CommonModule,ClassementComponent,EquipementComponent,CategoriesComponent,FeuillePointageComponent],
  templateUrl: './reglements.component.html',
  styleUrls: ['./reglements.component.css']
})
export class ReglementsComponent {

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
