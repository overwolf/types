/**
   * Fired when current extension subscription has changed.
   */
  const onSubscriptionChanged: Event<SubscriptionChangedEvent>;
}

declare namespace overwolf.windows {
  namespace enums {
    const enum WindowStyle {
      InputPassThrough = "InputPassThrough",
      BottomMost = "BottomMost"
    }

    const enum WindowDragEdge {
      None = "None",
      Left = "Left",
      Right = "Right",
      Top = "Top",
      Bottom = "Bottom",
      TopLeft = "TopLeft",
      TopRight = "TopRight",
      BottomLeft = "BottomLeft",
      BottomRight = "BottomRight",
    }

    const enum MessagePromptIcon {
      None = "None",
      QuestionMark = "QuestionMark",
      ExclamationMark = "ExclamationMark",
    }

    const enum FlashBehavior {
      automatic = "automatic",
      on = "on",
      off = "off",
    }

    const enum WindowStateEx {
      closed = "closed",
      hidden = "hidden",
      maximized = "maximized",
      minimized = "minimized",
      normal = "normal"
    }

    const enum WindowType {
      Desktop = "Desktop",
      Background = "Background",
      OffScreen = " OffScreen"
    }
  }


  interface WindowInfo {
    name: string;
    id: string;
    state: string;
    stateEx: enums.WindowStateEx;
    isVisible: boolean;
    left: number;
    top: number;
    width: number;
    height: number;
    monitorId: string;
  }

  interface WindowProperties {
    nativeWindow: boolean;
    enablePopupBlocker: boolean;
  }

  interface DefaultSizeAndLocation {
    useDefaultSizeAndLocation: boolean;
  }

  interface ODKRect {
    top: number;
    left: number;
    width: number;
    height: number;
  }

  interface SetWindowPositionProperties {
    relativeTo: { processName: string; windowTitle: string; };
    insertAbove: boolean;
  }

  interface MessageBoxParams {
    message_title: string;
    message_body: string;
    confirm_button_text: string;
    cancel_button_text: string;
    message_box_icon: windows.enums.MessagePromptIcon;
  }

  interface WindowResult extends Result {
    window: WindowInfo;
  }

  interface DragResizeResult extends Result {
    id?: string;
    width?: number;
    height?: number;
  }

  interface WindowIdResult extends Result {
    window_id?: string;
  }

  interface DragMovedResult extends Result {
    HorizontalChange: number;
    VerticalChange: number;
  }

  interface GetWindowStateResult extends Result {
    window_id?: string;
    window_state?: string;
    window_state_ex?: enums.WindowStateEx;
  }

  interface GetWindowsStatesResult extends Result {
    result: Dictionary<string>;
    resultV2: Dictionary<enums.WindowStateEx>;
  }

  interface IsMutedResult extends Result {
    muted: boolean;
  }

  interface IsWindowVisibleToUserResult extends Result {
    visible: "hidden" | "full" | "partial";
  }

  interface IsAccelreatedOSRResult extends WindowIdResult {
    accelerated?: boolean;
    supported?: boolean;
    optimized?: boolean;
  }

  interface ChangeWindowSizeParams {
    window_id: string;
    width: number;
    height: number;
    auto_dpi_resize?: boolean;
  }

  interface WindowStateChangedEvent {
    window_id: string;
    window_state: string;
    window_previous_state: string;
    window_state_ex: enums.WindowStateEx;
    window_previous_state_ex: enums.WindowStateEx;
    app_id: string;
    window_name: string;
  }

  interface MessageReceivedEvent {
    id: string;
    content: any;
  }

  interface IsolatedIframeProcessCrashedEvent {
    id: string;
    error: string;
  }

  interface AltF4BlockedEvent {
    id: string;
  }

  interface onScreenPropertyChangedEvent {
    id: string;
    name: string;
    monitor: utils.Display;
  }

  /**
   * Calls the given callback function with the current window object as a
   * parameter.
   * @param callback A callback function which will be called with the current
   * window object as a parameter. See
   */
  function getCurrentWindow(callback: CallbackFunction<WindowResult>): void;

  /**
   * Creates or returns a window by the window name that was declared in the
   * manifest.
   * @param windowName The name of the window that was declared in the
   * data.windows section in the manifest.
   * @param overrideSetting Override manifest settings
   * @param callback A callback function which will be called with the requested
   * window as a parameter. See
   */
  function obtainDeclaredWindow(
    windowName: string,
    overrideSetting: WindowProperties,
    callback: CallbackFunction<WindowResult>
  ): void;

