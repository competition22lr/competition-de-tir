import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ResultatsService } from '../../services/resultats.service';
import { Competition } from '../../models/competition.model';

@Component({
  selector: 'app-tirage-gagnants',
  imports: [CommonModule, RouterModule],
  templateUrl: './tirage-gagnants.component.html',
  styleUrls: ['./tirage-gagnants.component.css']
})
export class TirageGagnantsComponent implements OnInit {

  indexCompetitionSelectionne!: number;
  gagnantsParMois: { mois: string, gagnant: string }[] = [];


  constructor(public resultatsService: ResultatsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const paramCompetition = params.get('competition');
      const paramMois = params.get('mois');

      this.indexCompetitionSelectionne = paramCompetition !== null ? Number(paramCompetition) ? Number(paramCompetition) : 0 : 0;
      console.log("params.get('competition') =>", paramCompetition);

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

  getGagnantAffichage(unGagnant: { mois: string, gagnant: string }): string {
    let txtAffiche = unGagnant.gagnant;
    if (txtAffiche.toLowerCase() == "participation") { txtAffiche = ""; }
    return txtAffiche;
  }
}