/**
   * Fired upon support encoder list updated.
   */
  const onSupportedEncodersUpdated: Event<SupportedEncodersUpdatedEvent>;
}


declare namespace overwolf.log {
  /**
   * Writes verbose (debug) level log message to the common log.
   * @param msg The message to write to the log file.
   */
  function verbose(msg: string): void;

  /**
   * Writes info level log message to the common log.
   * @param msg The message to write to the log file.
   */
  function info(msg: string): void;

  /**
   * Writes warning level log message to the common log.
   * @param msg The message to write to the log file.
   */
  function warning(msg: string): void;

  /**
   * Writes error level log message to the common log.
   * @param msg The message to write to the log file.
   */
  function error(msg: string): void;

  