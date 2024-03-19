import { Like } from '../hinge-wrapper';

const rawLike = {
  "timestamp": "2020-01-01T00:00:00", // 1577854800000
  "comment": "Hey",
  "type": "like"
};

describe('Like class', () => {

  it('should build from raw data', () => {
    let testLike = Like.fromRaw(rawLike);

    expect(testLike.comment).toEqual(rawLike.comment);
    expect(testLike.timestamp).toBeDefined();
    expect(testLike.timestamp!.getTime()).toEqual(1577854800000);
  });

  it('should build with missing fields', () => {
    let testLike = Like.fromRaw({});

    expect(testLike.comment).toEqual('');
    expect(testLike.timestamp).toBeNull();
  });

});
