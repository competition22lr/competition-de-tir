import { SharedTestData, globalBeforeEach } from './services/shared-test-util';

describe('Participant', () => {
  let shared: SharedTestData = {};

  globalBeforeEach(shared);
  
  it('should create an instance', () => {
    expect(shared.participants).toBeTruthy();
  });
});
