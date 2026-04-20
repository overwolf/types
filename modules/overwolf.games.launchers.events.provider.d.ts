/**
 * Provides APIs for injecting game events and info updates into launcher-based
 * game event pipelines, and for consuming those events from within an app.
 * @packageDocumentation
 */

/**
   * Fired when there are new game events with a JSON object of the events
   * information.
   */
  const onNewEvents: Event<any>;
}

declare namespace overwolf.games.launchers.events.provider {
  /** A single game event info update entry containing feature, category, key, and value. */
  interface GameEventsInfo {
    /** The feature that produced this info update. */
    feature: string;
    /** The category of the info update within the feature. */
    category: string;
    /** The key identifying the specific info field. */
    key: string;
    /** The new value for the info field. */
    value: string;
  }

  /** Triggers a synthetic game event for the specified launcher. */
  function triggerEvent(
    launcherClassId: number,
    feature: string,
    name: string,
    data?: any,
    callback?: CallbackFunction<Result>
  ): void;

  /** Updates a launcher info field with the provided `GameEventsInfo` data. */
  function updateInfo(
    launcherClassId: number,
    info: GameEventsInfo,
    callback?: CallbackFunction<Result>
  ): void;

  /** Declares the set of features that this launcher event provider supports. */
  function setSupportedFeatures(
    launcherClassId: number,
    features: string[],
    callback?: CallbackFunction<Result>
  ): void;
}

declare namespace overwolf.games.events {
  /** Result of a `setRequiredFeatures` call, listing which features were successfully enabled. */
  interface SetRequiredFeaturesResult extends Result {
    /** The subset of requested features that are supported and active. */
    supportedFeatures?: string[];
  }

  /** Result of a `getInfo` call containing the current game info state. */
  interface GetInfoResult<T = any> extends Result {
    /** The game info object returned by the provider. */
    res: T;
  }

  /** Describes a single game event emitted by the events provider. */
  interface GameEvent {
    /** The name of the event. */
    name: string;
    /** The serialized data payload of the event. */
    data: string;
  }

  /** Base type for typed game event dictionary shapes. */
  type GameEventDictionary2 = {};

  /** A typed game event whose name is constrained to keys of the dictionary type `T`. */
  interface GameEvent2<T extends GameEventDictionary2 = any> {
    /** The name of the event, restricted to known keys of `T`. */
    name: keyof T;
    /** The event data payload. */
    data: any;
  }

  /** Payload of the `onNewEvents` event, containing a batch of game events. */
  interface NewGameEvents {
    /** The list of game events in this batch. */
    events: GameEvent[];
  }

  /** Payload of the `onError` event describing a game events system error. */
  interface ErrorEvent {
    /** A string describing the reason for the error. */
    reason: string;
  }

  /** Base interface for typed info update objects; extend to define feature-specific shapes. */
  interface InfoUpdate2 { }

  /** Payload of the `onInfoUpdates2` event, pairing an info update with its feature name. */
  interface InfoUpdates2Event
    <Feature = string, Info extends InfoUpdate2 = InfoUpdate2> {
    /** The info update data for the relevant feature. */
    info: Info;
    /** The feature that produced this info update. */
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

