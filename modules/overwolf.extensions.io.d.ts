/**
   * Called for global uncaught exceptions in a frame.
   */
  const onUncaughtException: UncaughtExceptionEvent;

  /*
  * Called when an extension is installed
  */
  const onAppInstalled: Event<AppInstallationEvent>;

  const onAppUninstalled: Event<AppInstallationEvent>;

}

declare namespace overwolf.extensions.io {
  export namespace enums {
    const enum StorageSpace {
      pictures = "pictures",
      videos = "videos",
      appData = "appData",
    }

    const enum FileType {
      file = "file",
      directory = "directory"
    }
  }

  interface GetStoragePathResult extends Result {
    path: string;
  }

  interface Content {
    type: enums.FileType;
    path: string;
  }

  interface ReadTextFileResult extends Result {
    content: string;
  }

  interface ExistResult extends Result {
    type: enums.FileType;
  }

  interface DirResult extends Result {
    files: string[];
    directories: string[];
  }

  interface DeleteResult extends Result {
    undeleted_content: Content[];
  }

  export function createDirectory(
    space: enums.StorageSpace,
    path: string,
    callback: CallbackFunction<Result>
  ): void;

  export function getStoragePath(
    space: enums.StorageSpace,
    callback: CallbackFunction<GetStoragePathResult>
  ): void;

  export function exist(
    space: enums.StorageSpace,
    path: string,
    callback: CallbackFunction<ExistResult>
  ): void;

  export function move(
    space: enums.StorageSpace,
    source: string,
    destination: string,
    callback: CallbackFunction<Result>
  ): void;

  function _delete(
    space: enums.StorageSpace,
    path: string,
    callback: CallbackFunction<DeleteResult>
  ): void;

  export { _delete as delete }

  export function copy(
    space: enums.StorageSpace,
    source: string,
    destination: string,
    callback: CallbackFunction<Result>
  ): void;

  export function dir(
    space: enums.StorageSpace,
    directoryPath: string,
    callback: CallbackFunction<DirResult>
  ): void;

  export function readTextFile(
    space: enums.StorageSpace,
    filePath: string,
    callback: CallbackFunction<ReadTextFileResult>
  ): void;

  export function writeTextFile(
    space: enums.StorageSpace,
    filePath: string,
    content: string,
    callback: CallbackFunction<Result>
  ): void;
}

declare namespace overwolf.extensions.current {

  interface GetExtraObjectResult extends Result {
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

  function generateUserEmailHashes(email: string, callback: CallbackFunction<Result>): void;

  function setUserEmailHashes(hashes: UserEmailHashes, callback: CallbackFunction<Result>): void;

  interface UserEmailHashes {
    SHA1: string;
    SHA256: string;
    MD5: string
  }

  function getPhasedPercent(
    callback: CallbackFunction<GetPhasedPercentResult>,
    version?: string,
  ): void;

  