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
    const enum ResolutionSettings {
      Original = "Original",
      R1080p = "R1080p",
      R720p = "R720p",
      R480p = "R480p",
    }

    const enum eIndicationPosition {
      None = -1,
      TopLeftCorner = 0,
      TopRightCorner = 1,
      BottomLeftCorner = 2,
      BottomRightCorner = 3,
    }
  }

  interface FpsSettings {
    offset?: { x: number; y: number; };
    scale?: number;
    enabled?: boolean;
    position?: enums.eIndicationPosition;
  }

  interface GeneralExtensionSettings {
    auto_launch_with_overwolf?: boolean;
    exit_overwolf_on_exit?: boolean;
    channel?: string;
  }

  interface GetHotKeyResult extends Result {
    hotkey: string;
    isEnabled: boolean;
  }

  interface HotKeyResult extends Result {
    featureId?: string;
  }

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

  interface SetFolderResult extends Result {
    path: string;
  }

  interface GetVideoCaptureSettingsResult extends Result {
    encoder: string;
    preset: string;
    fps: number;
    resolution: number;
  }

  interface GetAudioCaptureSettingsResult extends Result {
    sound_enabled: boolean;
    microphone_enabled: boolean;
  }

  interface GetFpsSettingsResult extends Result {
    settings: FpsSettings;
  }

  interface GetExtensionSettingsResult extends Result {
    settings: GeneralExtensionSettings;
  }

  interface FpsSettingsChangedEvent {
    setting: "OnScreenLocation" | "Enabled" | "Scale" | "Offset";
  }

  interface VideoCaptureSettingsChangedEvent {
    setting: "resolution" | "fps" | "unknown";
  }

  interface AudioCaptureSettingsChangedEvent {
    setting: "speakers" | "microphone" | "unknown";
  }

  interface HotKeyChangedEvent {
    source: string;
    description: string;
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

  