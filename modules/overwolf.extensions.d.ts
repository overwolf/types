/**
 * Use this API to manage Overwolf extensions (apps) — launch other extensions,
 * query and exchange runtime info, check for updates, and react to lifecycle
 * events such as app launch, update, and uncaught exceptions.
 * @packageDocumentation
 */

/**
   * Fired when the tray icon is double clicked.
   */
  const onTrayIconDoubleClicked: Event<any>;
}

declare namespace overwolf.extensions {
  /**
   * A union of all permission strings an app may request in its manifest.
   */
  type Permission =
    | "Camera"
    | "Microphone"
    | "Logging"
    | "Extensions"
    | "Streaming"
    | "DesktopStreaming"
    | "Profile"
    | "Clipboard"
    | "Hotkeys"
    | "Media"
    | "GameInfo"
    | "GameControl"
    | "FileSystem"
    | "LogitechLed"
    | "LogitechArx"
    | "OwWebview"
    | "VideoCaptureSettings";

  /** The type of an Overwolf extension. */
  const enum ExtensionType {
    /** A standard web-based Overwolf app. */
    WebApp = "WebApp",
    /** An Overwolf built-in extension. */
    BuiltIn = "BuiltIn",
    /** A Twitch-channel (TC) app. */
    TCApp = "TCApp",
    /** A giveaway extension. */
    Giveaway = "Giveaway",
    /** The Overwolf Store extension. */
    Store = "Store",
    /** A skin extension. */
    Skin = "Skin",
    /** A TypeScript-based skin extension. */
    TSSkin = "TSSkin",
    /** An extension that provides game events. */
    GameEventsProvider = "GameEventsProvider",
    /** The extension type could not be determined. */
    Unknown = "Unknown",
  }

  /** The update state of an extension. */
  const enum ExtensionUpdateState {
    /** The extension is up to date. */
    UpToDate = "UpToDate",
    /** A newer version of the extension is available for download. */
    UpdateAvailable = "UpdateAvailable",
    /** An update has been downloaded and is waiting for an app restart. */
    PendingRestart = "PendingRestart",
  }

  /**
   * Representation of manifest.json
   */
  interface Manifest {
    /**
     * Targets the manifest version you are working on. Currently there is only
     * one version, therefore this value is always "1"
     */
    manifest_version: number;
    /**
     * Declares the type of application. Can only be "WebApp"
     */
    type: "WebApp"; //should be changed in the future to the enum "ExtensionType"
    /**
     * Includes app metadata
     */
    meta: Metadata;

    /** The unique identifier (UID) of the extension. */
    UID: string;
    /**
     * 	An array of permissions that the app requires.
     */
    permissions: Permission[];
    /**
     * A list of additional meta-data on the app
     */
    data: WebAppSettings;
    /**
     * Increase the app's log file rotation (defaults to 10, max is 40).
     */
    max_rotation_log_files: number;
  }

  /** App metadata as declared in the manifest `meta` block. */
  interface Metadata {
    /**
     * Name of your app
     */
    name: string;
    /**
     * The app's developer
     */
    author: string;
    /**
     * Up to four dot-separated integers identifying the current app version.
     */
    version: string;
    /**
     * Minimum version of the Overwolf Client with which the app is compatible.
     * The format is similar to the "version" field.
     */
    "minimum-overwolf-version": string;
    /**
     * Minimum version of the Overwolf Game Events Provider with which the app
     * is compatible. The format is similar to the "version" field.
     */
    "minimum-gep-version"?: string;
    /**
     * Minimum version of the Overwolf Game Summary with which the app is
     * compatible. The format is similar to the "version" field.
     */
    "minimum-gs-version"?: string;
    /**
     * Your app's description in the Appstore tile. Limited to 180 characters.
     */
    description: string;
    /**
     * Short name of your app. Provide a short title that will fit in the dock
     * button area – 18 chars max.
     */
    dock_button_title: string;
    /**
     * A relative path from the app folder to the icon's png file. This is the
     * mouse-over (multi-colored) version of the icon that will be displayed on
     * the Overwolf dock. The icon dimensions should be 256×256 pixels, 72 PPI.
     * Overwolf will resize it to 37×37. Please make sure the png is smaller
     * than 30KB.
     */
    icon: string;
    /**
     * A relative path from the app folder to the icon's png file. This
     * grayscale version of the icon is for the default state that will be
     * displayed on the Overwolf dock. The icon dimensions should be 256×256
     * pixels, 72 PPI. Overwolf will resize it to 37×37. Please make sure the
     * png is smaller than 30KB
     */
    icon_gray: string;
    /**
     * A relative path from the app folder to the desktop shortcut icon's ico
     * file. This is a colored icon for the app's desktop shortcut.
     */
    launcher_icon: string;
    /**
     * A relative path from the app folder to the splash image icon's png file.
     * The image size should be 256x256px. If a this image is missing, Overwolf
     * will use the "icon" image as a splash image
     */
    splash_image: string;
    /**
     * A relative path from the app folder to the icon's png file. This is the
     * window task bar icon \ window header. The icon dimensions should be
     * 256x256 pixels.
     */
    window_icon: string;
  }

