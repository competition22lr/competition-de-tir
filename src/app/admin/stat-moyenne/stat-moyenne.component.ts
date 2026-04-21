import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-moyenne',
  imports: [CommonModule],
  templateUrl: './stat-moyenne.component.html',
  styleUrl: './stat-moyenne.component.css'
})
export class StatMoyenneComponent {
  @Input() resultats: any[] = [];

  get moyenne(): number {
    if (!this.resultats.length) return 0;

    const total = this.resultats.reduce((s, r) => s + r.total, 0);
    return total / this.resultats.length;
  }
}