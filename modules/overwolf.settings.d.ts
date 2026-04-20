/**
 * Use this API to read and modify Overwolf client settings, including video/audio capture, FPS overlay, hotkeys, and folder paths.
 * @packageDocumentation
 */

/**
   * Retrieve information about the client - such as when it was first installed
   * and how long is it running.
   * @param callback A callback with the result.
   */
  function getClientInfo(
    callback: CallbackFunction<ClientInfoResult>
  ): void;
}

declare namespace overwolf.settings {
  namespace enums {
    /** The video resolution setting for capture. */
    const enum ResolutionSettings {
      /** Capture at the original (native) resolution. */
      Original = "Original",
      /** Capture at 1080p resolution. */
      R1080p = "R1080p",
      /** Capture at 720p resolution. */
      R720p = "R720p",
      /** Capture at 480p resolution. */
      R480p = "R480p",
    }

    /** The screen position of an on-screen indicator (e.g. the FPS counter). */
    const enum eIndicationPosition {
      /** No position / indicator is hidden. */
      None = -1,
      /** Positioned in the top-left corner of the screen. */
      TopLeftCorner = 0,
      /** Positioned in the top-right corner of the screen. */
      TopRightCorner = 1,
      /** Positioned in the bottom-left corner of the screen. */
      BottomLeftCorner = 2,
      /** Positioned in the bottom-right corner of the screen. */
      BottomRightCorner = 3,
    }
  }

  /** Configuration for the Overwolf FPS counter overlay. */
  interface FpsSettings {
    /** The pixel offset of the FPS indicator from its corner position. */
    offset?: { x: number; y: number; };
    /** The scale factor for the FPS indicator (0–1). */
    scale?: number;
    /** Whether the FPS indicator is enabled. */
    enabled?: boolean;
    /** The screen corner where the FPS indicator is displayed. */
    position?: enums.eIndicationPosition;
  }

  /** General settings for an Overwolf extension. */
  interface GeneralExtensionSettings {
    /** Whether the extension should launch automatically when Overwolf starts. */
    auto_launch_with_overwolf?: boolean;
    /** Whether Overwolf should exit when the extension exits. */
    exit_overwolf_on_exit?: boolean;
    /** The update channel the extension subscribes to. */
    channel?: string;
  }

  /** Result of a `getHotKey` call. */
  interface GetHotKeyResult extends Result {
    /** The hotkey string assigned to the feature. */
    hotkey: string;
    /** Whether the hotkey is currently enabled. */
    isEnabled: boolean;
  }

  /** Result of a hotkey registration callback. */
  interface HotKeyResult extends Result {
    /** The feature ID associated with the triggered hotkey, if available. */
    featureId?: string;
  }

  /** Result containing a folder path returned by Overwolf. */
  interface FolderResult extends Result {
    path: {
      /** "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089" */
      Type: string;
      /** the actual filepath */
      Value: string;
      /** "Folders_VideoCapturesFolder" */
      Name: string;
    };
  }

  /** Result of a set-folder operation, containing the newly applied path. */
  interface SetFolderResult extends Result {
    /** The folder path that was set. */
    path: string;
  }

  /** Result of a `getVideoCaptureSettings` call. */
  interface GetVideoCaptureSettingsResult extends Result {
    /** The name of the video encoder in use. */
    encoder: string;
    /** The encoder preset currently selected. */
    preset: string;
    /** The configured capture frame rate (frames per second). */
    fps: number;
    /** The configured capture resolution as a numeric value. */
    resolution: number;
  }

  /** Result of a `getAudioCaptureSettings` call. */
  interface GetAudioCaptureSettingsResult extends Result {
    /** Whether system sound capture is enabled. */
    sound_enabled: boolean;
    /** Whether microphone capture is enabled. */
    microphone_enabled: boolean;
  }

  /** Result of a `getFpsSettings` call. */
  interface GetFpsSettingsResult extends Result {
    /** The current FPS overlay settings. */
    settings: FpsSettings;
  }

  /** Result of a `getExtensionSettings` call. */
  interface GetExtensionSettingsResult extends Result {
    /** The current general extension settings. */
    settings: GeneralExtensionSettings;
  }

  /** Event data fired when a FPS overlay setting changes. */
  interface FpsSettingsChangedEvent {
    /** The name of the FPS setting that changed. */
    setting: "OnScreenLocation" | "Enabled" | "Scale" | "Offset";
  }

  /** Event data fired when a video capture setting changes. */
  interface VideoCaptureSettingsChangedEvent {
    /** The name of the video capture setting that changed. */
    setting: "resolution" | "fps" | "unknown";
  }

