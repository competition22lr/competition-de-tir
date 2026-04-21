import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MOCK_SESSIONS } from '../../mocks/mock-sessions';
import { AdminStateService } from '../state/admin-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-session-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './session-select.component.html',
  styleUrls: ['./session-select.component.css']
})
export class SessionSelectComponent implements OnInit, OnDestroy {

  @Output() selected = new EventEmitter<number>();
  @Output() createNew = new EventEmitter<void>();

  sessions: any[] = [];
  filtered: any[] = [];

  search = '';
  showOnlyOpen = true;
  loading = false;

  private sub?: Subscription;
  private competitionId?: number;

  constructor(private adminState: AdminStateService) { }

  ngOnInit() {
    this.sub = this.adminState.stateChanges$.subscribe(state => {
      if (state.competitionId !== this.competitionId) {
        this.competitionId = state.competitionId;
        this.load();
      }
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  load() {
    if (!this.competitionId) {
      this.sessions = [];
      this.filtered = [];
      return;
    }

    this.loading = true;

    setTimeout(() => {
      this.sessions = MOCK_SESSIONS.filter(
        s => s.id_competition === this.competitionId
      );

      this.applyFilters();
      this.loading = false;
    }, 400);
  }

  applyFilters() {
    let result = [...this.sessions];

    if (this.search) {
      const term = this.search.toLowerCase();
      result = result.filter(s =>
        s.annee.toString().includes(term) ||
        s.mois.toString().includes(term)
      );
    }

    if (this.showOnlyOpen) {
      result = result.filter(s => !s.verrouille);
    }

    this.filtered = result;
  }

  select(id: number) {
    this.adminState.setSession(id);
    this.selected.emit(id);
  }

  trackBySession(index: number, item: any) {
    return item.id_session;
  }
}