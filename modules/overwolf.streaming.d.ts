/**
 * Use this API to start, stop, and configure Overwolf's built-in streaming and
 * video-capture pipeline — including encoder settings, audio devices, watermarks,
 * and per-window streaming modes.
 * @packageDocumentation
 */

/**
   * Triggered when an error occurs, sent with an error code.
   */
  const onError: Event<string>;
}

declare namespace overwolf.streaming {
  namespace enums {
    /** Error codes returned by capture and streaming operations. */
    const enum CaptureErrorCode {
      /** The operation completed successfully. */
      Success = 0,
      /** The output folder could not be created. */
      FolderCreation = 1,
      /** Ransomware protection prevented writing to the output folder. */
      RansomwareProtection = 2,
      /** A stream is already active. */
      AlreadyStreaming = 3,
      /** A required setting was not provided. */
      MissingSetting = 4,
      /** A setting value is invalid or misconfigured. */
      SettingError = 5,
      /** An internal OBS error occurred. */
      InternalOBSError = 6,
      /** Streaming is not allowed while in this game. */
      NotAllowedInGame = 7,
      /** High-performance capture is not supported on this hardware. */
      HighPerformanceCaptureNotSupported = 8,
      /** The operation requires an active game session. */
      NotInGame = 9,
      /** An unknown error occurred. */
      Unknown = 1000
    }

    /** Controls when the mouse cursor is captured in a stream. */
    const enum StreamMouseCursor {
      /** Capture the cursor in both game and desktop captures. */
      both = "both",
      /** Capture the cursor only when capturing the game window. */
      gameOnly = "gameOnly",
      /** Capture the cursor only when capturing the desktop. */
      desktopOnly = "desktopOnly",
      /** Never capture the mouse cursor. */
      none = "none"
    }

    /** Controls how Overwolf windows are handled when OBS is the streaming provider. */
    const enum ObsStreamingMode {
      /** OBS has no awareness of Overwolf windows. */
      OBSNoAwareness = "OBSNoAwareness",
      /** OBS is aware of and captures Overwolf windows. */
      OBSAwareness = "OBSAwareness",
      /** OBS is aware of Overwolf windows but hides them from the desktop view. */
      OBSAwarenessHideFromDeskTop = "OBSAwarenessHideFromDeskTop",
    }

    /** The streaming service or output provider to use. */
    const enum StreamingProvider {
      /** The provider could not be determined. */
      Unknown = "Unknown",
      /** Stream to Twitch. */
      Twitch = "Twitch",
      /** Record to a local video file. */
      VideoRecorder = "VideoRecorder",
      /** Stream to a custom RTMP endpoint. */
      RTMP = "RTMP",
    }

    /** Controls when an Overwolf window is included in a stream or recording. */
    const enum StreamingMode {
      /** Include the window in the stream only when it is visible. */
      WhenVisible = "WhenVisible",
      /** Always include the window in the stream, even if hidden. */
      Always = "Always",
      /** Never include the window in the stream. */
      Never = "Never",
    }

    /** The video encoder hardware/software backend to use. */
    const enum StreamEncoder {
      /** Intel Quick Sync Video encoder. */
      INTEL = "INTEL",
      /** Software x264 encoder. */
      X264 = "X264",
      /** NVIDIA NVENC encoder (legacy). */
      NVIDIA_NVENC = "NVIDIA_NVENC",
      /** NVIDIA NVENC encoder (new/updated). */
      NVIDIA_NVENC_NEW = "NVIDIA_NVENC_NEW",
      /** AMD Advanced Media Framework encoder. */
      AMD_AMF = "AMD_AMF",
    }

    /** Quality presets for the Intel Quick Sync encoder. */
    const enum StreamEncoderPreset_Intel {
      /** Low quality, lowest resource usage. */
      LOW = "LOW",
      /** Balanced quality and resource usage. */
      MEDIUM = "MEDIUM",
      /** High quality, highest resource usage. */
      HIGH = "HIGH",
    }

    /** Speed/quality presets for the x264 software encoder. */
    const enum StreamEncoderPreset_x264 {
      /** Fastest encoding, lowest quality. */
      ULTRAFAST = "ULTRAFAST",
      /** Very fast encoding with reduced quality. */
      SUPERFAST = "SUPERFAST",
      /** Fast encoding with moderate quality reduction. */
      VERYFAST = "VERYFAST",
      /** Faster than medium, slightly lower quality. */
      FASTER = "FASTER",
      /** Fast encoding preset. */
      FAST = "FAST",
      /** Balanced speed and quality. */
      MEDIUM = "MEDIUM",
      /** Slower encoding for better quality. */
      SLOW = "SLOW",
      /** Slower than slow for improved quality. */
      SLOWER = "SLOWER",
      /** Very slow encoding for near-maximum quality. */
      VERYSLOW = "VERYSLOW",
      /** Maximum compression quality regardless of time. */
      PLACEBO = "PLACEBO",
    }

