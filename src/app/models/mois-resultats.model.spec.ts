import { globalBeforeEach, SharedTestData } from '../services/shared-test-util';

describe('MoisResultats', () => {
  let shared: SharedTestData = {};

  globalBeforeEach(shared);

  it('should create an instance', () => {
    expect(shared.mois).toBeTruthy();
  });
});
