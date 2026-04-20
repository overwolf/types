/**
 * The root `overwolf` namespace. Provides the foundational types used throughout the entire Overwolf API,
 * including the base `Result` shape, the generic `Event` interface, and global version information.
 * @packageDocumentation
 */

declare namespace overwolf {
  /** The currently installed Overwolf client version string. */
  const version: string;

  /** Possible status values returned by Overwolf API callbacks. */
  enum ResultStatusTypes {
    /** The operation completed successfully. */
    Success = "success",
    /** The operation failed. */
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
