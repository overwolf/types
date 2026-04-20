/**
 * Use this API to access system utilities such as clipboard management, monitor information, file pickers, and hardware diagnostics.
 * It also provides helpers for opening URLs, simulating input, and interacting with the Overwolf store.
 * @packageDocumentation
 */

/**
   * Consume all pending conversions for this extension. Consumed conversions
   * are deleted.
   *
   * @param callback
   */
  function consumeConversions(
    callback: CallbackFunction<GetCrossAppConversionsResult>
  ): void;

  /*
   * Called when an available action has updated (or added)
   */
  const onAvailableActionUpdated: Event<CrossAppCampaign>;
}

declare namespace overwolf.utils {
  namespace enums {
    /** Pages available in the Overwolf store that can be opened via `openStore`. */
    const enum eStorePage {
      /** The store login page. */
      LoginPage = "LoginPage",
      /** A specific app's page in the store. */
      OneAppPage = "OneAppPage",
      /** The subscription page for an app. */
      SubscriptionPage = "SubscriptionPage",
      /** The reviews page for an app. */
      ReviewsPage = "ReviewsPage",
    }
  }

  /** Information about a single display/monitor connected to the system. */
  interface Display {
    /** Display name as reported by the OS. */
    name: string;
    /** Unique display identifier. */
    id: string;
    /** Horizontal position of the display in the virtual desktop (pixels). */
    x: number;
    /** Vertical position of the display in the virtual desktop (pixels). */
    y: number;
    /** Horizontal DPI of the display. */
    dpiX: number;
    /** Vertical DPI of the display. */
    dpiY: number;
    /** Width of the display in pixels. */
    width: number;
    /** Height of the display in pixels. */
    height: number;
    /** Whether this is the primary display. */
    is_primary: boolean;
    /** Native OS handle for the display. */
    handle: { value: number; };
  }

  /** Information about a GPU installed in the system. */
  interface GPUInfo {
    /** GPU chip type identifier. */
    ChipType: string;
    /** GPU manufacturer name. */
    Manufacturer: string;
    /** GPU model name. */
    Name: string;
  }

  /** Information about a hard disk or storage device in the system. */
  interface HardDiskInfo {
    /** Display name/caption of the disk. */
    Caption: string;
    /** Whether the drive is a solid-state disk. */
    IsSsd: boolean;
    /** Total disk size in bytes. */
    Size: number;
  }

  /** Information about a connected input device (keyboard, mouse, gamepad, etc.). */
  interface InputDeviceInfo {
    /** Numeric identifier for the input device. */
    id: number;
    /** Type of input device (e.g. keyboard, mouse). */
    type: string;
    /** Vendor ID of the input device. */
    vendor: number;
  }

  /** Information about a monitor as reported by the system. */
  interface MonitorInfo {
    /** Horizontal DPI of the monitor. */
    Dpix: number;
    /** Vertical DPI of the monitor. */
    Dpiy: number;
    /** Whether this is the main/primary monitor. */
    IsMain: boolean;
    /** Physical or logical location identifier. */
    Location: string;
    /** Monitor name. */
    Name: string;
    /** Monitor resolution string (e.g. "1920x1080"). */
    Resolution: string;
  }

