import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Participant } from '../../models/participant.model';
import { Competition } from '../../models/competition.model';
import { MoisResultats } from '../../models/mois-resultats.model';
import { ResultatsService } from '../../services/resultats.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Utilistaire } from '../../services/utilitaire';

@Component({
  selector: 'app-impression-classement',
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './impression-classement.component.html',
  styleUrl: './impression-classement.component.css'
})
export class ImpressionClassementComponent implements OnInit {
  participants: Participant[] = [];
  competitionSelectionnee!: Competition;
  moisSelectionne!: MoisResultats;
  indexCompetitionSelectionne!: number;
  private _moisSelectionne!: string;

  constructor(public resultatsService: ResultatsService, private route: ActivatedRoute, private router: Router,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const paramCompetition = params.get('competition');
      const paramMois = params.get('mois');
      const paramLangue = params.get('langue');

      this.translate.use(paramLangue ==null ? "fr" :paramLangue);

      this.indexCompetitionSelectionne = paramCompetition !== null ? Number(paramCompetition) ? Number(paramCompetition) : 0 : 0;
      // ✅ Décodage des underscores → points
      this._moisSelectionne = paramMois !== null ? paramMois.replace(/_/g, '.') : '';


      Utilistaire.Log("params.get('competition') =>", paramCompetition);
      Utilistaire.Log("params.get('mois') =>", paramMois);
      Utilistaire.Log("params.get('langue') =>", paramLangue);

      Utilistaire.Log("this.indexCompetitionSelectionne =>", this.indexCompetitionSelectionne);
      Utilistaire.Log("this._moisSelectionne =>", this._moisSelectionne);

      // Charge la compétition
      this.resultatsService.getCompetition(this.indexCompetitionSelectionne).subscribe(competition => {
        this.competitionSelectionnee = competition;

        Utilistaire.Log("this.competitionSelectionnee =>", this.competitionSelectionnee);

        // Fallback : si aucun mois dans l'URL ou s'il n'est pas trouvé, on prend le premier
        this.moisSelectionne =
          this.competitionSelectionnee.mois.find(m => m.name.toLowerCase() === this._moisSelectionne.toLowerCase()) ||
          this.competitionSelectionnee.mois[0];

        this._moisSelectionne = this.moisSelectionne.name;

        Utilistaire.Log("mois sélectionné :", this.moisSelectionne);

        // Ensuite on récupère les participants
        this.resultatsService
          .getParticipantsPourMois(this.indexCompetitionSelectionne, this._moisSelectionne)
          .subscribe((_Participant: Participant[]) => {
            this.participants = _Participant;
            Utilistaire.Log("participants =>", this.participants);
          });
      });
    });
  }

  imprimer(): void {
    window.print();
  }


  get topParticipants() {
    let top5: Participant[] = this.participants.filter(p => p.aClassement());
    return top5;
  }

  getTrophyImage(classement: string): string {
    let imgPrefix = "logoCompetition";
    let imgSufix = ".png";
    return this.resultatsService.imageLocationUrl + imgPrefix + classement + imgSufix;
  }

  getMoisAfficahge(mois: MoisResultats): string {
   return this.translate.instant(mois.getMoisCleText()) + " " + mois.getAnnee();
  }
}