import { Component, Input, OnInit } from '@angular/core';
import { ResultatsService } from '../../../../../services/resultats.service';
import { Utilistaire } from '../../../../../services/utilitaire';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-long-gong-feuille-cible',
  imports: [CommonModule, TranslateModule],
  templateUrl: './feuille-cible.component.html',
  styleUrl: './feuille-cible.component.css'
})
export class FeuilleCibleComponent implements OnInit {
  @Input() isPrintMode = false;
  generatedImageUrl: string | null = null;


  constructor(public resultatsService: ResultatsService) { }

  ngOnInit() {
    const imageUrl = this.resultatsService.imageLocationUrl + 'cibleLongGong.png';

    Utilistaire.generateWatermarkedImage(imageUrl).then((dataUrl) => {
      this.generatedImageUrl = dataUrl;
    }).catch((error) => {
      console.error('Erreur lors de la génération du watermark:', error);
    });
  }
}