  /**
   * Creates or returns a window by the window name that was declared in the
   * manifest.
   * @param windowName The name of the window that was declared in the
   * data.windows section in the manifest.
   * @param callback A callback function which will be called with the requested
   * window as a parameter.
   */
  function obtainDeclaredWindow(
    windowName: string,
    callback: CallbackFunction<WindowResult>
  ): void;

  /**
   * Creates an instance of your window (the window’s name has to be declared
   * in the manifest.json) or returns a window by the window name.
   * @param windowName The name of the window that was declared in the
   * data.windows section in the manifest.
   * @param useDefaultSizeAndLocation Enable the manifest size and position
   * settings (default is false).
   * @param callback A callback function which will be called with the requested
   * window as a parameter.
   */
  function obtainDeclaredWindow(
    windowName: string,
    useDefaultSizeAndLocation: DefaultSizeAndLocation,
    callback: CallbackFunction<WindowResult>
  ): void;

  /**
   * Returns WindowResult object for a specific open window.
   * @param windowName The name of the window that was declared in the data.windows section in the manifest
   * @param callback Callback will be invoked with the WindowResult object.
   */
  function getWindow(
    windowName: string,
    callback: CallbackFunction<WindowResult>
  ): void;

  /**
   * Start dragging a window.
   * @param windowId The id or name of the window to drag.
   * @param callback A callback which is called when the drag is completed.
   */
  function dragMove(
    windowId: string,
    callback?: CallbackFunction<DragMovedResult>
  ): void;

  /**
   * Start resizing the window from a specific edge or corner.
   * @param windowId The id or name of the window to resize.
   * @param edge The edge or corner from which to resize the window.
   */
  function dragResize(
    windowId: string,
    edge: windows.enums.WindowDragEdge
  ): void;

  /**
   * Start resizing the window from a specific edge or corner.
   * @param windowId The id or name of the window to resize.
   * @param edge The edge or corner from which to resize the window.
   * @param contentRect The real content of the window (for the in-game drawing
   * resizing white area)
   */
  function dragResize(
    windowId: string,
    edge: windows.enums.WindowDragEdge,
    contentRect: ODKRect
  ): void;

  /**
   * Start resizing the window from a specific edge or corner.
   * @param windowId The id or name of the window to resize.
   * @param edge The edge or corner from which to resize the window.
   * @param callback Will be called when the resizing process is completed.
   */
  function dragResize(
    windowId: string,
    edge: windows.enums.WindowDragEdge,
    rect: ODKRect,
    callback: CallbackFunction<DragResizeResult>
  ): void;

  /**
   * Changes the window size to the new width and height, in pixels.
   * @param windowId The id or name of the window for which to change the size.
   * @param width The new window width in pixels.
   * @param height The new window height in pixels.
   * @param callback A callback which is called when the size change is
   * completed.
   */
  function changeSize(
    windowId: string,
    width: number,
    height: number,
    callback?: CallbackFunction<Result>
  ): void;

  /**
   * Changes the window size to the new width and height, in pixels, including DPI scale when resizing.
   * @param changeSizeParams Container for the window settings.
   * @param callback A callback which is called when the size change is
   * completed.
   */
  function changeSize(
    changeSizeParams: ChangeWindowSizeParams,
    callback?: CallbackFunction<Result>
  ): void;

  /**
   * Changes the window minimum size to the new width and height, in pixels.
   * @param windowId windowId The id or name of the window for which to change
   * the minimum size.
   * @param width The new window minimum width in pixels.
   * @param height The new window minimum height in pixels.
   * @param callback A callback which is called when the minimum size change is
   * completed.
   */
  function setMinSize(
    windowId: string,
    width: number,
    height: number,
    callback?: CallbackFunction<Result>
  ): void;

  /**
   * Flashes a window.
   * @param windowId ID of the window to flash.
   * @param behavior Defines window flashing behavior.
   * @param callback A callback which is called when the minimum size change is
   * completed.
   */
  function flash(
    windowId: string,
    behavior: windows.enums.FlashBehavior,
    callback?: CallbackFunction<Result>
  ): void;

  /**
   * Set window zoom level (0.0 for reset).
   * @param winzoomFactorowId The zoome factor.
   * @param windowId The window id, empty for current window.
   */
  function setZoom(
    winzoomFactorowId: number,
    windowId: string
  ): void;

