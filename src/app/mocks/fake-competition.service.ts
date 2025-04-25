import { Injectable } from '@angular/core';
import { Competition } from '../models/competition.model';
import { Participant } from '../models/participant.model';
import { Utilistaire } from '../services/utilitaire';

@Injectable({
  providedIn: 'root'
})
export class FakeCompetitionService {
  getFakeCompetition(): Competition {
    return fakeCompetition;
  }
}

const fakeCompetition: Competition = {
  debut: "Jan.1999",
  fin: "Dec.1999",
  mois: [
    {
      name: 'jan.2000',
      participants: [
        new Participant({
          numero: '0005',
          nom: 'Diamant',
          pointage: 200,
          pointBoni: 20,
          total: 220,
          classement: 'Diamant',
        }),
        new Participant({
          numero: '0004',
          nom: 'Platine',
          pointage: 200,
          pointBoni: 20,
          total: 220,
          classement: 'Platine',
        }),
        new Participant({
          numero: '0003',
          nom: 'Or',
          pointage: 200,
          pointBoni: 20,
          total: 220,
          classement: 'Or',
        }),
        new Participant({
          numero: '0002',
          nom: 'Argent',
          pointage: 200,
          pointBoni: 20,
          total: 220,
          classement: 'Argent',
        }),
        new Participant({
          numero: '0001',
          nom: 'Bronze',
          pointage: 200,
          pointBoni: 20,
          total: 220,
          classement: 'Bronze',
        })
      ],
      displayName(): string {
          let abbreviation: string = this.name.split('.')[0];
          let annee: string = this.name.split('.')[1];
          let moisNumero :number = Utilistaire.convertMonthToNumber(abbreviation);
      
          return Utilistaire.moisEnFrancais(moisNumero) + " " +  annee;
        }
    },
  ],
};





