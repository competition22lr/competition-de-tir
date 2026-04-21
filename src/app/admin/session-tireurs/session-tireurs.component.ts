import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { MembreSelectComponent } from '../membre-select/membre-select.component';
import { ResultatsTableComponent } from '../resultats-table/resultats-table.component';
import { StatMeilleurScoreComponent } from '../stat-meilleur-score/stat-meilleur-score.component';
import { StatMoyenneComponent } from '../stat-moyenne/stat-moyenne.component';
import { StatPerfectRateComponent } from '../stat-perfect-rate/stat-perfect-rate.component';
import { MOCK_RESULTATS } from '../../mocks/mock-resultat';
import { MOCK_RESULTAT_CIBLES } from '../../mocks/mock-resultat-cible';
import { MembreFormComponent } from "../membre-form/membre-form.component";
import { AdminStateService } from '../state/admin-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-session-tireurs',
  standalone: true,
  imports: [
    CommonModule,
    MembreSelectComponent,
    ResultatsTableComponent,
    StatMoyenneComponent,
    StatMeilleurScoreComponent,
    StatPerfectRateComponent,
    MembreFormComponent
  ],
  templateUrl: './session-tireurs.component.html',
  styleUrls: ['./session-tireurs.component.css']
})
export class SessionTireursComponent implements OnInit, OnDestroy {

  @Output() selectedMembre = new EventEmitter<number>();
  @Output() createFeuille = new EventEmitter<void>();

  showCreateMembre = false;
  resultats: any[] = [];

  private sub?: Subscription;

  membreId?: number;
  private sessionId?: number;

  constructor(public state: AdminStateService) { }

  ngOnInit() {
    this.sub = this.state.stateChanges$.subscribe(state => {
      const changed =
        state.membreId !== this.membreId ||
        state.sessionId !== this.sessionId;

      if (changed) {
        this.membreId = state.membreId;
        this.sessionId = state.sessionId;

        this.loadResultats();
      }
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  // =========================
  // MEMBRE SELECT
  // =========================
  onMembreSelected(id: number) {
    this.state.setMembre(id);
    this.selectedMembre.emit(id); // optionnel compat
  }

  // =========================
  // CREATE MEMBRE
  // =========================
  addMembre() {
    this.showCreateMembre = true;
  }

  onMembreCreated(id: number) {
    this.showCreateMembre = false;

    this.state.setMembre(id);
  }

  onCancelCreate() {
    this.showCreateMembre = false;
  }

  // =========================
  // LOAD RESULTATS (MOCK)
  // =========================
  loadResultats() {

    if (!this.membreId || !this.sessionId) {
      this.resultats = [];
      return;
    }

    // 🔥 filtre resultats
    const resultats = MOCK_RESULTATS.filter(r =>
      r.id_membre === this.membreId &&
      r.id_session === this.sessionId
    );

    // 🔥 enrichir avec total cibles (optionnel mais PRO)
    this.resultats = resultats.map(r => {

      const cibles = MOCK_RESULTAT_CIBLES.filter(
        c => c.id_resultat === r.id_resultat
      );

      const total = cibles.reduce(
        (sum, c) => sum + c.score + (c.bonus || 0),
        0
      );

      return {
        ...r,
        total_calcule: total,
        nb_cibles: cibles.length
      };
    });
  }

  // =========================
  // NAVIGATION
  // =========================
  addFeuille() {
    console.log('Créer feuille pour membre:', this.membreId);
  }
}