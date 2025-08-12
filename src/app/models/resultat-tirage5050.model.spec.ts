import { SharedTestData, globalBeforeEach } from '../services/shared-test-util';
import { ResultatTirage5050 } from './resultat-tirage5050.model';

describe('ResultatTirage5050', () => {
  let shared: SharedTestData = {};

  globalBeforeEach(shared);
  
  it('should create an instance', () => {
    expect(shared.tirage).toBeTruthy();
  });
});
