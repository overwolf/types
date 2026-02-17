/**
   * Triggered when an error occurs, sent with an error code.
   */
  const onError: Event<string>;
}

declare namespace overwolf.streaming {
  namespace enums {
    const enum CaptureErrorCode {
      Success = 0,
      FolderCreation = 1,
      RansomwareProtection = 2,
      AlreadyStreaming = 3,
      MissingSetting = 4,
      SettingError = 5,
      InternalOBSError = 6,
      NotAllowedInGame = 7,
      HighPerformanceCaptureNotSupported = 8,
      NotInGame = 9,
      Unknown = 1000
    }

    const enum StreamMouseCursor {
      both = "both",
      gameOnly = "gameOnly",
      desktopOnly = "desktopOnly",
      none = "none"
    }

    const enum ObsStreamingMode {
      OBSNoAwareness = "OBSNoAwareness",
      OBSAwareness = "OBSAwareness",
      OBSAwarenessHideFromDeskTop = "OBSAwarenessHideFromDeskTop",
    }

    const enum StreamingProvider {
      Unknown = "Unknown",
      Twitch = "Twitch",
      VideoRecorder = "VideoRecorder",
      RTMP = "RTMP",
    }

    const enum StreamingMode {
      WhenVisible = "WhenVisible",
      Always = "Always",
      Never = "Never",
    }

    const enum StreamEncoder {
      INTEL = "INTEL",
      X264 = "X264",
      NVIDIA_NVENC = "NVIDIA_NVENC",
      NVIDIA_NVENC_NEW = "NVIDIA_NVENC_NEW",
      AMD_AMF = "AMD_AMF",
    }

    const enum StreamEncoderPreset_Intel {
      LOW = "LOW",
      MEDIUM = "MEDIUM",
      HIGH = "HIGH",
    }

    const enum StreamEncoderPreset_x264 {
      ULTRAFAST = "ULTRAFAST",
      SUPERFAST = "SUPERFAST",
      VERYFAST = "VERYFAST",
      FASTER = "FASTER",
      FAST = "FAST",
      MEDIUM = "MEDIUM",
      SLOW = "SLOW",
      SLOWER = "SLOWER",
      VERYSLOW = "VERYSLOW",
      PLACEBO = "PLACEBO",
    }

    const enum StreamEncoderPreset_AMD_AMF {
      AUTOMATIC = "AUTOMATIC",
      BALANCED = "BALANCED",
      SPEED = "SPEED",
      QUALITY = "QUALITY",
      ULTRA_LOW_LATENCY = "ULTRA_LOW_LATENCY",
      LOW_LATENCY = "LOW_LATENCY",
    }

    const enum StreamEncoderRateControl_AMD_AMF {
      RC_CBR = "RC_CBR",
      RC_CQP = "RC_CQP",
      RC_VBR = "RC_VBR",
      RC_VBR_MINQP = "RC_VBR_MINQP",
    }

    const enum StreamEncoderPreset_NVIDIA {
      AUTOMATIC = "AUTOMATIC",
      DEFAULT = "DEFAULT",
      HIGH_QUALITY = "HIGH_QUALITY",
      HIGH_PERFORMANCE = "HIGH_PERFORMANCE",
      BLURAY_DISK = "BLURAY_DISK",
      LOW_LATENCY = "LOW_LATENCY",
      HIGH_PERFORMANCE_LOW_LATENCY = "HIGH_PERFORMANCE_LOW_LATENCY",
      HIGH_QUALITY_LOW_LATENCY = "HIGH_QUALITY_LOW_LATENCY",
      LOSSLESS = "LOSSLESS",
      HIGH_PERFORMANCE_LOSSLESS = "HIGH_PERFORMANCE_LOSSLESS",
    }

    const enum StreamEncoderRateControl_NVIDIA {
      RC_CBR = "RC_CBR",
      RC_CQP = "RC_CQP",
      RC_VBR = "RC_VBR",
      RC_VBR_MINQP = "RC_VBR_MINQP",
      RC_2_PASS_QUALITY = "RC_2_PASS_QUALITY",
    }

    const enum StreamEncoderRateControl_x264 {
      RC_CBR = "RC_CBR",
      RC_CQP = "RC_CQP",
      RC_VBR = "RC_VBR",
      RC_VBR_MINQP = "RC_VBR_MINQP",
      RC_2_PASS_QUALITY = "RC_2_PASS_QUALITY",
    }

    const enum IndicationPosition {
      None = "None",
      TopLeftCorner = "TopLeftCorner",
      TopRightCorner = "TopRightCorner",
      BottomLeftCorner = "BottomLeftCorner",
      BottomRightCorner = "BottomRightCorner",
    }

