import { Message } from '../hinge-wrapper';

const rawMessage = {
  "timestamp": "2020-01-01T00:00:00", // 1577854800000
  "body": "Hi",
  "type": "chats"
};

describe('Message class', () => {

  it('should build from raw data', () => {
    let testMessage = Message.fromRaw(rawMessage);

    expect(testMessage.text).toEqual(rawMessage.body);
    expect(testMessage.timestamp).toBeDefined();
    expect(testMessage.timestamp!.getTime()).toEqual(1577854800000);
  });

  it('should build with missing fields', () => {
    let testMessage = Message.fromRaw({});

    expect(testMessage.text).toEqual('');
    expect(testMessage.timestamp).toBeNull();
  });

});
