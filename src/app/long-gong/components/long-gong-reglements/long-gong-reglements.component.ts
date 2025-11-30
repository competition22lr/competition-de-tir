import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LongGongCalibresComponent } from "./sections/long-gong-calibres/long-gong-calibres.component";
import { LongGongDeroulementComponent } from "./sections/long-gong-deroulement/long-gong-deroulement.component";
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LongGongSecuriteComponent } from "./sections/long-gong-securite/long-gong-securite.component";
import { LongGongOrderPassageComponent } from "./sections/long-gong-order-passage/long-gong-order-passage.component";
import { LongGongJeuComponent } from "./sections/long-gong-jeu/long-gong-jeu.component";
import { LongGongPointageComponent } from "./sections/long-gong-pointage/long-gong-pointage.component";
import { LongGongMiseEnPlaceComponent } from "./sections/long-gong-mise-en-place/long-gong-mise-en-place.component";


@Component({
  selector: 'app-long-gong-reglements',
  templateUrl: './long-gong-reglements.component.html',
  styleUrls: ['./long-gong-reglements.component.css'],
  imports: [CommonModule, RouterModule, TranslateModule, LongGongPointageComponent, LongGongCalibresComponent, LongGongDeroulementComponent, LongGongDeroulementComponent, LongGongCalibresComponent, LongGongDeroulementComponent, LongGongSecuriteComponent, LongGongOrderPassageComponent, LongGongJeuComponent, LongGongPointageComponent, LongGongMiseEnPlaceComponent]
})
export class LongGongReglementsComponent {
  constructor(private router: Router, public translate: TranslateService) { }

  goToAnchor(anchor: string) {
    document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' });
  }
}
