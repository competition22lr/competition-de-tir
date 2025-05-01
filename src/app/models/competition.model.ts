import { MoisResultats } from "./mois-resultats.model";

export class Competition {
  constructor(
    public debut: string,
    public fin: string,
    public mois: MoisResultats[]
  ) { }

  getGagnanTirage(): { mois: string; gagnant: string; }[] {
    const gagnantsParMois: { mois: string; gagnant: string; }[] = []

    this.mois.forEach(element => {
      const gagnant = {
        mois: element.displayName(),
        gagnant: element.resultatTirage.Nom
      };
      gagnantsParMois.push(gagnant);
    });

    return gagnantsParMois;

  }
}
