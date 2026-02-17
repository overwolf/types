/**
   * Fired when the user's login state changes.
   */
  const onLoginStateChanged: Event<LoginStateChangedEvent>;
}

declare namespace overwolf.social.youtube {
  namespace enums {
    const enum YouTubePrivacy {
      Public = "Public",
      Unlisted = "Unlisted",
      Private = "Private",
    }

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
    title: string;
    description: string;
    trimming?: media.videos.VideoCompositionSegment;
    privacy: enums.YouTubePrivacy;
    tags?: string[];
    gameClassId?: number;
    gameTitle?: string;
    metadata?: any;
  }

  interface User {
    name: string;
    picture: string;
    id: string;
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
   * Opens the login dialog. There is no callback for this method and the only
   * way to know if the user signed in is via `onLoginStateChanged`.
   */
  function performUserLogin(): void;

  /**
   * Performs a "strong" sign out of YouTube, so that even if the user performs
   * a login via the Overwolf Settings / Accounts page, he will be considered
   * signed out.
   * @param callback
   */
  function performLogout(callback: CallbackFunction<Result>): void;

  /**
   * If the user is currently logged into YouTube, this will return user
   * information:
   * {
   *   avatar: "http://abs.twimg.com/sticky/...", id: "111111111112222222",
   *   name: "full name", screenName: "screenname123"
   * }
   * Otherwise, an error is returned.
   * @param callback Will contain user information or error if the request has
   * failed.
   */
  function getUserInfo(
    callback: CallbackFunction<GetUserInfoResult<User>>
  ): void;

  /**
   * If the user is currently logged into YouTube, this will perform the video
   * share.
   *
   * Possible errors that can occur:
   * - Disconnected (user isn't signed in)
   * - MissingFile (trying to share a missing file)
   * - UnsupportedFile (trying to share an unsupported format)
   * @param youTubeShareParams The share parameters.
   * @param callback Will contain the status of the request.
   */
  function share(
    youTubeShareParams: ShareParameters,
    callback: CallbackFunction<Result>
  ): void;

  function shareEx(
    discordShareParams: overwolf.social.youtube.ShareParameters,
    resultCallback: CallbackFunction<overwolf.social.youtube.SocialShareResult>,
    progressCallback: CallbackFunction<overwolf.social.youtube.SocialShareProgress>
  ): void;

  