/**
 * Use this API to retrieve information about games running on the user's machine,
 * detect game launches and terminations, monitor focus and resolution changes,
 * and query the Overwolf game database for installed game metadata.
 * @packageDocumentation
 */

/**
   * Fired when fps information is ready with a JSON containing the information.
   */
  const onFpsInfoReady: Event<any>;
}

declare namespace overwolf.games {
  namespace enums {
    /** Indicates whether the game entry represents a game executable or a launcher. */
    const enum GameInfoType {
      /** A standard game process. */
      Game = 0,
      /** A game launcher process. */
      Launcher = 1,
    }

    /** Describes the reason a `GameInfoUpdatedEvent` was fired. */
    const enum GameInfoChangeReason {
      /** General game state change. */
      Game = "game",
      /** The active game changed. */
      GameChanged = "gameChanged",
      /** The game window focus state changed. */
      GameFocusChanged = "gameFocusChanged",
      /** A game was launched. */
      GameLaunched = "gameLaunched",
      /** A coexisting overlay application was detected. */
      GameOverlayCoexistenceDetected = "gameOverlayCoexistenceDetected",
      /** The overlay cursor visibility changed. */
      GameOverlayCursorVisibility = "gameOverlayCursorVisibility",
      /** The overlay exclusive mode changed. @deprecated Use `GameOverlayExclusiveModeChanged` instead. */
      GameOverlayExlusiveModeChanged = "gameOverlayExlusiveModeChanged",
      /** The overlay input hook encountered a failure. */
      GameOverlayInputHookFailure = "gameOverlayInputHookFailure",
      /** The game renderer was detected. */
      GameRendererDetected = "gameRendererDetected",
      /** The game resolution changed. */
      GameResolutionChanged = "gameResolutionChanged",
      /** The game process was terminated. */
      GameTerminated = "gameTerminated",
      /** The game window data changed. */
      GameWindowDataChanged = "gameWindowDataChanged",
      /** The overlay exclusive mode changed. */
      GameOverlayExclusiveModeChanged = "gameOverlayExclusiveModeChanged",
      /** Alternate coexisting overlay application detection flag. */
      GameOverlayCoexistenceDetectedb = "gameOverlayCoexistenceDetectedb"
    }

    /**
     * Third-party applications known to coexist with the Overwolf overlay,
     * which may cause rendering or input conflicts.
     */
    const enum KnownOverlayCoexistenceApps {
      /** ASUS software (e.g., Armoury Crate). */
      Asus = "asus",
      /** Discord overlay. */
      Discord = "discord",
      /** MSI Afterburner overlay. */
      MSIAfterBurner = "MSIAfterBurner",
      /** Nahimic audio software. */
      Nahimic = "nahimic",
      /** Nahimic 2 audio software. */
      Nahimic2 = "nahimic2",
      /** No coexisting overlay detected. */
      None = "none",
      /** OBS Studio. */
      ObsStudio = "obsStudio",
      /** Plays.TV overlay. */
      PlaysTV = "playsTV",
      /** Razer Synapse. */
      RazerSynapse = "razerSynapse",
    }
  }

