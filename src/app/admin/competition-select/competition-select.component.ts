import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MOCK_COMPETITIONS } from '../../mocks/mock-competitions';

@Component({
  selector: 'app-competition-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './competition-select.component.html',
  styleUrls: ['./competition-select.component.css']
})
export class CompetitionSelectComponent implements OnChanges {

  @Input() clubId?: number;

  @Output() selected = new EventEmitter<number>();
  @Output() createNew = new EventEmitter<void>();

  competitions: any[] = [];
  filtered: any[] = [];

  search = '';
  showOnlyActive = true;
  loading = false;

  ngOnChanges() {
    this.load();
  }

  load() {
    this.loading = true;

    // 🔥 MOCK API FILTER BY CLUB
    setTimeout(() => {
      this.competitions = MOCK_COMPETITIONS.filter(
        c => c.id_club === this.clubId
      );

      this.applyFilters();
      this.loading = false;
    }, 400);
  }

  applyFilters() {
    let result = [...this.competitions];

    if (this.search) {
      const term = this.search.toLowerCase();
      result = result.filter(c =>
        c.nom.toLowerCase().includes(term)
      );
    }

    if (this.showOnlyActive) {
      result = result.filter(c => c.actif);
    }

    this.filtered = result;
  }

  select(id: number) {
    this.selected.emit(id);
  }

  trackByComp(index: number, item: any) {
    return item.id_competition;
  }
}