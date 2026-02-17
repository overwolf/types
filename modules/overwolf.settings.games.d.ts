/**
   * Fired when a hotkey is modified. Apps will only be notified ofhotkey
   * changes that relate to them.
   * @deprecated Since version 0.155.
   */
  const OnHotKeyChanged: Event<HotKeyChangedEvent>;
}

declare namespace overwolf.settings.games {
  interface GameClassResult extends Result {
    gameClassId: number;
  }

  interface AutolaunchEnabledResult extends GameClassResult {
    autoLaunchEnabled: boolean;
  }

  interface OverlayEnabledResult extends GameClassResult {
    enabled: boolean;
  }

  interface OverlayEnablementChangedEvent {
    gameId: number;
    enabled: boolean;
  }

  interface AutoLaunchEnablementChangedEvent {
    gameId: number;
    enabled: boolean;
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

  