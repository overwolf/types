/**
   * Fired when auto launch is enabled or disabled for a game.
   */
  const onAutoLaunchEnablementChanged: Event<AutoLaunchEnablementChangedEvent>;
}

declare namespace overwolf.settings.hotkeys {
  interface IHotkey {
    name: string;
    title: string;
    virtualKeycode: number;
    modifierKeys: number;
    extensionuid: string;
    isPassthrough: boolean;
    hold: boolean;
    IsUnassigned: boolean;
    binding: string;
  }

  interface GetAllAssignedHotkeysResult extends Result {
    apps: {
      [appId: string]: Omit<GetAssignedHotkeyResult, 'success' | 'error'>;
    },
    platform: IHotkey[];
  }

  interface GetAssignedHotkeyResult extends Result {
    globals: IHotkey[];
    games?: Record<string, IHotkey[]>;
  }

  interface OnHoldEvent {
    name: string;
    state: "up" | "down";
  }

  interface OnPressedEvent {
    name: string;
  }

  interface OnChangedEvent {
    name: string;
    gameId: number;
    description: string;
    binding: string;
    modifierKeys: number;
    virtualKeycode: number;
  }

  interface HotkeyModifiers {
    ctrl?: boolean;
    alt?: boolean;
    shift?: boolean;
  }

  interface UnassignHotkeyObject {
    name: string;
    gameId?: number;
  }

  interface AssignHotkeyObject extends UnassignHotkeyObject {
    modifiers: HotkeyModifiers;
    virtualKey: number;
  }

  interface UpdateHotkeyObject extends UnassignHotkeyObject {
    customModifierKeyCode?: number;
    isPassThrough?: boolean;
  }

  /**
   * Returns the hotkey assigned for the current extension in all the games.
   */
  function get(callback: CallbackFunction<GetAssignedHotkeyResult>): void;

  /**
   * Returns the hotkeys assigned for all installed extensions + the platform, in all the games.
   */
  function getAllApps(callback: CallbackFunction<GetAllAssignedHotkeysResult>): void;

  /**
   * Assign global hotkey for the current extension, OR, if a gameId is specified, assign/unassign a dedicated hotkey.
   */
  function assign(
    hotkey: AssignHotkeyObject,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Unassign global hotkey for the current extension, OR, if a gameId is specified, assign/unassign a dedicated hotkey.
   */
  function unassign(
    hotkey: UnassignHotkeyObject,
    callback: CallbackFunction<Result>
  ): void;

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

  