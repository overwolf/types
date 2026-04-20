/**
   * Repairs the schema registration, for an extension where the manifest contains
   * url_protocol
   * @param callback A function called with the manifest data.
   */
  function repairUrlProtocol(
    callback: CallbackFunction<Result>
  ): void;
}

/**
 * Use this API to share data between extensions. 
 * 
 * An owner app can set data
 * for a specific consumer app by app ID, and the consumer app can retrieve
 * that data. Changes to shared data are surfaced via the `onChanged` event.
 *
 * @packageDocumentation
 */
declare namespace overwolf.extensions.sharedData {
  /**
   * Container that represent a shared data parameters.
   */
  interface SharedDataParams {
    /** The app ID of the extension that set the shared data (the owner). */
    origin?: string;
    /** The app ID of the extension that should receive the shared data (the consumer). */
    target?: string;
  }

  /** Result of `get`. */
  interface GetResult extends Result {
    /** A dictionary of shared data values keyed by owner app ID. */
    data: Dictionary<string>;
  }

  /**
   * Used by the owner app to set data for the consumer app, by appId.
   * @param appId The app ID of the consumer extension to share data with.
   * @param value The data to share with the consumer app.
   * @param callback Called with the result of the operation.
   */
  function set(
    appId: string,
    value: any,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Used by the consumer app to get data set by the owner app.
   * @param param Filter parameters specifying the origin and/or target app IDs.
   * @param callback Called with the result containing the shared data.
   */
  function get(
    param: SharedDataParams,
    callback: CallbackFunction<GetResult>
  ): void;

  /** Event data for when shared data is changed by the owner app. */
  interface onChangedEvent {
    /** The app ID of the extension that set the shared data. */
    origin: string;
    /** The app ID of the extension the data was shared with. */
    target: string;
    /** The updated shared data value. */
    data: string;
  }
}