  /**
   * Raw game configuration entry from the Overwolf game database.
   * Contains static metadata and internal overlay compatibility flags for a specific game.
   * Most fields are low-level flags used by the Overwolf injection engine.
   */
  interface GameInfo {
    /** Bitmask of renderers actually detected during game injection. */
    ActualDetectedRenderers: number;
    /** Whether the detected renderer supports video capture. */
    ActualGameRendererAllowsVideoCapture: boolean;
    /** Allow color correction mixing mode. */
    AllowCCMix: boolean;
    /** Allow cursor mixing between game and overlay. */
    AllowCursorMix: boolean;
    /** Allow raw input mixing mode. */
    AllowRIMix: boolean;
    /** Input control mode as reported by the game client. */
    Client_GameControlMode: number;
    /** Command line string used to launch the game executable. */
    CommandLine?: string;
    /** Bitmask of supported input control modes. */
    ControlModes: number;
    /** Cursor rendering mode used by the overlay. */
    CursorMode: number;
    /** Detection interval threshold (internal timing value). */
    DIT: number;
    /** Single registry key used to detect the game installation directory. */
    DetectDirKey?: string;
    /** Multiple registry keys used to detect the game installation directory. */
    DetectDirKeys?: string[];
    /** Disable mixed action input mode. */
    DisableActionMixed: boolean;
    /** Disable game activity information tracking. */
    DisableActivityInfo: boolean;
    /** Disable Windows Aero when running on DirectX 11. */
    DisableAeroOnDX11: boolean;
    /** Disable blockchain-based process detection. */
    DisableBlockChain: boolean;
    /** Disable Direct3D 9 Extended (D3D9Ex) mode. */
    DisableD3d9Ex: boolean;
    /** Disable DirectInput device acquisition. */
    DisableDIAquire: boolean;
    /** Disable extended handle injection mode. */
    DisableEXHandle: boolean;
    /** Disable eternal process enumeration. */
    DisableEternalEnum: boolean;
    /** Disable the exclusive mode UI rendering path. */
    DisableExclusiveModeUI: boolean;
    /** Disable TeamSpeak 3 integration feature. */
    DisableFeature_TS3: boolean;
    /** Disable the video capture feature for this game. */
    DisableFeature_VideoCapture: boolean;
    /** Prevent multiple overlay injections into the same process. */
    DisableMultipleInjections: boolean;
    /** Disable Overwolf gesture recognition. */
    DisableOWGestures: boolean;
    /** Disable AI-based render detection. */
    DisableRenderAI: boolean;
    /** Disable input release on window resize. */
    DisableResizeRelease: boolean;
    /** Disable smart input mix mode. */
    DisableSmartMixMode: boolean;
    /** Human-readable display name of the game. */
    DisplayName?: string;
    /** Enable clock gesture for overlay activation. */
    EnableClockGesture: boolean;
    /** Give the overlay focus on any mouse click. */
    EnableFocusOnAnyClick: boolean;
    /** Enable multi-touch cursor support. */
    EnableMTCursor: boolean;
    /** Enable raw input processing. */
    EnableRawInput: boolean;
    /** Enable smart DirectInput focus handling. */
    EnableSmartDIFocus: boolean;
    /** Enable smart DirectInput focus handling (variant 2). */
    EnableSmartDIFocus2: boolean;
    /** Enable smart focus mode for overlay switching. */
    EnableSmartFocus: boolean;
    /** Enable texture replacement mode. */
    EnableTXR: boolean;
    /** Whether the game has been executed more than once. */
    ExecutedMoreThan: boolean;
    /** Internal flag for in-game video texture hook detection. */
    FIGVTH: boolean;
    /** FPS value below which a major frame rate drop event is fired. */
    FPSIndicationThreshold: number;
    /** Initial game window height in pixels at first launch. */
    FirstGameResolutionHeight: number;
    /** Initial game window width in pixels at first launch. */
    FirstGameResolutionWidth: number;
    /** Apply action focus compatibility fix. */
    FixActionFocus: boolean;
    /** Apply color correction compatibility fix. */
    FixCC: boolean;
    /** Apply overlay coexistence compatibility fix. */
    FixCOEx: boolean;
    /** Apply cursor visibility compatibility fix. */
    FixCVCursor: boolean;
    /** Apply cursor offset compatibility fix. */
    FixCursorOffset: boolean;
    /** Apply DirectInput block compatibility fix. */
    FixDIBlock: boolean;
    /** Apply DirectInput focus compatibility fix. */
    FixDIFocus: boolean;
    /** Apply DirectX thread-safety compatibility fix. */
    FixDXThreadSafe: boolean;
    /** Apply full-screen taskbar compatibility fix. */
    FixFSTB: boolean;
    /** Apply hotkey raw input compatibility fix. */
    FixHotkeyRI: boolean;
    /** Apply input block compatibility fix. */
    FixInputBlock: boolean;
    /** Apply invisible cursor compatibility fix for cursor rendering. */
    FixInvisibleCursorCR: boolean;
    /** Apply mix-mode cursor compatibility fix. */
    FixMixModeCursor: boolean;
    /** Apply modifier key mix-mode compatibility fix. */
    FixModifierMixMode: boolean;
    /** Apply mouse DirectInput exclusive mode compatibility fix. */
    FixMouseDIExclusive: boolean;
    /** Apply render context exclusive mode compatibility fix. */
    FixRCEx: boolean;
    /** Apply resolution change compatibility fix. */
    FixResolutionChange: boolean;
    /** Apply software layer restore compatibility fix. */
    FixRestoreSWL: boolean;
    /** Apply software layer compatibility fix. */
    FixSWL: boolean;
    /** Apply software layer window compatibility fix. */
    FixSWLW: boolean;
    /** Force rehook on capture device change. */
    ForceCaptureChangeRehook: boolean;
    /** Force rehook of control input hooks. */
    ForceControlRehook: boolean;
    /** Force game border bypass. */
    ForceGBB: boolean;
    /** Comma-separated list of genres for this game. */
    GameGenres?: string;
    /** URL for the game's external information page. */
    GameLinkURL?: string;
    /** Internal developer notes about this game's configuration. */
    GameNotes?: string;
    /** Bitmask of renderers supported by this game. */
    GameRenderers: number;
    /** Official title of the game. */
    GameTitle?: string;
    /** Whether the game uses a common/generic process name shared with other applications. */
    GenericProcessName: boolean;
    /** Title of the game series or group this game belongs to. */
    GroupTitle?: string;
    /** Unique Overwolf game ID (full ID including instance suffix). */
    ID: number;
    /** Filename of the game's icon asset. */
    IconFile?: string;
    /** Ignore multiple input device enumeration. */
    IgnoreMultipleDevices: boolean;
    /** Ignore input release events. */
    IgnoreRelease: boolean;
    /** Whether the game uses ImGui for its UI rendering. */
    ImGuiRendering: boolean;
    /** Current overlay injection decision value. */
    InjectionDecision: number;
    /** Input handling mode bitmask. */
    Input: number;
    /** Hint string for locating the game installation. */
    InstallHint?: string;
    /** Whether the game's controls conflict with Overwolf hotkeys. */
    IsConflictingWithControlHotkey: boolean;
    /** Whether this is a newly added entry in the game database. */
    IsNew: boolean;
    /** Whether the game is distributed via Steam. */
    IsSteamGame: boolean;
    /** Maintain in-game overlay state when the game window loses focus. */
    KeepInGameOnLostFocus: boolean;
    /** Internal label for the game entry. */
    Label?: string;
    /** Previous overlay injection decision value. */
    LastInjectionDecision: number;
    /** Last known file system path to the game executable. */
    LastKnownExecutionPath?: string;
    /** Additional parameters appended when launching the game. */
    LaunchParams?: string;
    /** Whether the game can be launched directly from Overwolf. */
    Launchable: boolean;
    /** Single registry key for locating the launcher directory. */
    LauncherDirectoryRegistryKey?: string;
    /** Multiple registry keys for locating the launcher directory. */
    LauncherDirectoryRegistryKeys?: string[];
    /** Class ID of the associated game launcher entry. */
    LauncherGameClassId: number;
    /** Known process names for this game's launcher. */
    LauncherNames?: string[];
    /** Current modifier key status bitmask. */
    ModifierStatus: number;
    /** Native platform (e.g., Steam app) ID for this game. */
    NativeID: number;
    /** Pixel offset applied to the pass-through click bounds. */
    PassThruBoundsOffsetPixel: number;
    /** Press-to-click-through input threshold value. */
    PressToClickThrough: number;
    /** Full command line string used to start the game process. */
    ProcessCommandLine?: string;
    /** OS process ID of the currently running game instance. */
    ProcessID: number;
    /** Known executable process names for this game. */
    ProcessNames: string[];
    /** Recreate the swap buffer on the next frame. */
    RecreateSB: boolean;
    /** Release keyboard input to the game when the overlay has focus. */
    ReleaseKBInOverlayFocus: boolean;
    /** Send resize notifications when the game resolution changes. */
    ResizeNotifyResolution: boolean;
    /** Restore the back buffer after overlay rendering. */
    RestoreBB: boolean;
    /** Restore the render target after overlay rendering. */
    RestoreRT: boolean;
    /** Whether the game process requires elevated (administrator) privileges. */
    RunElevated: boolean;
    /** Send hotkey events via raw input. */
    SendHotkeyRI: boolean;
    /** Set DirectInput to exclusive mode. */
    SetDIInExclusive: boolean;
    /** Abbreviated title of the game. */
    ShortTitle?: string;
    /** Skip game process detection during injection. */
    SkipGameProc: boolean;
    /** Smart keyboard release when the overlay receives focus. */
    SmartReleaseKBInOverlayFocus: boolean;
    /** FPS value considered a stable frame rate for this game. */
    StableFPSThreshold: number;
    /** Pixel margin used to detect the stuck-in-transparency state. */
    StuckInTrans_Margin: number;
    /** Mouse movement gap (in pixels) for stuck-in-transparency detection. */
    StuckInTrans_MouseMoveGap?: number;
    /** URI scheme supported for launching this game. */
    SupportedScheme?: string;
    /** Minimum supported version string for this game. */
    SupportedVersion?: string;
    /** Texture capture modes bitmask. */
    TCModes: number;
    /** Whether to terminate game tracking when the main window closes. */
    TerminateOnWindowClose: boolean;
    /** Numeric type identifier for the game entry. */
    Type: number;
    /** String representation of the game type. */
    TypeString?: string;
    /** URI scheme that is explicitly not supported for launching this game. */
    UnsupportedScheme?: string;
    /** Enable cursor position tracking updates. */
    UpdateCursor: boolean;
    /** Enable cursor position tracking in multi-threaded mode. */
    UpdateCursorMT: boolean;
    /** Use all-safe hook mode for injection. */
    UseAllSafeHook: boolean;
    /** Use extended hook mode. */
    UseEH?: string;
    /** Use hardware input device for cursor input. */
    UseHardwareDevice: boolean;
    /** Use the launcher's icon instead of the game's own icon. */
    UseLauncherIcon: boolean;
    /** Use long hook mode for injection. */
    UseLongHook: boolean;
    /** Use multi-context hook mode. */
    UseMCH?: string;
    /** Use message hook for input. */
    UseMH: boolean;
    /** URI scheme for the message hook. */
    UseMHScheme?: string;
    /** Use mouse/keyboard low-level hook. */
    UseMKLL: boolean;
    /** Use mouse wheel hook. */
    UseMW: boolean;
    /** Use process replacement injection method. */
    UsePR: boolean;
    /** Use raw input for keyboard and mouse. */
    UseRI: boolean;
    /** Use raw input block mode. */
    UseRIB: boolean;
    /** Use safe hook mode for injection. */
    UseSafeHook: boolean;
    /** Use thread-safe hook mode. */
    UseTSHook: boolean;
    /** Wait for window restore before processing input. */
    WaitRestore: boolean;
    /** Support level for Windows 7 (0 = unsupported, higher = better support). */
    Win7Support: number;
    /** Support level for Windows 8 (0 = unsupported, higher = better support). */
    Win8Support: number;
    /** Support level for Windows 10 (0 = unsupported, higher = better support). */
    Win10Support: number;
    /** Support level for Windows XP (0 = unsupported, higher = better support). */
    XPSupport: number;
  }

