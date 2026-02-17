/**
   * Fired when there are new game events with a JSON object of the events
   * information.
   */
  const onNewEvents: Event<NewGameEvents>;
}

declare namespace overwolf.games.events.provider {
  interface GameEventsInfo {
    feature: string;
    category: string;
    key: string;
    value: string;
  }

  function triggerEvent(feature: string, name: string, data?: any): void;

  function updateInfo(info: GameEventsInfo): void;

  function setSupportedFeatures(
    features: string[],
    callback: CallbackFunction<Result>
  ): void;
}

declare namespace overwolf.games.inputTracking {
  interface MousePosition {
    x: number;
    y: number;
    onGame: boolean;
    handle: { value: number; };
  }

  interface InputActivity {
    aTime: number;
    iTime: number;
    apm: number;
    mouse: { total: number; dist: number; keys: any; };
    keyboard: { total: number; keys: any; };
  }

  interface GetActivityResult extends Result {
    activity: InputActivity;
  }

  interface GetMousePositionResult extends Result {
    mousePosition?: MousePosition;
  }

  interface KeyEvent {
    key: string;
    onGame: boolean;
  }

  interface MouseEvent {
    button: string;
    x: number;
    y: number;
    onGame: boolean;
  }

  interface WheelEvent {
    delta: number;
    x: number;
    y: number;
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

  