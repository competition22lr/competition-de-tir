import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LongGongCategoriesComponent } from "./sections/long-gong-categories/long-gong-categories.component";
import { LongGongFeuillePointsComponent } from "./sections/long-gong-feuille-points/long-gong-feuille-points.component";
import { LongGongCalculPointsComponent } from "./sections/long-gong-calcul-points/long-gong-calcul-points.component";
import { LongGongClassementComponent } from "./sections/long-gong-classement/long-gong-classement.component";
import { LongGongEquipementComponent } from "./sections/long-gong-equipement/long-gong-equipement.component";
import { LongGongCalibresComponent } from "./sections/long-gong-calibres/long-gong-calibres.component";
import { LongGongDeroulementComponent } from "./sections/long-gong-deroulement/long-gong-deroulement.component";
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LongGongSecuriteComponent } from "./sections/long-gong-securite/long-gong-securite.component";


@Component({
  selector: 'app-long-gong-reglements',
  templateUrl: './long-gong-reglements.component.html',
  styleUrls: ['./long-gong-reglements.component.css'],
  imports: [CommonModule, RouterModule, TranslateModule, LongGongCategoriesComponent, LongGongFeuillePointsComponent, LongGongCalculPointsComponent, LongGongClassementComponent, LongGongEquipementComponent, LongGongCalibresComponent, LongGongDeroulementComponent, LongGongSecuriteComponent]
})
export class LongGongReglementsComponent {
  constructor(private router: Router, public translate: TranslateService) { }

  goToAnchor(anchor: string) {
    document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' });
  }
}
