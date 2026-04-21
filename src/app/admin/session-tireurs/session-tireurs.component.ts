import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MembreSelectComponent } from '../membre-select/membre-select.component';
import { ResultatsTableComponent } from '../resultats-table/resultats-table.component';
import { StatMeilleurScoreComponent } from '../stat-meilleur-score/stat-meilleur-score.component';
import { StatMoyenneComponent } from '../stat-moyenne/stat-moyenne.component';
import { StatPerfectRateComponent } from '../stat-perfect-rate/stat-perfect-rate.component';
import { MOCK_RESULTATS } from '../../mocks/mock-resultat';
import { MOCK_RESULTAT_CIBLES } from '../../mocks/mock-resultat-cible';


@Component({
  selector: 'app-session-tireurs',
  standalone: true,
  imports: [
    CommonModule,
    MembreSelectComponent,
    ResultatsTableComponent,
    StatMoyenneComponent,
    StatMeilleurScoreComponent,
    StatPerfectRateComponent
  ],
  templateUrl: './session-tireurs.component.html',
  styleUrls: ['./session-tireurs.component.css']
})
export class SessionTireursComponent {

  @Input() idSession?: number;
  @Input() idCompetition?: number;
  @Input() idClub?: number;

  @Output() selectedMembre = new EventEmitter<number>();
  @Output() createFeuille = new EventEmitter<void>();

  selectedMembreId: number | null = null;

  // mock temporaire (sera remplacé API)
  resultats: any[] = [];

  onMembreSelected(id: number) {
    this.selectedMembreId = id;
    this.selectedMembre.emit(id);
    // 🔥 charger résultats session + membre
    this.loadResultats();
  }

  loadResultats() {

    if (!this.selectedMembreId || !this.idSession) {
      this.resultats = [];
      return;
    }

    // 🔥 filtre resultats
    const resultats = MOCK_RESULTATS.filter(r =>
      r.id_membre === this.selectedMembreId &&
      r.id_session === this.idSession
    );

    // 🔥 enrichir avec total cibles (optionnel mais PRO)
    this.resultats = resultats.map(r => {

      const cibles = MOCK_RESULTAT_CIBLES.filter(c => c.id_resultat === r.id_resultat);

      const total = cibles.reduce((sum, c) => sum + c.score + (c.bonus || 0), 0);

      return {
        ...r,
        total_calcule: total,
        nb_cibles: cibles.length
      };
    });
  }

  addMembre() {
    console.log('Créer membre');
  }

  addFeuille() {
    this.createFeuille.emit(); // 🔥 CRUCIAL

    console.log('Créer feuille');
  }
}