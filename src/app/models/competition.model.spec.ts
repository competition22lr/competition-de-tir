import { Utilistaire } from '../services/utilitaire';
import { globalBeforeEach } from '../services/shared-test-util';

describe('Competition', () => {
  let shared: { competition?: any } = {};

  globalBeforeEach(shared);

  beforeEach(() => {
    spyOn(Utilistaire, 'convertMonthToNumber').and.callFake((abbr: string) => {
      const mapping: Record<string, number> = {
        janv: 1, févr: 2, mars: 3, avr: 4, mai: 5, juin: 6,
        juill: 7, août: 8, sept: 9, oct: 10, nov: 11, déc: 12
      };
      return mapping[abbr.toLowerCase()] || 0;
    });
  });

  it('should create an instance', () => {
    const competition = shared.competition!;
    expect(competition).toBeTruthy();
  });

   it('should return tirage results', () => {
    const competition = shared.competition!;
    const gagnants = competition.getGagnanTirage();

    expect(gagnants.length).toBe(1);
    expect(gagnants[0]).toEqual({
      nomXML: 'janv.2025',
      moisCle: 'MOIS.1',
      annee: '2025',
      gagnant: 'Jean Dupont'
    });
  });

});