    const enum IndicationType {
      NoIndication = "NoIndication",
      Dot = "Dot",
      DotAndTimer = "DotAndTimer",
    }

    const enum eVideoBaseFrameSizeSource {
      Auto = "Auto",
      Setting = "Setting",
    }

    const enum eVideoFrameSizeCalcMethod {
      Original = "Original",
      ExactOrKeepRatio = "ExactOrKeepRatio",
      ExactOrClosestResolution = "ExactOrClosestResolution",
    }
  }

  /**
   * Stream settings container.
   */
  interface GetWindowStreamingModeResult extends Result {
    streaming_mode?: string;
  }

  /**
   * Stream settings container.
   */
  interface StreamSettings {
    /**
     * The stream provider name.
     */
    provider?: enums.StreamingProvider;
    /**
     * The stream provider settings.
     */
    settings?: StreamParams;
  }

  /**
   * Represents the settings required to start a stream.
   */
  interface StreamParams {
    /**
     * The replay type to use.
     */
    replay_type?: media.replays.enums.ReplayType;
    /**
     * The basic stream information.
     */
    stream_info?: StreamInfo;
    /**
     * Stream authorization data.
     */
    auth?: StreamAuthParams;
    /**
     * Stream video options.
     */
    video?: StreamVideoOptions;
    /**
     * Stream audio options.
     */
    audio?: StreamAudioOptions;
    /**
     * Defines how peripherals (i.e. mouse cursor) are streamed.
     */
    peripherals?: StreamPeripheralsCaptureOptions;
    /**
     * Information on the server that is being streamed to.
     */
    ingest_server?: StreamIngestServer;
    /**
     * Max media folder size in GB. Deprecated
     */
    max_quota_gb?: number;

    /**
     * Quota information
     */
    quota?: StreamQuotaParams;
  }

  interface StreamInfo {
    /**
     * The URL where the stream can be watched.
     */
    url?: string;
    /**
     * The stream title.
     */
    title?: string;
  }

  /**
   * Stream authorization data.
   */
  interface StreamAuthParams {
    /**
     * The client id part of the authorization data. This part is usually
     * constant for each application.
     */
    client_id?: string;
    /**
     * The token part of the authorization data. This part if usually
     * user-specific, and received after login.
     */
    token?: string;
  }

  /**
   * Stream video options.
   */
  interface StreamVideoOptions {
    /**
     * Defines if to try to automatically calculate the kbps. If set to true,
     * then the max_kbps field is ignored.
     */
    auto_calc_kbps?: boolean;
    /**
     * Defines the Frames Per Second for the stream.
     */
    fps?: number;
    /**
     * Defines the stream width in pixels.
     */
    width?: number;
    /**
     * Defines the stream height in pixels.
     */
    height?: number;
    /**
     * Defines the maximum KB per second of the stream.
     */
    max_kbps?: number;
    /**
     * Defines the length of the buffer to be recorded in millisenconds (max 40
     * seconds)
     */
    buffer_length?: number;
    /**
     * The interval, in milliseconds, in which to test for dropped frames.
     */
    test_drop_frames_interval?: number;
    /**
     * The ratio of dropped to non-dropped frames for which to issue a
     * notification.
     */
    notify_dropped_frames_ratio?: number;
    /**
     * Defines file maximum size. when video reach `max_file_size_bytes`, the
     * recorder will flash the video file and stat a new video file.
     * `onFileSpilt` event will be fired.
     */
    max_file_size_bytes?: number;
    /**
     * In case `max_file_size_bytes` is on, full video will be recorded to disk,
     * parallel to splits videos.
     */
    include_full_size_video?: boolean;
    /**
     * Defines Sub folder for video file path destination (Optional).
     * OverwolfVideoFolder\AppName\<sub_folder_name>\<file_name> In case
     * `folder_name` is empty: `OverwolfVideoFolder\AppName\<sub_folder_name>`
     */
    sub_folder_name?: string;
    /**
     * Defines the video encoder settings to use.
     */
    encoder?: StreamingVideoEncoderSettings;
    /**
     * Defines the desktop streaming options.
     */
    capture_desktop?: StreamDesktopCaptureOptions;
    /**
     * Do not use Overwolf capture setting. In case True you must provider all
     * video setting (encoder..)
     */
    override_overwolf_setting?: boolean;
    /**
     * Do not start video replay service in case shared texture is not
     * supported.
     */
    disable_when_sht_not_supported?: boolean;
    /**
     * Position of the recorder indicator. Available for video capture only.
     */
    indication_position?: enums.IndicationPosition;
    /**
     * Type of the recorder indicator. Available for video capture only.
     */
    indication_type?: enums.IndicationType;

