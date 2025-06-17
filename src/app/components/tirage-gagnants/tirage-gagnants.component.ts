import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ResultatsService } from '../../services/resultats.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Utilistaire } from '../../services/utilitaire';
import { RoueFortuneComponent } from "../roue-fortune/roue-fortune.component";
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GagnanTirage } from '../../models/gagnan-tirage.model';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-tirage-gagnants',
  imports: [CommonModule, RouterModule, TranslateModule, MatDialogModule],
  templateUrl: './tirage-gagnants.component.html',
  styleUrls: ['./tirage-gagnants.component.css']
})
export class TirageGagnantsComponent implements OnInit {
  indexCompetitionSelectionne!: number;
  gagnantsParMois: GagnanTirage[] = [];
  paramSpin: boolean = false;

  constructor(public resultatsService: ResultatsService, private route: ActivatedRoute,
    private translate: TranslateService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const paramCompetition = params.get('competition');

      this.paramSpin = params.get('spin') === 'spin' ? true : false;

      this.indexCompetitionSelectionne = paramCompetition !== null ? Number(paramCompetition) ? Number(paramCompetition) : 0 : 0;
      Utilistaire.Log("params.get('competition') =>", paramCompetition);

    })

    this.chargerGagnants();
  }

  chargerGagnants() {
    this.resultatsService.getCompetition(this.indexCompetitionSelectionne).subscribe(competition => {
      this.gagnantsParMois = competition.getGagnanTirage();
    });
  }

  getTrophyImage(classement: string): string {
    let imgPrefix = "logoCompetition";
    let imgSufix = ".png";
    return this.resultatsService.imageLocationUrl + imgPrefix + classement + imgSufix;
  }

  getGagnantAffichage(unGagnant: { moisCle: string, annee: string, gagnant: string }): string {
    let txtAffiche = unGagnant.gagnant;
    if (txtAffiche.toLowerCase() == "participation") { txtAffiche = ""; }
    return txtAffiche;
  }

  getMoisAfficahge(unGagnant: { moisCle: string, annee: string, gagnant: string }): string {
    return this.translate.instant(unGagnant.moisCle) + " " + unGagnant.annee;
  }

  ouvrirPopupTirage(unGagnant: GagnanTirage) {
    this.dialog.open(RoueFortuneComponent, {
      width: '400px',
      height: '650px',
      disableClose: false,
      panelClass: 'popup-dialog-style',
      data: {
        mois: unGagnant.nomXML,
        competition: this.indexCompetitionSelectionne
      }
    });
  }

  showSpin(unGagnant: GagnanTirage): boolean {
    let _showSpin = false;

    if (unGagnant.gagnant.toLowerCase() == "participation") {
      const moisTirage: Date = new Date(Number(unGagnant.annee), Number(unGagnant.moisCle.split('.')[1]), 0); // dernier jour du mois donné 
      
      const currentDate = new Date();

      if (moisTirage < currentDate || !environment.production) {
        _showSpin = this.paramSpin;
      }
    }

    return _showSpin
  }
}