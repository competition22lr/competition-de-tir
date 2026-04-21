import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-meilleur-score',
  imports: [CommonModule],
  templateUrl: './stat-meilleur-score.component.html',
  styleUrl: './stat-meilleur-score.component.css'
})
export class StatMeilleurScoreComponent {
  @Input() resultats: any[] = [];

  get best(): number {
    return Math.max(...this.resultats.map(r => r.total));
  }
}