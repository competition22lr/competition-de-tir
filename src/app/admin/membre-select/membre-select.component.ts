import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MOCK_MEMBRES } from '../../mocks/mock-membres';
import { Membre } from '../../models/membre.model';
import { AdminStateService } from '../state/admin-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-membre-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './membre-select.component.html',
  styleUrls: ['./membre-select.component.css']
})
export class MembreSelectComponent implements OnInit, OnDestroy {

  @Output() selected = new EventEmitter<number>();

  membres: Membre[] = [];
  filtered: Membre[] = [];

  search = '';
  showActiveOnly = true;
  selectedId: number | null = null;

  private sub?: Subscription;

  private clubId?: number;

  constructor(private adminState: AdminStateService) { }

  ngOnInit(): void {
    this.sub = this.adminState.stateChanges$.subscribe(state => {
      if (state.clubId !== this.clubId) {
        this.clubId = state.clubId;
        this.load();
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  // =========================
  // LOAD
  // =========================
  load(): void {

    let list = [...MOCK_MEMBRES];

    if (this.clubId !== undefined && this.clubId !== null) {
      const id = Number(this.clubId);
      list = list.filter(m => m.id_club === id);
    }

    this.membres = list;
    this.applyFilters();
  }

  // =========================
  // FILTER
  // =========================
  applyFilters(): void {

    let list = this.membres;

    if (this.showActiveOnly) {
      list = list.filter(m => m.actif);
    }

    if (this.search) {
      const s = this.search.toLowerCase();

      list = list.filter(m =>
        m.nom.toLowerCase().includes(s) ||
        m.prenom.toLowerCase().includes(s) ||
        m.num_membre.toLowerCase().includes(s)
      );
    }

    this.filtered = list.sort((a, b) =>
      a.nom.localeCompare(b.nom)
    );
  }

  // =========================
  // SELECT
  // =========================
  select(m: Membre): void {
    this.selectedId = m.id_membre;

    this.adminState.setMembre(m.id_membre); // 🔥 STATE CENTRAL

    this.selected.emit(m.id_membre); // optionnel compat
  }

  trackById(index: number, item: Membre): number {
    return item.id_membre;
  }
}