  /** The `data` block of the manifest, containing all app-level settings. */
  interface WebAppSettings {
    /**
     * An app can declare itself as targeted for one game or more.
     */
    game_targeting?: {
      /**
       * "all" – All games (e.g voice communication apps). "dedicated" –
       * Dedicated to a game or several games. "none" – No games.
       */
      type: "all" | "dedicated" | "none";
      /**
       * The game IDs that your app targets
       */
      game_ids?: number[];
    };
    /**
     * The name of the window (from the "windows" list) to initially load when
     * the app starts.
     */
    start_window: string;
    /**
     * A map from window names to window settings.
     */
    windows: Dictionary<ExtensionWindowData>;
    /**
     * Enable/Disable printing of ads log to the console. Default value is
     * "false".
     */
    enable_top_isolated_sites_console?: boolean;
    /**
     * A definition of external URLs the web app should be able to access.
     */
    externally_connectable?: { matches: string[]; };
    /**
     * Overrides the relative protocol with a preferred one.
     */
    protocol_override_domains?: Dictionary<string>;
    /**
     * Choose whether links in the app will be opened using the user's default
     * browser or Overwolf's browser. Possible values: "user" or "overwolf".
     */
    force_browser?: string;
    /**
     * @deprecated No longer supported
     *
     * Enable OSR/GPU acceleration if supported by this machine. Note: this flag
     * is still in Beta. It may not function as expected in some machines.
     */
    enable_osr_acceleration?: boolean;
    /**
     * A list of game ids for which game events are required.
     */
    game_events?: number[];
    /**
     * Disable the log file's 1000-line limitation. Note: Do not enable it
     * without Overwolf's approval.
     */
    disable_log_limit?: boolean;
    /**
     * Allows access to custom plugin dlls.
     */
    "extra-objects"?: Dictionary<{ file: string; class: string; }>;
    /**
     * Shortcut keys that trigger an app action.
     */
    hotkeys?: {
      [hotkeyName: string]: {
        /**
         * Name of the hotkey as it will appear in the Hotkey tab in the
         * settings.
         */
        title: string;
        /**
         * Defines the behavior of the hotkey.
         */
        "action-type"?: "toggle" | "custom";
        /**
         * The default key combination.
         */
        default?: string;
        /**
         * Defines the behavior of the hotkey.
         */
        passthrough?: boolean;
      };
    };
    /**
     * A list of content scripts to be loaded for specific windows.
     */
    content_scripts?: {
      /**
       * The list of windows for which to apply this content script.
       */
      windows?: string[];
      /**
       * The list of URLs for which to apply this content script.
       */
      matches?: string[];
      /**
       * The list of CSS files to be applied in this content script.
       */
      css?: string[];
      /**
       * The list of JS files to be applied in this content script.
       */
      js?: string[];
    }[];
    /**
     * A list of events causing the app to launch.
     */
    launch_events?: {
      /**
       * The type name of the event.
       */
      event: "GameLaunch" | "AllGamesLaunch" | "LaunchWithOverwolf";
      /**
       * The list of game class IDs for which the app will launch.
       */
      event_data?: {
        /**
         * The list of game class IDs for which the app will launch.
         */
        game_ids: number[];
        /**
         * The app won't start until the game's framerate will stabilize around
         * or above the stated framerate.
         */
        wait_for_stable_framerate: number[];
      };
      /**
       * The app's main window will start minimized.
       */
      start_minimized?: boolean;
      /**
       * The app will be launched when game launcher is detected.
       */
      include_launchers?: boolean;
    }[];
    /**
     * A custom user agent for the app to use when creating http requests. Note:
     * using 'navigator.userAgent' will not return the custom user agent, but
     * the default one.
     */
    user_agent?: string;
    /**
     * Disable opening of the developer tools for the app (with Ctrl+shift+I).
     * Default value – "false"
     */
    disable_dt?: boolean;
    /**
     * Hosting app flexible data.
     * If you app wants to provide some sort of service (like GS provides a
     * "tab-hosting" service for apps) - you can use this flag to set different
     * parameters that are relevant for the service provider app.
     */
    service_providers?: string;
    /**
     * Additional setting for developers.
     */
    developer?: {
      /**
       * Enable auto App reloading when detecting files changes. default is true
       */
      enable_auto_refresh: boolean;
      /**
       * 	Delay in milliseconds. When detecting file changes (for multiple
       * 	changes). default value is 1000 milliseconds (1 second)
       */
      reload_delay: number;
      /**
       * Filter files which will be tracked.e.g (.js;.html. default value is "."
       * -> all files, but you can use several value like ".json;.html"
       */
      filter: string;
    };
    /**
     * If set to true, app localStorage data will not be cleaned up after app uninstallation.
     * Default value – "false"
     */
    disable_cleanup?: boolean;
    /**
     * Allow overriding the OverwolfBrowser.exe process name in task manager.
     */
    process_name?: string;
    /**
     * Ability to open an application from a browser using a link.
     */
    url_protocol?: Dictionary<string>;
  }

