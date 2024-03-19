/**
 * Contains a set of sample interactions for testing
 */
export const interactions = {

  /**
   * Sample interaction of matching and unmatching
   */
  matchedAndUnmatched: {
    "block": [
      {
          "block_type": "remove",
          "timestamp": "2020-01-01T00:00:00", // 1577854800000
          "type": "block"
      }
    ],
    "chats": [
      {
          "body": "Hey!",
          "timestamp": "2020-01-01T00:00:00", // 1577854800000
          "type": "chats"
      },
    ],
    "like": [
      {
          "timestamp": "2020-01-01T00:00:00", // 1577854800000
          "type": "like"
      }
    ],
    "match": [
      {
          "timestamp": "2020-01-01T00:00:00", // 1577854800000
          "type": "match"
      }
    ],
    "we_met": [
      {
        "timestamp": "2020-01-01T00:00:00", // 1577854800000
        "did_meet_subject": "No",
        "type": "we_met"
      }
    ]
  },

  /**
   * Sample interaction of a date
   */
  matchedAndDated: {
    "chats": [
      {
          "body": "Hey!",
          "timestamp": "2020-01-01T00:00:00", // 1577854800000
          "type": "chats"
      },
    ],
    "like": [
      {
          "timestamp": "2020-01-01T00:00:00", // 1577854800000
          "type": "like"
      }
    ],
    "match": [
      {
          "timestamp": "2020-01-01T00:00:00", // 1577854800000
          "type": "match"
      }
    ],
    "we_met": [
      {
        "timestamp": "2020-01-01T00:00:00", // 1577854800000
        "did_meet_subject": "Yes",
        "type": "we_met"
      }
    ]
  },

  /**
   * Sample interaction of only a like sent
   */
  sentLike: {
    "like": [
      {
          "timestamp": "2020-01-01T00:00:00", // 1577854800000
          "type": "like"
      }
    ],
  },

  /**
   * Sample interaction of getting a match from a like
   */
  sentLikeWithCommentAndMatched: {
    "like": [
      {
          "timestamp": "2020-01-01T00:00:00", // 1577854800000
          "comment": "Hey",
          "type": "like"
      }
    ],
    "match": [
      {
          "timestamp": "2020-01-01T00:00:00", // 1577854800000
          "type": "match"
      }
    ]
  },

  /**
   * Sample interaction of removing a received like
   */
  removeLike: {
    "block": [
      {
          "block_type": "remove",
          "timestamp": "2020-01-01T00:00:00", // 1577854800000
          "type": "block"
      }
    ],
  }
}