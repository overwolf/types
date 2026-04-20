/**
 * Use this API to share videos to YouTube on behalf of the logged-in user, with support for privacy settings and upload progress tracking.
 * @packageDocumentation
 */

/**
   * Fired when the user's login state changes.
   */
  const onLoginStateChanged: Event<LoginStateChangedEvent>;
}

declare namespace overwolf.social.youtube {
  namespace enums {
    /** The visibility setting for a video uploaded to YouTube. */
    const enum YouTubePrivacy {
      /** The video is visible to everyone. */
      Public = "Public",
      /** The video is visible only to users who have the link. */
      Unlisted = "Unlisted",
      /** The video is visible only to the owner. */
      Private = "Private",
    }

    /** The current stage of a video share operation. */
    const enum ShareState {
      /** The share operation has started. */
      Started,
      /** The video file is being uploaded. */
      Uploading,
      /** The share operation has completed successfully. */
      Finished
    }
  }

  /** Parameters for sharing a video to YouTube. */
  interface ShareParameters {
    /** Path to the video file to share. */
    file: string;
    /** Optional identifier for this share operation. */
    id?: string;
    /** Whether to use Overwolf's built-in share notifications. */
    useOverwolfNotifications: boolean;
    /** The title to assign to the uploaded YouTube video. */
    title: string;
    /** The description to assign to the uploaded YouTube video. */
    description: string;
    /** Optional trimming segment if sharing a video clip. */
    trimming?: media.videos.VideoCompositionSegment;
    /** The privacy setting for the uploaded video. */
    privacy: enums.YouTubePrivacy;
    /** Optional list of tags to associate with the video. */
    tags?: string[];
    /** The Overwolf game class ID related to this share, if applicable. */
    gameClassId?: number;
    /** The title of the game related to this share, if applicable. */
    gameTitle?: string;
    /** Optional arbitrary metadata to attach to this share. */
    metadata?: any;
  }

  /** Information about the currently logged-in YouTube user. */
  interface User {
    /** The display name of the YouTube account. */
    name: string;
    /** URL of the user's YouTube channel profile picture. */
    picture: string;
    /** The YouTube channel ID. */
    id: string;
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
    /** The URL of the published YouTube video. */
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

  /** Shares a video to YouTube with separate result and progress callbacks.
   * @param discordShareParams The share parameters.
   * @param resultCallback Called with the final share result, including the published URL.
   * @param progressCallback Called periodically with upload progress updates.
   */
  function shareEx(
    discordShareParams: overwolf.social.youtube.ShareParameters,
    resultCallback: CallbackFunction<overwolf.social.youtube.SocialShareResult>,
    progressCallback: CallbackFunction<overwolf.social.youtube.SocialShareProgress>
  ): void;

