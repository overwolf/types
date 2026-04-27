/**
 * Use this API to push custom game events and state updates into the Overwolf
 * game events system, and to track raw keyboard, mouse, and eye-tracking input
 * activity during a game session.
 * @packageDocumentation
 */

/**
   * Fired when there are new game events with a JSON object of the events
   * information.
   */
  const onNewEvents: Event<NewGameEvents>;
}

declare namespace overwolf.games.events.provider {
  /**
   * Describes a single game event or state update to be pushed into the
   * Overwolf game events system via `updateInfo`.
   */
  interface GameEventsInfo {
    /** The feature this event or info key belongs to (e.g., `"kill"`, `"death"`). */
    feature: string;
    /** The category grouping for this event or info key. */
    category: string;
    /** The specific event or info key name. */
    key: string;
    /** The value associated with this event or info key. */
    value: string;
  }

  /**
   * Triggers a named game event for the specified feature.
   * Use this to fire discrete one-time occurrences (e.g., a kill, a death).
   * @param feature The feature name this event belongs to (e.g., `"kill"`).
   * @param name The name of the event to trigger.
   * @param data Optional additional payload data for the event.
   */
  function triggerEvent(feature: string, name: string, data?: any): void;

  /**
   * Pushes a game info state update into the Overwolf events system.
   * Use this to report continuous or changing state values (e.g., health, score).
   * @param info The info key/value pair to update.
   */
  function updateInfo(info: GameEventsInfo): void;

  /**
   * Declares which game features this provider supports.
   * Must be called before triggering events or updating info for those features.
   * @param features Array of feature names this provider will emit data for.
   * @param callback Called with the result of the registration.
   */
  function setSupportedFeatures(
    features: string[],
    callback: CallbackFunction<Result>
  ): void;
}

declare namespace overwolf.games.inputTracking {
  /** The current position of the mouse cursor. */
  interface MousePosition {
    /** Horizontal cursor position in pixels. */
    x: number;
    /** Vertical cursor position in pixels. */
    y: number;
    /** Whether the cursor is positioned over the game window (as opposed to an Overwolf widget). */
    onGame: boolean;
    /** Native OS window handle for the window under the cursor. */
    handle: { value: number; };
  }

  /** Aggregated input activity statistics for the current game session. */
  interface InputActivity {
    /** Total active (non-idle) time in milliseconds. */
    aTime: number;
    /** Total idle time in milliseconds. */
    iTime: number;
    /** Actions per minute across all input devices. */
    apm: number;
    /** Mouse activity stats including total clicks, cursor distance traveled, and a per-button breakdown. */
    mouse: { total: number; dist: number; keys: any; };
    /** Keyboard activity stats including total key presses and a per-key breakdown. */
    keyboard: { total: number; keys: any; };
  }

  /** Result of a `getActivityInformation` or `getMatchActivityInformation` call. */
  interface GetActivityResult extends Result {
    /** The aggregated input activity data for the session or match. */
    activity: InputActivity;
  }

  /** Result of a `getMousePosition` call. */
  interface GetMousePositionResult extends Result {
    /** The current mouse position, or `undefined` if unavailable. */
    mousePosition?: MousePosition;
  }

  /** Payload of the `onKeyUp` and `onKeyDown` events. */
  interface KeyEvent {
    /** The virtual key code of the key that was pressed or released. */
    key: string;
    /** Whether the key event occurred while the game window had focus. */
    onGame: boolean;
  }

  /** Payload of the `onMouseUp` and `onMouseDown` events. */
  interface MouseEvent {
    /** Which mouse button was pressed or released (e.g., `"left"`, `"right"`, `"middle"`). */
    button: string;
    /** Horizontal cursor position in pixels at the time of the event. */
    x: number;
    /** Vertical cursor position in pixels at the time of the event. */
    y: number;
    /** Whether the mouse event occurred while the game window had focus. */
    onGame: boolean;
  }

  /** Payload of a mouse wheel scroll event. */
  interface WheelEvent {
    /** Scroll amount and direction (positive = scroll up, negative = scroll down). */
    delta: number;
    /** Horizontal cursor position in pixels at the time of the event. */
    x: number;
    /** Vertical cursor position in pixels at the time of the event. */
    y: number;
    /** Whether the scroll event occurred while the game window had focus. */
    onGame: boolean;
  }

  /**
   * Returns the input activity information. The information includes presses
   * for keyboard/mouse, total session time, idle time and actions-per-minute.
   * This information resets between game executions.
   * @param callback A callback with the activity information.
   */
  function getActivityInformation(
    callback: CallbackFunction<GetActivityResult>
  ): void;

  function init(
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Returns the input activity information (similar to
   * `getActivityInformation`). However, when this is supported, it will return
   * data only for the latestmatch of the current game
   * @param callback A callback with the activity information.
   */
  function getMatchActivityInformation(
    callback: CallbackFunction<GetActivityResult>
  ): void;

  /**
   * Returns the eye tracking information. The information includes gaze points,
   * fixations, user presence (screen/keyboard/other) and minimap glances. This
   * information resets between game executions.
   * @param callback A callback with the eye tracking information
   */
  function getEyeTrackingInformation(
    callback: CallbackFunction<GetActivityResult>
  ): void;

  /**
   * Returns the input last mouse position in game. the data includes the mouse
   * position and a boolean stating whether the keypress was on a game or on an
   * Overwolf widget (onGame).
   * @param callback A callback with the mouse position information
   */
  function getMousePosition(
    callback: CallbackFunction<GetMousePositionResult>
  ): void;

  /**
   * Eye tracking data trakcing will pause, and stop collect Eye tracking data
   * until resumeEyeTracking will be called.
   */
  function pauseEyeTracking(): void;

  /**
   * Resume collecting Eye tracking data.
   */
  function resumeEyeTracking(): void;

  /**
   * Fired when a keyboard key has been released. The event information includes
   * the virtual key code (key) and a boolean stating whether the keypress was
   * on a game or on an Overwolf widget (onGame).
   */
  const onKeyUp: Event<KeyEvent>;

  /**
   * Fired when a keyboard key has been pressed.
   * Event information is similar to `onKeyUp`.
   */
  const onKeyDown: Event<KeyEvent>;

  /**
   * Fired when a mouse key has been released. The event information includes
   * whether the left or white mouse button was clicked(button), x and y
   * coordinates (x, y) and a boolean stating whether the keypress was on a game
   * or on an Overwolf widget (onGame).
   */
  const onMouseUp: Event<MouseEvent>;

  /**
   * Fired a mouse key has been pressed.
   * Event information is similar to `onMouseUp`.
   */
  const onMouseDown: Event<MouseEvent>;
