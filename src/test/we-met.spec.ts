import { WeMet } from '../hinge-wrapper';

const rawWeMet = {
  "timestamp": "2020-01-01T00:00:00", // 1577854800000
  "did_meet_subject": "Not yet",
  "type": "we_met"
};

describe('WeMet class', () => {

  it('should build from raw data', () => {
    let testWeMet = WeMet.fromRaw(rawWeMet);

    expect(testWeMet.didMeet).toEqual(rawWeMet.did_meet_subject);
    expect(testWeMet.timestamp).toBeDefined();
    expect(testWeMet.timestamp!.getTime()).toEqual(1577854800000);
  });

  it('should build with missing fields', () => {
    let testWeMet = WeMet.fromRaw({});

    expect(testWeMet.didMeet).toEqual('');
    expect(testWeMet.timestamp).toBeNull();
  });

});
