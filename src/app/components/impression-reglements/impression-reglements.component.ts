import { Component } from '@angular/core';
import { CategoriesComponent } from "../reglements/categories/categories.component";
import { FeuillePointageComponent } from "../reglements/feuille-pointage/feuille-pointage.component";
import { CalculPointsComponent } from "../reglements/calcul-points/calcul-points.component";
import { ClassementComponent } from "../reglements/classement/classement.component";
import { EquipementComponent } from "../reglements/equipement/equipement.component";

@Component({
  selector: 'app-impression-reglements',
  imports: [CategoriesComponent, FeuillePointageComponent, CalculPointsComponent, ClassementComponent, EquipementComponent],
  templateUrl: './impression-reglements.component.html',
  styleUrls: ['./impression-reglements.component.css', './../../../styles-print.css']
})
export class ImpressionReglementsComponent {

  imprimer(): void {
    window.print();
  }
}