  /** Comprehensive system hardware and software information. */
  interface SystemInfo {
    /** Names of audio output/input devices. */
    AudioDevices?: string[];
    /** CPU model name. */
    CPU?: string;
    /** Array of GPU information objects. */
    GPUs?: GPUInfo[];
    /** Array of hard disk information objects. */
    HardDisks?: HardDiskInfo[];
    /** Array of connected input device information objects. */
    InputDevices?: InputDeviceInfo[];
    /** Whether the system is a laptop. */
    IsLaptop?: boolean;
    /** Number of logical CPU cores. */
    LogicalCPUCount?: number;
    /** System or motherboard manufacturer. */
    Manufacturer?: string;
    /** Total installed RAM as a formatted string. */
    MemorySize?: string;
    /** System model name. */
    Model?: string;
    /** Array of monitor information objects. */
    Monitors?: MonitorInfo[];
    /** Motherboard model name. */
    Motherboard?: string;
    /** Installed .NET Framework version string. */
    NetFramework?: string;
    /** Number of connected screens. */
    NumberOfScreens?: number;
    /** Operating system name. */
    OS?: string;
    /** OS build number string. */
    OSBuild?: string;
    /** OS release identifier string. */
    OSReleaseId?: string;
    /** Number of physical CPU packages. */
    PhysicalCPUCount?: number;
    /** Whether hardware video encoding is supported. */
    VideoEncSupport?: boolean;
    /** indicates if the current OS enabled the [Windows 10 Hardware-Accelerated GPU Scheduling](/ow-native/guides/general-tech/video-capture-best-practices#windows-10-hardware-accelerated-gpu-scheduling-notice) feature */
    HAGSEnabled?: boolean
  }

  /** Parameters for opening a page in the Overwolf store. */
  interface OpenStoreParams {
    /**
     * The target app id.
     */
    uid?: string;
    /**
     * Store page to open.
     */
    page: enums.eStorePage;
  }

  /** Result returned from a file picker dialog. */
  interface OpenFilePickerResult extends Result {
    /** Overwolf media URL of the selected file (single selection). */
    url?: string;
    /** File system path of the selected file (single selection). */
    file?: string;
    /** Overwolf media URLs of the selected files (multi-selection). */
    urls?: string[];
    /** File system paths of the selected files (multi-selection). */
    files?: string[];
  }

  /** Result returned from a folder picker dialog. */
  interface OpenFolderPickerResult extends Result {
    /** Full file system path of the selected folder. */
    path?: string;
  }

  /** Result returned from `getSystemInformation`. */
  interface GetSystemInformationResult extends Result {
    /** The collected system information. */
    systemInfo?: SystemInfo;
  }

  /** Result returned from `isTouchDevice`. */
  interface IsTouchDeviceResult extends Result {
    /** Whether the current device has touch input capability. */
    isTouch?: boolean;
  }

  /** Result returned from `getPeripherals`. */
  interface GetPeripheralsResult extends Result {
    /** Object containing connected input devices and audio devices. */
    peripherals?: { inputDevices: InputDeviceInfo[]; audioDevices: string[]; };
  }

  /** Result returned from `isMouseLeftButtonPressed`. */
  interface IsMouseLeftButtonPressedResult extends Result {
    /** Whether the left mouse button is currently pressed. */
    pressed?: boolean;
  }

  /** Result returned from `getMonitorsList`. */
  interface getMonitorsListResult extends Result {
    /** Array of connected display information objects. */
    displays: Display[];
  }

  /** Result returned when querying Overwolf client installation and uptime info. */
  interface ClientInfoResult extends Result {
    // timestamp
    /** Unix timestamp (ms) of when the Overwolf client was installed. */
    installTime: number;
    /** Number of seconds the Overwolf client has been running since last launch. */
    uptimeSeconds: number;
  }

  /** Options for the `uploadClientLogs` function. */
  interface UploadClientLogsOptions {
    /** Prefix string applied to the uploaded log file name. */
    filePrefix: string;
  }

  /**
   * Copies the given string to the clipboard.
   * @param data The string to be copied to the clipboard.
   */
  function placeOnClipboard(data: string): void;

  /**
   * Gets the string currently placed on the clipboard. If no string is placed
   * on the clipboard, returns null.
   * @param callback Called with the string from the clipboard.
   */
  function getFromClipboard(callback: (result: string) => void): void;

  /**
   * Returns an array with all monitors data including their display resolution,
   * bounds, and names.
   * @param callback Called with the monitors array.
   */
  function getMonitorsList(callback: CallbackFunction<getMonitorsListResult>): void;

  /**
   * Sends a string representing a key stroke to the game, causing a simulated
   * key stroke.
   * @param keyString The key or key combination to send, as a string. e.g.
   * "Alt+I"
   */
  function sendKeyStroke(keyString: string): void;

