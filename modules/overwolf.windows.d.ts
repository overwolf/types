/**
 * Use this API to manage Overwolf windows — create, position, resize, show,
 * hide, and control the lifecycle and styling of your app's UI windows.
 * @packageDocumentation
 */

/**
   * Fired when current extension subscription has changed.
   */
  const onSubscriptionChanged: Event<SubscriptionChangedEvent>;
}

declare namespace overwolf.windows {
  namespace enums {
    /** Visual and input-handling styles that can be applied to a window. */
    const enum WindowStyle {
      /** Mouse and keyboard input passes through the window to the game below. */
      InputPassThrough = "InputPassThrough",
      /** The window is rendered below all other Overwolf windows. */
      BottomMost = "BottomMost"
    }

    /** The edge or corner from which a window drag-resize operation originates. */
    const enum WindowDragEdge {
      /** No edge — drag-resize is disabled. */
      None = "None",
      /** Resize from the left edge. */
      Left = "Left",
      /** Resize from the right edge. */
      Right = "Right",
      /** Resize from the top edge. */
      Top = "Top",
      /** Resize from the bottom edge. */
      Bottom = "Bottom",
      /** Resize from the top-left corner. */
      TopLeft = "TopLeft",
      /** Resize from the top-right corner. */
      TopRight = "TopRight",
      /** Resize from the bottom-left corner. */
      BottomLeft = "BottomLeft",
      /** Resize from the bottom-right corner. */
      BottomRight = "BottomRight",
    }

    /** The icon displayed in a message prompt dialog. */
    const enum MessagePromptIcon {
      /** No icon is shown. */
      None = "None",
      /** A question mark icon is shown. */
      QuestionMark = "QuestionMark",
      /** An exclamation mark icon is shown. */
      ExclamationMark = "ExclamationMark",
    }

    /** Controls the taskbar flash behavior for a window. */
    const enum FlashBehavior {
      /** Flash behavior is determined automatically by the system. */
      automatic = "automatic",
      /** The window flashes continuously. */
      on = "on",
      /** The window does not flash. */
      off = "off",
    }

    /** The possible display states of an Overwolf window. */
    const enum WindowStateEx {
      /** The window is closed and no longer exists. */
      closed = "closed",
      /** The window exists but is not visible. */
      hidden = "hidden",
      /** The window occupies the full screen. */
      maximized = "maximized",
      /** The window is minimized to the taskbar. */
      minimized = "minimized",
      /** The window is visible at its normal size. */
      normal = "normal"
    }

    /** The rendering context type of a window. */
    const enum WindowType {
      /** A standard desktop-rendered window. */
      Desktop = "Desktop",
      /** A hidden background/controller window with no visible surface. */
      Background = "Background",
      /** An off-screen rendered window. */
      OffScreen = " OffScreen"
    }
  }


  /** Describes a currently known Overwolf window and its current state. */
  interface WindowInfo {
    /** The name of the window as declared in the app manifest. */
    name: string;
    /** The unique runtime ID of the window. */
    id: string;
    /** The window state as a plain string (legacy). */
    state: string;
    /** The window state as a typed enum value. */
    stateEx: enums.WindowStateEx;
    /** Whether the window is currently visible to the user. */
    isVisible: boolean;
    /** The window's left edge position in pixels from the left of the monitor. */
    left: number;
    /** The window's top edge position in pixels from the top of the monitor. */
    top: number;
    /** The window's width in pixels. */
    width: number;
    /** The window's height in pixels. */
    height: number;
    /** The ID of the monitor the window is on. */
    monitorId: string;
  }

  /** Optional properties used when obtaining a declared window. */
  interface WindowProperties {
    /** Whether to create the window as a native (CEF) window. */
    nativeWindow: boolean;
    /** Whether to enable the popup blocker for this window. */
    enablePopupBlocker: boolean;
  }

  /** Instructs `obtainDeclaredWindow` to apply the manifest's default size and location. */
  interface DefaultSizeAndLocation {
    /** Set to `true` to use the manifest-defined size and position instead of any saved state. */
    useDefaultSizeAndLocation: boolean;
  }

  /** A rectangle defined by its top-left origin, width, and height, all in pixels. */
  interface ODKRect {
    /** Distance from the top of the screen in pixels. */
    top: number;
    /** Distance from the left of the screen in pixels. */
    left: number;
    /** Width of the rectangle in pixels. */
    width: number;
    /** Height of the rectangle in pixels. */
    height: number;
  }

  /** Describes a relative position for a window with respect to another process window. */
  interface SetWindowPositionProperties {
    /** The target process window to position relative to. */
    relativeTo: { processName: string; windowTitle: string; };
    /** If `true`, insert the Overwolf window above the target; otherwise insert below. */
    insertAbove: boolean;
  }

