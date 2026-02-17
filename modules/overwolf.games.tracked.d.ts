/**
   * Fired when the rendering method of the game has been detected.
   */
  const onGameRendererDetected: Event<GameRendererDetectedEvent>;
}

declare namespace overwolf.games.tracked {
  const onTerminated: Event<GameInfoUpdatedEvent>;

  /**
   * Fired when an unsupported / overlay disabled game is launched.
   */
  const onGameLaunched: Event<GetRunningGameInfoResult2>;

  interface GetAnyRunningGamesInfoResult extends Result {
    gameInfos: GetRunningGameInfoResult2GameInfo[];
    success: boolean;
  }


  