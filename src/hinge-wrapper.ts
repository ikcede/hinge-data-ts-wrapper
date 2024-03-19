/**
 * Wrapper class for Hinge Data
 * 
 * Stores a list of Interactions for data analysis and contains
 * some methods for filtering Interactions.
 */
export class HingeData {
  /**
   * All imported Interactions
   */
  interactions: Interaction[] = new Array<Interaction>();
  
  /**
   * Set up by converting raw data from matches.json to TS objects
   * 
   * @param data Imported data from matches.json
   */
  constructor (data: any) {
    if (Array.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        this.interactions.push(Interaction.fromRaw(data[i]));
      }
    }
  }

  /**
   * Get the total number of interactions
   * 
   * @returns Number of interactions
   */
  totalInteractions(): number {
    return this.interactions.length;
  }

  /**
   * Gets all interactions initiated by the user
   * 
   * @returns A list of interactions with sent likes
   */
  getSentLikes(): Interaction[] {
    return this.interactions.filter(
        (interaction) => interaction.isSentLike());
  }

  /**
   * Gets all interactions not initiated by the user
   * 
   * @returns A list of interactions with received likes
   */
  getReceivedLikes(): Interaction[] {
    return this.interactions.filter(
        (interaction) => !interaction.isSentLike());
  }

  /**
   * Gets all matches
   * 
   * @returns A list of interactions with matches
   */
  getMatches(): Interaction[] {
    return this.interactions.filter(
        (interaction) => interaction.isMatch());
  }

  /**
   * Gets all rejections by the user
   * 
   * @returns A list of interactions with rejections
   */
  getRejections(): Interaction[] {
    return this.interactions.filter(
        (interaction) => interaction.isRejection());
  }

  /**
   * Gets all interactions with WeMet set to Yes
   * 
   * @returns A list of interactions with WeMet set to Yes
   */
  getDates(): Interaction[] {
    return this.interactions.filter(
        (interaction) => interaction.isDate());
  }

  /**
   * Gets all sent likes with a comment
   * 
   * @returns A list of interactions with likes including a comment
   */
  getSentLikesWithComment(): Interaction[] {
    return this.interactions.filter((interaction) => 
        interaction.isSentLike() && interaction.like!.comment != '');
  }

  /**
   * Gets all sent likes without a comment
   * 
   * @returns A list of interactions with likes without a comment
   */
  getSentLikesWithoutComment(): Interaction[] {
    return this.interactions.filter((interaction) => 
        interaction.isSentLike() && interaction.like!.comment == '');
  }
}

/**
 * Wrapper class for interactions (likes, matches)
 */
export class Interaction {
  /**
   * The timestamp when either user matched
   */
  matchDate: Date | null;

  /**
   * The timestamp when the user hit X or unmatched
   */
  removeDate: Date | null;

  /**
   * Set if the user sent a like
   */
  like: Like | null;

  /**
   * Messages the user sent (does not include comment from Like)
   */
  chats: Message[];

  /**
   * An option the user marked using the We Met feature
   */
  weMet: WeMet | null;

  constructor (
      matchDate: Date | null, 
      removeDate: Date | null,
      like: Like | null,
      chats: Message[],
      weMet: WeMet | null) {
    this.matchDate = matchDate;
    this.removeDate = removeDate;
    this.like = like;
    this.chats = chats;
    this.weMet = weMet;
  }

  /**
   * Checks if this interaction started with a like sent
   * by the user
   * 
   * @returns True if the interaction includes a like
   */
  isSentLike(): boolean {
    return this.like != null;
  }

  /**
   * Checks if the user matched with another user.
   * 
   * @returns True if matchDate is set
   */
  isMatch(): boolean {
    return this.matchDate != null;
  }

  /**
   * Checks if the user hit the X or unmatched.
   * 
   * @returns True if removeDate is set
   */
  isRejection(): boolean {
    return this.removeDate != null;
  }

  /**
   * Checks if the user notes that they met.
   * 
   * @returns True if weMet is set with a flag of 'Yes'
   */
  isDate(): boolean {
    return this.weMet != null && this.weMet.didMeet == 'Yes';
  }

  /**
   * Builds an Interaction from raw object data in matches.json
   * 
   * @param data 
   * @returns A built Interaction object
   */
  static fromRaw(data: any) {
    let matchTime = null;
    if (data.match !== undefined && data.match[0] !== undefined) {
      matchTime = data.match[0].timestamp ?? null;
    }
    let matchDate = matchTime !== null 
        ? new Date(Date.parse(matchTime))
        : null;

    let removeTime = null;
    if (data.block !== undefined && data.block[0] !== undefined) {
      removeTime = data.block[0].timestamp ?? null;
    }
    let removeDate = removeTime !== null 
        ? new Date(Date.parse(removeTime))
        : null;

    let like = null;
    if (data.like !== undefined) {
      like = Like.fromRaw(data.like[0]);
    }

    let chats = new Array<Message>();
    if (Array.isArray(data.chats)) {
      data.chats.forEach(
          (chat : any) => chats.push(Message.fromRaw(chat)));
    }

    let weMet = null;
    if (data.we_met !== undefined) {
      weMet = WeMet.fromRaw(data.we_met[0]);
    }

    return new Interaction(
        matchDate,
        removeDate,
        like,
        chats,
        weMet
    );
  }
}

/**
 * Wrapper class for a like interaction
 */
export class Like {
  /**
   * Any comment the user sent with the like
   */
  comment: string;

  /**
   * The recorded time of the Like being sent
   */
  timestamp: Date | null;

  constructor (comment: string, timestamp: Date | null) {
    this.comment = comment;
    this.timestamp = timestamp;
  }

  /**
   * Builds a Like from raw object data in matches.json
   * 
   * Note that these are only likes sent by the user as
   * received likes are implied
   * 
   * @param data 
   * @returns A build Like object
   */
  static fromRaw(data: any) {
    let comment = data.comment ?? '';
    let timestamp = data.timestamp === undefined ? 
        null : new Date(Date.parse(data.timestamp));

    return new Like(comment, timestamp);
  }
}

/**
 * Wrapper class for chat messages
 */
export class Message {
  /**
   * The text content of the message
   */
  text: string;

  /**
   * When the message was sent
   */
  timestamp: Date | null;

  constructor (text: string, timestamp: Date | null) {
    this.text = text;
    this.timestamp = timestamp;
  }

  /**
   * Builds a Message from raw object data in matches.json
   * 
   * Note that these are only messages sent by the user as
   * received messages are not downloaded
   * 
   * @param data 
   * @returns A built Message object
   */
  static fromRaw(data: any) {
    let text = data.body ?? '';
    let date = data.timestamp === undefined ? 
        null : new Date(Date.parse(data.timestamp));

    return new Message(text, date);
  }
}

/**
 * Wrapper class for WeMet object
 */
export class WeMet {
  /**
   * Value for WeMet (can be 'Yes', 'No', or 'Not Yet')
   */
  didMeet: string;
  
  /**
   * Timestamp of user setting the WeMet value
   */
  timestamp: Date | null;

  constructor (didMeet: string, timestamp: Date | null) {
    this.didMeet = didMeet;
    this.timestamp = timestamp;
  }

  /**
   * Builds a WeMet object from raw object data in matches.json
   * 
   * These are based on the user's input
   * 
   * @param data 
   * @returns A built WeMet object
   */
  static fromRaw(data: any) {
    let didMeet = data.did_meet_subject ?? '';
    let date = data.timestamp === undefined ? 
        null : new Date(Date.parse(data.timestamp));

    return new WeMet(didMeet, date);
  }
}