    /** Quality presets for the AMD AMF encoder. */
    const enum StreamEncoderPreset_AMD_AMF {
      /** Automatically select the best preset. */
      AUTOMATIC = "AUTOMATIC",
      /** Balanced quality and performance. */
      BALANCED = "BALANCED",
      /** Optimized for encoding speed. */
      SPEED = "SPEED",
      /** Optimized for output quality. */
      QUALITY = "QUALITY",
      /** Ultra-low latency mode. */
      ULTRA_LOW_LATENCY = "ULTRA_LOW_LATENCY",
      /** Low latency mode. */
      LOW_LATENCY = "LOW_LATENCY",
    }

    /** Rate control modes for the AMD AMF encoder. */
    const enum StreamEncoderRateControl_AMD_AMF {
      /** Constant Bit Rate. */
      RC_CBR = "RC_CBR",
      /** Constant Quantization Parameter. */
      RC_CQP = "RC_CQP",
      /** Variable Bit Rate. */
      RC_VBR = "RC_VBR",
      /** Variable Bit Rate with minimum QP constraint. */
      RC_VBR_MINQP = "RC_VBR_MINQP",
    }

    /** Quality presets for NVIDIA NVENC encoder. */
    const enum StreamEncoderPreset_NVIDIA {
      /** Automatically select the best preset. */
      AUTOMATIC = "AUTOMATIC",
      /** The encoder's default preset. */
      DEFAULT = "DEFAULT",
      /** Optimized for high output quality. */
      HIGH_QUALITY = "HIGH_QUALITY",
      /** Optimized for high encoding performance. */
      HIGH_PERFORMANCE = "HIGH_PERFORMANCE",
      /** Preset tuned for Blu-ray disc output. */
      BLURAY_DISK = "BLURAY_DISK",
      /** Low latency encoding. */
      LOW_LATENCY = "LOW_LATENCY",
      /** High performance combined with low latency. */
      HIGH_PERFORMANCE_LOW_LATENCY = "HIGH_PERFORMANCE_LOW_LATENCY",
      /** High quality combined with low latency. */
      HIGH_QUALITY_LOW_LATENCY = "HIGH_QUALITY_LOW_LATENCY",
      /** Lossless encoding. */
      LOSSLESS = "LOSSLESS",
      /** High performance lossless encoding. */
      HIGH_PERFORMANCE_LOSSLESS = "HIGH_PERFORMANCE_LOSSLESS",
    }

    /** Rate control modes for the NVIDIA NVENC encoder. */
    const enum StreamEncoderRateControl_NVIDIA {
      /** Constant Bit Rate. */
      RC_CBR = "RC_CBR",
      /** Constant Quantization Parameter. */
      RC_CQP = "RC_CQP",
      /** Variable Bit Rate. */
      RC_VBR = "RC_VBR",
      /** Variable Bit Rate with minimum QP constraint. */
      RC_VBR_MINQP = "RC_VBR_MINQP",
      /** Two-pass VBR optimized for quality. */
      RC_2_PASS_QUALITY = "RC_2_PASS_QUALITY",
    }

    /** Rate control modes for the x264 software encoder. */
    const enum StreamEncoderRateControl_x264 {
      /** Constant Bit Rate. */
      RC_CBR = "RC_CBR",
      /** Constant Quantization Parameter. */
      RC_CQP = "RC_CQP",
      /** Variable Bit Rate. */
      RC_VBR = "RC_VBR",
      /** Variable Bit Rate with minimum QP constraint. */
      RC_VBR_MINQP = "RC_VBR_MINQP",
      /** Two-pass VBR optimized for quality. */
      RC_2_PASS_QUALITY = "RC_2_PASS_QUALITY",
    }

    /** The screen position where the recording indicator overlay is shown. */
    const enum IndicationPosition {
      /** No indicator is shown. */
      None = "None",
      /** Indicator appears in the top-left corner. */
      TopLeftCorner = "TopLeftCorner",
      /** Indicator appears in the top-right corner. */
      TopRightCorner = "TopRightCorner",
      /** Indicator appears in the bottom-left corner. */
      BottomLeftCorner = "BottomLeftCorner",
      /** Indicator appears in the bottom-right corner. */
      BottomRightCorner = "BottomRightCorner",
    }