  /**
   * Information about a game that is currently running.
   * Returned by `getRunningGameInfo` and included in events such as `onGameLaunched`.
   */
  interface RunningGameInfo {
    /** Whether the game window currently has input focus. */
    isInFocus: boolean;
    /** Whether the game process itself has focus (may differ from window focus). */
    gameIsInFocus: boolean;
    /** Whether the game process is currently running. */
    isRunning: boolean;
    /** Whether the game allows video capture via the Overwolf API. */
    allowsVideoCapture: boolean;
    /** The full title of the game. */
    title: string;
    /** The human-readable display name of the game. */
    displayName: string;
    /** The abbreviated short title of the game. */
    shortTitle: string;
    /** The full Overwolf game ID, including the instance suffix. */
    id: number;
    /** The Overwolf game class ID (without instance suffix), used to identify the game type. */
    classId: number;
    /** The game window width in physical pixels. */
    width: number;
    /** The game window height in physical pixels. */
    height: number;
    /** The game window width in logical (DPI-independent) pixels. */
    logicalWidth: number;
    /** The game window height in logical (DPI-independent) pixels. */
    logicalHeight: number;
    /** List of renderer names used by the game. */
    renderers: string[];
    /** The primary renderer detected for the running game. */
    detectedRenderer: string;
    /** Full file system path to the game executable. */
    executionPath: string;
    /** A unique identifier for the current game session. */
    sessionId: string;
    /** The command line string used to launch the game. */
    commandLine: string;
    /** Whether this entry represents a game or a launcher. */
    type: enums.GameInfoType;
    /** String representation of the `type` field. */
    typeAsString: string;
    /** The native OS window handle for the game window. */
    windowHandle: { value: number; };
    /** The native OS monitor handle for the monitor the game is running on. */
    monitorHandle: { value: number; };
    /** The OS process ID of the running game. */
    processId: number;
    /** Whether the out-of-process (OOP) overlay is active. */
    oopOverlay?: boolean;
    /** Whether the Overwolf overlay is currently enabled for this game. */
    isOverlayEnabled: boolean;
    /** Whether the Overwolf overlay is supported for this game. */
    isOverlaySupported: boolean;
  }

