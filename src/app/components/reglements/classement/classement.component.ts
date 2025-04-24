import { Component } from '@angular/core';
import { ResultatsService } from '../../../services/resultats.service';

@Component({
  selector: 'app-reglements-classement',
  imports: [],
  templateUrl: './classement.component.html',
  styleUrls: ['./classement.component.css', './../reglements.component.css']
})
export class ClassementComponent {

  constructor(public resultatsService: ResultatsService) { }

  getTrophyImage(classement: string): string {
    let imgPrefix = "logoCompetition";
    let imgSufix = ".png";
    return this.resultatsService.imageLocationUrl + imgPrefix + classement + imgSufix;
  }
}