  /**
   * Opens a file picker dialog to browse for a file. A url to the selected file
   * will be returned.
   * @param filter A file filter. Supports wild cards (*) and seperated by
   * commas (,). Ex. myFile*.*,*.txt
   * @param callback Called with a url to the selected file.
   */
  function openFilePicker(
    filter: string,
    callback: CallbackFunction<OpenFilePickerResult>
  ): void;

  /**
   * Opens a file picker dialog to browse for a file. A url to the selected file
   * will be returned.
   * @param filter A file filter. Supports wild cards (*) and seperated by
   * commas (,). Ex. myFile*.*,*.txt
   * @param initialPath Path to start browsing from
   * @param callback Called with a url(s) to the selected file(s).
   * @param multiSelect Allow selection of multiple files
   */
  function openFilePicker(
    filter: string,
    initialPath: string,
    callback: CallbackFunction<OpenFilePickerResult>,
    multiSelect: boolean
  ): void;

  /**
   * Opens a Folder picker dialog to browse for a folder. A full path to the
   * selected folder will be returned.
   * @param initialPath The starting folder's path
   * @param callback Called with the selected folder.
   */
  function openFolderPicker(
    initialPath: string,
    callback: CallbackFunction<OpenFolderPickerResult>
  ): void;

  /**
   * Opens Windows Explorer and selects a file received as an Overwolf media
   * url.
   * @param url An overwolf media url (overwolf://media/*)
   * @param callback Called with the result of the request.
   */
  function openWindowsExplorer(
    url: string,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Returns whether the current device has touch capabilities.
   * @param callback Called with the result of the request.
   */
  function isTouchDevice(callback: CallbackFunction<IsTouchDeviceResult>): void;

  /**
   * Opens the url in the user's default browser.
   * @param url A url to open.
   */
  function openUrlInDefaultBrowser(url: string): void;

  /**
   * Opens the url in Overwolf's browser.
   * @param url A url to open.
   */
  function openUrlInOverwolfBrowser(url: string, targetTabName?: string): void;

  /**
   * Returns system information which includes information about CPU, Monitors,
   * GPU, HDD, RAM and more.
   * @param callback Called with the system information.
   */
  function getSystemInformation(
    callback: (result: GetSystemInformationResult) => void
  ): void;

  /**
   * Sends Overwolf logs to Overwolf servers for debugging.
   * @param description The reason for sending the logs.
   * @param callback A callback with the status of the request.
   */
  function sendLogs(
    description: string,
    callback: CallbackFunction<Result>
  ): void;

  /**
  * Upload Overwolf client logs to Overwolf servers for current calling app.
  * @param callback A callback with the status of the request.
  */
  function uploadClientLogs(callback: CallbackFunction<Result>): void;

  /**
  * Upload Overwolf client logs to Overwolf servers for current calling app
  * with options (such as file prefix)
  * @param callback A callback with the status of the request.
  */
  function uploadClientLogs(
    options: UploadClientLogsOptions,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Returns system Peripherals information.
   * @param callback Called with the system information.
   */
  function getPeripherals(callback: () => void): void;

  /**
   * Open Overwolf store one app page.
   * @param appId The requesterd app id.
   */
  function openStoreOneAppPage(appId: string): void;

  /**
   * Opens the requested app's profile/login/subscription page in the Overwolf
   * Appstore.
   * @param param The requested store page.
   */
  function openStore(param: OpenStoreParams): void;

  /**
   * Simulate Mouse click on current mouse Position.
   * @param callback A callback with the status of the request.
   */
  function simulateMouseClick(callback: CallbackFunction<Result>): void;

  /**
   * Simulate Mouse click on {x,y} mouse Position.
   * @param x The Mouse X position.
   * @param y The Mouse Y position.
   * @param callback A callback with the status of the request.
   */
  function simulateMouseClick(
    x: number,
    y: number,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Is mouse left button pressed.
   * @param callback A callback with the result.
   */
  function isMouseLeftButtonPressed(
    callback: CallbackFunction<IsMouseLeftButtonPressedResult>
  ): void;


