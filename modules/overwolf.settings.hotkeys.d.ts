/**
 * Use this API to get, assign, and unassign hotkeys for the current extension,
 * and to listen for hotkey press, hold, and change events.
 * @packageDocumentation
 */

/**
   * Fired when auto launch is enabled or disabled for a game.
   */
  const onAutoLaunchEnablementChanged: Event<AutoLaunchEnablementChangedEvent>;
}

declare namespace overwolf.settings.hotkeys {
  /** Describes a single hotkey registered to an extension or the platform. */
  interface IHotkey {
    /** The internal name of the hotkey as defined in the manifest. */
    name: string;
    /** The human-readable display title of the hotkey. */
    title: string;
    /** The virtual key code of the primary key. */
    virtualKeycode: number;
    /** A bitmask of the active modifier keys (Ctrl, Alt, Shift). */
    modifierKeys: number;
    /** The UID of the extension that owns this hotkey. */
    extensionuid: string;
    /** Whether the hotkey is a pass-through key that does not consume the input. */
    isPassthrough: boolean;
    /** Whether this hotkey is configured as a hold hotkey. */
    hold: boolean;
    /** Whether the hotkey is currently unassigned. */
    IsUnassigned: boolean;
    /** The string representation of the key binding (e.g. `"Ctrl+F2"`). */
    binding: string;
  }

  /** Result of `getAllApps`, mapping each app's hotkeys alongside platform-level hotkeys. */
  interface GetAllAssignedHotkeysResult extends Result {
    /** A map of app IDs to their assigned hotkey results. */
    apps: {
      [appId: string]: Omit<GetAssignedHotkeyResult, 'success' | 'error'>;
    },
    /** Platform-wide hotkeys not associated with any specific app. */
    platform: IHotkey[];
  }

  /** Result of `get`, containing global and per-game hotkeys for the current extension. */
  interface GetAssignedHotkeyResult extends Result {
    /** Hotkeys that apply globally across all games. */
    globals: IHotkey[];
    /** A map of game IDs to their game-specific hotkey assignments, if any. */
    games?: Record<string, IHotkey[]>;
  }

  /** Payload of the `onHold` event, indicating the hold state of a hotkey. */
  interface OnHoldEvent {
    /** The internal name of the hotkey being held. */
    name: string;
    /** Whether the key is currently pressed down (`"down"`) or released (`"up"`). */
    state: "up" | "down";
  }

  /** Payload of the `onPressed` event, fired when a non-hold hotkey is activated. */
  interface OnPressedEvent {
    /** The internal name of the hotkey that was pressed. */
    name: string;
  }

  /** Payload of the `onChanged` event, describing the updated hotkey binding. */
  interface OnChangedEvent {
    /** The internal name of the hotkey that changed. */
    name: string;
    /** The game ID the changed binding applies to, or `0` for global. */
    gameId: number;
    /** A human-readable description of the hotkey. */
    description: string;
    /** The new string representation of the binding. */
    binding: string;
    /** The bitmask of modifier keys in the new binding. */
    modifierKeys: number;
    /** The virtual key code of the primary key in the new binding. */
    virtualKeycode: number;
  }

  /** Specifies which modifier keys are active in a hotkey combination. */
  interface HotkeyModifiers {
    /** Whether the Ctrl modifier is active. */
    ctrl?: boolean;
    /** Whether the Alt modifier is active. */
    alt?: boolean;
    /** Whether the Shift modifier is active. */
    shift?: boolean;
  }

  /** Identifies a hotkey to unassign by name and optional game scope. */
  interface UnassignHotkeyObject {
    /** The internal name of the hotkey as defined in the manifest. */
    name: string;
    /** The game ID to scope the unassignment to, or omit for the global hotkey. */
    gameId?: number;
  }

  /** Identifies a hotkey to assign, including the key combination to bind. */
  interface AssignHotkeyObject extends UnassignHotkeyObject {
    /** The modifier keys to include in the binding. */
    modifiers: HotkeyModifiers;
    /** The virtual key code of the primary key to bind. */
    virtualKey: number;
  }

  /** Parameters for updating hotkey pass-through or custom modifier settings. */
  interface UpdateHotkeyObject extends UnassignHotkeyObject {
    /** A custom modifier key code to apply, if applicable. */
    customModifierKeyCode?: number;
    /** Whether to enable pass-through behavior for this hotkey. */
    isPassThrough?: boolean;
  }

  /**
   * Returns the hotkey assigned for the current extension in all the games.
   * @param callback Called with the global and per-game hotkey assignments for the calling extension.
   */
  function get(callback: CallbackFunction<GetAssignedHotkeyResult>): void;

  /**
   * Returns the hotkeys assigned for all installed extensions + the platform, in all the games.
   * @param callback Called with a map of all app hotkey assignments alongside platform-level hotkeys.
   */
  function getAllApps(callback: CallbackFunction<GetAllAssignedHotkeysResult>): void;

  /**
   * Assign global hotkey for the current extension, OR, if a gameId is specified, assign/unassign a dedicated hotkey.
   * @param hotkey The hotkey to assign, including the name, key binding, and optional game scope.
   * @param callback Called with the result of the assignment request.
   */
  function assign(
    hotkey: AssignHotkeyObject,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Unassign global hotkey for the current extension, OR, if a gameId is specified, assign/unassign a dedicated hotkey.
   * @param hotkey The hotkey to unassign, identified by name and optional game scope.
   * @param callback Called with the result of the unassignment request.
   */
  function unassign(
    hotkey: UnassignHotkeyObject,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Updates the pass-through or custom modifier settings for an existing hotkey.
   * @param hotkey The hotkey to update, including the name and the settings to change.
   * @param callback Called with the result of the update request.
   */
  function update(
    hotkey: UpdateHotkeyObject,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Fired only for hotkeys that are set in the manifest as hold.
   */
  const onHold: Event<OnHoldEvent>;

  /**
   * Fired for hotkeys that are NOT set as hold hotkeys.
   */
  const onPressed: Event<OnPressedEvent>;

