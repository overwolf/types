/**
 * Use this API to detect and monitor game launchers (e.g., Battle.net, Epic Games Launcher)
 * running on the user's machine, including focus changes and launch events.
 * @packageDocumentation
 */



declare namespace overwolf.games.launchers {
  /** Information about a currently running game launcher. */
  interface LauncherInfo {
    /** The display title of the launcher. */
    title: string;
    /** The full Overwolf launcher ID, including the instance suffix. */
    id: number;
    /** The Overwolf launcher class ID (without instance suffix). */
    classId: number;
    /** Whether the launcher window currently has input focus. */
    isInFocus: boolean;
    /** The screen position and dimensions of the launcher window. */
    position: Position;
    /** The native OS window handle for the launcher window. */
    handle: number;
    /** The command line string used to start the launcher. */
    commandLine: string;
    /** The OS process ID of the running launcher. */
    processId: number;
    /** The file system path to the launcher executable. */
    path: string;
  }

  /** Screen position and dimensions of a window. */
  interface Position {
    /** The height of the window in pixels. */
    height: number;
    /** The distance from the left edge of the screen in pixels. */
    left: number;
    /** The distance from the top edge of the screen in pixels. */
    top: number;
    /** The width of the window in pixels. */
    width: number;
  }

  /** Result of a `getRunningLaunchersInfo` call. */
  interface GetRunningLaunchersInfoResult extends Result {
    /** Array of info objects for each currently running launcher. */
    launchers: LauncherInfo[];
  }

  /** Payload of the `onUpdated` event. */
  interface UpdatedEvent {
    /** The current state of the launcher that was updated. */
    info: LauncherInfo;
    /** List of property names that changed in this update. */
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

  /**
   * Fired when a launcher is closed.
   */
  const onTerminated: Event<LauncherInfo>;
}