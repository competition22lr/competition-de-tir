import { Component, Input, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MoisResultats } from '../../models/mois-resultats.model';
import { CommonModule } from '@angular/common';
import { MeilleurScore } from '../../models/MeilleurScore';
import { ActivatedRoute, Router } from '@angular/router';
import { ResultatsService } from '../../services/resultats.service';
import { Competition } from '../../models/competition.model';
import { ParticipantDialogComponent } from '../participant-dialog/participant-dialog.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-classement-annuel',
  imports: [CommonModule, MatDialogModule, MatButtonModule, TranslateModule],
  templateUrl: './classement-annuel.component.html',
  styleUrl: './classement-annuel.component.css'
})
export class ClassementAnnuelComponent implements OnInit {

  top10: MeilleurScore[] = [];
  competitionSelectionnee!: Competition;
  indexCompetitionSelectionne!: number;

  constructor(public resultatsService: ResultatsService, private route: ActivatedRoute, private router: Router,
    public translate: TranslateService, private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const paramCompetition = params.get('competition');

      console.log("params.get('competition') =>", paramCompetition);

      this.indexCompetitionSelectionne = paramCompetition !== null ? Number(paramCompetition) ? Number(paramCompetition) : 0 : 0;

      console.log("this.indexCompetitionSelectionne =>", this.indexCompetitionSelectionne);

      // Charge la compétition
      this.resultatsService.getCompetition(this.indexCompetitionSelectionne).subscribe(competition => {
        this.competitionSelectionnee = competition;

        console.log("this.competitionSelectionnee =>", this.competitionSelectionnee);

        this.getMeilleurScore();
      });
    });
  }

  getMeilleurScore() {
    const map = new Map<string, MeilleurScore>();

    for (const mois of this.competitionSelectionnee.mois) {
      for (const p of mois.participants) {
        const existing = map.get(p.numero);
        if (!existing || p.total > existing.total) {
          map.set(p.numero, {
            numero: p.numero,
            nom: p.nom,
            pointBoni: p.pointBoni,
            pointage: p.pointage,
            total: p.total,
            mois: mois.displayName(this.translate)
          });
        }
      }
    }

    this.top10 = Array.from(map.values())
      .sort((a, b) => b.total - a.total)
      .slice(0, 10);
  }

  ouvrirPopup(participant: MeilleurScore) {
    const moisParticipation = this.getMoisDeParticipation(participant.numero);
    const nombreDeParticipations = this.getNombreDeParticipation(participant.numero)

    this.dialog.open(ParticipantDialogComponent, {
      data: {
        nom: participant.nom,
        participations: nombreDeParticipations,
        mois: moisParticipation
      }
    });
  }

  getMoisDeParticipation(numeroParticipant: string): string[] {
    const moisList: string[] = [];

    for (const mois of this.competitionSelectionnee.mois) {
      const aParticipe = mois.participants.some(p => p.numero === numeroParticipant);
      if (aParticipe) {
        moisList.push(mois.displayName(this.translate)); // Ex: "Janvier 2024"
      }
    }

    return moisList;
  }

  getNombreDeParticipation(numeroParticipant: string): number {
    console.log("numeroParticipant => ", numeroParticipant);
    let nombreParticipations: number = 0;

    for (const mois of this.competitionSelectionnee.mois) {
      nombreParticipations += mois.participants.filter(p => p.numero === numeroParticipant).length;
    }
    return nombreParticipations;
  }
}