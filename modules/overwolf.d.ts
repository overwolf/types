declare namespace overwolf {
  const version: string;

  enum ResultStatusTypes {
    Success = "success",
    Error = "error",
  }

  interface Result {
    /**
     * Whether the method executed successfully or not.
     */
    success: boolean;
    /**
     * Information regarding the error (if an error occurred)
     */
    error?: string;
  }

  interface Event<T> {
    /**
     * Registers a listener to an event. When the event occurs, all registered
     * listeners are called.
     * @param callback The callback function to call when the event occurs.
     */
    addListener(callback: (event: T) => void): void;
    