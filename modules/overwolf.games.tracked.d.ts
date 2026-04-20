/**
 * Use this API to monitor unsupported or overlay-disabled games running on the user's machine,
 * including launch and termination events.
 * @packageDocumentation
 */

/**
   * Fired when the rendering method of the game has been detected.
   */
  const onGameRendererDetected: Event<GameRendererDetectedEvent>;
}

declare namespace overwolf.games.tracked {
  /** Fired when a tracked (unsupported / overlay disabled) game process is terminated. */
  const onTerminated: Event<GameInfoUpdatedEvent>;

  /**
   * Fired when an unsupported / overlay disabled game is launched.
   */
  const onGameLaunched: Event<GetRunningGameInfoResult2>;

  /** Result containing information about all currently running tracked games. */
  interface GetAnyRunningGamesInfoResult extends Result {
    /** An array of info objects for each currently running tracked game. */
    gameInfos: GetRunningGameInfoResult2GameInfo[];
    /** Whether the request succeeded. */
    success: boolean;
  }

}