    /** The visual style of the recording indicator overlay. */
    const enum IndicationType {
      /** No recording indicator is shown. */
      NoIndication = "NoIndication",
      /** A colored dot is shown. */
      Dot = "Dot",
      /** A colored dot with an elapsed-time timer is shown. */
      DotAndTimer = "DotAndTimer",
    }

    /** Determines the source used to establish the base video frame size. */
    const enum eVideoBaseFrameSizeSource {
      /** The base frame size is determined automatically. */
      Auto = "Auto",
      /** The base frame size is taken from the `StreamVideoOptions` settings. */
      Setting = "Setting",
    }

    /** The algorithm used to calculate the final encoded video frame size. */
    const enum eVideoFrameSizeCalcMethod {
      /** Use the original game resolution without modification. */
      Original = "Original",
      /** Use the exact requested resolution, or keep the aspect ratio if not achievable. */
      ExactOrKeepRatio = "ExactOrKeepRatio",
      /** Use the exact requested resolution, or the closest supported resolution. */
      ExactOrClosestResolution = "ExactOrClosestResolution",
    }
  }

  /**
   * Stream settings container.
   */
  interface GetWindowStreamingModeResult extends Result {
    /** The streaming mode string for the queried window. */
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

  /** Basic metadata about the stream destination. */
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
     * The method used to calculate the output frame size from the base frame size.
     */
    frame_size_method?: enums.eVideoFrameSizeCalcMethod;

    /**
     * The source used to determine the base frame size before applying `frame_size_method`.
     */
    base_frame_size_source?: enums.eVideoBaseFrameSizeSource;

    /**
     * When `true`, enables on-demand video file splitting via the `split` function.
     */
    enable_on_demand_split?: boolean;

    /**
     * Options controlling game window capture behavior.
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
    /** Enable game window capture when the game window is available. Disabled by default. */
    enable_when_available: boolean; //Disabled by default
    /** Whether to capture Overwolf windows on top of the game. Default value is taken from the Overwolf Settings */
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
    /** Options controlling which game processes have their audio captured. */
    filtered_capture: GameCaptureOptions;
  }

  /**
   * Returns the list of apps currently recording or streaming.
   * @param callback Called with the list of active recording apps.
   */
  function getActiveRecordingApps(
    callback: CallbackFunction<GetActiveRecordingAppsResult>
  ): void;

  /** Result of `getActiveRecordingApps`, listing apps that are currently capturing. */
  interface GetActiveRecordingAppsResult extends Result {
    /** An array of apps that are currently streaming or recording. */
    streaming: ActiveRecordingApps[];
  }

  /** Identifies an app that is currently recording or streaming. */
  interface ActiveRecordingApps {
    /** The unique ID of the recording app. */
    uid: string;
    /** The display name of the recording app. */
    displayName: string;
  }

  /** Options for filtering which game processes have their audio captured. */
  interface GameCaptureOptions {
    /** Whether filtered game audio capture is enabled. */
    enable: boolean;
    /** Additional process names (beyond the main game process) to include in audio capture. */
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
    /** The maximum total size of media files in gigabytes before old files are pruned. */
    max_quota_gb: number;
    /** Directories to exclude from quota calculation. */
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

  /** Metadata describing an available video encoder. */
  interface EncoderData {
    /** The internal name of the encoder. */
    name: string;
    /** The human-readable display name of the encoder. */
    display_name: string;
    /** Whether this encoder is currently enabled and usable. */
    enabled: boolean;
    /** The list of preset names supported by this encoder. */
    presets: string[];
    /** Whether the encoder passed validation and is ready for use. */
    valid: boolean;
    /** A vendor-level error string, if any. */
    vendor_error: string;
    /** A human-readable description of any encoder error. */
    error_decsription: string;
  }

  /** Metadata describing an available audio device. */
  interface AudioDeviceData {
    /** The human-readable display name of the audio device. */
    display_name: string;
    /** The unique system identifier of the audio device. */
    device_id: string;
    /** Whether the device supports audio recording (input). */
    can_record: boolean;
    /** Whether the device supports audio playback (output). */
    can_playback: boolean;
    /** The current state of the device (e.g. active, disabled). */
    device_state: string;
    /** The settings identifier for this device. */
    device_setting_id: string;
  }

  /** Result of `start`, containing the ID of the newly created stream. */
  interface StreamResult extends StartCaptureResult {
    /** The ID assigned to the started stream. */
    stream_id?: number;
  }

