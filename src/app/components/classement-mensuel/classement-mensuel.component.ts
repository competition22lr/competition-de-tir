import { Component, OnInit } from '@angular/core';
import { Participant } from '../../models/participant.model';
import { CommonModule } from '@angular/common';
import { ResultatsService } from '../../services/resultats.service';
import { MoisResultats } from '../../models/mois-resultats.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Competition } from '../../models/competition.model';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ParticipantDialogComponent } from '../participant-dialog/participant-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Utilistaire } from '../../services/utilitaire';

@Component({
  selector: 'app-classement-mensuel',
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './classement-mensuel.component.html',
  styleUrls: ['./classement-mensuel.component.css']
})
export class ClassementMensuelComponent implements OnInit {
  participants: Participant[] = [];
  competitionSelectionnee!: Competition;
  moisSelectionne!: MoisResultats;
  indexCompetitionSelectionne!: number;
  private _moisSelectionne!: string;

  constructor(public resultatsService: ResultatsService, private route: ActivatedRoute, private router: Router,
    public translate: TranslateService, private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const paramCompetition = params.get('competition');
      const paramMois = params.get('mois');

      this.indexCompetitionSelectionne = paramCompetition !== null ? Number(paramCompetition) ? Number(paramCompetition) : 0 : 0;
      // ✅ Décodage des underscores → points
      this._moisSelectionne = paramMois !== null ? paramMois.replace(/_/g, '.') : '';


      Utilistaire.Log("params.get('competition') =>", paramCompetition);
      Utilistaire.Log("params.get('mois') =>", paramMois);

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

 getMoisAfficahge(mois: MoisResultats): string {
   return this.translate.instant(mois.getMoisCleText()) + " " + mois.getAnnee();
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

  ouvrirPopup(participant: Participant) {
      const nombreDeParticipations =  this.getNombreDeParticipation(participant.numero)
  
      this.dialog.open(ParticipantDialogComponent, {
        data: {
          nom: participant.nom,
          participations: nombreDeParticipations,
          mois: null
        }
      });
    }
  
    getNombreDeParticipation(numeroParticipant: string): number {
      Utilistaire.Log("numeroParticipant => ",numeroParticipant);
      let nombreParticipations: number = this.moisSelectionne.participants.filter(p => p.numero === numeroParticipant).length;

      return nombreParticipations;
    }
}