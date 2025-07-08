import { Component } from '@angular/core';
import { ResultatsService } from '../../../services/resultats.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-reglements-classement',
  imports: [TranslateModule,CommonModule],
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