  /** Parameters for the `displayMessageBox` prompt dialog. */
  interface MessageBoxParams {
    /** The title text of the message box. */
    message_title: string;
    /** The body text of the message box. */
    message_body: string;
    /** The label on the confirm/OK button. */
    confirm_button_text: string;
    /** The label on the cancel button. */
    cancel_button_text: string;
    /** The icon to display in the message box. */
    message_box_icon: windows.enums.MessagePromptIcon;
  }

  /** Result of window operations that return a `WindowInfo` object. */
  interface WindowResult extends Result {
    /** The window that was created or retrieved. */
    window: WindowInfo;
  }

  /** Result of a drag-resize operation, containing the new dimensions. */
  interface DragResizeResult extends Result {
    /** The ID of the window that was resized. */
    id?: string;
    /** The new width of the window in pixels. */
    width?: number;
    /** The new height of the window in pixels. */
    height?: number;
  }

  /** Result of window operations that return only the window's ID. */
  interface WindowIdResult extends Result {
    /** The ID of the affected window. */
    window_id?: string;
  }

  /** Result of a `dragMove` operation, reporting how far the window moved. */
  interface DragMovedResult extends Result {
    /** The number of pixels the window moved horizontally. */
    HorizontalChange: number;
    /** The number of pixels the window moved vertically. */
    VerticalChange: number;
  }

  /** Result of `getWindowState`, describing the current state of a single window. */
  interface GetWindowStateResult extends Result {
    /** The ID of the queried window. */
    window_id?: string;
    /** The window state as a plain string (legacy). */
    window_state?: string;
    /** The window state as a typed enum value. */
    window_state_ex?: enums.WindowStateEx;
  }

  /** Result of `getWindowsStates`, describing the state of all app windows. */
  interface GetWindowsStatesResult extends Result {
    /** A map of window name to state string (legacy). */
    result: Dictionary<string>;
    /** A map of window name to typed `WindowStateEx` enum value. */
    resultV2: Dictionary<enums.WindowStateEx>;
  }

  /** Result of `isMuted`, indicating whether the window's audio is muted. */
  interface IsMutedResult extends Result {
    /** `true` if the window is currently muted. */
    muted: boolean;
  }

  /** Result of `isWindowVisibleToUser`, indicating how much of the window is visible. */
  interface IsWindowVisibleToUserResult extends Result {
    /** `"hidden"` if fully obscured, `"partial"` if partially visible, `"full"` if fully visible. */
    visible: "hidden" | "full" | "partial";
  }

  /** Result of `isAccelreatedOSR`, reporting GPU acceleration status for an OSR window. */
  interface IsAccelreatedOSRResult extends WindowIdResult {
    /** Whether the window is using GPU acceleration. */
    accelerated?: boolean;
    /** Whether GPU acceleration is supported on this machine. */
    supported?: boolean;
    /** Whether rendering is optimized (only valid in-game for accelerated windows). */
    optimized?: boolean;
  }

  /** Parameters for the `changeSize` overload that supports DPI-aware resizing. */
  interface ChangeWindowSizeParams {
    /** The ID of the window to resize. */
    window_id: string;
    /** The new width in pixels. */
    width: number;
    /** The new height in pixels. */
    height: number;
    /** If `true`, the size values are automatically scaled for the current DPI. */
    auto_dpi_resize?: boolean;
  }

  /** Event data fired when a window's state changes. */
  interface WindowStateChangedEvent {
    /** The ID of the window whose state changed. */
    window_id: string;
    /** The new state as a plain string (legacy). */
    window_state: string;
    /** The previous state as a plain string (legacy). */
    window_previous_state: string;
    /** The new state as a typed enum value. */
    window_state_ex: enums.WindowStateEx;
    /** The previous state as a typed enum value. */
    window_previous_state_ex: enums.WindowStateEx;
    /** The ID of the app that owns the window. */
    app_id: string;
    /** The name of the window as declared in the manifest. */
    window_name: string;
  }

  /** Event data fired when a window receives a message via `sendMessage`. */
  interface MessageReceivedEvent {
    /** The ID of the window that received the message. */
    id: string;
    /** The content of the received message. */
    content: any;
  }

  /** Event data fired when an isolated iframe process crashes. */
  interface IsolatedIframeProcessCrashedEvent {
    /** The ID of the window whose iframe process crashed. */
    id: string;
    /** A description of the crash error. */
    error: string;
  }

  /** Event data fired when the user attempts to close a window with Alt+F4 and is blocked. */
  interface AltF4BlockedEvent {
    /** The ID of the window on which Alt+F4 was blocked. */
    id: string;
  }

  /** Event data fired when a window's screen or monitor properties change. */
  interface onScreenPropertyChangedEvent {
    /** The ID of the affected window. */
    id: string;
    /** The name of the affected window. */
    name: string;
    /** The updated display/monitor information. */
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
   * Creates an instance of your window (the window's name has to be declared
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


}
