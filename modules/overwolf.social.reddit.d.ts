/**
   * Fired when the user's login state changes.
   */
  const onLoginStateChanged: Event<LoginStateChangedEvent>;
}

declare namespace overwolf.social.reddit {
  namespace enums {
    const enum ShareState {
      Started,
      Uploading,
      Finished
    }
  }

  interface Flair {
    id: string;
    text: string;
    mod_only: boolean;
    allowable_content: string;
  }

  interface ShareParameters {
    /**
     * The file to share.
     */
    file: string;
    /**
     * The subreddit to which the file will be shared.
     */
    id?: string;
    useOverwolfNotifications: boolean;
    subreddit: string;
    /**
     * The shared video's title.
     */
    title: string;
    /**
     * The shared video's description.
     */
    description: string;
    /**
     * An object containing start time and end time for the desired video
     * segment.
     * Optional parameter.
     */
    trimming?: media.videos.VideoCompositionSegment;
    /**
     * An array of chronological events that occurred during the capture.
     * Optional parameter.
     */
    tags?: string[];
    /**
     * The associated game's class ID.
     * Optional parameter.
     */
    gameClassId?: number;
    /**
     * The associated game's title.
     * Optional parameter.
     */
    gameTitle?: string;
    /**
     * Extra information about the game session.
     * Optional parameter.
     */
    metadata?: any;

    flair_id?: Flair;
  }

  interface PostParameters {
    /**
     * The subreddit to which the post will be shared.
     */
    subreddit: string;
    /**
     * The shared post's title.
     */
    title: string;
    /**
     * The shared post's content.
     */
    content: string;
    flair_id?: Flair;
  }


  interface User {
    avatar: string;
    displayName: string;
    name: string;
  }

  interface Subreddit {
    numSubscribers: number;
    name: string;
    displayName: string;
    allowedPostTypes: RedditAllowedPostTypes;
    communityIcon: string;
  }

  interface RedditAllowedPostTypes {
    images: boolean;
    text: boolean;
    videos: boolean;
    links: boolean;
    spoilers: boolean;
  }

  interface SearchSubredditsResult extends Result {
    subreddits?: Subreddit[];
  }

  interface ShareFailedEvent {
    error: string;
    details?: string;
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
   * Returns a list of flairs supported by the given subreddit
   * @param subredditName The given subreddit
   * @param callback Will contain  a list of flairs supported by the given subreddit
   */
  function getSubredditFlairs(
    subredditName: string,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Opens the login dialog. There is no callback for this method and the only
   * way to know if the user signed in is via `onLoginStateChanged`.
   */
  function performUserLogin(): void;

  /**
   * Performs a "strong" sign out of Reddit, so that even if the user performs
   * a login via the Overwolf Settings / Accounts page, he will be considered
   * signed out.
   * @param callback
   */
  function performLogout(callback: CallbackFunction<Result>): void;

  /**
   * If the user is currently logged into Reddit, this will return user
   * information:
   * {
   *   userInfo: {
   *     avatar: "http://abs.twimg.com/sticky/...",
   *     displayName: "u/foobar",
   *     name: "foobar"
   *   }
   * }
   * Otherwise, an error is returned.
   * @param callback Will contain user information or error if the request has
   * failed.
   */
  function getUserInfo(
    callback: CallbackFunction<GetUserInfoResult<User>>
  ): void;

  /**
   * Search for subreddits whose names begin with a substring.
   * @param query The search string.
   * @param callback Will contain an array of subreddits that match the search
   * string.
   */
  function searchSubreddits(
    query: string,
    callback: CallbackFunction<SearchSubredditsResult>
  ): void;

  /**
   * If the user is currently logged into Reddit, this will perform the video
   * share.
   *
   * Possible errors that can occur:
   * - Disconnected (user isn't signed in)
   * - MissingFile (trying to share a missing file)
   * - UnsupportedFile (trying to share an unsupported format)
   * @param redditShareParams The share parameters.
   * @param callback Will contain the status of the request.
   */
  function share(
    redditShareParams: ShareParameters,
    callback: CallbackFunction<Result>
  ): void;

  function shareEx(
    discordShareParams: overwolf.social.reddit.ShareParameters,
    resultCallback: CallbackFunction<overwolf.social.reddit.SocialShareResult>,
    progressCallback: CallbackFunction<overwolf.social.reddit.SocialShareProgress>
  ): void;

  function post(
    redditShareParams: overwolf.social.reddit.PostParameters
  ): void;

  /**
   * Fired when the user's login state changes.
   */
  const onLoginStateChanged: Event<LoginStateChangedEvent>;

  