  /**
   * Describes what changed in a game info update.
   * @deprecated Use `GameInfoUpdatedEvent` instead, which includes overlay change details and change reasons.
   */
  interface GameInfoUpdate {
    /** The current state of the running game. */
    gameInfo: RunningGameInfo;
    /** Whether the game's screen resolution changed. */
    resolutionChanged: boolean;
    /** Whether the game started or stopped running. */
    runningChanged: boolean;
    /** Whether the game window's focus state changed. */
    focusChanged: boolean;
    /** Whether the active game changed to a different game. */
    gameChanged: boolean;
  }

  /**
   * Information about a game detected as installed on the local machine,
   * combining database metadata with installation-specific details.
   */
  interface InstalledGameInfo {
    /** Static game metadata from the Overwolf game database. */
    GameInfo: GameInfo;
    /** The game class ID from the database (without instance suffix). */
    GameInfoClassID?: number;
    /** The full game ID from the database (with instance suffix). */
    GameInfoID?: number;
    /** The timestamp when the installation was last verified. */
    LastTimeVerified?: Date;
    /** Command line parameters used when launching via the game's launcher. */
    LauncherCommandLineParams?: string;
    /** File system path to the game's launcher executable. */
    LauncherPath?: string;
    /** Whether the game was manually added by the user rather than auto-detected. */
    ManuallyAdded?: boolean;
    /** File system path to the game's main process executable. */
    ProcessPath?: string;
    /** Whether the game entry was automatically created by process-name detection. */
    WasAutoAddedByProcessDetection?: boolean;
  }

