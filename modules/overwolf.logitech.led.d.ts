/**
 * Use this API to control Logitech LED peripheral lighting from your Overwolf app.
 * Supports per-key and zone-based RGB effects on compatible Logitech keyboards, mice, and other devices.
 * @packageDocumentation
 */

/**
   * Gets the currently installed Logitech devices.
   * @param callback Called with the current device information.
   */
  function getDevices(callback: CallbackFunction<GetDevicesResult>): void;
}

declare namespace overwolf.logitech.led {
  namespace enums {
    /** Logical names for individual keys on a Logitech per-key RGB keyboard. */
    const enum KeyboardNames {
      /** Escape key. */
      ESC = "ESC",
      /** F1 function key. */
      F1 = "F1",
      /** F2 function key. */
      F2 = "F2",
      /** F3 function key. */
      F3 = "F3",
      /** F4 function key. */
      F4 = "F4",
      /** F5 function key. */
      F5 = "F5",
      /** F6 function key. */
      F6 = "F6",
      /** F7 function key. */
      F7 = "F7",
      /** F8 function key. */
      F8 = "F8",
      /** F9 function key. */
      F9 = "F9",
      /** F10 function key. */
      F10 = "F10",
      /** F11 function key. */
      F11 = "F11",
      /** F12 function key. */
      F12 = "F12",
      /** Print Screen key. */
      PRINT_SCREEN = "PRINT_SCREEN",
      /** Scroll Lock key. */
      SCROLL_LOCK = "SCROLL_LOCK",
      /** Pause/Break key. */
      PAUSE_BREAK = "PAUSE_BREAK",
      /** Tilde/backtick key. */
      TILDE = "TILDE",
      /** Number 1 key. */
      ONE = "ONE",
      /** Number 2 key. */
      TWO = "TWO",
      /** Number 3 key. */
      THREE = "THREE",
      /** Number 4 key. */
      FOUR = "FOUR",
      /** Number 5 key. */
      FIVE = "FIVE",
      /** Number 6 key. */
      SIX = "SIX",
      /** Number 7 key. */
      SEVEN = "SEVEN",
      /** Number 8 key. */
      EIGHT = "EIGHT",
      /** Number 9 key. */
      NINE = "NINE",
      /** Number 0 key. */
      ZERO = "ZERO",
      /** Minus/hyphen key. */
      MINUS = "MINUS",
      /** Equals key. */
      EQUALS = "EQUALS",
      /** Backspace key. */
      BACKSPACE = "BACKSPACE",
      /** Insert key. */
      INSERT = "INSERT",
      /** Home key. */
      HOME = "HOME",
      /** Page Up key. */
      PAGE_UP = "PAGE_UP",
      /** Num Lock key. */
      NUM_LOCK = "NUM_LOCK",
      /** Numpad slash (divide) key. */
      NUM_SLASH = "NUM_SLASH",
      /** Numpad asterisk (multiply) key. */
      NUM_ASTERISK = "NUM_ASTERISK",
      /** Numpad minus key. */
      NUM_MINUS = "NUM_MINUS",
      /** Tab key. */
      TAB = "TAB",
      /** Q key. */
      Q = "Q",
      /** W key. */
      W = "W",
      /** E key. */
      E = "E",
      /** R key. */
      R = "R",
      /** T key. */
      T = "T",
      /** Y key. */
      Y = "Y",
      /** U key. */
      U = "U",
      /** I key. */
      I = "I",
      /** O key. */
      O = "O",
      /** P key. */
      P = "P",
      /** Open bracket key (`[`). */
      OPEN_BRACKET = "OPEN_BRACKET",
      /** Close bracket key (`]`). */
      CLOSE_BRACKET = "CLOSE_BRACKET",
      /** Backslash key (`\`). */
      BACKSLASH = "BACKSLASH",
      /** Delete key (main keyboard). */
      KEYBOARD_DELETE = "KEYBOARD_DELETE",
      /** End key. */
      END = "END",
      /** Page Down key. */
      PAGE_DOWN = "PAGE_DOWN",
      /** Numpad 7 key. */
      NUM_SEVEN = "NUM_SEVEN",
      /** Numpad 8 key. */
      NUM_EIGHT = "NUM_EIGHT",
      /** Numpad 9 key. */
      NUM_NINE = "NUM_NINE",
      /** Numpad plus key. */
      NUM_PLUS = "NUM_PLUS",
      /** Caps Lock key. */
      CAPS_LOCK = "CAPS_LOCK",
      /** A key. */
      A = "A",
      /** S key. */
      S = "S",
      /** D key. */
      D = "D",
      /** F key. */
      F = "F",
      /** G key. */
      G = "G",
      /** H key. */
      H = "H",
      /** J key. */
      J = "J",
      /** K key. */
      K = "K",
      /** L key. */
      L = "L",
      /** Semicolon key. */
      SEMICOLON = "SEMICOLON",
      /** Apostrophe/single-quote key. */
      APOSTROPHE = "APOSTROPHE",
      /** Enter/Return key. */
      ENTER = "ENTER",
      /** Numpad 4 key. */
      NUM_FOUR = "NUM_FOUR",
      /** Numpad 5 key. */
      NUM_FIVE = "NUM_FIVE",
      /** Numpad 6 key. */
      NUM_SIX = "NUM_SIX",
      /** Left Shift key. */
      LEFT_SHIFT = "LEFT_SHIFT",
      /** Z key. */
      Z = "Z",
      /** X key. */
      X = "X",
      /** C key. */
      C = "C",
      /** V key. */
      V = "V",
      /** B key. */
      B = "B",
      /** N key. */
      N = "N",
      /** M key. */
      M = "M",
      /** Comma key. */
      COMMA = "COMMA",
      /** Period key. */
      PERIOD = "PERIOD",
      /** Forward slash key. */
      FORWARD_SLASH = "FORWARD_SLASH",
      /** Right Shift key. */
      RIGHT_SHIFT = "RIGHT_SHIFT",
      /** Up arrow key. */
      ARROW_UP = "ARROW_UP",
      /** Numpad 1 key. */
      NUM_ONE = "NUM_ONE",
      /** Numpad 2 key. */
      NUM_TWO = "NUM_TWO",
      /** Numpad 3 key. */
      NUM_THREE = "NUM_THREE",
      /** Numpad Enter key. */
      NUM_ENTER = "NUM_ENTER",
      /** Left Control key. */
      LEFT_CONTROL = "LEFT_CONTROL",
      /** Left Windows key. */
      LEFT_WINDOWS = "LEFT_WINDOWS",
      /** Left Alt key. */
      LEFT_ALT = "LEFT_ALT",
      /** Spacebar. */
      SPACE = "SPACE",
      /** Right Alt key. */
      RIGHT_ALT = "RIGHT_ALT",
      /** Right Windows key. */
      RIGHT_WINDOWS = "RIGHT_WINDOWS",
      /** Application/context menu key. */
      APPLICATION_SELECT = "APPLICATION_SELECT",
      /** Right Control key. */
      RIGHT_CONTROL = "RIGHT_CONTROL",
      /** Left arrow key. */
      ARROW_LEFT = "ARROW_LEFT",
      /** Down arrow key. */
      ARROW_DOWN = "ARROW_DOWN",
      /** Right arrow key. */
      ARROW_RIGHT = "ARROW_RIGHT",
      /** Numpad 0 key. */
      NUM_ZERO = "NUM_ZERO",
      /** Numpad period/decimal key. */
      NUM_PERIOD = "NUM_PERIOD",
    }

    /** Logitech device lighting type, used to target devices by their lighting capability. */
    const enum LogitechDeviceLightingType {
      /** Single-color (monochrome) lighting. */
      Mono = "Mono",
      /** Zone-based RGB lighting. */
      RGB = "RGB",
      /** Per-key RGB lighting. */
      PerkeyRGB = "PerkeyRGB",
      /** All connected Logitech lighting devices. */
      All = "All",
    }
  }

  /** Raw byte array type used to pass bitmap data for LED lighting. */
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

