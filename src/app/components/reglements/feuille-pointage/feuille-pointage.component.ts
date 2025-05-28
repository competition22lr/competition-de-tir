import { Component, OnInit } from '@angular/core';
import { ResultatsService } from '../../../services/resultats.service';
import { CommonModule } from '@angular/common';
import { Utilistaire } from '../../../services/utilitaire';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-reglement-feuille-pointage',
  imports: [CommonModule,TranslateModule],
  templateUrl: './feuille-pointage.component.html',
  styleUrls: ['./feuille-pointage.component.css', './../reglements.component.css']
})
export class FeuillePointageComponent implements OnInit {
  generatedImageUrl: string | null = null;


  constructor(public resultatsService: ResultatsService) { }

  ngOnInit() {
    const imageUrl = this.resultatsService.imageLocationUrl + 'CiblecarabineCTO.jpg';
    
    Utilistaire.generateWatermarkedImage(imageUrl).then((dataUrl) => {
      this.generatedImageUrl = dataUrl;
    }).catch((error) => {
      console.error('Erreur lors de la génération du watermark:', error);
    });
  }
}
