/**
   * Fired when fps infromation is ready with a JSON containing the information.
   */
  const onFpsInfoReady: Event<any>;
}

declare namespace overwolf.games {
  namespace enums {
    const enum GameInfoType {
      Game = 0,
      Launcher = 1,
    }

    const enum GameInfoChangeReason {
      Game = "game",
      GameChanged = "gameChanged",
      GameFocusChanged = "gameFocusChanged",
      GameLaunched = "gameLaunched",
      GameOverlayCoexistenceDetected = "gameOverlayCoexistenceDetected",
      GameOverlayCursorVisibility = "gameOverlayCursorVisibility",
      GameOverlayExlusiveModeChanged = "gameOverlayExlusiveModeChanged",
      GameOverlayInputHookFailure = "gameOverlayInputHookFailure",
      GameRendererDetected = "gameRendererDetected",
      GameResolutionChanged = "gameResolutionChanged",
      GameTerminated = "gameTerminated",
      GameWindowDataChanged = "gameWindowDataChanged",
      GameOverlayExclusiveModeChanged = "gameOverlayExclusiveModeChanged",
      GameOverlayCoexistenceDetectedb = "gameOverlayCoexistenceDetectedb"
    }

    const enum KnownOverlayCoexistenceApps {
      Asus = "asus",
      Discord = "discord",
      MSIAfterBurner = "MSIAfterBurner",
      Nahimic = "nahimic",
      Nahimic2 = "nahimic2",
      None = "none",
      ObsStudio = "obsStudio",
      PlaysTV = "playsTV",
      RazerSynapse = "razerSynapse",
    }
  }

  interface GameInfo {
    ActualDetectedRenderers: number;
    ActualGameRendererAllowsVideoCapture: boolean;
    AllowCCMix: boolean;
    AllowCursorMix: boolean;
    AllowRIMix: boolean;
    Client_GameControlMode: number;
    CommandLine?: string;
    ControlModes: number;
    CursorMode: number;
    DIT: number;
    DetectDirKey?: string;
    DetectDirKeys?: string[];
    DisableActionMixed: boolean;
    DisableActivityInfo: boolean;
    DisableAeroOnDX11: boolean;
    DisableBlockChain: boolean;
    DisableD3d9Ex: boolean;
    DisableDIAquire: boolean;
    DisableEXHandle: boolean;
    DisableEternalEnum: boolean;
    DisableExclusiveModeUI: boolean;
    DisableFeature_TS3: boolean;
    DisableFeature_VideoCapture: boolean;
    DisableMultipleInjections: boolean;
    DisableOWGestures: boolean;
    DisableRenderAI: boolean;
    DisableResizeRelease: boolean;
    DisableSmartMixMode: boolean;
    DisplayName?: string;
    EnableClockGesture: boolean;
    EnableFocusOnAnyClick: boolean;
    EnableMTCursor: boolean;
    EnableRawInput: boolean;
    EnableSmartDIFocus: boolean;
    EnableSmartDIFocus2: boolean;
    EnableSmartFocus: boolean;
    EnableTXR: boolean;
    ExecutedMoreThan: boolean;
    FIGVTH: boolean;
    FPSIndicationThreshold: number;
    FirstGameResolutionHeight: number;
    FirstGameResolutionWidth: number;
    FixActionFocus: boolean;
    FixCC: boolean;
    FixCOEx: boolean;
    FixCVCursor: boolean;
    FixCursorOffset: boolean;
    FixDIBlock: boolean;
    FixDIFocus: boolean;
    FixDXThreadSafe: boolean;
    FixFSTB: boolean;
    FixHotkeyRI: boolean;
    FixInputBlock: boolean;
    FixInvisibleCursorCR: boolean;
    FixMixModeCursor: boolean;
    FixModifierMixMode: boolean;
    FixMouseDIExclusive: boolean;
    FixRCEx: boolean;
    FixResolutionChange: boolean;
    FixRestoreSWL: boolean;
    FixSWL: boolean;
    FixSWLW: boolean;
    ForceCaptureChangeRehook: boolean;
    ForceControlRehook: boolean;
    ForceGBB: boolean;
    GameGenres?: string;
    GameLinkURL?: string;
    GameNotes?: string;
    GameRenderers: number;
    GameTitle?: string;
    GenericProcessName: boolean;
    GroupTitle?: string;
    ID: number;
    IconFile?: string;
    IgnoreMultipleDevices: boolean;
    IgnoreRelease: boolean;
    ImGuiRendering: boolean;
    InjectionDecision: number;
    Input: number;
    InstallHint?: string;
    IsConflictingWithControlHotkey: boolean;
    IsNew: boolean;
    IsSteamGame: boolean;
    KeepInGameOnLostFocus: boolean;
    Label?: string;
    LastInjectionDecision: number;
    LastKnownExecutionPath?: string;
    LaunchParams?: string;
    Launchable: boolean;
    LauncherDirectoryRegistryKey?: string;
    LauncherDirectoryRegistryKeys?: string[];
    LauncherGameClassId: number;
    LauncherNames?: string[];
    ModifierStatus: number;
    NativeID: number;
    PassThruBoundsOffsetPixel: number;
    PressToClickThrough: number;
    ProcessCommandLine?: string;
    ProcessID: number;
    ProcessNames: string[];
    RecreateSB: boolean;
    ReleaseKBInOverlayFocus: boolean;
    ResizeNotifyResolution: boolean;
    RestoreBB: boolean;
    RestoreRT: boolean;
    RunElevated: boolean;
    SendHotkeyRI: boolean;
    SetDIInExclusive: boolean;
    ShortTitle?: string;
    SkipGameProc: boolean;
    SmartReleaseKBInOverlayFocus: boolean;
    StableFPSThreshold: number;
    StuckInTrans_Margin: number;
    StuckInTrans_MouseMoveGap?: number;
    SupportedScheme?: string;
    SupportedVersion?: string;
    TCModes: number;
    TerminateOnWindowClose: boolean;
    Type: number;
    TypeString?: string;
    UnsupportedScheme?: string;
    UpdateCursor: boolean;
    UpdateCursorMT: boolean;
    UseAllSafeHook: boolean;
    UseEH?: string;
    UseHardwareDevice: boolean;
    UseLauncherIcon: boolean;
    UseLongHook: boolean;
    UseMCH?: string;
    UseMH: boolean;
    UseMHScheme?: string;
    UseMKLL: boolean;
    UseMW: boolean;
    UsePR: boolean;
    UseRI: boolean;
    UseRIB: boolean;
    UseSafeHook: boolean;
    UseTSHook: boolean;
    WaitRestore: boolean;
    Win7Support: number;
    Win8Support: number;
    Win10Support: number;
    XPSupport: number;
  }

