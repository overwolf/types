/**
   * Gets the currently installed Logitech devices.
   * @param callback Called with the current device information.
   */
  function getDevices(callback: CallbackFunction<GetDevicesResult>): void;
}

declare namespace overwolf.logitech.led {
  namespace enums {
    const enum KeyboardNames {
      ESC = "ESC",
      F1 = "F1",
      F2 = "F2",
      F3 = "F3",
      F4 = "F4",
      F5 = "F5",
      F6 = "F6",
      F7 = "F7",
      F8 = "F8",
      F9 = "F9",
      F10 = "F10",
      F11 = "F11",
      F12 = "F12",
      PRINT_SCREEN = "PRINT_SCREEN",
      SCROLL_LOCK = "SCROLL_LOCK",
      PAUSE_BREAK = "PAUSE_BREAK",
      TILDE = "TILDE",
      ONE = "ONE",
      TWO = "TWO",
      THREE = "THREE",
      FOUR = "FOUR",
      FIVE = "FIVE",
      SIX = "SIX",
      SEVEN = "SEVEN",
      EIGHT = "EIGHT",
      NINE = "NINE",
      ZERO = "ZERO",
      MINUS = "MINUS",
      EQUALS = "EQUALS",
      BACKSPACE = "BACKSPACE",
      INSERT = "INSERT",
      HOME = "HOME",
      PAGE_UP = "PAGE_UP",
      NUM_LOCK = "NUM_LOCK",
      NUM_SLASH = "NUM_SLASH",
      NUM_ASTERISK = "NUM_ASTERISK",
      NUM_MINUS = "NUM_MINUS",
      TAB = "TAB",
      Q = "Q",
      W = "W",
      E = "E",
      R = "R",
      T = "T",
      Y = "Y",
      U = "U",
      I = "I",
      O = "O",
      P = "P",
      OPEN_BRACKET = "OPEN_BRACKET",
      CLOSE_BRACKET = "CLOSE_BRACKET",
      BACKSLASH = "BACKSLASH",
      KEYBOARD_DELETE = "KEYBOARD_DELETE",
      END = "END",
      PAGE_DOWN = "PAGE_DOWN",
      NUM_SEVEN = "NUM_SEVEN",
      NUM_EIGHT = "NUM_EIGHT",
      NUM_NINE = "NUM_NINE",
      NUM_PLUS = "NUM_PLUS",
      CAPS_LOCK = "CAPS_LOCK",
      A = "A",
      S = "S",
      D = "D",
      F = "F",
      G = "G",
      H = "H",
      J = "J",
      K = "K",
      L = "L",
      SEMICOLON = "SEMICOLON",
      APOSTROPHE = "APOSTROPHE",
      ENTER = "ENTER",
      NUM_FOUR = "NUM_FOUR",
      NUM_FIVE = "NUM_FIVE",
      NUM_SIX = "NUM_SIX",
      LEFT_SHIFT = "LEFT_SHIFT",
      Z = "Z",
      X = "X",
      C = "C",
      V = "V",
      B = "B",
      N = "N",
      M = "M",
      COMMA = "COMMA",
      PERIOD = "PERIOD",
      FORWARD_SLASH = "FORWARD_SLASH",
      RIGHT_SHIFT = "RIGHT_SHIFT",
      ARROW_UP = "ARROW_UP",
      NUM_ONE = "NUM_ONE",
      NUM_TWO = "NUM_TWO",
      NUM_THREE = "NUM_THREE",
      NUM_ENTER = "NUM_ENTER",
      LEFT_CONTROL = "LEFT_CONTROL",
      LEFT_WINDOWS = "LEFT_WINDOWS",
      LEFT_ALT = "LEFT_ALT",
      SPACE = "SPACE",
      RIGHT_ALT = "RIGHT_ALT",
      RIGHT_WINDOWS = "RIGHT_WINDOWS",
      APPLICATION_SELECT = "APPLICATION_SELECT",
      RIGHT_CONTROL = "RIGHT_CONTROL",
      ARROW_LEFT = "ARROW_LEFT",
      ARROW_DOWN = "ARROW_DOWN",
      ARROW_RIGHT = "ARROW_RIGHT",
      NUM_ZERO = "NUM_ZERO",
      NUM_PERIOD = "NUM_PERIOD",
    }

