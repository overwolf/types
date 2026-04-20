/**
 * Use this API to encrypt and decrypt ciphertext and secure app data and variables. (e.g., localStorage that stores auth-tokens, etc.)
 * @packageDocumentation
 */

/**
   * Stop listening on file.
   * Stop streaming a file that you previously passed when calling listenOnFile().
   * There are no callbacks - as this will never fail (even if the stream doesn't exist).
   * @param id listen Id.
   */
  function stopFileListener(id: string): void;

  /**
   * Starts watching a file for changes and fires a callback whenever the file
   * is created, modified, renamed, or deleted.
   * @param filePath The absolute path of the file to watch.
   * @param callback Called each time a file system event is detected on the watched file.
   */
  function watchFile(
    filePath: string,
    callback: CallbackFunction<WatchedFileChanged>
  ): void;

  /**
   * Stops watching a file that was previously registered with `watchFile`.
   * @param path The absolute path of the file to stop watching.
   * @param callback Called with the result of the operation.
   */
  function stopWatchingFile(
    path: string,
    callback: CallbackFunction<Result>
  ): void;
}

declare namespace overwolf.cryptography {
  interface EncryptedDataResult extends Result {
    /** The encrypted ciphertext string produced by `encryptForCurrentUser`. */
    ciphertext: string;
  }

  interface DecryptedDataResult extends Result {
    /** The decrypted plaintext string produced by `decryptForCurrentUser`. */
    plaintext: string;
  }

  /**
   * Encrypt provided plaintext for current system user
   * @param plaintext Text to encrypt
   * @param callback Will be called with encrypted ciphertext
   */
  function encryptForCurrentUser(
    plaintext: string,
    callback: CallbackFunction<EncryptedDataResult>
  ): void;

  