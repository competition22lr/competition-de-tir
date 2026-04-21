import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MOCK_COMPETITIONS } from '../../mocks/mock-competitions';
import { AdminStateService } from '../state/admin-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-competition-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './competition-select.component.html',
  styleUrls: ['./competition-select.component.css']
})
export class CompetitionSelectComponent implements OnInit, OnDestroy {

  @Output() selected = new EventEmitter<number>();
  @Output() createNew = new EventEmitter<void>();

  competitions: any[] = [];
  filtered: any[] = [];

  search = '';
  showOnlyActive = true;
  loading = false;

  private sub?: Subscription;
  private clubId?: number;

  constructor(private adminState: AdminStateService) { }

  ngOnInit() {
    this.adminState.stateChanges$.subscribe(state => {

      if (!state.clubId) {
        this.competitions = [];
        this.filtered = [];
        return;
      }

      if (state.clubId !== this.clubId) {
        this.clubId = state.clubId;
        this.load();
      }
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  load() {
    if (!this.clubId) {
      this.competitions = [];
      this.filtered = [];
      return;
    }

    this.loading = true;

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
    this.adminState.setCompetition(id);
    this.selected.emit(id);
  }

  create() {
    this.createNew.emit();
  }

  trackByComp(index: number, item: any) {
    return item.id_competition;
  }
}