import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MOCK_SESSIONS } from '../../mocks/mock-sessions';
@Component({
  selector: 'app-session-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './session-select.component.html',
  styleUrls: ['./session-select.component.css']
})
export class SessionSelectComponent implements OnChanges {

  @Input() competitionId?: number;

  @Output() selected = new EventEmitter<number>();
  @Output() createNew = new EventEmitter<void>();

  sessions: any[] = [];
  filtered: any[] = [];

  search = '';
  showOnlyOpen = true;
  loading = false;

  ngOnChanges() {
    this.load();
  }

  load() {
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
    this.selected.emit(id);
  }

  trackBySession(index: number, item: any) {
    return item.id_session;
  }
}