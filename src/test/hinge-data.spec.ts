import { HingeData } from '../hinge-wrapper';
import matchesData from './testing/matches.json';

describe('HingeData class', () => {

  let testHingeData: HingeData;

  it('should build with bad input data', () => {
    testHingeData = new HingeData({});
    expect(testHingeData.interactions).toHaveLength(0);
  });

  describe('with matches.json data', () => {
    beforeEach(() => {
      testHingeData = new HingeData(matchesData);
    });

    it('should build', () => {
      let expectedLength = matchesData.length;
      expect(testHingeData.interactions).toHaveLength(expectedLength);
    });

    it('should return total number of interactions', () => {
      let expectedLength = matchesData.length;
      expect(testHingeData.totalInteractions()).toBe(expectedLength);
    });

    it('should get sent likes', () => {
      // Matches.json has 5 sent likes
      expect(testHingeData.getSentLikes()).toHaveLength(5);
    });

    it('should get received likes', () => {
      // Matches.json has 1 received like
      expect(testHingeData.getReceivedLikes()).toHaveLength(1);
    });

    it('should get matches', () => {
      // Matches.json has 3 matches
      expect(testHingeData.getMatches()).toHaveLength(3);
    });

    it('should get all rejections', () => {
      // Matches.json has 2 rejections
      expect(testHingeData.getRejections()).toHaveLength(2);
    });

    it('should get all dates', () => {
      // Matches.json has 1 date
      expect(testHingeData.getDates()).toHaveLength(1);
    });

    it('should get all sent likes with comments', () => {
      // Matches.json has 2 likes with comments
      expect(testHingeData.getSentLikesWithComment())
          .toHaveLength(2);
    });

    it('should get all sent likes without comments', () => {
      // Matches.json has 3 likes without comments
      expect(testHingeData.getSentLikesWithoutComment())
          .toHaveLength(3);
    });
  });

  describe('with empty data', () => {
    beforeEach(() => {
      testHingeData = new HingeData([]);
    });

    it('should build', () => {
      expect(testHingeData.interactions).toHaveLength(0);
    });

    it('should return 0 total interactions', () => {
      expect(testHingeData.totalInteractions()).toBe(0);
    });

    it('should return 0 sent likes', () => {
      expect(testHingeData.getSentLikes()).toHaveLength(0);
    });
  
    it('should return 0 received likes', () => {
      expect(testHingeData.getReceivedLikes()).toHaveLength(0);
    });
  
    it('should return 0 matches', () => {
      expect(testHingeData.getMatches()).toHaveLength(0);
    });
  
    it('should return 0 rejections', () => {
      expect(testHingeData.getRejections()).toHaveLength(0);
    });

    it('should return 0 sent likes with comments', () => {
      expect(testHingeData.getSentLikesWithComment()).toHaveLength(0);
    });
  
    it('should return 0 sent likes without comments', () => {
      expect(testHingeData.getSentLikesWithoutComment()).toHaveLength(0);
    });
  });
});