    const enum LogitechDeviceLightingType {
      Mono = "Mono",
      RGB = "RGB",
      PerkeyRGB = "PerkeyRGB",
      All = "All",
    }
  }

  type ByteArray = Int8Array;

  /**
   * Initializes the LED API.
   * @param callback A callback with the result of the request.
   */
  function init(callback: CallbackFunction<Result>): void;

  /**
   * Sets the target devices to use.
   * @param targetDevices An array of
   * @param callback A callback with the result of the request.
   */
  function setTargetDevice(
    targetDevices: enums.LogitechDeviceLightingType[],
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Saves the current lighting.
   * @param callback A callback with the result of the request.
   */
  function saveCurrentLighting(callback: CallbackFunction<Result>): void;

  /**
   * Sets the lighting for the entire device.
   * @param redPercentage Red percentage (0 - 100)
   * @param greenPercentage Green percentage (0 - 100)
   * @param bluePercentage Blue percentage (0 - 100)
   * @param callback A callback with the result of the request.
   */
  function setLighting(
    redPercentage: number,
    greenPercentage: number,
    bluePercentage: number,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Restores the lightning to the last previously saved state.
   * @param callback A callback with the result of the request.
   */
  function restoreLighting(callback: CallbackFunction<Result>): void;

  /**
   * Flashes the lighting on the device.
   * @param redPercentage Red percentage (0 - 100)
   * @param greenPercentage Green percentage (0 - 100)
   * @param bluePercentage Blue percentage (0 - 100)
   * @param milliSecondsDuration The duration to flash in milliseconds.
   * @param milliSecondsInterval The interval for flashes in milliseconds.
   * @param callback A callback with the result of the request.
   */
  function flashLighting(
    redPercentage: number,
    greenPercentage: number,
    bluePercentage: number,
    milliSecondsDuration: number,
    milliSecondsInterval: number,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Pulses the lighting on the device.
   * @param redPercentage Red percentage (0 - 100)
   * @param greenPercentage Green percentage (0 - 100)
   * @param bluePercentage Blue percentage (0 - 100)
   * @param milliSecondsDuration The duration to flash in milliseconds.
   * @param milliSecondsInterval The interval for flashes in milliseconds.
   * @param callback A callback with the result of the request.
   */
  function pulseLighting(
    redPercentage: number,
    greenPercentage: number,
    bluePercentage: number,
    milliSecondsDuration: number,
    milliSecondsInterval: number,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Stops ongoing pulse/flash effects.
   * @param callback A callback with the result of the request.
   */
  function stopEffects(callback: CallbackFunction<Result>): void;

  /**
   * Sets the lighting from an overwolf-extension:// or overwolf-media:// url.
   * The file must be 21x6.
   * @param bitmapUrl The Overwolf url to add.
   * @param callback A callback with the result of the request.
   */
  function setLightingFromBitmap(
    bitmapUrl: string,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Sets the lighting from a bitmap byte array.
   * @param bitmap A byte array representing a 21x6 bitmap.
   * @param callback A callback with the result of the request.
   */
  function setLightingFromBitmap(
    bitmap: ByteArray,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Sets the lighting for a specific key by scan code.
   * @param keyCode The key scan code.
   * @param redPercentage Red percentage (0 - 100)
   * @param greenPercentage Green percentage (0 - 100)
   * @param bluePercentage Blue percentage (0 - 100)
   * @param callback A callback with the result of the request.
   */
  function setLightingForKeyWithScanCode(
    keyCode: number,
    redPercentage: number,
    greenPercentage: number,
    bluePercentage: number,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Sets the lighting for a specific key by HID code.
   * @param keyCode The key HID code.
   * @param redPercentage Red percentage (0 - 100)
   * @param greenPercentage Green percentage (0 - 100)
   * @param bluePercentage Blue percentage (0 - 100)
   * @param callback A callback with the result of the request.
   */
  function setLightingForKeyWithHidCode(
    keyCode: number,
    redPercentage: number,
    greenPercentage: number,
    bluePercentage: number,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Sets the lighting for a specific key by quartz code.
   * @param keyCode The key quartz code.
   * @param redPercentage Red percentage (0 - 100)
   * @param greenPercentage Green percentage (0 - 100)
   * @param bluePercentage Blue percentage (0 - 100)
   * @param callback A callback with the result of the request.
   */
  function setLightingForKeyWithQuartzCode(
    keyCode: number,
    redPercentage: number,
    greenPercentage: number,
    bluePercentage: number,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Sets the lighting for a specific key by key name.
   * @param keyName The key name. For a list of key names see
   * @param redPercentage Red percentage (0 - 100)
   * @param greenPercentage Green percentage (0 - 100)
   * @param bluePercentage Blue percentage (0 - 100)
   * @param callback A callback with the result of the request.
   */
  function setLightingForKeyWithKeyName(
    keyName: enums.KeyboardNames,
    redPercentage: number,
    greenPercentage: number,
    bluePercentage: number,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Saves the current lighting of a specific key.
   * @param keyName The key name. For a list of key names see
   * @param callback A callback with the result of the request.
   */
  function saveLightingForKey(
    keyName: enums.KeyboardNames,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Restores a previously saved lighting for a specific key.
   * @param keyName The key name. For a list of key names see
   * @param callback A callback with the result of the request.
   */
  function restoreLightingForKey(
    keyName: enums.KeyboardNames,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Flashes a single key.
   * @param keyName The key name. For a list of key names see
   * @param redPercentage Red percentage (0 - 100)
   * @param greenPercentage Green percentage (0 - 100)
   * @param bluePercentage Blue percentage (0 - 100)
   * @param milliSecondsDuration The duration to flash in milliseconds.
   * @param milliSecondsInterval The interval for flashes in milliseconds.
   * @param callback A callback with the result of the request.
   */
  function flashSingleKey(
    keyName: enums.KeyboardNames,
    redPercentage: number,
    greenPercentage: number,
    bluePercentage: number,
    milliSecondsDuration: number,
    milliSecondsInterval: number,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Pulses a single key.
   * @param keyName The key name. For a list of key names see
   * @param startRedPercentage >Red start percentage (0 - 100)
   * @param startGreenPercentage Green start percentage (0 - 100)
   * @param startBluePercentage Blue start percentage (0 - 100)
   * @param finishRedPercentage Red finish percentage (0 - 100)
   * @param finishGreenPercentage Green finish percentage (0 - 100)
   * @param finishBluePercentage Blue finish percentage (0 - 100)
   * @param milliSecondsDuration The duration to pulse in milliseconds.
   * @param isInfinite States whether the effect is infinite or not.
   * @param callback A callback with the result of the request.
   */
  function pulseSingleKey(
    keyName: enums.KeyboardNames,
    startRedPercentage: number,
    startGreenPercentage: number,
    startBluePercentage: number,
    finishRedPercentage: number,
    finishGreenPercentage: number,
    finishBluePercentage: number,
    milliSecondsDuration: number,
    isInfinite: boolean,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Stops ongoing pulse/flash effects on a specific key.
   * @param keyName The key name. For a list of key names see
   * @param callback A callback with the result of the request.
   */
  function stopEffectsOnKey(
    keyName: enums.KeyboardNames,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Shuts down the API.
   */
  function shutdown(): void;

  