  /**
   * Result of a `getGameDBInfo` call.
   * Exactly one of `gameInfo` or `installedGameInfo` will be populated,
   * depending on whether the game is installed on the local machine.
   */
  interface GetGameDBInfoResult extends Result {
    /**
     * Database metadata for the game.
     * Populated when the game is **not** installed locally; `null` otherwise.
     */
    gameInfo?: GameInfo;
    /**
     * Installation details combined with database metadata.
     * Populated when the game **is** installed locally; `null` otherwise.
     * Note: `installedGameInfo` contains a `GameInfo` object within it.
     */
    installedGameInfo?: InstalledGameInfo;
  }

  /** Result of a `getRecentlyPlayedGames` call. */
  interface GetRecentlyPlayedResult extends Result {
    /** Array of Overwolf game class IDs for recently played games, most recent first. */
    games: number[];
  }

  /** Result of a `getGameInfo` call. */
  interface GetGameInfoResult extends Result {
    /** Installation details for the requested game, or undefined if not found. */
    gameInfo?: InstalledGameInfo;
  }

  /**
   * Result of a `getRunningGameInfo` call.
   * Contains the same fields as `RunningGameInfo` plus overlay information.
   */
  interface GetRunningGameInfoResult extends Result {
    /** Whether the game window currently has input focus. */
    isInFocus: boolean;
    /** Whether the game process itself has focus. */
    gameIsInFocus: boolean;
    /** Whether the game process is currently running. */
    isRunning: boolean;
    /** Whether the game allows video capture via the Overwolf API. */
    allowsVideoCapture: boolean;
    /** The full title of the game. */
    title: string;
    /** The human-readable display name of the game. */
    displayName: string;
    /** The abbreviated short title of the game. */
    shortTitle: string;
    /** The full Overwolf game ID, including the instance suffix. */
    id: number;
    /** The Overwolf game class ID (without instance suffix). */
    classId: number;
    /** The game window width in physical pixels. */
    width: number;
    /** The game window height in physical pixels. */
    height: number;
    /** The game window width in logical (DPI-independent) pixels. */
    logicalWidth: number;
    /** The game window height in logical (DPI-independent) pixels. */
    logicalHeight: number;
    /** List of renderer names used by the game. */
    renderers: string[];
    /** The primary renderer detected for the running game. */
    detectedRenderer: string;
    /** Full file system path to the game executable. */
    executionPath: string;
    /** A unique identifier for the current game session. */
    sessionId: string;
    /** The command line string used to launch the game. */
    commandLine: string;
    /** Whether this entry represents a game or a launcher. */
    type: enums.GameInfoType;
    /** String representation of the `type` field. */
    typeAsString: string;
    /** The native OS window handle for the game window. */
    windowHandle: { value: number; };
    /** The native OS monitor handle for the display the game is running on. */
    monitorHandle: { value: number; };
    /** The OS process ID of the running game. */
    processId: number;
    /** Current overlay status information. */
    overlayInfo: OverlayInfo;
  }