  /** Per-window configuration declared in the manifest `data.windows` map. */
  interface ExtensionWindowData {
    /**
     * Points to a local HTML file to be loaded inside the window. If you wish
     * to host your app in a remote web-site, you'll have to have a local page
     * that redirects to that remote website. In such cases, you need to make
     * sure that the block_top_window_navigation property is set to false.
     */
    file: string;
    /**
     * Define if the window is displayed in the Windows taskbar and alt-tab
     * window selection menu.
     */
    show_in_taskbar?: boolean;
    /**
     * Indicates whether the window will be transparent and borderless. Any part
     * of your window with transparent background (`"background: transparent;"`)
     * will become a see-through area that blends with the game or desktop. If
     * set to false a standard Overwolf window will be created.
     */
    transparent?: boolean;
    /**
     * Indicates whether the window's locally saved data should be overridden
     * when the window's size/location/opacity changes after a version update.
     */
    override_on_update?: boolean;
    /**
     * Indicates whether the window can be resized.
     */
    resizable?: boolean;
    /**
     * Indicates whether to show the window minimize button. Only relevant when
     * not in transparent mode.
     */
    show_minimize?: boolean;
    /**
     * Indicates whether the window will not receive clicks in-game, instead,
     * the clicks will be passed on to the game. To change this property at
     * runtime, use setWindowStyle().
     */
    clickthrough?: boolean;
    /**
     * Indicates whether the   Mouse and keyboard input will pass to the window AND to the game (no input blocking). To change this property at
     * runtime, use setWindowStyle().
     */
    style?: overwolf.windows.enums.WindowStyle;
    /**
     * When set to true, disable right clicks entirely for this window.
     */
    disable_rightclick?: boolean;
    /**
     * Indicates whether this window should always be included in recordings,
     * overriding any other setting.
     */
    forcecapture?: boolean;
    /**
     * Indicates whether this window is visible only in streams (not visible to
     * the streamer), overriding any other setting.
     */
    show_only_on_stream?: boolean;
    /**
     * Indicates whether the window will receive keyboard events or pass them on
     * to the game.
     */
    ignore_keyboard_events?: boolean;
    /**
     * Marks the window as available in-game only (Not accessible on Desktop).
     */
    in_game_only?: boolean;
    /**
     * Marks the window as available on desktop only, and not in-game. This flag
     * should be used (set to "true") when "use_os_windowing" or "native_window"
     * flags are set to true. Note: using "desktop_only" and "native_window"
     * flags for desktop windows will dramatically improve your app's
     * performance.
     */
    desktop_only?: boolean;
    /**
     * Indicates whether the window will animate on minimize/restore while in
     * game.
     */
    disable_restore_animation?: boolean;
    /**
     * Indicates whether the in-game window will 'steal' the keyboard focus
     * automatically from the game when it opens, or leave the keyboard focus
     * untouched. Default value is false.
     */
    grab_keyboard_focus?: boolean;
    /**
     * Indicates whether the desktop window will grab the focus automatically
     * when it opens, or leave the focus untouched. Default value is true.
     */
    grab_focus_on_desktop?: boolean;
    /**
     * Defines the size of the window in pixels when it is first opened. If your
     * window is not resizable, this will be the constant size of your window.
     * However, if your app is resizable – the app size is saved by Overwolf
     * when closed so that the next time it is opened, it will preserve it.
     */
    size?: Size;
    /**
     * Defines the minimum size of the window in pixels.
     */
    min_size?: Size;
    /**
     * Defines the maximum size of the window in pixels.
     */
    max_size?: Size;
    /**
     * The default starting position of the window counted in pixels from the
     * top left corner of the screen.
     */
    start_position?: Point;
    /**
     * Indicates whether the window will be on top of other Overwolf windows.
     * Handle with care as topmost windows can negatively impact user experience.
     */
    topmost?: boolean;
    /**
    * Indicates whether the window will be on bottom of other Overwolf windows.
    * Handle with care as bottommost windows can negatively impact user experience.
    */
    bottommost?: boolean;
    /**
     * Refrain from non _blank elements from "taking-over" the entire app's
     * window.
     */
    block_top_window_navigation?: boolean;
    /**
     * Window location won't be changed when game focus is changed.
     */
    keep_window_location?: boolean;
    /**
     * When set to true, allows your window to have a full-screen maximize when
     * calling the overwolf.windows.maximize function, and a real taskbar
     * minimize when calling overwolf.windows.minimize. Note: Should only be
     * used with desktop_only windows.
     */
    use_os_windowing?: boolean;
    /**
     * Enables JS engine background optimization. Default value is true.
     */
    background_optimization?: boolean;
    /**
     * Mutes sounds in window.
     */
    mute?: boolean;
    /**
     * Excludes hosts list so a stream from these hosts origins will not get
     * muted even if the window is on "mute": true.
     */
    mute_excluded_hosts?: string[];
    /**
     * 	Prevents new browser windows being opened automatically using script.
     * 	Default value is false.
     */
    popup_blocker?: boolean;
    /**
     * Enables window maximize button. Relevant only for the standard Overwolf
     * window ("transparent": false) Default value is false.
     */
    show_maximize?: boolean;
    /**
     * Causes the app's window to never "lose focus", so the window.onblur event
     * is never triggered. Default value is false.
     */
    disable_blur?: boolean;
    /**
     * Creates a native CEF desktop only window (which improves performance)
     * Note: Should only be used with desktop_only windows. Default value is
     * false.
     */
    native_window?: boolean;
    /**
     * This flag MUST be used with background/hidden controller windows. Note:
     * With this flag set to 'true', there's no need to set window related
     * properties such as size, focus, transparency, etc.
     */
    is_background_page?: boolean;
    /**
     * Allows you to control the behavior of an app window while in a
     * "mouse-less" game state.
     */
    focus_game_takeover?: "ReleaseOnHidden" | "ReleaseOnLostFocus";
    /**
     * 	Allow Overwolf to display your app's hotkey combination on the screen
     * 	when the user switches to "exclusive mode". The string value should be
     * 	the hotkey name from the hotkeys section. Relevant only if you set
     * 	focus_game_takeover=ReleaseOnHidden.
     */
    focus_game_takeover_release_hotkey?: string;
    /**
     * 	Enable iframe isolation: runs it in a different process, so if some
     * 	iframe is misbehaving (e.g. memory leak, etc.) it won't crash your app
     * 	and will only crash the iframe process. useful with Overwolf ads that
     * 	run in an iframe. Note: Please contact us before adding it to your app.
     * 	Default value is true.
     */
    enable_top_isolation?: boolean;
    /**
     * Allows access to local files that are not located in your app's
     * (extension) folder. Default value is false.
     */
    allow_local_file_access?: boolean;
    /**
     * 	Blocks the user from closing the window by using Alt+F4. You can
     * 	register to the onAltF4Blocked event to be noticed when a "block" was
     * 	triggered.
     */
    is_alt_f4_blocked?: boolean;
    /**
     * Opens developer tools in dedicated window.
     */
    dev_tools_window_style?: boolean;
    /**
     * For local-server debugging (like react apps). You can use this field to
     * set the localhost:port URL. Notes: You must have a local web server
     * installed on your machine. Valid only when loading unpacked extensions.
     * Valid only with "localhost" / "127.0.0.1".
     */
    debug_url: string;
    /**
     * @deprecated No longer supported.
     *
     * Valid only for transparent windows. Valid only if enable_osr_acceleration
     * is on.
     */
    optimize_accelerate_rendering: boolean;
    /**
     * Relevant only for native windows. Disable the DPI Aware behavior of native windows.
     */
    disable_auto_dpi_sizing: boolean;
    /**
     * A window will always stay inside the game window while dragging.
     */
    restrict_to_game_bounds: boolean;
    /**
     * Disable GPU hardware acceleration, per window. Relevant only to native windows.
     * Notes: Use this flag mainly for native windows that run as a second-screen with fps intensive games. It improves the performance of the game by reducing usage of the GPU while you are playing.
     */
    disable_hardware_acceleration: boolean;
  }

