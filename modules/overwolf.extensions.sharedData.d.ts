/**
   * Repairs the schema registration, for an extension where the manifest contains
   * url_protocol
   * @param callback A function called with the manifest data.
   */
  function repairUrlProtocol(
    callback: CallbackFunction<Result>
  ): void;
}

declare namespace overwolf.extensions.sharedData {
  /**
   * Container that represent a shared data parameters.
   */
  interface SharedDataParams {
    origin?: string;
    target?: string;
  }

  interface GetResult extends Result {
    data: Dictionary<string>;
  }

  /**
   * Used by the owner app to set data for the consumer app, by appId.
   * @param appId The requested app id.
   * @param value
   * @param callback
   */
  function set(
    appId: string,
    value: any,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Used by the consumer app to get data set by the owner app.
   * @param param
   * @param callback
   */
  function get(
    param: SharedDataParams,
    callback: CallbackFunction<GetResult>
  ): void;

  interface onChangedEvent {
    origin: string;
    target: string;
    data: string;
  }
}

