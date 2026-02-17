/**
   * Fired when a launcher is closed.
   */
  const onTerminated: Event<LauncherInfo>;
}

declare namespace overwolf.games.launchers.events {
  interface GetInfoResult<T = any> extends Result {
    res: T;
  }

  interface SetRequiredFeaturesResult extends Result {
    supportedFeatures: string[];
  }

  /**
   * Sets the required features from the provider.
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
   * @param callback
   */
  function getInfo(
    launcherClassId: number,
    callback: CallbackFunction<GetInfoResult>
  ): void;

  /**
   * Fired when there are game info updates with a JSON object of the updates.
   */
  const onInfoUpdates: Event<any>;

  