  /** Base result for capture start operations, including error details. */
  interface StartCaptureResult extends Result {
    /** The error code describing the outcome of the capture start attempt. */
    errorCode: enums.CaptureErrorCode;
    /** A human-readable description of the error, if any. */
    errorDescription: string;
  }

  /** Event data for streaming lifecycle events such as start and error. */
  interface StreamEvent {
    /** The ID of the affected stream. */
    stream_id?: number;
    /** An optional sub-error message with additional detail. */
    SubErrorMessage?: string;
    /** Whether the stream is capturing the game window specifically. */
    is_game_window_capture?: boolean;
  }

  /** Result of `getWatermarkSettings`. */
  interface GetWatermarkSettingsResult extends Result {
    /** Whether the Overwolf watermark is currently enabled on the stream. */
    showWatermark: boolean;
  }

  /** Result of `getWindowStreamingMode` for a specific window. */
  interface GetWindowStreamingModeResult extends Result {
    /** The current streaming mode string for the queried window. */
    streaming_mode?: string;
  }

  /** Result of `getStreamEncoders`, listing available video encoders. */
  interface GetStreamEncodersResult extends Result {
    /** The status string of the request. */
    status: string;
    /** An array of available encoder descriptors. */
    encoders?: EncoderData[];
  }

  /** Result of `getCapabilities`, describing what the current system supports. */
  interface StreamingCapabilities extends Result {
    /** Available video encoders on this system. */
    video?: EncoderData[];
    /** Available audio devices on this system. */
    audio?: AudioDeviceData[];
    /** Whether per-process audio capture is supported on this system. */
    audioProcessCaptureSupported?: boolean;
  }

  /** Result of `getAudioDevices`, listing available audio input and output devices. */
  interface GetAudioDevicesResult extends Result {
    /** An array of available audio devices. */
    devices?: AudioDeviceData[];
    /** The system's default recording (input) device ID. */
    default_recording_device_id?: string;
    /** The system's default playback (output) device ID. */
    default_playback_device_id?: string;
  }

  /** Result of a `split` operation. */
  interface SplitResult extends Result { }

  /** Event data fired when the stream's image source changes (e.g. switches between game and desktop). */
  interface StreamingSourceImageChangedEvent {
    /** The ID of the stream whose source changed. */
    stream_id: number;
    /** The previous image source identifier. */
    old_source: string;
    /** The new image source identifier. */
    new_source: string;
  }

  /** Event data fired when a stream stops. */
  interface StopStreamingEvent {
    /** The ID of the stream that stopped. */
    stream_id: number;
    /** The URL the stream was broadcasting to, if applicable. */
    url: string;
    /** The path to the recorded video file, if applicable. */
    file_path: string;
    /** The total duration of the stream in milliseconds. */
    duration: number;
    /** The path to the last video file segment written. */
    last_file_path: string;
    /** Whether the recording was split into multiple files. */
    split: boolean;
    /** Extra metadata associated with the stream session. */
    extra: string;
    /** The OS version string of the system. */
    osVersion: string;
    /** The OS build string of the system. */
    osBuild: string;
    /** The total number of frames captured during the stream. */
    total_frames: number;
  }

  /** Result of `stop`, describing the completed stream session. */
  interface StopStreamingResult extends Result {
    /** The ID of the stream that was stopped. */
    stream_id: number;
    /** The URL the stream was broadcasting to, if applicable. */
    url: string;
    /** The path to the recorded video file. */
    file_path: string;
    /** The total duration of the stream in milliseconds. */
    duration: number;
    /** The path to the last video file segment written. */
    last_file_path: string;
    /** Whether the recording was split into multiple files. */
    split: boolean;
    /** Extra metadata associated with the stream session. */
    extra: string;
    /** The OS version string of the system. */
    osVersion: string;
    /** The OS build string of the system. */
    osBuild: string;
  }

  /** Event data fired when a video file is split due to reaching the size limit. */
  interface VideoFileSplitedEvent {
    /** The ID of the stream whose file was split. */
    stream_id: number;
    /** The name of the completed file segment. */
    file_name: string;
    /** The duration of the completed file segment in milliseconds. */
    duration: number;
    /** The sequential index of this file segment. */
    count: number;
    /** The file path of the next segment that recording will continue into. */
    next_file: string;
  }

  /** Event data fired when the set of supported encoders changes. */
  interface SupportedEncodersUpdatedEvent {
    /** The updated array of available encoder descriptors. */
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

  /**
   * Returns the streaming capabilities of the current system.
   * @param callback Called with the system's streaming capabilities.
   */
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