  /** A width/height pair used to describe window dimensions. */
  interface Size {
    /** Width in pixels. */
    width: number;
    /** Height in pixels. */
    height: number;
  }

  /** A top/left coordinate pair used to describe a window's starting position. */
  interface Point {
    /** Distance from the top of the screen in pixels. */
    top: number;
    /** Distance from the left of the screen in pixels. */
    left: number;
  }

  /** Result of `getManifest`, combining the base `Result` with the full `Manifest` object. */
  interface GetManifestResult extends Result, Manifest { }

  /** Result containing the phased rollout percentage for the calling extension. */
  interface GetPhasedPercentResult extends Result {
    /** The percentage (0–100) of users receiving the phased update. */
    phasedPercent: number;
  }

  /** Result of `getInfo`, containing the info string or object set by another extension. */
  interface GetInfoResult extends Result {
    /** The info value posted by the target extension. */
    info: string | { [key: string]: any };
  }

  /** Result of `getRunningState`, indicating whether the target extension is active. */
  interface GetRunningStateResult extends Result {
    /** `true` if the target extension is currently running. */
    isRunning: boolean;
  }

  /** Result of `updateExtension`, describing the outcome of an update attempt. */
  interface UpdateExtensionResult extends Result {
    /** The update state after the operation. */
    state?: string;
    /** Additional human-readable information about the update. */
    info?: string;
    /** The version string of the installed or pending update. */
    version?: string;
  }

