import { Participant } from "./participant.model";
import { Competition } from "./competition.model";
import { MoisResultats } from "./mois-resultats.model";
import { ResultatTirage5050 } from "./resultat-tirage5050.model";

export class ResultatsCummulatif {
  constructor(
    public competitions: Competition[]
  ) { }

  static fromXml(xml: Document): ResultatsCummulatif {
    const competitionEls = Array.from(xml.getElementsByTagName('competition'));

    const competitions: Competition[] = competitionEls.map(competitionEl => {
      const debut = competitionEl.getAttribute('debut') ?? '';
      const fin = competitionEl.getAttribute('fin') ?? '';

      const mois: MoisResultats[] = Array.from(competitionEl.getElementsByTagName('mois')).map(moisEl => {
        const name = moisEl.getAttribute('name') ?? '';
        const participants = Array.from(moisEl.getElementsByTagName('participant')).map(p => {
          const get = (tag: string) => p.getElementsByTagName(tag)[0]?.textContent?.trim() ?? '';

          return new Participant({
            numero: get('Numero_Membre'),
            nom: get('Nom'),
            pointage: +get('Pointage'),
            pointBoni: +get('Point_Boni'),
            total: +get('Pointage_Total'),
            classement: get('Classement')
          });
        });

        const r = moisEl.getElementsByTagName('ResultatTirage5050')[0];
        let aResultatTirage5050: ResultatTirage5050 | null = null;
        const get = (tag: string) => r.getElementsByTagName(tag)[0]?.textContent?.trim() ?? '';
        aResultatTirage5050 = new ResultatTirage5050(get('Nom'), Number(get('Montant')));


        return new MoisResultats(name, participants, aResultatTirage5050);
      });

      return new Competition(debut, fin, mois);
    });

    return new ResultatsCummulatif(competitions);
  }

  getCompetitionsDisponibles(): string[] {
    return this.competitions.map((c, i) => `Compétition ${i + 1}\n(${c.debut} → ${c.fin})`);
  }

  getCompetitions(indexCompetition: number): Competition {
    return this.competitions[indexCompetition];
  }

  getMoisDisponibles(indexCompetition: number): MoisResultats[] {
    return this.competitions[indexCompetition]?.mois ?? [];
  }

  getParticipants(indexCompetition: number, moisName: string): Participant[] {
    return this.competitions[indexCompetition]?.mois.find(m => m.name.toLowerCase() === moisName)?.participants ?? [];
  }
}
