import { Component, EventEmitter, Input, Output, OnInit, SimpleChanges, OnChanges, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MOCK_MEMBRES } from '../../mocks/mock-membres';
import { Membre } from '../../models/membre.model';

@Component({
  selector: 'app-membre-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './membre-select.component.html',
  styleUrls: ['./membre-select.component.css']
})
export class MembreSelectComponent implements OnInit, OnChanges {

  @Input() idClub?: number;
  @Input() idCompetition?: number;
  @Input() idSession?: number;
  @Output() selected = new EventEmitter<number>();

  membres: Membre[] = [];
  filtered: Membre[] = [];

  search = '';
  showActiveOnly = true;
  selectedId: number | null = null;

  ngOnInit(): void {
    this.load();
  }

  // 🔥 IMPORTANT: reload si club change
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['idClub']) {
      this.load();
    }
  }

  // 🔥 LOAD + FILTER CLUB
  load(): void {

    console.log('🔥 idClub reçu:', this.idClub, typeof this.idClub);

    let list = [...MOCK_MEMBRES];

    // 🔥 FIX HARD: cast en number
    if (this.idClub !== undefined && this.idClub !== null) {

      const clubId = Number(this.idClub);

      list = list.filter(m => m.id_club === clubId);
    }

    console.log('🔥 membres filtrés:', list);

    this.membres = list;
    this.applyFilters();
  }

  // 🔍 FILTER + SEARCH
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

  // 🎯 SELECT
  select(m: any): void {
    this.selectedId = m.id_membre;
    this.selected.emit(m.id_membre);

  }

  trackById(index: number, item: any): number {
    return item.id_membre;
  }
}