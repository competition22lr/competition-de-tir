import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-perfect-rate',
  imports: [CommonModule],
  templateUrl: './stat-perfect-rate.component.html',
  styleUrl: './stat-perfect-rate.component.css'
})
export class StatPerfectRateComponent {

  @Input() resultats: any[] = [];

  get percent(): number {
    if (!this.resultats.length) return 0;

    const perfect = this.resultats.filter(r => r.total === 200).length;
    return Math.round((perfect / this.resultats.length) * 100);
  }
}