  /** Result of `checkForExtensionUpdate`, reporting whether an update is available. */
  interface CheckForUpdateResult extends Result {
    state?: "UpToDate" | "UpdateAvailable" | "PendingRestart"; //should be changed in the future to the enum "ExtensionUpdateState"
    /** The version string of the available update, if any. */
    updateVersion?: string;
  }

  /** Result of `getServiceConsumers`, providing service-provider manifest data. */
  interface ServiceProvidersDataResult extends Result {
    /** A dictionary mapping provider keys to their data strings. */
    data: Dictionary<string>;
  }

  /** Event data fired when the app is launched while already running. */
  interface AppLaunchTriggeredEvent {
    /** The origin that triggered the launch (e.g. `"dock"`, `"storeapi"`, `"odk"`). */
    origin: string;
    /** An optional parameter passed to the app at launch. */
    parameter: string;
  }

  /** Event data fired when the extension has been updated to a new version. */
  interface ExtensionUpdatedEvent {
    /** The version string of the newly installed update. */
    version: string;
    /** The current update state of the extension. */
    state: ExtensionUpdateState;
  }

  /** Event data fired when an extension is installed. */
  interface AppInstallationEvent {
    /** The unique identifier (UID) of the installed extension. */
    UID: string;
  }

  /**
   * The following types are related to the `onUncaughtException` event - which
   * is a different than the usual events.
   */
  type UncaughtExceptionCallback = (
    message: string,
    functionName: string,
    scriptName: string
  ) => void;

