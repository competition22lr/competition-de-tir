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

  selectedClubId?: number;
  selectedCompetitionId?: number;
  selectedSessionId?: number;
  selectedMembreId?: number;

  // =========================
  // RESET PRO
  // =========================
  private reset(level: 'club' | 'competition' | 'session') {

    if (level === 'club') {
      this.selectedCompetitionId = undefined;
      this.selectedSessionId = undefined;
      this.selectedMembreId = undefined;
    }

    if (level === 'competition') {
      this.selectedSessionId = undefined;
      this.selectedMembreId = undefined;
    }

    if (level === 'session') {
      this.selectedMembreId = undefined;
    }
  }

  // =========================
  // CLUB
  // =========================
  onClubSelected(id: number) {
    this.selectedClubId = id;
    this.reset('club');
    this.section = 'competition';
  }

  onClubCreated(id: number) {
    this.selectedClubId = id;
    this.reset('club');
    this.section = 'competition';
  }

  goToClub() {
    this.section = 'club-select';
    this.selectedClubId = undefined;
    this.reset('club');
  }

  // =========================
  // COMPETITION
  // =========================
  onCompetitionSelected(id: number) {
    this.selectedCompetitionId = id;
    this.reset('competition');
    this.section = 'session';
  }

  onCompetitionCreated(id: number) {
    this.selectedCompetitionId = id;
    this.reset('competition');
    this.section = 'session';
  }

  goToCompetition() {
    if (!this.selectedClubId) return;
    this.section = 'competition';
  }

  // =========================
  // SESSION
  // =========================
  onSessionSelected(id: number) {
    this.selectedSessionId = id;
    this.reset('session');
    this.section = 'tireur'; // 🔥 IMPORTANT
  }

  onSessionCreated(id: number) {
    this.selectedSessionId = id;
    this.reset('session');
    this.section = 'tireur';
  }

  goToSession() {
    if (!this.selectedCompetitionId) return;
    this.section = 'session';
  }

  // =========================
  // TIREUR
  // =========================
  onMembreSelected(id: number) {
    this.selectedMembreId = id;
  }

  goToTireur() {
    if (!this.selectedSessionId) return;
    this.section = 'tireur';
  }

  // =========================
  // RESULTAT
  // =========================
  onResultatSaved(id: number) {
    // optionnel: toast / refresh
  }

  goToResultat() {
    if (!this.selectedMembreId) return;
    this.section = 'resultat';
  }

  // =========================
  // STEP DISABLED
  // =========================
  isStepDisabled(step: Section): boolean {

    if (step === 'competition') return !this.selectedClubId;
    if (step === 'session') return !this.selectedCompetitionId;
    if (step === 'tireur') return !this.selectedSessionId;
    if (step === 'resultat') return !this.selectedMembreId;

    return false;
  }
}