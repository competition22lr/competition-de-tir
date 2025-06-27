import { Component, OnInit } from '@angular/core';
import { CategoriesComponent } from "../reglements/categories/categories.component";
import { FeuillePointageComponent } from "../reglements/feuille-pointage/feuille-pointage.component";
import { CalculPointsComponent } from "../reglements/calcul-points/calcul-points.component";
import { ClassementComponent } from "../reglements/classement/classement.component";
import { EquipementComponent } from "../reglements/equipement/equipement.component";
import { CalibresAutorisesComponent } from "../reglements/equipement/calibres-autorises/calibres-autorises.component";
import { DeroulementComponent } from "../reglements/deroulement/deroulement.component";
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { ResultatsService } from '../../services/resultats.service';

@Component({
  selector: 'app-impression-reglements',
  imports: [CategoriesComponent, FeuillePointageComponent, CalculPointsComponent, ClassementComponent, EquipementComponent, CalibresAutorisesComponent, DeroulementComponent, TranslateModule],
  templateUrl: './impression-reglements.component.html',
  styleUrls: ['./impression-reglements.component.css']
})
export class ImpressionReglementsComponent implements OnInit {

  constructor(public resultatsService: ResultatsService, private route: ActivatedRoute,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const paramLangue = params.get('langue');

      this.translate.use(paramLangue == null ? "fr" : paramLangue);
    });
  }

  imprimer(): void {
    window.print();
  }
}