  /** Event data fired when an audio capture setting changes. */
  interface AudioCaptureSettingsChangedEvent {
    /** The name of the audio capture setting that changed. */
    setting: "speakers" | "microphone" | "unknown";
  }

  /** Event data fired when a hotkey binding changes. */
  interface HotKeyChangedEvent {
    /** The source extension or feature that owns the hotkey. */
    source: string;
    /** A human-readable description of the hotkey action. */
    description: string;
    /** The new hotkey string. */
    hotkey: string;
  }

  /**
   * Returns the hotkey assigned to a given feature id by calling the callback.
   * @param featureId The feature id for which to get the set hotkey.
   * @param callback A function called with the result of the request which
     contains the hotkey if successful.
   */
  function getHotKey(
    featureId: string,
    callback: CallbackFunction<GetHotKeyResult>
  ): void;

  /**
   * Registers a callback for a given hotkey action. If the registration had
   * failed, the callback function will be called immediately with the status
   * "error" and another property, "error", indicating the reason for the
   * failure. Otherwise, the callback function will be called when the hotkey is
   * pressed and the status will be "success". Note that Shift can only be
   * combined with F keys.
   * @deprecated Since version 0.155.
   * @param actionId The action id for which to register the callback.
   * @param callback The function to run when the hotkey is pressed.
   */
  function registerHotKey(
    actionId: string,
    callback: CallbackFunction<HotKeyResult>
  ): void;

  /**
   * Returns the current language overwolf is set to in a two letter ISO name
   * format.
   * @deprecated Since version 0.155.
   * @param callback
   */
  function getCurrentOverwolfLanguage(
    callback: (result: { language: string; }) => void
  ): void;

  /**
   * Returns the current folder overwolf uses to store screenshots.
   * @param callback
   */
  function getOverwolfScreenshotsFolder(
    callback: CallbackFunction<FolderResult>
  ): void;

  /**
   * Sets the folder Overwolf uses to store screenshots.
   * @param path The folder to use
   * @param callback Whether the request was successful
   */
  function setOverwolfScreenshotsFolder(
    path: string,
    callback: CallbackFunction<FolderResult>
  ): void;

  /**
   * Returns the current folder overwolf uses to store videos.
   * @param callback
   */
  function getOverwolfVideosFolder(
    callback: CallbackFunction<FolderResult>
  ): void;

  /**
   * Sets the folder Overwolf uses to store videos.
   * @param path The folder to use
   * @param callback Whether the request was successful
   */
  function setOverwolfVideosFolder(
    path: string,
    callback: CallbackFunction<FolderResult>
  ): void;

  /**
   * Returns the current video capture settings.
   * @param callback
   */
  function getVideoCaptureSettings(
    callback: CallbackFunction<GetVideoCaptureSettingsResult>
  ): void;

  /**
   * Sets new video capture settings.
   * @param resolutionSettings
   * @param fps
   * @param callback
   */
  function setVideoCaptureSettings(
    resolutionSettings: enums.ResolutionSettings,
    fps: number,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Returns the current audio capture settings.
   * @param callback
   */
  function getAudioCaptureSettings(
    callback: CallbackFunction<GetAudioCaptureSettingsResult>
  ): void;

  /**
   * Sets new audio capture settings.
   * @param enableSound
   * @param enableMicrophone
   * @param callback
   */
  function setAudioCaptureSettings(
    enableSound: boolean,
    enableMicrophone: boolean,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Sets the state (on/off), position, offset (in pixels) and scale [0, 1] of
   * the Fps control.
   * @deprecated Since version 0.155.
   * @param settings
   * @param callback
   */
  function setFpsSettings(
    settings: FpsSettings,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Gets the status of the FPS control (on/off), its position, its offset (in
   * pixels) and its scale [0, 1].
   * @param callback
   */
  function getFpsSettings(
    callback: CallbackFunction<GetFpsSettingsResult>
  ): void;

  /**
   * Sets the extension settings.
   * @param settings
   * @param callback
   */
  function setExtensionSettings(
    settings: GeneralExtensionSettings,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Gets the extension settings.
   * @param callback
   */
  function getExtensionSettings(
    callback: CallbackFunction<GetExtensionSettingsResult>
  ): void;

  /**
   * Fired when fps settings are changed.
   */
  const onFpsSettingsChanged: Event<FpsSettingsChangedEvent>;

  /**
   * Fired when video capture settings are changed.
   */
  const OnVideoCaptureSettingsChanged: Event<VideoCaptureSettingsChangedEvent>;

  /**
   * Fired when audio capture settings are changed.
   */
  const OnAudioCaptureSettingsChanged: Event<AudioCaptureSettingsChangedEvent>;