    /**
     *  use the app "short name" as the folder name, instead of using the app name from the manifest.
     */
    use_app_display_name?: boolean;

    /**
     * Add sources to video (currently only webcam is supported)
     */
    sources?: overwolf.media.replays.VideoSource[];

    /**
     *
     */
    frame_size_method?: enums.eVideoFrameSizeCalcMethod;

    /**
     *
     */
    base_frame_size_source?: enums.eVideoBaseFrameSizeSource;

    /**
     *
     */
    enable_on_demand_split?: boolean;

    /**
     *
     */
    game_window_capture?: GameWindowCapture;
    /**
     * Keep capturing the game when the game loses focus (i.e do not show "Be Right Back").
     * Note: if game is minimized, BRB will be shown.
     */
    keep_game_capture_on_lost_focus?: boolean;


    /**
     * Disables automatic shutdown of the streaming API once the targeted game session ended.
     */
    disable_auto_shutdown_on_game_exit?: boolean;
  }

  /**
   * Game window capture options.
   */
  interface GameWindowCapture {
    enable_when_available: boolean; //Disabled by default
    capture_overwolf_windows: boolean; //Default value is taken from the Overwolf Settings
  }

  /**
   * Defines the video encoder settings.
   */
  interface StreamingVideoEncoderSettings {
    /**
     * Defines which video encoder to use.
     */
    name?: enums.StreamEncoder;
    /**
     * Defines the settings of the specific encoder.
     */
    config?:
    | StreamingVideoEncoderNVIDIA_NVENCSettings
    | StreamingVideoEncoderIntelSettings
    | StreamingVideoEncoderx264Settings
    | StreamingVideoEncoderAMD_AMFSettings;
  }

  /**
   * Defines the configuration for the NVIDIA NVENC encoder.
   */
  interface StreamingVideoEncoderNVIDIA_NVENCSettings {
    /**
     * Defines which preset the encoder should use.
     */
    preset?: enums.StreamEncoderPreset_NVIDIA;
    /**
     * Defines the rate control mode the encoder should use.
     */
    rate_control?: enums.StreamEncoderRateControl_NVIDIA;
    /**
     * Defines the time, in seconds, after which to send a keyframe.
     */
    keyframe_interval: number;
  }

  /**
   * Defines the configuration for an Intel encoder.
   */
  interface StreamingVideoEncoderIntelSettings { }

  /**
   * Defines the configuration for an x264 encoder.
   */
  interface StreamingVideoEncoderx264Settings {
    /**
     * Defines which preset the encoder should use.
     */
    preset?: enums.StreamEncoderPreset_x264;
    /**
     * Defines the rate control mode the encoder should use.
     */
    rate_control?: enums.StreamEncoderRateControl_x264;
    /**
     * Defines the number of frames after which to send a keyframe.
     */
    keyframe_interval: number;
  }

  /**
   * Defines the configuration for the AMD AMF encoder.
   */
  interface StreamingVideoEncoderAMD_AMFSettings {
    /**
     * Defines which preset the encoder should use.
     */
    preset?: enums.StreamEncoderPreset_AMD_AMF;
    /**
     * Defines the rate control mode the encoder should use.
     */
    rate_control?: enums.StreamEncoderRateControl_AMD_AMF;
    /**
     * Defines the time, in seconds, after which to send a keyframe.
     */
    keyframe_interval: number;
  }

  /**
   * Stream desktop capture options.
   */
  interface StreamDesktopCaptureOptions {
    /**
     * Defines if to capture the desktop while game is not running or not in
     * focus.
     */
    enable: boolean;
    /**
     * Defines which monitor to stream when streaming desktop.
     */
    monitor_id?: number;
    /**
     * Defines if to force desktop streaming even when a game is in foreground.
     */
    force_capture?: boolean;
  }

  /**
   * Stream audio options.
   */
  interface StreamAudioOptions {
    /**
     * Defines the microphone volume as applied to the stream.
     */
    mic?: StreamDeviceVolume;
    /**
     * Defines the microphone volume as applied to the stream in a range of 0 to 100.
     */
    mic_volume?: number;
    /**
     * Defines the game volume as applied to the stream.
     */
    game?: GameAudioDevice;
    /**
     * Defines the game volume as applied to the stream in a range of 0 to 100.
     */
    game_volume?: number;
    /**
    * Enable multiple audio tracks: Track 1: Microphone + Desktop, Track 2: Desktop output, Track 3: Microphone input.
    */
    separate_tracks?: boolean;
  }

