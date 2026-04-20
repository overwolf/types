/**
 * Use this API to record, manage, and retrieve video replays and auto-highlights from game sessions.
 * Replay capture runs in the background; call `turnOn` to start buffering and `capture` or `startCapture`/`stopCapture` to save clips.
 * @packageDocumentation
 */

/**
   * Adds a video/image watermark to a video.
   * @param sourceVideoUrl The url of the source video in an overwolf://media form.
   * @param watermarkUrl The url of the watermark video/image in an overwolf://media form.
   * @param watermarkParams Use this object to mark the watermark
   * @param callback A callback function which will be called with the status of
   * the request and the url to the output video.
   */
  function addWatermark(
    sourceVideoUrl: string,
    watermarkUrl: string,
    watermarkParams: WatermarkParams,
    callback: CallbackFunction<FileResult>
  ): void;

}

declare namespace overwolf.media.replays {
  namespace enums {
    /** The type of replay media to capture. */
    const enum ReplayType {
      /** Video replay. */
      Video = "Video"
    }
  }

  /** Parameters for a webcam video source. */
  interface WebCamParam {
    /** The device identifier of the webcam. */
    device_id: string;
  }

  /**
   * Defines the video source settings.
   */
  interface VideoSource {
    /** The type of video source. */
    source_type: overwolf.media.enums.eSourceType;
    /** Display name of the source. */
    name: string;
    secondary_file: boolean; // Source will be saved to a secondary video file (i.e another ow-obs.exe process will be created with the same settings as the original one.
    /** Transform applied to the video source. */
    transform: overwolf.media.enums.eVideoSourceTransform;
    /** Source-specific parameters (e.g. webcam device info). */
    parameters: overwolf.media.replays.WebCamParam;
    /** Position of the source in the output frame. */
    position: { x: number, y: number }
    /** Scale factor applied to the source size. */
    size_scale: { x: number, y: number }
  }

  /**
   * Replays settings container.
   */
  interface ReplaySettings extends streaming.StreamSettings {
    /**
     * Auto highlights configuration.
     */
    highlights?: ReplayHighlightsSetting;
  }

  /**
   * Auto highlights settings.
   */
  interface ReplayHighlightsSetting {
    /**
     * Enable auto Highlights recording.
     */
    enable: boolean;
    /**
     * Array of requested highlights.
     * use ["*"] to register all features.
     */
    requiredHighlights: string[];
  }

  /** Result returned when turning off replay capture. */
  interface TurnOffResult extends Result {
    /** Human-readable description of the result. */
    description?: string;
    /** Additional metadata about the operation. */
    metadata?: string;
    /** OS version string. */
    osVersion?: string;
    /** OS build string. */
    osBuild?: string;
  }

  /** Result returned when turning on replay capture. */
  interface TurnOnResult extends Result {
    /** Human-readable description of the result. */
    description?: string;
    /** Additional metadata about the operation. */
    metadata?: string;
    /** Path to the folder where media files will be saved. */
    mediaFolder?: string;
    /** OS version string. */
    osVersion?: string;
    /** OS build string. */
    osBuild?: string;
  }

  /** Result returned when querying supported highlight features for a game. */
  interface GetHighlightsFeaturesResult extends Result {
    /** Array of supported highlight feature identifiers for the game. */
    features?: string[];
  }

  /** Result returned when querying the current replay capture state. */
  interface GetStateResult extends Result {
    /** Whether replay capture is currently active. */
    isOn?: boolean;
  }

  /** Result returned when a replay clip has been saved. */
  interface ReplayResult extends Result {
    /** Overwolf media URL to the saved replay video. */
    url?: string;
    /** File system path to the saved replay video. */
    path?: string;
    /** URL-encoded file system path to the saved replay video. */
    encodedPath?: string;
    /** Duration of the replay clip in milliseconds. */
    duration?: number;
    /** Overwolf media URL to the replay thumbnail image. */
    thumbnail_url?: string;
    /** File system path to the replay thumbnail image. */
    thumbnail_path?: string;
    /** URL-encoded file system path to the replay thumbnail image. */
    thumbnail_encoded_path?: string;
    /** Unix timestamp (ms) of when the clip starts within the recording session. */
    start_time?: number;
  }

