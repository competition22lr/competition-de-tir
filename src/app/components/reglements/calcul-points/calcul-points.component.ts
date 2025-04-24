import { Component } from '@angular/core';
import { ResultatsService } from '../../../services/resultats.service';

@Component({
  selector: 'app-regement-calcul-points',
  imports: [],
  templateUrl: './calcul-points.component.html',
  styleUrl: './calcul-points.component.css'
})
export class CalculPointsComponent {
  constructor(public resultatsService: ResultatsService) { }

}