  /**
   * Defines a device volume and enablement settings.
   */
  interface StreamDeviceVolume {
    /**
     * Defines if the device is enabled.
     */
    enable?: boolean;
    /**
     * Defines the device volume in the range of 0 to 100.
     */
    volume?: number;
    /**
     * Defines the device ID to use.
     */
    device_id?: string;
  }

  /**
   * Defines game volume and enablement settings.
   */
  interface GameAudioDevice extends StreamDeviceVolume {
    filtered_capture: GameCaptureOptions;
  }

  function getActiveRecordingApps(
    callback: CallbackFunction<GetActiveRecordingAppsResult>
  ): void;

  interface GetActiveRecordingAppsResult extends Result {
    streaming: ActiveRecordingApps[];
  }

  interface ActiveRecordingApps {
    uid: string;
    displayName: string;
  }

  interface GameCaptureOptions {
    enable: boolean;
    additional_process_names: string[];
  }

  /**
   * Stream capture options for peripheral devices.
   */
  interface StreamPeripheralsCaptureOptions {
    /**
     * Defines when to capture the mouse cursor while streaming is on.
     */
    capture_mouse_cursor: enums.StreamMouseCursor;
  }

  /**
   * Information on the server that is being streamed to.
   */
  interface StreamIngestServer {
    /**
     * The server name that is being streamed to.
     */
    name: string;
    /**
     * The server's url template. Use the token {stream_key} to specify the
     * stream key in the url.
     */
    template_url: string;
  }

  /**
   * Basic quota information
   */
  interface StreamQuotaParams {
    max_quota_gb: number;
    excluded_directories?: string[];
  }

  /**
   * A settings container for a stream Overwolf watermark settings.
   */
  interface WatermarkSettings {
    /**
     * Determines whether or not to display the Overwolf watermark on the
     * stream.
     */
    showWatermark: boolean;
  }

  interface EncoderData {
    name: string;
    display_name: string;
    enabled: boolean;
    presets: string[];
    valid: boolean;
    vendor_error: string;
    error_decsription: string;
  }

  interface AudioDeviceData {
    display_name: string;
    device_id: string;
    can_record: boolean;
    can_playback: boolean;
    device_state: string;
    device_setting_id: string;
  }

  interface StreamResult extends StartCaptureResult {
    stream_id?: number;
  }

  interface StartCaptureResult extends Result {
    errorCode: enums.CaptureErrorCode;
    errorDescription: string;
  }

  interface StreamEvent {
    stream_id?: number;
    SubErrorMessage?: string;
    is_game_window_capture?: boolean;
  }

  interface GetWatermarkSettingsResult extends Result {
    showWatermark: boolean;
  }

  interface GetWindowStreamingModeResult extends Result {
    streaming_mode?: string;
  }

  interface GetStreamEncodersResult extends Result {
    status: string;
    encoders?: EncoderData[];
  }

  interface StreamingCapabilities extends Result {
    video?: EncoderData[];
    audio?: AudioDeviceData[];
    audioProcessCaptureSupported?: boolean;
  }

  interface GetAudioDevicesResult extends Result {
    devices?: AudioDeviceData[];
    default_recording_device_id?: string;
    default_playback_device_id?: string;
  }

  interface SplitResult extends Result { }

  interface StreamingSourceImageChangedEvent {
    stream_id: number;
    old_source: string;
    new_source: string;
  }

  interface StopStreamingEvent {
    stream_id: number;
    url: string;
    file_path: string;
    duration: number;
    last_file_path: string;
    split: boolean;
    extra: string;
    osVersion: string;
    osBuild: string;
    total_frames: number;
  }

  interface StopStreamingResult extends Result {
    stream_id: number;
    url: string;
    file_path: string;
    duration: number;
    last_file_path: string;
    split: boolean;
    extra: string;
    osVersion: string;
    osBuild: string;
  }

  interface VideoFileSplitedEvent {
    stream_id: number;
    file_name: string;
    duration: number;
    count: number;
    next_file: string;
  }

  interface SupportedEncodersUpdatedEvent {
    encoders?: EncoderData[];
  }

