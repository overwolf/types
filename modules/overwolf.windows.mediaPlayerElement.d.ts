/**
   * Fired when native window (or OSR on desktop) moved to other monitoror when current monitor resolution changed
   */
  const onScreenPropertyChanged: Event<onScreenPropertyChangedEvent>;
}

declare namespace overwolf.windows.mediaPlayerElement {
  interface CreateResult extends Result {
    id?: number;
  }

  interface SetVideoResult extends Result {
    duration?: number;
  }

  interface GetProgressResult extends Result {
    progress?: number;
  }

  interface PlaybackEvent {
    id: number;
  }

  /**
   * Creates a media player a places it in the given location with given
   * dimensions.
   * @param x The top position of the player.
   * @param y The left position of the player.
   * @param width The width of the player.
   * @param height The height of the player.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function create(
    x: number,
    y: number,
    width: number,
    height: number,
    callback: CallbackFunction<CreateResult>
  ): void;

  /**
   * Remove all media players created for this window.
   */
  function removeAllPlayers(): void;

  /**
   * Relocates the media player to a given location with given dimensions.
   * @param id The id of the player.
   * @param x The top position of the player.
   * @param y The left position of the player.
   * @param width The width of the player.
   * @param height The height of the player.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function setBounds(
    id: number,
    x: number,
    y: number,
    width: number,
    height: number,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Sets the current video to be played.
   * @param id The id of the player.
   * @param videoUrl An url to the video.
   * @param callback A callback function which will be called with the status of
   * the request. If successful, the callback will contain the total seconds in
   * the video.
   */
  function setVideo(
    id: number,
    videoUrl: string,
    callback: CallbackFunction<SetVideoResult>
  ): void;

  /**
   * Plays the current video.
   * @param id The id of the player.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function play(id: number, callback: CallbackFunction<Result>): void;

  /**
   * Pauses the current video.
   * @param id The id of the player.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function pause(id: number, callback: CallbackFunction<Result>): void;

  /**
   * Resumes the current video.
   * @param id The id of the player.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function resume(id: number, callback: CallbackFunction<Result>): void;

  /**
   * Sets the volume.
   * @param id The id of the player.
   * @param volume A volume between 0 and 100 (inclusive).
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function setVolume(
    id: number,
    volume: number,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Stops the current video.
   * @param id The id of the player.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function stop(id: number, callback: CallbackFunction<Result>): void;

  /**
   * Seeks the current video to the given number of seconds.
   * @param id The id of the player.
   * @param seconds The numbers of seconds to seek to.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function seek(
    id: number,
    seconds: number,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Gets the current progress, in seconds, of the playback.
   * @param id The id of the player.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function getProgress(
    id: number,
    callback: CallbackFunction<GetProgressResult>
  ): void;

  /**
   * Sets the speed ratio of the playback.
   * @param id The id of the player.
   * @param speedRatio The speed ratio of the playback. A double between 0 and
   * 16 (inclusive).
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function setPlaybackSpeed(
    id: number,
    speedRatio: number,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Sends the media player to the front of the window.
   * @param id The id of the player.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function toFront(id: number, callback: CallbackFunction<Result>): void;

  /**
   * Sends the media player to the back of the window.
   * @param id The id of the player.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function toBack(id: number, callback: CallbackFunction<Result>): void;

  /**
   * Sets the stretch mode of the player.
   * @param id The id of the media player.
   * @param stretchMode The desired stretch mode, see
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function setStretchMode(
    id: number,
    stretchMode: any,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Fired when playback is starting/resuming.
   */
  const onPlaybackStarted: Event<PlaybackEvent>;

  /**
   * Fired when playback is paused.
   */
  const onPlaybackPaused: Event<PlaybackEvent>;

  /**
   * Fired when playback is stopped.
   */
  const onPlaybackStopped: Event<PlaybackEvent>;

  /**
   * Fired when playback ends.
   */
  const onPlaybackEnded: Event<PlaybackEvent>;

  /**
   * Fired when there was an error while trying to open a video.
   */
  const onPlaybackError: Event<PlaybackEvent>;
}

