/**
   * Returns an array of all the currently running unsupported / overlay disabled games.
   * @param callback Called with the array of game infos.
   */
  function getAnyRunningGamesInfo(
    callback: CallbackFunction<GetAnyRunningGamesInfoResult>
  ): void;
}

declare namespace overwolf.games.launchers {
  interface LauncherInfo {
    title: string;
    id: number;
    classId: number;
    isInFocus: boolean;
    position: Position;
    handle: number;
    commandLine: string;
    processId: number;
    path: string;
  }

  interface Position {
    height: number;
    left: number;
    top: number;
    width: number;
  }

  interface GetRunningLaunchersInfoResult extends Result {
    launchers: LauncherInfo[];
  }

  interface UpdatedEvent {
    info: LauncherInfo;
    changeType: string[];
  }

  /**
   * Returns an object with information about the currently running launchers.
   * @param callback Called with the currently running detected launchers.
   */
  function getRunningLaunchersInfo(
    callback: CallbackFunction<GetRunningLaunchersInfoResult>
  ): void;

  /**
   * Fired when the launcher info is updated, including game name, game running,
   * game terminated, game changing focus, etc.
   */
  const onUpdated: Event<UpdatedEvent>;

  /**
   * Fired when a game is launched.
   */
  const onLaunched: Event<LauncherInfo>;

  