  interface RunningGameInfo {
    isInFocus: boolean;
    gameIsInFocus: boolean;
    isRunning: boolean;
    allowsVideoCapture: boolean;
    title: string;
    displayName: string;
    shortTitle: string;
    id: number;
    classId: number;
    width: number;
    height: number;
    logicalWidth: number;
    logicalHeight: number;
    renderers: string[];
    detectedRenderer: string;
    executionPath: string;
    sessionId: string;
    commandLine: string;
    type: enums.GameInfoType;
    typeAsString: string;
    windowHandle: { value: number; };
    monitorHandle: { value: number; };
    processId: number;
    oopOverlay?: boolean;
    isOverlayEnabled: boolean;
    isOverlaySupported: boolean;
  }

  interface GameInfoUpdate {
    gameInfo: RunningGameInfo;
    resolutionChanged: boolean;
    runningChanged: boolean;
    focusChanged: boolean;
    gameChanged: boolean;
  }

  interface InstalledGameInfo {
    GameInfo: GameInfo;
    GameInfoClassID?: number;
    GameInfoID?: number;
    LastTimeVerified?: Date;
    LauncherCommandLineParams?: string;
    LauncherPath?: string;
    ManuallyAdded?: boolean;
    ProcessPath?: string;
    WasAutoAddedByProcessDetection?: boolean;
  }

  interface GetGameDBInfoResult extends Result {
    gameInfo?: GameInfo;
    installedGameInfo?: InstalledGameInfo;
  }

  interface GetRecentlyPlayedResult extends Result {
    games: number[];
  }

  interface GetGameInfoResult extends Result {
    gameInfo?: InstalledGameInfo;
  }

  interface GetRunningGameInfoResult extends Result {
    isInFocus: boolean;
    gameIsInFocus: boolean;
    isRunning: boolean;
    allowsVideoCapture: boolean;
    title: string;
    displayName: string;
    shortTitle: string;
    id: number;
    classId: number;
    width: number;
    height: number;
    logicalWidth: number;
    logicalHeight: number;
    renderers: string[];
    detectedRenderer: string;
    executionPath: string;
    sessionId: string;
    commandLine: string;
    type: enums.GameInfoType;
    typeAsString: string;
    windowHandle: { value: number; };
    monitorHandle: { value: number; };
    processId: number;
    overlayInfo: OverlayInfo;
  }

  interface GetRunningGameInfoResult2GameInfo {
    isInFocus: boolean;
    gameIsInFocus: boolean;
    isRunning: boolean;
    allowsVideoCapture: boolean;
    title: string;
    displayName: string;
    shortTitle: string;
    id: number;
    classId: number;
    width: number;
    height: number;
    logicalWidth: number;
    logicalHeight: number;
    renderers: string[];
    detectedRenderer: string;
    executionPath: string;
    sessionId: string;
    commandLine: string;
    type: enums.GameInfoType;
    typeAsString: string;
    windowHandle: { value: number; };
    monitorHandle: { value: number; };
    processId: number;
    overlayInfo: OverlayInfo;
    isOverlayEnabled: boolean;
    isOverlaySupported: boolean;
  }

  interface GetRunningGameInfoResult2 extends Result {
    gameInfo: GetRunningGameInfoResult2GameInfo | null
  }

  interface OverlayInfo {
    coexistingApps?: enums.KnownOverlayCoexistenceApps[];
    inputFailure?: boolean;
    hadInGameRender?: boolean;
    isCursorVisible?: boolean;
    exclusiveModeDisabled?: boolean;
    oopOverlay?: boolean;
    isFullScreenOptimizationDisabled?: boolean;
  }

  interface GameInfoUpdatedEvent {
    gameInfo?: RunningGameInfo | null;
    resolutionChanged: boolean;
    runningChanged: boolean;
    focusChanged: boolean;
    gameChanged: boolean;
    gameOverlayChanged: boolean;
    overlayInputHookError?: boolean;
    reason: ReadonlyArray<enums.GameInfoChangeReason>;
  }

  interface MajorFrameRateChangeEvent {
    fps_status: "None" | "Stable" | "Drop" | "Increase";
    fps: number;
  }

  interface GameRendererDetectedEvent {
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

  