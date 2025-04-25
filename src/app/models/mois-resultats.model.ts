import { Utilistaire } from "../services/utilitaire";
import { Participant } from "./participant.model";

export class MoisResultats {
  constructor(
    public name: string,
    public participants: Participant[]
  ) { }

  displayName(): string {
    let abbreviation: string = this.name.split('.')[0];
    let annee: string = this.name.split('.')[1];
    let moisNumero :number = Utilistaire.convertMonthToNumber(abbreviation);

    return Utilistaire.moisEnFrancais(moisNumero) + " " +  annee;
  }
}



