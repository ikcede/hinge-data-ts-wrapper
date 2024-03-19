import { Interaction } from '../hinge-wrapper';
import { interactions } from './testing/data';

describe('Interaction class', () => {

  it('should build all fields if data is present', () => {
    let testInteraction = Interaction.fromRaw(interactions.matchedAndUnmatched);

    expect(testInteraction.matchDate!.getTime()).toEqual(1577854800000);
    expect(testInteraction.removeDate!.getTime()).toEqual(1577854800000);
    
    expect(testInteraction.like).toBeDefined();
    expect(testInteraction.like!.comment).toEqual('');
    expect(testInteraction.like!.timestamp!.getTime()).toEqual(1577854800000);
    
    expect(testInteraction.chats).toHaveLength(1);
    expect(testInteraction.chats[0].text).toEqual('Hey!');
    expect(testInteraction.chats[0].timestamp!.getTime()).toEqual(1577854800000);

    expect(testInteraction.weMet).toBeDefined();
    expect(testInteraction.weMet!.didMeet).toEqual('No');
    expect(testInteraction.weMet!.timestamp!.getTime()).toEqual(1577854800000);
    
  });

  it('should be able to build empty', () => {
    let testInteraction = Interaction.fromRaw({});

    expect(testInteraction.matchDate).toBeNull();
    expect(testInteraction.removeDate).toBeNull();
    expect(testInteraction.like).toBeNull();
    expect(testInteraction.chats).toEqual([]);
    expect(testInteraction.weMet).toBeNull();
  });

  describe('isSentLike method', () => {
    it('checks if a like was sent', () => {
      let testInteraction = Interaction.fromRaw(interactions.sentLike);

      expect(testInteraction.isSentLike()).toBe(true);

      testInteraction = Interaction.fromRaw({});

      expect(testInteraction.isSentLike()).toBe(false);
    });
  });

  describe('isMatch method', () => {
    it('checks if an interaction includes a match', () => {
      let testInteraction = Interaction.fromRaw(interactions.matchedAndUnmatched);
      expect(testInteraction.isMatch()).toBe(true);

      testInteraction = Interaction.fromRaw({});
      expect(testInteraction.isMatch()).toBe(false);
    });
  });

  describe('isRejection method', () => {
    it('checks if an interaction was a rejection', () => {
      let testInteraction = Interaction.fromRaw(interactions.matchedAndUnmatched);
      expect(testInteraction.isRejection()).toBe(true);

      testInteraction = Interaction.fromRaw(interactions.removeLike);
      expect(testInteraction.isRejection()).toBe(true);

      testInteraction = Interaction.fromRaw({});
      expect(testInteraction.isRejection()).toBe(false);
    });
  });

  describe('isDate method', () => {
    it('checks if an interaction includes a Yes in WeMet', () => {
      // Has a WeMet but didMeet is false
      let testInteraction = Interaction.fromRaw(interactions.matchedAndUnmatched);
      expect(testInteraction.isDate()).toBe(false);

      // Has a WeMet and didMeet is true
      testInteraction = Interaction.fromRaw(interactions.matchedAndDated);
      expect(testInteraction.isDate()).toBe(true);

      // Does not have a WeMet
      testInteraction = Interaction.fromRaw({});
      expect(testInteraction.isDate()).toBe(false);
    });
  });

});