  /** Event interface for the `onUncaughtException` event, which uses a custom callback signature. */
  interface UncaughtExceptionEvent {
    /** Register a listener for uncaught exception events. */
    addListener(callback: UncaughtExceptionCallback): void;
    /** Remove a previously registered uncaught exception listener. */
    removeListener(callback: UncaughtExceptionCallback): void;
  }

  /** Result of `getExtensions`, containing the list of installed extensions. */
  interface GetExtensionsResult extends Result {
    /** An array of extension objects describing installed extensions. */
    extensions: any[];
  }

  /**
   * Launch an extension by its unique id.
   * @param uid The extension unique id.
   * @param parameter A parameter to pass to the extension. The extension may or
   * may not use this parameter.
   */
  function launch(uid: string, parameter?: any): void;

  /**
   * Sets a string or object for other extensions to read.
   * @param info A string or object to post.
   */
  function setInfo(info: any): void;

  /**
   * Gets an extension's info string.
   * @param id The id of the extension to get info for.
   * @param callback Called with the info.
   */
  function getInfo(id: string, callback: CallbackFunction<GetInfoResult>): void;

  /**
   * Requests info updates for extension. Will also be called when the extension
   * launches/closes.
   * @param id The id of the extension to get updates for.
   * @param eventsCallback A callback to receive info updates.
   * @param callback The status of the request.
   */
  function registerInfo(
    id: string,
    eventsCallback: (info: {
      status?: string;
      id?: string;
      info?: string;
      isRunning?: boolean;
    }) => void,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Stop requesting info for extension.
   * @param id The id of the extension to stop getting updates for.
   * @param callback The status of the request.
   */
  function unregisterInfo(id: string, callback: CallbackFunction<Result>): void;

  /**
   * Gets the running state of an extension.
   * @param id The id of the extension to get updates for.
   * @param callback The result of the request.
   */
  function getRunningState(
    id: string,
    callback: CallbackFunction<GetRunningStateResult>
  ): void;

  /**
   * Returns the requested extension's manifest object.
   * @param id The id of the extension to get the manifest for.
   * @param callback A function called with the manifest data.
   */
  function getManifest(
    id: string,
    callback: CallbackFunction<GetManifestResult>
  ): void;

  /**
   * The app will relaunch itself.
   */
  function relaunch(): void;

  /**
   * This functions allows apps to check and perform an update without having to
   * wait for Overwolf to do so.
   */
  function updateExtension(
    callback: CallbackFunction<UpdateExtensionResult>
  ): void;

  /**
   * Checks if an update is available for the calling extension.
   * @param callback
   */
  function checkForExtensionUpdate(
    callback: CallbackFunction<CheckForUpdateResult>
  ): void;

  /**
   * Return service providers manifest data.
   * @param callback
   */
  function getServiceConsumers(
    callback: CallbackFunction<ServiceProvidersDataResult>
  ): void;

  /**
 * Return service providers manifest data.
 * @param callback
 */
  function getExtensions(
    callback: CallbackFunction<GetExtensionsResult>
  ): void;

  /**
   * Fires when the current app is launched while already running. This is
   * useful in the case where the app has custom logic for clicking its dock
   * button while it is already running. The event contaisn an 'origin'
   * string which what triggered the app launch (dock, storeapi, odk, etc...)
   */
  const onAppLaunchTriggered: Event<AppLaunchTriggeredEvent>;

  /**
   * Fires when the current app's newest version has been installed.
   * This most often means that an app relaunch is required in order for the
   * update to apply.
   */
  const onExtensionUpdated: Event<ExtensionUpdatedEvent>;
