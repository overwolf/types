/**
 * @deprecated APIs moved to X
 */
declare namespace overwolf.social.twitter {
  namespace enums {
    const enum ShareState {
      Started,
      Uploading,
      Finished
    }
  }

  interface ShareParameters {
    file: string;
    id?: string;
    useOverwolfNotifications: boolean;
    message: string;
    trimming?: media.videos.VideoCompositionSegment;
    tags?: string[];
    gameClassId?: number;
    gameTitle?: string;
    metadata?: any;
  }

  interface User {
    id: string;
    screenName: string;
    name: string;
    email: string;
    avatar: string;
  }

  interface SocialShareProgress extends Result {
    progress: number;
    id: string;
    state: enums.ShareState;
  }

  interface SocialShareResult extends Result {
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

  function shareEx(
    discordShareParams: overwolf.social.twitter.ShareParameters,
    resultCallback: CallbackFunction<overwolf.social.twitter.SocialShareResult>,
    progressCallback: CallbackFunction<overwolf.social.twitter.SocialShareProgress>
  ): void;

  