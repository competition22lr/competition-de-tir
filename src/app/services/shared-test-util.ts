// shared-test-util.ts
import { Competition } from "../models/competition.model";
import { MoisResultats } from "../models/mois-resultats.model";
import { Participant } from "../models/participant.model";
import { ResultatTirage5050 } from "../models/resultat-tirage5050.model";

export interface SharedTestData {
  competition?: Competition;
  mois?: MoisResultats;
  participants?: Participant[];
  tirage?: ResultatTirage5050;
}

export function globalBeforeEach(shared: SharedTestData) {
  beforeEach(() => {
    shared.participants = [
      new Participant({ numero: '123', nom: 'Alice', pointage: 95, pointBoni: 5, total: 100, classement: '1er' }),
      new Participant({ numero: '456', nom: 'Bob', pointage: 90, pointBoni: 2, total: 92, classement: '2e' })
    ];

    shared.tirage = new ResultatTirage5050('Jean Dupont', 100);
    shared.mois = new MoisResultats('janv.2025', shared.participants, shared.tirage);
    shared.competition = new Competition('2025-01-01', '2025-12-31', [shared.mois]);
  });

  afterEach(() => {
    shared.competition = undefined;
    shared.mois = undefined;
    shared.participants = undefined;
    shared.tirage = undefined;
  });
}
