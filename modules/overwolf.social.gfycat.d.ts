/**
 * Use this API to share media to Gfycat on behalf of the logged-in user.
 * @deprecated No longer in service.
 * @packageDocumentation
 */

/**
 * @deprecated No longer in service.
 */
declare namespace overwolf.social.gfycat {
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

  /** Information about the currently logged-in Gfycat user. */
  interface User {
    /** The Gfycat user ID. */
    userid: string;
    /** The email address associated with the user's Gfycat account. */
    email: string;
    /** Whether the user's email address has been verified. */
    emailVerified: boolean;
    /** URL of the user's Gfycat profile image. */
    profileImageUrl: string;
    /** The user's Gfycat username. */
    username: string;
    /** The canonical (normalized) form of the username. */
    canonicalUsername: string;
    /** Total number of views across all the user's Gfycats. */
    views: number;
    /** Number of users following this account. */
    followers: number;
    /** Number of users this account is following. */
    following: number;
    /** Number of publicly published Gfycats. */
    publishedGyfcats: number;
    /** Total number of Gfycats (including private). */
    totalGyfcats: number;
    /** The URL of the user's Gfycat profile page. */
    url: string;
  }

  /** Parameters for sharing a media file to Gfycat. */
  interface ShareParameters {
    /** Path to the media file to share. */
    file: string;
    /** Optional identifier for this share operation. */
    id?: string;
    /** Whether to use Overwolf's built-in share notifications. */
    useOverwolfNotifications: boolean;
    /** Optional trimming segment if sharing a video clip. */
    trimming?: media.videos.VideoCompositionSegment;
    /** The title to assign to the uploaded Gfycat. */
    title: string;
    /** Whether to upload the Gfycat as private. */
    privateMode: boolean;
    /** Optional list of tags to associate with the upload. */
    tags?: string[];
    /** The Overwolf game class ID related to this share, if applicable. */
    gameClassId?: number;
    /** Optional arbitrary metadata to attach to this share. */
    metadata?: any;
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
    /** The URL of the published Gfycat. */
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

  /** Shares media to Gfycat with separate result and progress callbacks.
   * @param discordShareParams The share parameters.
   * @param resultCallback Called with the final share result, including the published URL.
   * @param progressCallback Called periodically with upload progress updates.
   */
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
