import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ResultatsService } from '../services/resultats.service';

@Component({
  selector: 'app-tirage-gagnants',
  imports: [CommonModule,RouterModule],
  templateUrl: './tirage-gagnants.component.html',
  styleUrls: ['./tirage-gagnants.component.css']
})
export class TirageGagnantsComponent  implements OnInit {

  indexCompetitionSelectionne!: number;
  gagnantsParMois: { mois: string, gagnant: string }[] = [];

  constructor(public resultatsService: ResultatsService, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const paramCompetition = params.get('competition');
      const paramMois = params.get('mois');

      this.indexCompetitionSelectionne = paramCompetition !== null ? Number(paramCompetition) ? Number(paramCompetition) : 0 : 0;
            console.log("params.get('competition') =>", paramCompetition);

    })
    
    this.chargerGagnants();
  }

  chargerGagnants() {
    const toutesLesCompetitions: { [key: string]: { mois: string; gagnant: string }[] } = {
      '0': [
        { mois: 'Janvier', gagnant: 'Jean Tremblay' },
        { mois: 'Février', gagnant: 'Marie Dupont' },
        { mois: 'Mars', gagnant: 'Luc Trempe' },
      ],
      '1': [
        { mois: 'Janvier', gagnant: 'Alice Gagné' },
        { mois: 'Février', gagnant: 'Paul Marois' },
      ]
    };
  
    this.gagnantsParMois = toutesLesCompetitions[this.indexCompetitionSelectionne] || [];
  }
  

}