  /**
   * Extended running game info returned inside `GetRunningGameInfoResult2`.
   * Identical to `GetRunningGameInfoResult` but also includes overlay enabled/supported flags.
   */
  interface GetRunningGameInfoResult2GameInfo {
    /** Whether the game window currently has input focus. */
    isInFocus: boolean;
    /** Whether the game process itself has focus. */
    gameIsInFocus: boolean;
    /** Whether the game process is currently running. */
    isRunning: boolean;
    /** Whether the game allows video capture via the Overwolf API. */
    allowsVideoCapture: boolean;
    /** The full title of the game. */
    title: string;
    /** The human-readable display name of the game. */
    displayName: string;
    /** The abbreviated short title of the game. */
    shortTitle: string;
    /** The full Overwolf game ID, including the instance suffix. */
    id: number;
    /** The Overwolf game class ID (without instance suffix). */
    classId: number;
    /** The game window width in physical pixels. */
    width: number;
    /** The game window height in physical pixels. */
    height: number;
    /** The game window width in logical (DPI-independent) pixels. */
    logicalWidth: number;
    /** The game window height in logical (DPI-independent) pixels. */
    logicalHeight: number;
    /** List of renderer names used by the game. */
    renderers: string[];
    /** The primary renderer detected for the running game. */
    detectedRenderer: string;
    /** Full file system path to the game executable. */
    executionPath: string;
    /** A unique identifier for the current game session. */
    sessionId: string;
    /** The command line string used to launch the game. */
    commandLine: string;
    /** Whether this entry represents a game or a launcher. */
    type: enums.GameInfoType;
    /** String representation of the `type` field. */
    typeAsString: string;
    /** The native OS window handle for the game window. */
    windowHandle: { value: number; };
    /** The native OS monitor handle for the display the game is running on. */
    monitorHandle: { value: number; };
    /** The OS process ID of the running game. */
    processId: number;
    /** Current overlay status information. */
    overlayInfo: OverlayInfo;
    /** Whether the Overwolf overlay is currently enabled for this game. */
    isOverlayEnabled: boolean;
    /** Whether the Overwolf overlay is supported for this game. */
    isOverlaySupported: boolean;
  }

  /** Result of a `getRunningGameInfo2` call. */
  interface GetRunningGameInfoResult2 extends Result {
    /** Current running game information, or `null` if no game is running. */
    gameInfo: GetRunningGameInfoResult2GameInfo | null
  }

  /** Describes the current state of the Overwolf overlay for a running game. */
  interface OverlayInfo {
    /** Third-party overlay apps detected as coexisting with the Overwolf overlay. */
    coexistingApps?: enums.KnownOverlayCoexistenceApps[];
    /** Whether the overlay input hook encountered a failure. */
    inputFailure?: boolean;
    /** Whether the overlay has rendered at least one frame in-game. */
    hadInGameRender?: boolean;
    /** Whether the overlay cursor is currently visible. */
    isCursorVisible?: boolean;
    /** Whether exclusive rendering mode has been disabled for this game. */
    exclusiveModeDisabled?: boolean;
    /** Whether the out-of-process (OOP) overlay is active. */
    oopOverlay?: boolean;
    /** Whether Windows full-screen optimization is disabled for this game. */
    isFullScreenOptimizationDisabled?: boolean;
  }

