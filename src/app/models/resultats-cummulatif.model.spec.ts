import { ResultatsCummulatif } from './resultats-cummulatif.model';
import { globalBeforeEach, SharedTestData } from '../services/shared-test-util';

describe('ResultatsCummulatif', () => {
  const shared: SharedTestData = {};
  globalBeforeEach(shared);

  let resultats: ResultatsCummulatif;

  beforeEach(() => {
    // on crée l'objet à tester à partir des données partagées
    resultats = new ResultatsCummulatif([shared.competition!]);
  });

  it('should create an instance', () => {
    expect(resultats).toBeTruthy();
  });

  it('should return available competitions', () => {
    const competitions = resultats.getCompetitionsDisponibles();
    expect(competitions.length).toBe(1);
    expect(competitions[0]).toContain('2025-01-01');
    expect(competitions[0]).toContain('2025-12-31');
  });

  it('should return available months for a competition', () => {
    const mois = resultats.getMoisDisponibles(0);
    expect(mois.length).toBe(1);
    expect(mois[0].name).toBe('janv.2025');
  });

  it('should return participants for a given month', () => {
    const participants = resultats.getParticipants(0, 'janv.2025');
    expect(participants.length).toBe(2);
    expect(participants[0].nom).toBe('Alice');
    expect(participants[1].nom).toBe('Bob');
  });

  it('should get the correct competition by index', () => {
    const comp = resultats.getCompetitions(0);
    expect(comp.debut).toBe('2025-01-01');
    expect(comp.fin).toBe('2025-12-31');
  });
});
