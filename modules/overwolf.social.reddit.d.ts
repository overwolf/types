/**
 * Use this API to share videos and posts to Reddit directly from your Overwolf app.
 * @packageDocumentation
 */

/**
   * Fired when the user's login state changes.
   */
  const onLoginStateChanged: Event<LoginStateChangedEvent>;
}

declare namespace overwolf.social.reddit {
  namespace enums {
    /** Represents the current state of a share operation. */
    const enum ShareState {
      /** The share operation has started. */
      Started,
      /** The file is currently being uploaded. */
      Uploading,
      /** The share operation has finished. */
      Finished
    }
  }

  /** Represents a Reddit post flair. */
  interface Flair {
    /** The unique identifier of the flair. */
    id: string;
    /** The display text of the flair. */
    text: string;
    /** Whether this flair is restricted to moderators only. */
    mod_only: boolean;
    /** The type of content the flair allows (e.g. `"all"`, `"link"`, `"text"`). */
    allowable_content: string;
  }

  /** Parameters for sharing a video to a subreddit. */
  interface ShareParameters {
    /**
     * The file to share.
     */
    file: string;
    /**
     * The subreddit to which the file will be shared.
     */
    id?: string;
    /** Whether to display Overwolf notifications during the share. */
    useOverwolfNotifications: boolean;
    /** The name of the subreddit to share to (without the `r/` prefix). */
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

    /** The flair to apply to the post, if any. */
    flair_id?: Flair;
  }

  /** Parameters for creating a text post on a subreddit. */
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
    /** The flair to apply to the post, if any. */
    flair_id?: Flair;
  }

  /** Represents a Reddit user account. */
  interface User {
    /** The URL of the user's avatar image. */
    avatar: string;
    /** The user's display name (e.g. `u/foobar`). */
    displayName: string;
    /** The user's Reddit username. */
    name: string;
  }

  /** Represents a Reddit subreddit. */
  interface Subreddit {
    /** The number of subscribers the subreddit has. */
    numSubscribers: number;
    /** The internal name of the subreddit (without the `r/` prefix). */
    name: string;
    /** The human-readable display name of the subreddit. */
    displayName: string;
    /** The post types allowed in this subreddit. */
    allowedPostTypes: RedditAllowedPostTypes;
    /** The URL of the subreddit's community icon image. */
    communityIcon: string;
  }

  /** Describes which post types are permitted in a subreddit. */
  interface RedditAllowedPostTypes {
    /** Whether image posts are allowed. */
    images: boolean;
    /** Whether text posts are allowed. */
    text: boolean;
    /** Whether video posts are allowed. */
    videos: boolean;
    /** Whether link posts are allowed. */
    links: boolean;
    /** Whether spoiler-tagged posts are allowed. */
    spoilers: boolean;
  }

  /** Result of a `searchSubreddits` call. */
  interface SearchSubredditsResult extends Result {
    /** The list of subreddits matching the search query, if the request was successful. */
    subreddits?: Subreddit[];
  }

  /** Event data for a failed share attempt. */
  interface ShareFailedEvent {
    /** A string identifying the error that occurred. */
    error: string;
    /** Additional details about the error, if available. */
    details?: string;
  }

  /** Reports the progress of an ongoing share operation. */
  interface SocialShareProgress extends Result {
    /** The upload progress as a percentage (0–100). */
    progress: number;
    /** The identifier of the share operation. */
    id: string;
    /** The current state of the share operation. */
    state: enums.ShareState;
  }

  /** Result of a successful share operation. */
  interface SocialShareResult extends Result {
    /** The URL of the shared post on Reddit. */
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

  /**
   * Shares a media file to a subreddit with separate result and progress callbacks.
   * @param discordShareParams The share parameters.
   * @param resultCallback Called with the final share result, including the URL of the published post.
   * @param progressCallback Called periodically with upload progress updates.
   */
  function shareEx(
    discordShareParams: overwolf.social.reddit.ShareParameters,
    resultCallback: CallbackFunction<overwolf.social.reddit.SocialShareResult>,
    progressCallback: CallbackFunction<overwolf.social.reddit.SocialShareProgress>
  ): void;

  /**
   * Posts a link or text post to a subreddit.
   * @param redditShareParams The post parameters, including the subreddit, title, and content.
   */
  function post(
    redditShareParams: overwolf.social.reddit.PostParameters
  ): void;

  /**
   * Fired when the user's login state changes.
   */
  const onLoginStateChanged: Event<LoginStateChangedEvent>;

