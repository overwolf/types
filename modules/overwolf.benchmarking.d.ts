/**
 * @deprecated Since version 0.155.
 */
declare namespace overwolf.benchmarking {
  /**
   * Requests hardware information within a given interval. Note that this call
   * requires Overwolf to have Administrative permissions. If it does not have
   * it, the callback will return with 'Permissions Required'. You will then
   * have to ask the app user for permissions and according to the user's
   * choice, call `requestPermissions`. It is then required to call
   * `requestProcessInfo` again.
   * @param interval The desired maximal interval (in milliseconds) in which
   * events will be triggered. Minimum is 500ms.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function requestHardwareInfo(
    interval: number,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Requests process information within a given interval. See
   * `requestPermissions` for administrative permissions instructions.
   * @param interval The desired maximal interval (in milliseconds) in which
   * events will be triggered. Minimum is 500ms.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function requestProcessInfo(
    interval: number,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Requests game fps information within a given interval.
   * @param interval The desired maximal interval (in milliseconds) in which
   * events will be triggered.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function requestFpsInfo(
    interval: number,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Stops receiving hardware/process events. Use this when you no longer want
   * to receive events or when you close your app.
   */
  function stopRequesting(): void;

  /**
   * In case Overwolf requires administrative permissions, and after prompting
   * the user of the app to request more permissions, call this function and
   * then request your desired benchmarking information.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function requestPermissions(callback: CallbackFunction<Result>): void;

  /**
   * Fired when hardware infromation is ready with a JSON containing the
   * information.
   */
  const onHardwareInfoReady: Event<any>;

  /**
   * Fired when process infromation is ready with a JSON containing the
   * information.
   */
  const onProcessInfoReady: Event<any>;

  