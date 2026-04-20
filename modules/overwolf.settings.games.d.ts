/**
 * Use this API to query and configure per-game Overwolf settings, such as overlay enablement
 * and auto-launch behavior for apps on a per-game-class basis.
 * @packageDocumentation
 */

/**
   * Fired when a hotkey is modified. Apps will only be notified ofhotkey
   * changes that relate to them.
   * @deprecated Since version 0.155.
   */
  const OnHotKeyChanged: Event<HotKeyChangedEvent>;
}

declare namespace overwolf.settings.games {
  /** Base result containing the game class ID the result relates to. */
  interface GameClassResult extends Result {
    /** The game class ID this result pertains to. */
    gameClassId: number;
  }

  /** Result indicating whether auto-launch is enabled for a specific game class. */
  interface AutolaunchEnabledResult extends GameClassResult {
    /** Whether auto-launch is currently enabled for the calling app in this game. */
    autoLaunchEnabled: boolean;
  }

  /** Result indicating whether the Overwolf overlay is enabled for a specific game class. */
  interface OverlayEnabledResult extends GameClassResult {
    /** Whether the Overwolf overlay is currently enabled for this game. */
    enabled: boolean;
  }

  /** Event data describing a change in overlay enablement for a game. */
  interface OverlayEnablementChangedEvent {
    /** The ID of the game whose overlay setting changed. */
    gameId: number;
    /** The new overlay enabled state. */
    enabled: boolean;
  }

  /** Event data describing a change in auto-launch enablement for a game. */
  interface AutoLaunchEnablementChangedEvent {
    /** The ID of the game whose auto-launch setting changed. */
    gameId: number;
    /** The new auto-launch enabled state. */
    enabled: boolean;
    /** The ID of the app whose auto-launch setting changed. */
    appId: string;
  }

  /**
   * Returns the current Overlay setting for the given game (if any exist).
   * @param gameClassId the game id for which the flag is retrieved for
   * @param callback
   */
  function getOverlayEnabled(
    gameClassId: number,
    callback: CallbackFunction<OverlayEnabledResult>
  ): void;

  /**
   * Returns the current Auto-Launch enabled setting for the calling app in a given game (gameClassId).
   * @param gameClassId the game id for which the flag is retrieved for
   * @param callback
   */
  function getAutoLaunchEnabled(
    gameClassId: number,
    callback: CallbackFunction<AutolaunchEnabledResult>
  ): void;

  /**
   * Sets the current Auto-Launch enabled setting for the calling app in a given game (gameClassId).
   * @param gameClassId the game id for which the flag is retrieved for
   * @param enabled whether auto-launch should be enabled
   * @param callback
   */
  function setAutoLaunchEnabled(
    gameClassId: number,
    enabled: boolean,
    callback: CallbackFunction<AutolaunchEnabledResult>
  ): void;

  /**
   * Fired when the overlay is enabled or disabled for a game.
   */
  const onOverlayEnablementChanged: Event<OverlayEnablementChangedEvent>;

}