  /**
   * Changes the window position in pixels from the top left corner.
   * @param windowId The id or name of the window for which to change the
   * position.
   * @param left The new window position on the X axis in pixels from the left.
   * @param top The new window position on the Y axis in pixels from the top.
   * @param callback A callback which is called when the position change is
   * completed.
   */
  function changePosition(
    windowId: string,
    left: number,
    top: number,
    callback?: CallbackFunction<WindowIdResult>
  ): void;

  /**
   * Closes the window.
   * @param windowId The id or name of the window to close.
   * @param callback Called after the window is closed.
   */
  function close(
    windowId: string,
    callback?: CallbackFunction<WindowIdResult>
  ): void;

  /**
   * Minimizes the window.
   * @param windowId The id or name of the window to minimize.
   * @param callback Called after the window is minimized.
   */
  function minimize(
    windowId: string,
    callback?: CallbackFunction<WindowIdResult>
  ): void;

  /**
   * Hides the window.
   * @param windowId The id or name of the window to hide.
   * @param callback Called after the window is hidden.
   */
  function hide(
    windowId: string,
    callback?: CallbackFunction<WindowIdResult>
  ): void;

  /**
   * Maximizes the window.
   * @param windowId The id or name of the window to maximize.
   * @param callback Called after the window is maximized.
   */
  function maximize(
    windowId: string,
    callback?: CallbackFunction<WindowIdResult>
  ): void;

  /**
   * Restores a minimized window.
   * @param windowId The id or name of the window to restore.
   * @param callback Called after the window is restored.
   */
  function restore(
    windowId: string,
    callback?: CallbackFunction<WindowIdResult>
  ): void;

  /**
   * Returns the state of the window (normal/minimized/maximized/closed).
   * @param windowId The id or name of the window.
   * @param callback Called with the window state.
   */
  function getWindowState(
    windowId: string,
    callback: CallbackFunction<GetWindowStateResult>
  ): void;

  /**
   * Returns the state of all windows owned by the app
   * (normal/minimized/maximized/closed).
   * @param callback Called with an array containing the states of the windows.
   */
  function getWindowsStates(
    callback: CallbackFunction<GetWindowsStatesResult>
  ): void;

  /**
   * Sends a message to an open window.
   * @param windowId The id or name of the window to send the message to.
   * @param messageId A message id.
   * @param messageContent The content of the message.
   * @param callback Called with the status of the request
   */
  function sendMessage(
    windowId: string,
    messageId: string,
    messageContent: any,
    callback: CallbackFunction<WindowIdResult>
  ): void;

  /**
   * Returns an array of all open windows as objects. The objects can be
   * manipulated like any other window.
   * @param callback A callback function which will be called with a map object
   * of (window-name, Window Object) items
   */
  function getOpenWindows(
    callback: (windows: Dictionary<Window>) => void
  ): void;

  /**
   * Returns a window object of the index page.
   */
  function getMainWindow(): Window;

  /**
   * Opens the options page specified in the manifest file. Does nothing if no
   * such page has been specified.
   * @param callback
   */
  function openOptionsPage(callback: CallbackFunction<WindowIdResult>): void;

  /**
   * Add Window In Game styling
   * @param windowId The id or name of the window to send the message to.
   * @param style The style to add : overwolf.windows.enum.WindowStyle
   * @param callback Called with the status of the request
   */
  function setWindowStyle(
    windowId: string,
    style: windows.enums.WindowStyle,
    callback: CallbackFunction<WindowIdResult>
  ): void;

  /**
   * Remove Window In Game Styling
   * @param windowId The id or name of the window to send the message to.
   * @param style The style to add : overwolf.windows.enum.WindowStyle
   * @param callback Called with the status of the request
   */
  function removeWindowStyle(
    windowId: string,
    style: windows.enums.WindowStyle,
    callback: CallbackFunction<WindowIdResult>
  ): void;

  /**
   * Sets whether the window should be injected to games or not.
   * @deprecated Since version 0.159.
   * @param windowId
   * @param shouldBeDesktopOnly
   * @param callback
   */
  function setDesktopOnly(
    windowId: string,
    shouldBeDesktopOnly: boolean,
    callback: CallbackFunction<WindowIdResult>
  ): void;

  /**
   * Sets whether the window should have minimize/restore animations while in
   * game.
   * @param windowId
   * @param shouldEnableAnimations
   * @param callback
   */
  function setRestoreAnimationsEnabled(
    windowId: string,
    shouldEnableAnimations: boolean,
    callback: CallbackFunction<WindowIdResult>
  ): void;

  /**
   * Change the window's topmost status. Handle with care as topmost windows can
   * negatively impact user experience.
   * @param windowId
   * @param shouldBeTopmost
   * @param callback
   */
  function setTopmost(
    windowId: string,
    shouldBeTopmost: boolean,
    callback: CallbackFunction<WindowIdResult>
  ): void;

