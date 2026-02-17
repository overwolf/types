/**
   * Stop listening on file.
   * Stop streaming a file that you previously passed when calling listenOnFile().
   * There are no callbacks - as this will never fail (even if the stream doesn't exist).
   * @param id listen Id.
   */
  function stopFileListener(id: string): void;

  function watchFile(
    filePath: string,
    callback: CallbackFunction<WatchedFileChanged>
  ): void;

  function stopWatchingFile(
    path: string,
    callback: CallbackFunction<Result>
  ): void;
}

declare namespace overwolf.cryptography {
  interface EncryptedDataResult extends Result {
    ciphertext: string;
  }

  interface DecryptedDataResult extends Result {
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

  