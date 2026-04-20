/**
 * Use this API to share images and videos to Twitter on behalf of the logged-in user.
 * @deprecated APIs moved to X
 * @packageDocumentation
 */

/**
 * @deprecated APIs moved to X
 */
declare namespace overwolf.social.twitter {
  namespace enums {
    /** The current stage of a media share operation. */
    const enum ShareState {
      /** The share operation has started. */
      Started,
      /** The media file is being uploaded. */
      Uploading,
      /** The share operation has completed successfully. */
      Finished
    }
  }

  /** Parameters for sharing a media file to Twitter. */
  interface ShareParameters {
    /** Path to the media file (image or video) to share. */
    file: string;
    /** Optional identifier for this share operation. */
    id?: string;
    /** Whether to use Overwolf's built-in share notifications. */
    useOverwolfNotifications: boolean;
    /** The tweet text to post alongside the media. */
    message: string;
    /** Optional trimming segment if sharing a video clip. */
    trimming?: media.videos.VideoCompositionSegment;
    /** Optional list of tags to associate with the post. */
    tags?: string[];
    /** The Overwolf game class ID related to this share, if applicable. */
    gameClassId?: number;
    /** The title of the game related to this share, if applicable. */
    gameTitle?: string;
    /** Optional arbitrary metadata to attach to this share. */
    metadata?: any;
  }

  /** Information about the currently logged-in Twitter user. */
  interface User {
    /** The Twitter user's unique ID. */
    id: string;
    /** The Twitter screen name (handle) of the user. */
    screenName: string;
    /** The display name of the user. */
    name: string;
    /** The email address associated with the user's Twitter account. */
    email: string;
    /** URL of the user's Twitter avatar image. */
    avatar: string;
  }

  /** Progress update for an in-flight `shareEx` operation. */
  interface SocialShareProgress extends Result {
    /** Upload progress as a value between 0 and 100. */
    progress: number;
    /** The identifier of the share operation. */
    id: string;
    /** The current stage of the share operation. */
    state: enums.ShareState;
  }

  /** Result of a completed `shareEx` operation. */
  interface SocialShareResult extends Result {
    /** The URL of the published tweet. */
    url: string;
  }

  /**
   * Opens the login dialog. There is no callback for this method and theonly
   * way to know if the user signed in is via `onLoginStateChanged`.
   */
  function performUserLogin(): void;

  /**
   * Performs a "strong" sign out of Twitter, so that even if the userperforms a
   * login via the Overwolf Settings / Accounts page, he will be considered
   * signed out.
   * @param callback
   */
  function performLogout(callback: CallbackFunction<Result>): void;

  /**
   * If the user is currently logged into Twitter, this will return
   * userinformation:{ avatar: "http://abs.twimg.com/sticky/...", id:
   * "111111111112222222" name: "full name" screenName:
   * "screenname123"}
   * Otherwise, an error is returned.
   * @param callback Will contain user information or error if the request has
   * failed.
   */
  function getUserInfo(
    callback: CallbackFunction<GetUserInfoResult<User>>
  ): void;

  /**
   * If the user is currently logged into Twitter, this will perform the media
   * share (image or video).
   * @param twitterShareParams The share parameters.
   * @param callback Will contain the status of the request.
   */
  function share(
    twitterShareParams: ShareParameters,
    callback: CallbackFunction<Result>
  ): void;

  /** Shares media to Twitter with separate result and progress callbacks.
   * @param discordShareParams The share parameters.
   * @param resultCallback Called with the final share result, including the published URL.
   * @param progressCallback Called periodically with upload progress updates.
   */
  function shareEx(
    discordShareParams: overwolf.social.twitter.ShareParameters,
    resultCallback: CallbackFunction<overwolf.social.twitter.SocialShareResult>,
    progressCallback: CallbackFunction<overwolf.social.twitter.SocialShareProgress>
  ): void;

