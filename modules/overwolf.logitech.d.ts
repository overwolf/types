/**
   * Send an https request (of different methods) to localhost/127.0.0.1
   * while by-passing a valid certificate verification.
   * @param url
   * @param method
   * @param headers
   * @param data
   * @param callback
   */
  function sendHttpRequest(
    url: string,
    method: enums.HttpRequestMethods,
    headers: FetchHeader[],
    data: string,
    callback: CallbackFunction<SendHttpRequestResult>
  ): void;
}

declare namespace overwolf.logitech {
  interface Device {
    name: string;
    pid: number;
    lightingId: number;
    lightingName: string;
    typeId: number;
    typeName: string;
  }

  interface GetVersionResult extends Result {
    version?: string;
  }

  interface GetDevicesResult extends Result {
    devices?: Device[];
  }

  /**
   * Gets the current version of the LGS.
   * @param callback Called with the version of LGS currently installed.
   */
  function getVersion(callback: CallbackFunction<GetVersionResult>): void;

  