import { Utilistaire } from "../services/utilitaire";
import { Participant } from "./participant.model";
import { ResultatTirage5050 } from "./resultat-tirage5050.model";

export class MoisResultats {
  constructor(
    public name: string,
    public participants: Participant[],
    public resultatTirage: ResultatTirage5050
  ) { }

  displayName(): string {
    let abbreviation: string = this.name.split('.')[0];
    let annee: string = this.name.split('.')[1];
    let moisNumero: number = Utilistaire.convertMonthToNumber(abbreviation);

    return Utilistaire.moisEnFrancais(moisNumero) + " " + annee;
  }

  getMoisCleText(): string {
    let abbreviation: string = this.name.split('.')[0];
    let moisNumero: number = Utilistaire.convertMonthToNumber(abbreviation);
    return "MOIS." + moisNumero;
  }

  getAnnee() {
    return this.name.split('.')[1];
  }
}



