/**
   * Fired when there are new game events with a JSON object of the events
   * information.
   */
  const onNewEvents: Event<any>;
}

declare namespace overwolf.games.launchers.events.provider {
  interface GameEventsInfo {
    feature: string;
    category: string;
    key: string;
    value: string;
  }

  function triggerEvent(
    launcherClassId: number,
    feature: string,
    name: string,
    data?: any,
    callback?: CallbackFunction<Result>
  ): void;

  function updateInfo(
    launcherClassId: number,
    info: GameEventsInfo,
    callback?: CallbackFunction<Result>
  ): void;

  function setSupportedFeatures(
    launcherClassId: number,
    features: string[],
    callback?: CallbackFunction<Result>
  ): void;
}

declare namespace overwolf.games.events {
  interface SetRequiredFeaturesResult extends Result {
    supportedFeatures?: string[];
  }

  interface GetInfoResult<T = any> extends Result {
    res: T;
  }

  interface GameEvent {
    name: string;
    data: string;
  }

  type GameEventDictionary2 = {};

  interface GameEvent2<T extends GameEventDictionary2 = any> {
    name: keyof T;
    data: any;
  }

  interface NewGameEvents {
    events: GameEvent[];
  }

  interface ErrorEvent {
    reason: string;
  }

  interface InfoUpdate2 { }

  interface InfoUpdates2Event
    <Feature = string, Info extends InfoUpdate2 = InfoUpdate2> {
    info: Info;
    feature: Feature;
  }

  /**
   * Sets the required features from the provider.
   * @param features A string array of features to utilize.
   * @param callback Called with success or failure state.
   */
  function setRequiredFeatures(
    features: string[],
    callback: CallbackFunction<SetRequiredFeaturesResult>
  ): void;

  /**
   * Gets the current game info.
   * @param callback
   */
  function getInfo(callback: CallbackFunction<GetInfoResult>): void;

  /**
   * Fired when there was an error in the game events system.
   */
  const onError: Event<ErrorEvent>;

  /**
   * Obsolete. Fired when there are game info updates with a JSON object of the
   * updates.
   */
  const onInfoUpdates: Event<any>;

  /**
   * Fired when there are game info updates with a JSON object of the updates.
   */
  const onInfoUpdates2: Event<InfoUpdates2Event>;

  