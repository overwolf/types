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
    const enum eStorePage {
      LoginPage = "LoginPage",
      OneAppPage = "OneAppPage",
      SubscriptionPage = "SubscriptionPage",
      ReviewsPage = "ReviewsPage",
    }
  }

  interface Display {
    name: string;
    id: string;
    x: number;
    y: number;
    dpiX: number;
    dpiY: number;
    width: number;
    height: number;
    is_primary: boolean;
    handle: { value: number; };
  }

  interface GPUInfo {
    ChipType: string;
    Manufacturer: string;
    Name: string;
  }

  interface HardDiskInfo {
    Caption: string;
    IsSsd: boolean;
    Size: number;
  }

  interface InputDeviceInfo {
    id: number;
    type: string;
    vendor: number;
  }

  interface MonitorInfo {
    Dpix: number;
    Dpiy: number;
    IsMain: boolean;
    Location: string;
    Name: string;
    Resolution: string;
  }

  interface SystemInfo {
    AudioDevices?: string[];
    CPU?: string;
    GPUs?: GPUInfo[];
    HardDisks?: HardDiskInfo[];
    InputDevices?: InputDeviceInfo[];
    IsLaptop?: boolean;
    LogicalCPUCount?: number;
    Manufacturer?: string;
    MemorySize?: string;
    Model?: string;
    Monitors?: MonitorInfo[];
    Motherboard?: string;
    NetFramework?: string;
    NumberOfScreens?: number;
    OS?: string;
    OSBuild?: string;
    OSReleaseId?: string;
    PhysicalCPUCount?: number;
    VideoEncSupport?: boolean;
    /** indicates if the current OS enabled the [Windows 10 Hardware-Accelerated GPU Scheduling](/ow-native/guides/general-tech/video-capture-best-practices#windows-10-hardware-accelerated-gpu-scheduling-notice) feature */
    HAGSEnabled?: boolean
  }

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

  interface OpenFilePickerResult extends Result {
    url?: string;
    file?: string;
    urls?: string[];
    files?: string[];
  }

  interface OpenFolderPickerResult extends Result {
    path?: string;
  }

  interface GetSystemInformationResult extends Result {
    systemInfo?: SystemInfo;
  }

  interface IsTouchDeviceResult extends Result {
    isTouch?: boolean;
  }

  interface GetPeripheralsResult extends Result {
    peripherals?: { inputDevices: InputDeviceInfo[]; audioDevices: string[]; };
  }

  interface IsMouseLeftButtonPressedResult extends Result {
    pressed?: boolean;
  }

  interface getMonitorsListResult extends Result {
    displays: Display[];
  }

  interface ClientInfoResult extends Result {
    // timestamp
    installTime: number;
    uptimeSeconds: number;
  }

  interface UploadClientLogsOptions {
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
   * Opens the requested app’s profile/login/subscription page in the Overwolf
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

  
