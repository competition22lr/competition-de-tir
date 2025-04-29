import { Component } from '@angular/core';
import { ResultatsService } from '../../../services/resultats.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-regement-calcul-points',
  imports: [CommonModule],
  templateUrl: './calcul-points.component.html',
  styleUrl: './calcul-points.component.css'
})
export class CalculPointsComponent {
  constructor(public resultatsService: ResultatsService) { }

}
