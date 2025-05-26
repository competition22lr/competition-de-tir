import { MoisResultats } from "./mois-resultats.model";

export class Competition {
  constructor(
    public debut: string,
    public fin: string,
    public mois: MoisResultats[]
  ) { }

  getGagnanTirage(): {  moisCle: string; annee: string; gagnant: string; }[] {
    const gagnantsParMois: { moisCle: string; annee: string; gagnant: string; }[] = []

    this.mois.forEach(element => {
      const gagnant = {
        moisCle: element.getMoisCleText(),
        annee: element.getAnnee(),
        gagnant: element.resultatTirage.Nom
      };
      gagnantsParMois.push(gagnant);
    });

    return gagnantsParMois;

  }
}