  /** Result returned when starting a replay capture session. */
  interface StartReplayResult extends streaming.StartCaptureResult {
    status: string // backwards compatibility
    /** Human-readable description of the result. */
    description: string;
    /** Additional metadata about the capture session. */
    metadata: string;
    /** Path to the folder where media files are being saved. */
    mediaFolder: string;
    /** OS version string. */
    osVersion: string;
    /** OS build string. */
    osBuild: string;
    /** Whether the capture is sourced from the game window directly. */
    isGameWindowCapture: boolean;
  }

  /** Event data for a capture error. */
  interface CaptureErrorEvent {
    /** Status string of the capture at the time of error. */
    status: string;
    /** Identifier of the stream that encountered the error. */
    stream_id: number;
    /** Error description string. */
    error: string;
  }

  /** Event data fired when replay capture stops. */
  interface CaptureStoppedEvent {
    /** Status string at the time capture stopped. */
    status: string;
    /** Reason the capture was stopped. */
    reason: string;
    /** Additional metadata about the stopped capture. */
    metaData: string;
    /** OS version string. */
    osVersion: string;
    /** OS build string. */
    osBuild: string;
  }

  /** Event data for a capture warning. */
  interface CaptureWarningEvent {
    /** Warning identifier or code. */
    warning: string;
    /** Reason for the warning. */
    reason: string;
  }

  /** Event data fired when the replay service is started by any app. */
  interface ReplayServicesStartedEvent {
    /** Array of extension IDs that have started the replay service. */
    extensions: string[];
    /** Whether the replay service is capturing via game window capture. */
    is_game_window_capture?: boolean;
  }

  /** Event data fired when an auto-highlight clip is captured. */
  interface HighlightsCapturedEvent {
    /** The game ID for which the highlight was captured. */
    game_id: number;
    /** Identifier of the match. */
    match_id: string;
    /** Internal identifier of the match. */
    match_internal_id: string;
    /** Identifier of the current session. */
    session_id: string;
    /** Unix timestamp (ms) when the session started. */
    session_start_time: number;
    /** Unix timestamp (ms) when the match started. */
    match_start_time: number;
    /** Unix timestamp (ms) when the highlight clip starts. */
    start_time: number;
    /** Duration of the highlight clip in milliseconds. */
    duration: number;
    /** Array of event type strings that triggered this highlight. */
    events: string[];
    /** Array of raw event objects with type and timing. */
    raw_events: raw_events[];
    /** Overwolf media URL to the highlight video. */
    media_url: string;
    /** File system path to the highlight video. */
    media_path: string;
    /** URL-encoded file system path to the highlight video. */
    media_path_encoded: string;
    /** Overwolf media URL to the highlight thumbnail. */
    thumbnail_url: string;
    /** File system path to the highlight thumbnail. */
    thumbnail_path: string;
    /** URL-encoded file system path to the highlight thumbnail. */
    thumbnail_encoded_path: string;
    /** Unix timestamp (ms) of the start of the replay video containing this highlight. */
    replay_video_start_time: number;
  }

  /** A raw game event with its type and timestamp. */
  interface raw_events {
    /** Event type identifier. */
    type: string;
    /** Timestamp of the event in milliseconds relative to the session start. */
    time: number;
  }