  /**
   * Payload of the `onGameInfoUpdated` event.
   * Fired whenever game state changes, such as launch, termination, focus, resolution, or overlay state.
   */
  interface GameInfoUpdatedEvent {
    /** The current running game info, or `null` if no game is running. */
    gameInfo?: RunningGameInfo | null;
    /** Whether the game's screen resolution changed. */
    resolutionChanged: boolean;
    /** Whether the game started or stopped running. */
    runningChanged: boolean;
    /** Whether the game window's focus state changed. */
    focusChanged: boolean;
    /** Whether the active game changed to a different title. */
    gameChanged: boolean;
    /** Whether the overlay state changed (e.g., exclusive mode, coexistence). */
    gameOverlayChanged: boolean;
    /** Whether the overlay input hook encountered an error during this update. */
    overlayInputHookError?: boolean;
    /** One or more reasons describing what triggered this update. */
    reason: ReadonlyArray<enums.GameInfoChangeReason>;
  }

  /**
   * Payload of the `onMajorFrameRateChange` event.
   * Fired when the game's FPS changes significantly relative to its stable threshold.
   */
  interface MajorFrameRateChangeEvent {
    /** Whether the FPS is stable, has dropped, or has increased relative to the threshold. */
    fps_status: "None" | "Stable" | "Drop" | "Increase";
    /** The current measured frames per second. */
    fps: number;
  }

  /** Payload of the `onGameRendererDetected` event. */
  interface GameRendererDetectedEvent {
    /** The name of the rendering API detected (e.g., `"D3D11"`, `"Vulkan"`). */
    detectedRenderer: string;
  }

  /**
   * Returns an object with information about the currently running game (or
   * active games, if more than one), or null if no game is running.
   * @param callback Called with the currently running or active game info. See
   */
  function getRunningGameInfo(
    callback: CallbackFunction<GetRunningGameInfoResult>
  ): void;

  /**
   * Returns an object with information about the currently running game (or
   * active games, if more than one), or null if no game is running.
   * @param callback Called with the currently running or active game info. See
   */
  function getRunningGameInfo2(
    callback: CallbackFunction<GetRunningGameInfoResult2>
  ): void;

  /**
   * Returns information about a game with a given game id.Will only return
   * information if the game is detected on the local machine (i.e. installed)
   * @param gameClassId The class id of the game.
   * @param callback Called with the info about the game.
   */
  function getGameInfo(
    gameClassId: number,
    callback: CallbackFunction<GetGameInfoResult>
  ): void;

  /**
   * This is the same as `getGameDBInfo`, except that it can return two different
   * results: 1. if the game is detected as installed - then the
   * `installedGameInfo` member of the result will be set and the `gameInfo`
   * member will be null 2. if the game is NOT detected as installed, then the
   * `installedGameInfo` member of the result will be set to null and the
   * `gameInfo` member will be set NOTE: `installedGameInfo` contains `gameInfo`
   * in it.
   * @param classId The class id of the game.
   * @param callback Called with the info about the game.
   */
  function getGameDBInfo(
    classId: number,
    callback: CallbackFunction<GetGameDBInfoResult>
  ): void;

  /**
   * Returns an array of the maxNumOfGames most recently played game IDs.An
   * empty array will be returned if none have been recorded.
   * @param maxNumOfGames The maximum number of games to receive.
   * @param callback Called with the array of game IDs.
   */
  function getRecentlyPlayedGames(
    maxNumOfGames: number,
    callback: CallbackFunction<GetRecentlyPlayedResult>
  ): void;

  /**
   * Returns the last played gameinfo (when no game is currently running).
   * @param callback Called with the result.
   */
  function getLastRunningGameInfo(
    callback: CallbackFunction<GetGameInfoResult>
  ): void;

  /**
   * Fired when the game info is updated, including game name, game running,
   * game terminated, game changing focus, etc.
   */
  const onGameInfoUpdated: Event<GameInfoUpdatedEvent>;

  /**
   * Fired when a game is launched.
   */
  const onGameLaunched: Event<RunningGameInfo>;

  /**
   * Fired when the rendering frame rate of the currently injected game changes
   * dramatically.
   */
  const onMajorFrameRateChange: Event<MajorFrameRateChangeEvent>;
