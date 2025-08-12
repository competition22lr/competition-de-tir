import { globalBeforeEach, SharedTestData } from '../services/shared-test-util';
import { Participant } from './participant.model';

describe('Participant', () => {
  let shared: SharedTestData = {};

  globalBeforeEach(shared);
  
  it('should create an instance', () => {
    expect(shared.participants).toBeTruthy();
  });
});
