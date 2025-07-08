import { GagnanTirage } from "./gagnan-tirage.model";
import { MoisResultats } from "./mois-resultats.model";

export class Competition {
  constructor(
    public debut: string,
    public fin: string,
    public mois: MoisResultats[]
  ) { }

  getGagnanTirage(): GagnanTirage[] {
    const gagnantsParMois: GagnanTirage[] = []

    this.mois.forEach(element => {
      const gagnant = {
        nomXML: element.name,
        moisCle: element.getMoisCleText(),
        annee: element.getAnnee(),
        gagnant: element.resultatTirage.Nom
      };
      gagnantsParMois.push(gagnant);
    });

    return gagnantsParMois;

  }
}