  /**
   * Start a new stream.
   * @param settings The stream settings.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function start(
    settings: StreamSettings,
    callback: CallbackFunction<StreamResult>
  ): void;

  /**
   * Stops the given stream.
   * @param streamId The id of the stream to stop.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function stop(
    streamId: number,
    callback?: (result: StreamResult | StopStreamingResult) => void
  ): void;

  /**
   * Request to split video now.
   * @param streamId The id of the stream to split.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function split(
    streamId: number,
    callback: CallbackFunction<SplitResult>
  ): void;

  /**
   * Changes the volume of the stream.
   * @param streamId The id of the stream on which the volume is changed.
   * @param audioOptions The new volumes encapsulated in an object.
   * @param callback A function that will be called with success or error
   * status.
   */
  function changeVolume(
    streamId: number,
    audioOptions: any,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Sets the watermark settings.
   * @param settings The new watermark settings.
   * @param callback A callback to call when done setting the new watermark
   * settings.
   */
  function setWatermarkSettings(
    settings: WatermarkSettings,
    callback?: CallbackFunction<Result>
  ): void;

  /**
   * Gets the watermark settings.
   * @param callback A function that will be called with a JSON containing the
   * status and the watermark settings if successful or an error message if not.
   */
  function getWatermarkSettings(
    callback: CallbackFunction<GetWatermarkSettingsResult>
  ): void;

  /**
   * Call the given callback function with the window's streaming mode as a
   * parameter.
   * @param windowId The id of the window for which to get the streaming mode.
   * @param callback The callback function to call with the window's streaming
   * mode as a parameter.
   */
  function getWindowStreamingMode(
    windowId: string,
    callback: CallbackFunction<GetWindowStreamingModeResult>
  ): void;

  /**
   * Set the window's stream mode.
   * @param windowId The id of the window for which to set the streaming mode.
   * @param streamingMode The desired streaming mode.
   * @param callback A function called after streaming mode was set indicating
   * success, or error in case of an error.
   */
  function setWindowStreamingMode(
    windowId: string,
    streamingMode: enums.StreamingMode,
    callback?: CallbackFunction<Result>
  ): void;

  /**
   * Sets the streaming mode for the window when using OBS.
   * @param windowId The id of the window for which to set the streaming mode.
   * @param obsStreamingMode The desired OBS streaming mode
   * @param callback A function called after streaming mode was set indicating
   * success, or error in case of an error.
   */
  function setWindowObsStreamingMode(
    windowId: string,
    obsStreamingMode: enums.ObsStreamingMode,
    callback?: CallbackFunction<Result>
  ): void;

  /**
   * Set a stream's Be Right Back image.
   * @param streamId The id of the stream for which to set the Be Right Back
   * image.
   * @param image The image to set, as an IMG object or a URL.
   * @param backgroundColor The color to paint the last game frame with before
   * overlaying the image.
   * @param callback A callback function to call with success or failure
   * indication.
   */
  function setBRBImage(
    streamId: number,
    image: any,
    backgroundColor: string,
    callback?: CallbackFunction<Result>
  ): void;

  /**
   * Update stream desktop capture options.
   * @deprecated Since version 0.155.
   * @param streamId The id of the stream for which to set the Be Right Back
   * image.
   * @param newOptions The updated desktop capture streaming options.
   * @param mouseCursorStreamingMethod The updated value of the mouse cursor
   * streaming method.
   * @param callback A callback function to call with success or failure
   * indication.
   */
  function updateStreamingDesktopOptions(
    streamId: number,
    newOptions: StreamDesktopCaptureOptions,
    mouseCursorStreamingMethod: enums.StreamMouseCursor,
    callback?: CallbackFunction<Result>
  ): void;

  /**
   * Returns an array of supported streaming encoders, with extra metadata for
   * each one.
   * @param callback A callback function to call with the array of encoders and
   * their metadata.
   */
  function getStreamEncoders(
    callback: CallbackFunction<GetStreamEncodersResult>
  ): void;

  /**
   * Returns an array of all audio devices that can be used.
   * @param callback A callback function to call with the array of audio devices
   * and their metadata.
   */
  function getAudioDevices(
    callback: CallbackFunction<GetAudioDevicesResult>
  ): void;

  function getCapabilities(
    callback: CallbackFunction<StreamingCapabilities>
  ): void;

  /**
   * Fired when the stream started streaming a new image source (desktop, game).
   */
  const onStreamingSourceImageChanged: Event<StreamingSourceImageChangedEvent>;

  /**
   * Fired when the stream has stopped.
   */
  const onStopStreaming: Event<StopStreamingEvent>;

  /**
   * Fired when the stream has stopped.
   */
  const onStartStreaming: Event<StreamEvent>;

  /**
   * Fired upon an error with the stream.
   */
  const onStreamingError: Event<StreamEvent>;

  /**
   * Fired upon a warning with the stream.
   */
  const onStreamingWarning: Event<StreamEvent>;

  /**
   * Fired upon video file splited.
   */
  const onVideoFileSplited: Event<VideoFileSplitedEvent>;

  