  /**
   * Sends the window to the back.
   * @param windowId The id or name of the window.
   * @param callback Called with the result of the request.
   */
  function sendToBack(
    windowId: string,
    callback: CallbackFunction<WindowIdResult>
  ): void;

  /**
   * Brings the requested window to the front.
   * @param windowId The id or name of the window.
   * @param callback Called with the result of the request.
   */
  function bringToFront(
    windowId: string,
    callback: CallbackFunction<WindowIdResult>
  ): void;

  /**
   * Brings this window to the front.
   * @param callback Called with the result of the request.
   */
  function bringToFront(callback: CallbackFunction<WindowIdResult>): void;

  /**
   * Brings this window to the front.
   * @param grabFocus Window will take system focus.
   * @param callback Called with the result of the request.
   */
  function bringToFront(
    grabFocus: boolean,
    callback: CallbackFunction<WindowIdResult>
  ): void;

  /**
   * Brings the requested window to the front.
   * @param windowId The id or name of the window.
   * @param grabFocus Window will take system focus.
   * @param callback Called with the result of the request.
   */
  function bringToFront(
    windowId: string,
    grabFocus: boolean,
    callback: CallbackFunction<WindowIdResult>
  ): void;

  /**
   * Change window position (see SetWindowPositionProperties))
   * @param windowId The id or name of the window
   * @param properties where to place window
   * @param callback Called with the result of the request.
   */
  function setPosition(
    windowId: string,
    properties: SetWindowPositionProperties,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Change this window position (see SetWindowPositionProperties))
   * @param properties where to place window
   * @param callback Called with the result of the request.
   */
  function setPosition(
    properties: SetWindowPositionProperties,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Displays a customized popup message prompt.
   * @param messageParams The type and texts that the message prompt will have.
   * @param callback The user action.
   */
  function displayMessageBox(
    messageParams: MessageBoxParams,
    callback: (confirmed: boolean) => void
  ): void;

  /**
   * Set current window Mute state.
   * @param mute window mute (on\off).
   * @param callback Called with the result of the request.
   */
  function setMute(mute: boolean, callback: CallbackFunction<Result>): void;

  /**
   * Mute all sound source include all excluded white list
   * @param callback Called with the result of the request.
   */
  function muteAll(callback: CallbackFunction<Result>): void;

  /**
   * Is window muted.
   * @param callback Called with the result of the request ({"muted": null}).
   */
  function isMuted(callback: CallbackFunction<IsMutedResult>): void;

  /**
   * Is window fully visible to user (has overlap windows)
   * @param callback Called with the result of the request:{"status": "error"
   * "reason": the reason} or{"status": "success" "visible": "hidden" | "full" |
   * "partial"}
   */
  function isWindowVisibleToUser(
    callback: CallbackFunction<IsWindowVisibleToUserResult>
  ): void;

  /**
   * For OSR window only (for other window the callback return `error` status.
   * {
   *    "status": string (|error, success|), "reason": string (error reason),
   *    "accelerated": bool, "optimized"  : bool  (for accelerated windows only
   *    and only valid in Game)
   * }
   * @param windowId The id or name of the window.
   * @param callback Called with the result of the request.
   */
  function isAccelreatedOSR(
    windowId: string,
    callback: CallbackFunction<IsAccelreatedOSRResult>
  ): void;

  /**
   * Is current window accelerated
   * @param callback Called with the result of the request.
   */
  function isAccelreatedOSR(
    callback: CallbackFunction<IsAccelreatedOSRResult>
  ): void;

  /**
   * Get Window DPI.
   * @param callback Called with the result of the request (result e.g: {dpi:
   * 120, scale: 1.25}).
   */
  function getWindowDPI(
    callback: (result: { dpi: number; scale: number; }) => void
  ): void;

  /**
   * Fired when the main window is restored.
   */
  const onMainWindowRestored: Event<null>;

  /**
   * Fired when the state of a window is changed.
   */
  const onStateChanged: Event<WindowStateChangedEvent>;

  /**
   * Fired when this window received a message.
   */
  const onMessageReceived: Event<MessageReceivedEvent>;

  /**
   * Fired when out of process iframe crashed.
   */
  const onIsolatedIframeProcessCrashed: Event<IsolatedIframeProcessCrashedEvent>;

  /**
   * Fired when the user was prevented from closing a window using Alt+F4
   */
  const onAltF4Blocked: Event<AltF4BlockedEvent>;

  
