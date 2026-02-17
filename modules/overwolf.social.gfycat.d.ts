/**
 * @deprecated No longer in service.
 */
declare namespace overwolf.social.gfycat {
  namespace enums {
    const enum ShareState {
      Started,
      Uploading,
      Finished
    }
  }

  interface User {
    userid: string;
    email: string;
    emailVerified: boolean;
    profileImageUrl: string;
    username: string;
    canonicalUsername: string;
    views: number;
    followers: number;
    following: number;
    publishedGyfcats: number;
    totalGyfcats: number;
    url: string;
  }

  interface ShareParameters {
    file: string;
    id?: string;
    useOverwolfNotifications: boolean;
    trimming?: media.videos.VideoCompositionSegment;
    title: string;
    privateMode: boolean;
    tags?: string[];
    gameClassId?: number;
    metadata?: any;
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
   * Performs a "strong" sign out of Gfycat, so that even if the userperforms a
   * login via the Overwolf Settings / Accounts page, he willbe considered
   * signed out.
   * @param callback
   */
  function performLogout(callback: CallbackFunction<Result>): void;

  /**
   * If the user is currently logged into Gfycat, this will return
   * userinformation:
   * https://developers.gfycat.com/api/#getting-the-authenticated-user-s-details
   * Otherwise, an error is returned.
   * @param callback Will contain user information or error if the request has
   * failed.
   */
  function getUserInfo(
    callback: CallbackFunction<GetUserInfoResult<User>>
  ): void;

  /**
   * Possible errors that can occur:- Disconnected (user isn't signed in)-
   * MissingFile (trying to share a missing file)- UnsupportedFile (trying to
   * share an unsupported format)- ExceedsMaxSize (the file is too large: > 8 MB
   * for images, > 100 MBfor videos)
   * @param gfycatShareParams The share parameters. See GfycatShareParameters
   * @param callback Will contain the status of the request.
   */
  function share(
    gfycatShareParams: ShareParameters,
    callback: CallbackFunction<Result>
  ): void;

  function shareEx(
    discordShareParams: overwolf.social.gfycat.ShareParameters,
    resultCallback: CallbackFunction<overwolf.social.gfycat.SocialShareResult>,
    progressCallback: CallbackFunction<SocialShareProgress>
  ): void;

  /**
   * Fired when a media event has been posted.
   */
  const onLoginStateChanged: Event<LoginStateChangedEvent>;
}

