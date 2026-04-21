import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resultats-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resultats-table.component.html'
})
export class ResultatsTableComponent {

  @Input() resultats: any[] = [];

}