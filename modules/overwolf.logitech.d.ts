/**
 * Use this API to interact with Logitech Gaming Software (LGS) peripherals,
 * including querying connected devices and their lighting capabilities.
 * @packageDocumentation
 */

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
  /** Information about a connected Logitech peripheral device. */
  interface Device {
    /** The display name of the device. */
    name: string;
    /** The USB product ID of the device. */
    pid: number;
    /** The numeric ID of the device's lighting zone. */
    lightingId: number;
    /** The display name of the device's lighting zone. */
    lightingName: string;
    /** The numeric type identifier of the device. */
    typeId: number;
    /** The display name of the device type. */
    typeName: string;
  }

  /** Result containing the installed LGS version string. */
  interface GetVersionResult extends Result {
    /** The version string of the currently installed Logitech Gaming Software. */
    version?: string;
  }

  /** Result containing the list of connected Logitech devices. */
  interface GetDevicesResult extends Result {
    /** An array of connected Logitech peripheral devices. */
    devices?: Device[];
  }

  /**
   * Gets the current version of the LGS.
   * @param callback Called with the version of LGS currently installed.
   */
  function getVersion(callback: CallbackFunction<GetVersionResult>): void;

}
