/**
 * Use this API to share media and messages to Discord directly from your Overwolf app.
 * @packageDocumentation
 */

/**
   * Checks which of the supported sharing services are disabled or enabled.
   * @param callback Returns a list of disabled services
   */
  function getDisabledServices(callback: CallbackFunction<GetDisabledServicesResult<void>>): void;

  function uploadVideo(uploadParams: VideoUploadParams, resultCallback: CallbackFunction<VideoUploadResult>, progressCallback: CallbackFunction<VideoUploadProgress>): void;

  function cancelUpload(id: string, resultCallback: CallbackFunction<Result>): void;
}

declare namespace overwolf.social.discord {
  namespace enums {
    /** Represents the posting permissions available for a Discord channel. */
    const enum PostPermission {
      /** No posting permission. */
      None = 0,
      /** Permission to post text messages. */
      Text,
      /** Permission to post files (images or videos). */
      File,
    }

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

  /** Represents a Discord user account. */
  interface User {
    /** The unique Discord user ID. */
    id: string;
    /** The user's discriminator number (the four digits after the `#`). */
    discriminator: number;
    /** The user's Discord username. */
    username: string;
    /** The user's email address. */
    email: string;
    /** The user's avatar hash, if set. */
    avatar?: string;
    /** Whether the user's email address has been verified. */
    verified: boolean;
  }

  /** Represents a Discord guild (server). */
  interface Guild {
    /** The guild's icon hash, if set. */
    icon?: string;
    /** The unique guild ID. */
    id: string;
    /** The name of the guild. */
    name: string;
    /** The ID of the guild owner, if available. */
    owner_id?: string;
    /** The list of roles defined in the guild, if available. */
    roles?: Role[];
  }

  /** Represents a Discord role within a guild. */
  interface Role {
    /** The unique role ID. */
    id: string;
    /** The name of the role. */
    name: string;
    /** The permissions bitfield for this role. */
    permissions: number;
  }

  /** Represents a Discord channel within a guild. */
  interface Channel {
    /** The ID of the guild this channel belongs to. */
    guild_id: string;
    /** The unique channel ID. */
    id: string;
    /** The name of the channel. */
    name: string;
    /** The ID of the parent category channel, if any. */
    parent_id?: string;
    /** The list of permission overwrites applied to this channel. */
    permission_overwrites: PermissionOverwrite[];
    /** The channel type as a numeric value. */
    type: number;
    /** The current user's post permission level for this channel. */
    user_post_permission: enums.PostPermission;
  }

  /** Represents a permission overwrite entry for a Discord channel. */
  interface PermissionOverwrite {
    /** The ID of the role or user this overwrite applies to. */
    id: string;
    /** Whether this overwrite applies to a role or a member. */
    type: string;
    /** Bitfield of permissions that are explicitly allowed. */
    allow: number;
    /** Bitfield of permissions that are explicitly denied. */
    deny: number;
  }

  /** Parameters for sharing media to a Discord channel. */
  interface ShareParameters {
    /** The file to share.
    * Note: Since version 0.153, the "file" param is optional when calling overwolf.social.discord.share(). Instead, you can use the "message" param to include a URL of a file that you want to share.*/
    file?: string;
    /** The ID of the Discord channel to share to. */
    channelId: string;
    /** An optional identifier for the share operation. */
    id?: string;
    /** Whether to display Overwolf notifications during the share. */
    useOverwolfNotifications: boolean;
    /** The text message to accompany the shared media. */
    message: string;
    /** An object containing start time and end time for the desired VideoCompositionSegment */
    trimming?: media.videos.VideoCompositionSegment;
    /** An array of event labels associated with the captured clip. */
    events?: string[];
    /** The class ID of the associated game. */
    gameClassId?: number;
    /** The title of the associated game. */
    gameTitle?: string;
    /** Extra information about the game session (How is this used?) */
    metadata?: any;
  }

  /** Parameters for posting a text message to a Discord channel. */
  interface PostParameters {
    /** The ID of the Discord channel to post to. */
    channelId: string;
    /** The text content of the post. */
    message: string;
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
    /** The URL of the shared content on Discord. */
    url: string;
  }

  /** Result of a `getGuilds` call. */
  interface GetGuildsResult extends Result {
    /** The list of guilds the user belongs to, if the request was successful. */
    guilds?: Guild[];
  }

  /** Result of a `getChannels` call. */
  interface GetChannelsResult extends Result {
    /** The list of channels in the guild that the user can post to, if the request was successful. */
    channels?: Channel[];
  }

  /**
   * Opens the login dialog. There is no callback for this method and the only
   * way to know if the user signed in is via `onLoginStateChanged`.
   */
  function performUserLogin(): void;

  /**
   * Performs a "strong" sign out of Discord, so that even if the user performs
   * a login via the Overwolf Settings / Accounts page, they will be considered
   * signed out.
   * @param callback
   */
  function performLogout(callback: CallbackFunction<Result>): void;

  /**
   * If the user is currently logged into Discord, this will return user
   * information. Otherwise, an error is returned.
   * @param callback Will contain user information or error if the request has
   * failed.
   */
  function getUserInfo(
    callback: CallbackFunction<GetUserInfoResult<User>>
  ): void;

  /**
   * If the user is currently logged into Discord, this will return the guilds
   * that the user is registered to. Otherwise, an error is returned
   * @param callback Will contain guild (server) information or error if the
   * request has failed.
   */
  function getGuilds(callback: CallbackFunction<GetGuildsResult>): void;

  /**
   * If the user is currently logged into Discord, this will return the channels
   * of the given `guildId`, for which the user has privileges to share
   * images/videos to. Otherwise, an error is returned
   * @param guildId The id of the guild
   * @param callback Will contain guild (server) channels or error if the
   * request has failed.
   */
  function getChannels(
    guildId: string,
    callback: CallbackFunction<GetChannelsResult>
  ): void;

  /**
   * If the user is currently logged into Discord, this will perform the media
   * share (image or video).Possible errors that can occur:- Disconnected (user
   * isn't signed in)- MissingFile (trying to share a missing file)-
   * UnsupportedFile (trying to share an unsupported format)- ExceedsMaxSize
   * (the file is too large: > 8 MB for images, > 100 MBfor videos)
   * @param discordShareParams The share parameters. See DiscordShareParameters
   * @param callback Will contain the status of the request.
   */
  function share(
    discordShareParams: overwolf.social.discord.ShareParameters,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Shares a media file to a Discord channel with separate result and progress callbacks.
   * @param discordShareParams The share parameters.
   * @param resultCallback Called with the final share result, including the URL of the shared content.
   * @param progressCallback Called periodically with upload progress updates.
   */
  function shareEx(
    discordShareParams: overwolf.social.discord.ShareParameters,
    resultCallback: CallbackFunction<SocialShareResult>,
    progressCallback: CallbackFunction<SocialShareProgress>
  ): void;

  /**
   * Posts a text message to a Discord channel.
   * @param discordPostParams The post parameters, including the channel ID and message text.
   */
  function post(
    discordPostParams: overwolf.social.discord.PostParameters
  ): void;

  /**
   * Fired when the user's login state changes.
   */
  const onLoginStateChanged: Event<LoginStateChangedEvent>;
}
