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
    const enum PostPermission {
      None = 0,
      Text,
      File,
    }

    const enum ShareState {
      Started,
      Uploading,
      Finished
    }
  }

  interface User {
    id: string;
    discriminator: number;
    username: string;
    email: string;
    avatar?: string;
    verified: boolean;
  }

  interface Guild {
    icon?: string;
    id: string;
    name: string;
    owner_id?: string;
    roles?: Role[];
  }

  interface Role {
    id: string;
    name: string;
    permissions: number;
  }

  interface Channel {
    guild_id: string;
    id: string;
    name: string;
    parent_id?: string;
    permission_overwrites: PermissionOverwrite[];
    type: number;
    user_post_permission: enums.PostPermission;
  }

  interface PermissionOverwrite {
    id: string;
    type: string;
    allow: number;
    deny: number;
  }

  interface ShareParameters {
    /** The file to share.
    * Note: Since version 0.153, the "file" param is optional when calling overwolf.social.discord.share(). Instead, you can use the "message" param to include a URL of a file that you want to share.*/
    file?: string;
    channelId: string;
    id?: string;
    useOverwolfNotifications: boolean;
    message: string;
    /** An object containing start time and end time for the desired VideoCompositionSegment */
    trimming?: media.videos.VideoCompositionSegment;
    events?: string[];
    gameClassId?: number;
    gameTitle?: string;
    /** Extra information about the game session (How is this used?) */
    metadata?: any;
  }

  interface PostParameters {
    channelId: string;
    message: string;
  }

  interface SocialShareProgress extends Result {
    progress: number;
    id: string;
    state: enums.ShareState;
  }

  interface SocialShareResult extends Result {
    url: string;
  }

  interface GetGuildsResult extends Result {
    guilds?: Guild[];
  }

  interface GetChannelsResult extends Result {
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

  function shareEx(
    discordShareParams: overwolf.social.discord.ShareParameters,
    resultCallback: CallbackFunction<SocialShareResult>,
    progressCallback: CallbackFunction<SocialShareProgress>
  ): void;

  function post(
    discordPostParams: overwolf.social.discord.PostParameters
  ): void;

  /**
   * Fired when the user's login state changes.
   */
  const onLoginStateChanged: Event<LoginStateChangedEvent>;
}