  /**
   * Turns off background replay capturing. Call this as soon as you no longer
   * interesting in capturing, in order to free up resources.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function turnOff(callback: CallbackFunction<TurnOffResult>): void;

  /**
   * Turns on background replay capturing. Without calling it first, you will
   * not be able to create video replays. Notice that turning on replay
   * capturing will consume system resources so use it wisely.buffer_length
   * defines the amount of time in milliseconds to have captured in the memory
   * at all times.
   * @param settings The video capture settings.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function turnOn(
    settings: ReplaySettings,
    callback: CallbackFunction<TurnOnResult>
  ): void;

  /**
   * Returns whether replay capturing is turned on or off.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function getState(callback: CallbackFunction<GetStateResult>): void;

  /**
   * Returns whether replay capturing is turned on or off.
   * @deprecated Since version 0.155.
   * @param replayType The type of replay to get state for.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function getState(
    replayType: replays.enums.ReplayType,
    callback: CallbackFunction<GetStateResult>
  ): void;

  /**
   * Starts capturing a replay to a file. A replay id will be returned in the
   * callback which is needed to finish capturing the replay. You can only call
   * this method if replay mode is on and no other replay is currently being
   * captured to a file.
   * @param pastDuration The replay length, in milliseconds to include prior to
   * the time of this call.
   * @param futureDuration The replay lengh, in milliseconds to include after
   * the time of this call. To ignore it, simply give it a non-positive value
   * @param captureFinishedCallback A callback function which will be called
   * when capturing is finished, at the end of the future duration supplied to
   * this call.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function capture(
    pastDuration: number,
    futureDuration: number,
    captureFinishedCallback: CallbackFunction<ReplayResult>,
    callback: CallbackFunction<StartReplayResult>
  ): void;

  /**
   * Starts capturing a replay to a file. A replay id will be returned in the
   * callback which is needed to finish capturing the replay. You can only call
   * this method if replay mode is on and no other replay is currently being
   * captured to a file.
   * @deprecated Since version 0.155.
   * @param replayType The type of replay to capture.
   * @param pastDuration The replay length, in milliseconds to include prior to
   * the time of this call.
   * @param futureDuration The replay length, in milliseconds to include after
   * the time of this call. To ignore it, simply give it a non-positive value
   * @param captureFinishedCallback A callback function which will be called
   * when capturing is finished, at the end of the future duration supplied to
   * this call.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function capture(
    replayType: replays.enums.ReplayType,
    pastDuration: number,
    futureDuration: number,
    captureFinishedCallback: CallbackFunction<ReplayResult>,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Starts capturing a replay to a file. A replay id will be returned in the
   * callback which is needed to finish capturing the replay. You can only call
   * this method if replay mode is on and no other replay is currently being
   * captured to a file.
   * @param pastDuration The video length, in milliseconds to include prior to
   * the time of this call.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function startCapture(
    pastDuration: number,
    callback: CallbackFunction<FileResult>
  ): void;

  /**
   * Starts capturing a replay to a file. A replay id will be returned in the
   * callback which is needed to finish capturing the replay. You can only call
   * this method if replay mode is on and no other replay is currently being
   * captured to a file.
   * @deprecated Since version 0.155.
   * @param replayType The type of replay to capture.
   * @param pastDuration The video length, in milliseconds to include prior to
   * the time of this call.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function startCapture(
    replayType: replays.enums.ReplayType,
    pastDuration: number,
    callback: CallbackFunction<FileResult>
  ): void;

  /**
   * Finishes capturing a replay and returns a url to the created video file.
   * You can only call this method if replay mode is on and using a valid id of
   * a replay being captured to a file.
   * @param replayId The id of the replay you want to finish capturing.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function stopCapture(
    replayId: string,
    callback: CallbackFunction<ReplayResult>
  ): void;

  /**
   * Finishes capturing a replay and returns a url to the created video file.
   * You can only call this method if replay mode is on and using a valid id of
   * a replay being captured to a file.
   * @deprecated Since version 0.155.
   * @param replayType The type of replay to stop capture.
   * @param replayId The id of the replay you want to finish capturing.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function stopCapture(
    replayType: replays.enums.ReplayType,
    replayId: string,
    callback: CallbackFunction<FileResult>
  ): void;

  /**
   * change target sub folder of current running replay provider
   * @param replayType The type of replay to stop capture.
   * @param subFolderName the new sub folder name
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function setReplaysSubFolder(
    replayType: replays.enums.ReplayType,
    subFolderName: string,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Get supported auto highlights features for a game
   * @param gameId The id of the game you want to capture it highlights.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function getHighlightsFeatures(
    gameId: number,
    callback: CallbackFunction<GetHighlightsFeaturesResult>
  ): void;

  /**
   * Fired when an error has occurred with the capturing.
   */
  const onCaptureError: Event<CaptureErrorEvent>;

  /**
   * Fired when replay service is stopped.
   */
  const onCaptureStopped: Event<CaptureStoppedEvent>;

  /**
   * Fired on capture service warning.
   */
  const onCaptureWarning: Event<CaptureWarningEvent>;

  /**
   * Fired when the replay service is on (any other app);
   */
  const onReplayServicesStarted: Event<ReplayServicesStartedEvent>;

