import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MOCK_CLUBS } from '../../mocks/mock-clubs';

@Component({
  selector: 'app-club-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './club-select.component.html',
  styleUrls: ['./club-select.component.css']
})
export class ClubSelectComponent implements OnInit {

  @Output() selected = new EventEmitter<number>();
  @Output() createNew = new EventEmitter<void>();

  clubs: any[] = [];
  filteredClubs: any[] = [];

  trackByClub(index: number, club: any): number {
    return club.id_club;
  }

  loading = false;
  search = '';
  showOnlyActive = true;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadClubs();
  }

  loadClubs() {
    this.loading = true;

    setTimeout(() => {
      this.clubs = MOCK_CLUBS;
      this.applyFilters();
      this.loading = false;
    }, 800);

    // this.http.get<any[]>('/api/clubs').subscribe({
    //   next: (res) => {
    //     this.clubs = res;
    //     this.applyFilters();
    //     this.loading = false;
    //   },
    //   error: () => {
    //     this.loading = false;
    //   }
    // });
  }

  applyFilters() {
    let result = [...this.clubs];

    // 🔍 recherche texte
    if (this.search) {
      const term = this.search.toLowerCase();
      result = result.filter(c =>
        c.nom_club?.toLowerCase().includes(term) ||
        c.ville?.toLowerCase().includes(term)
      );
    }

    // 🟢 filtre actif
    if (this.showOnlyActive) {
      result = result.filter(c => c.actif);
    }

    // 📍 tri
    result.sort((a, b) => a.nom_club.localeCompare(b.nom_club));

    this.filteredClubs = result;
  }

  selectClub(id: number) {
    this.selected.emit(id);
  }
}