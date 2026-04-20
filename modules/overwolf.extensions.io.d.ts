/**
 * Use this API to perform file system operations (read, write, copy, move,
 * delete, list) within the sandboxed storage spaces available to an extension.
 * @packageDocumentation
 */

/**
   * Called for global uncaught exceptions in a frame.
   */
  const onUncaughtException: UncaughtExceptionEvent;

  /*
  * Called when an extension is installed
  */
  const onAppInstalled: Event<AppInstallationEvent>;

  /** Fired when an extension is uninstalled. */
  const onAppUninstalled: Event<AppInstallationEvent>;

}

declare namespace overwolf.extensions.io {
  export namespace enums {
    /** The named storage spaces available to extensions for file I/O. */
    const enum StorageSpace {
      /** The user's pictures folder. */
      pictures = "pictures",
      /** The user's videos folder. */
      videos = "videos",
      /** The extension's private app data folder. */
      appData = "appData",
    }

    /** Whether a file system entry is a regular file or a directory. */
    const enum FileType {
      /** A regular file. */
      file = "file",
      /** A directory. */
      directory = "directory"
    }
  }

  /** Result of `getStoragePath`, containing the resolved absolute path for a storage space. */
  interface GetStoragePathResult extends Result {
    /** The absolute file system path for the requested storage space. */
    path: string;
  }

  /** Describes a single file system entry (file or directory) within a storage space. */
  interface Content {
    /** Whether this entry is a file or a directory. */
    type: enums.FileType;
    /** The path of the entry within the storage space. */
    path: string;
  }

  /** Result of `readTextFile`, containing the file's text content. */
  interface ReadTextFileResult extends Result {
    /** The text content of the file. */
    content: string;
  }

  /** Result of `exist`, indicating whether the path exists and its type. */
  interface ExistResult extends Result {
    /** The type of the existing entry (file or directory). */
    type: enums.FileType;
  }

  /** Result of `dir`, listing the files and subdirectories at a path. */
  interface DirResult extends Result {
    /** The names of files found in the directory. */
    files: string[];
    /** The names of subdirectories found in the directory. */
    directories: string[];
  }

  /** Result of `delete`, listing any entries that could not be deleted. */
  interface DeleteResult extends Result {
    /** Content entries that were not successfully deleted. */
    undeleted_content: Content[];
  }

  /** Creates a new directory at the given path within the specified storage space. */
  export function createDirectory(
    space: enums.StorageSpace,
    path: string,
    callback: CallbackFunction<Result>
  ): void;

  /** Returns the absolute file system path for the given storage space. */
  export function getStoragePath(
    space: enums.StorageSpace,
    callback: CallbackFunction<GetStoragePathResult>
  ): void;

  /** Checks whether a file or directory exists at the given path in the storage space. */
  export function exist(
    space: enums.StorageSpace,
    path: string,
    callback: CallbackFunction<ExistResult>
  ): void;

  /** Moves a file or directory from `source` to `destination` within the storage space. */
  export function move(
    space: enums.StorageSpace,
    source: string,
    destination: string,
    callback: CallbackFunction<Result>
  ): void;

  /** Deletes the file or directory at the given path within the storage space. */
  function _delete(
    space: enums.StorageSpace,
    path: string,
    callback: CallbackFunction<DeleteResult>
  ): void;

  export { _delete as delete }

  /** Copies a file or directory from `source` to `destination` within the storage space. */
  export function copy(
    space: enums.StorageSpace,
    source: string,
    destination: string,
    callback: CallbackFunction<Result>
  ): void;

  /** Lists the files and subdirectories at `directoryPath` within the storage space. */
  export function dir(
    space: enums.StorageSpace,
    directoryPath: string,
    callback: CallbackFunction<DirResult>
  ): void;

  /** Reads the text content of the file at `filePath` within the storage space. */
  export function readTextFile(
    space: enums.StorageSpace,
    filePath: string,
    callback: CallbackFunction<ReadTextFileResult>
  ): void;

  /** Writes text content to the file at `filePath` within the storage space, creating it if it does not exist. */
  export function writeTextFile(
    space: enums.StorageSpace,
    filePath: string,
    content: string,
    callback: CallbackFunction<Result>
  ): void;
}

declare namespace overwolf.extensions.current {

  /** Result of `getExtraObject`, containing the requested extra object instance. */
  interface GetExtraObjectResult extends Result {
    /** The extra object instance, or undefined if not found. */
    object?: any;
  }


  /**
   * Retrieves an extra object (providing external APIs) registered in the
   * extension's manifest.
   * @param name The name of the object as appears in the manifest.
   * @param callback A function called with the extra object, if found, and a
   * status indicating success or failure.
   */
  function getExtraObject(
    name: string,
    callback: CallbackFunction<GetExtraObjectResult>
  ): void;

  /**
   * Returns the current extension's manifest object.
   * @param callback A function called with the manifest data.
   */
  function getManifest(callback: CallbackFunction<GetManifestResult>): void;

  /** Generates SHA1, SHA256, and MD5 hashes from the given email address. */
  function generateUserEmailHashes(email: string, callback: CallbackFunction<Result>): void;

  /** Sets pre-computed email hashes on the current user's profile. */
  function setUserEmailHashes(hashes: UserEmailHashes, callback: CallbackFunction<Result>): void;

  /** A set of cryptographic hashes derived from a user's email address. */
  interface UserEmailHashes {
    /** The SHA-1 hash of the email. */
    SHA1: string;
    /** The SHA-256 hash of the email. */
    SHA256: string;
    /** The MD5 hash of the email. */
    MD5: string
  }

  /** Returns the phased rollout percentage for the current or specified extension version. */
  function getPhasedPercent(
    callback: CallbackFunction<GetPhasedPercentResult>,
    version?: string,
  ): void;

