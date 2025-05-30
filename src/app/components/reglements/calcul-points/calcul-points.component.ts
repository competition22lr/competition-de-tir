import { Component } from '@angular/core';
import { ResultatsService } from '../../../services/resultats.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-regement-calcul-points',
  imports: [CommonModule, TranslateModule],
  templateUrl: './calcul-points.component.html',
  styleUrl: './calcul-points.component.css'
})
export class CalculPointsComponent {
  constructor(public resultatsService: ResultatsService) { }

}
