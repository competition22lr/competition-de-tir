import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClubSelectComponent } from '../club-select/club-select.component';
import { ClubFormComponent } from '../club-form/club-form.component';
import { CompetitionSelectComponent } from '../competition-select/competition-select.component';
import { CompetitionFormComponent } from '../competition-form/competition-form.component';
import { SessionSelectComponent } from '../session-select/session-select.component';
import { SessionFormComponent } from '../session-form/session-form.component';
import { ResultatFeuilleCibleComponent } from '../resultat-feuille-cible/resultat-feuille-cible.component';
import { SessionTireursComponent } from '../session-tireurs/session-tireurs.component';

import { AdminStateService } from '../state/admin-state.service';

type Section =
  | 'club-select'
  | 'club-create'
  | 'competition'
  | 'competition-create'
  | 'session'
  | 'session-create'
  | 'tireur'
  | 'resultat';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ClubSelectComponent,
    ClubFormComponent,
    CompetitionSelectComponent,
    CompetitionFormComponent,
    SessionSelectComponent,
    SessionFormComponent,
    ResultatFeuilleCibleComponent,
    SessionTireursComponent
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

  section: Section = 'club-select';

  constructor(public state: AdminStateService) { }

  // =========================
  // CLUB
  // =========================
  onClubSelected(id: number) {
    console.log('selected club', id);
    this.state.setClub(id);
    this.section = 'competition';
  }

  onClubCreated(id: number) {
    this.state.setClub(id);
    this.section = 'competition';
  }

  goToClub() {
    this.section = 'club-select';
  }

  // =========================
  // COMPETITION
  // =========================
  onCompetitionSelected(id: number) {
    this.state.setCompetition(id);
    this.section = 'session';
  }

  onCompetitionCreated(id: number) {
    this.state.setCompetition(id);
    this.section = 'session';
  }

  goToCompetition() {
    if (!this.state.snapshot.clubId) return;
    this.section = 'competition';
  }

  // =========================
  // SESSION
  // =========================
  onSessionSelected(id: number) {
    this.state.setSession(id);
    this.section = 'tireur';
  }

  onSessionCreated(id: number) {
    this.state.setSession(id);
    this.section = 'tireur';
  }

  goToSession() {
    if (!this.state.snapshot.competitionId) return;
    this.section = 'session';
  }

  // =========================
  // TIREUR
  // =========================
  onMembreSelected(id: number) {
    this.state.setMembre(id);
  }

  goToTireur() {
    if (!this.state.snapshot.sessionId) return;
    this.section = 'tireur';
  }

  // =========================
  // RESULTAT
  // =========================
  goToResultat() {
    if (!this.state.snapshot.membreId) return;
    this.section = 'resultat';
  }

  onResultatSaved(id: number) {
    // hook futur
  }

  // =========================
  // STEP DISABLED
  // =========================
  isStepDisabled(step: Section): boolean {

    const s = this.state.snapshot;

    switch (step) {
      case 'competition': return !s.clubId;
      case 'session': return !s.competitionId;
      case 'tireur': return !s.sessionId;
      case 'resultat': return !s.membreId;
      default: return false;
    }
  }
}