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
    const enum ReplayType {
      Video = "Video"
    }
  }

  interface WebCamParam {
    device_id: string;
  }

  /**
   * Defines the video source settings.
   */
  interface VideoSource {
    source_type: overwolf.media.enums.eSourceType;
    name: string;
    secondary_file: boolean; // Source will be saved to a secondary video file (i.e another ow-obs.exe process will be created with the same settings as the original one.
    transform: overwolf.media.enums.eVideoSourceTransform;
    parameters: overwolf.media.replays.WebCamParam;
    position: { x: number, y: number }
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

  interface TurnOffResult extends Result {
    description?: string;
    metadata?: string;
    osVersion?: string;
    osBuild?: string;
  }

  interface TurnOnResult extends Result {
    description?: string;
    metadata?: string;
    mediaFolder?: string;
    osVersion?: string;
    osBuild?: string;
  }

  interface GetHighlightsFeaturesResult extends Result {
    features?: string[];
  }

  interface GetStateResult extends Result {
    isOn?: boolean;
  }

  interface ReplayResult extends Result {
    url?: string;
    path?: string;
    encodedPath?: string;
    duration?: number;
    thumbnail_url?: string;
    thumbnail_path?: string;
    thumbnail_encoded_path?: string;
    start_time?: number;
  }

  interface StartReplayResult extends streaming.StartCaptureResult {
    status: string // backwards compatibility
    description: string;
    metadata: string;
    mediaFolder: string;
    osVersion: string;
    osBuild: string;
    isGameWindowCapture: boolean;
  }

  interface CaptureErrorEvent {
    status: string;
    stream_id: number;
    error: string;
  }

  interface CaptureStoppedEvent {
    status: string;
    reason: string;
    metaData: string;
    osVersion: string;
    osBuild: string;
  }

  interface CaptureWarningEvent {
    warning: string;
    reason: string;
  }

  interface ReplayServicesStartedEvent {
    extensions: string[];
    is_game_window_capture?: boolean;
  }

  interface HighlightsCapturedEvent {
    game_id: number;
    match_id: string;
    match_internal_id: string;
    session_id: string;
    session_start_time: number;
    match_start_time: number;
    start_time: number;
    duration: number;
    events: string[];
    raw_events: raw_events[];
    media_url: string;
    media_path: string;
    media_path_encoded: string;
    thumbnail_url: string;
    thumbnail_path: string;
    thumbnail_encoded_path: string;
    replay_video_start_time: number;
  }

  interface raw_events {
    type: string;
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

  