/**
 * Use this API to subscribe to real-time game events and info updates emitted
 * by a running launcher (e.g., Battle.net, Epic Games Launcher).
 * @packageDocumentation
 */

/**
   * Fired when a launcher is closed.
   */
  const onTerminated: Event<LauncherInfo>;
}

declare namespace overwolf.games.launchers.events {
  /**
   * Result of a `getInfo` call.
   * @template T The shape of the launcher info payload. Defaults to `any`.
   */
  interface GetInfoResult<T = any> extends Result {
    /** The current launcher info payload. */
    res: T;
  }

  /** Result of a `setRequiredFeatures` call. */
  interface SetRequiredFeaturesResult extends Result {
    /** The subset of requested features that the launcher actually supports. */
    supportedFeatures: string[];
  }

  /**
   * Sets the required features from the provider.
   * @param launcherClassId The class ID of the target launcher.
   * @param features A string array of features to utilize.
   * @param callback Called with success or failure state.
   */
  function setRequiredFeatures(
    launcherClassId: number,
    features: string[],
    callback: CallbackFunction<SetRequiredFeaturesResult>
  ): void;

  /**
   * Gets the current game info.
   * @param launcherClassId The class ID of the target launcher.
   * @param callback Called with the current launcher info.
   */
  function getInfo(
    launcherClassId: number,
    callback: CallbackFunction<GetInfoResult>
  ): void;

  /**
   * Fired when there are game info updates with a JSON object of the updates.
   */
  const onInfoUpdates: Event<any>;

  }
