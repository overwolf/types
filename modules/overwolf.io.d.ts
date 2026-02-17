/**
     * Unregister a listener to an event.
     * @param callback The callback should be the same function that was passed
     * to addListener(). If an anonymous function was passed, it cannot be
     * removed.
     */
    removeListener(callback: (event: T) => void): void;
  }

  interface Dictionary<T> {
    [key: string]: T;
  }

  type CallbackFunction<T extends Result> = (result: T) => void;

  type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]>; };
}

declare namespace overwolf.io {
  namespace enums {
    const enum eEncoding {
      UTF8 = "UTF8",
      UTF8BOM = "UTF8BOM",
      Unicode = "Unicode",
      UnicodeBOM = "UnicodeBOM",
      ASCII = "ASCII",
    }

    const enum encoding {
      Default = "Default",
      UTF8 = "UTF8",
      UTF32 = "UTF32",
      Unicode = "Unicode",
      UTF7 = "UTF7",
      ASCII = "ASCII",
      BigEndianUnicode = "BigEndianUnicode",
    }

    const enum WatchEventType {
      Registered = "Registered",
      Changed = "Changged",
      Renamed = "Renamed",
      Deleted = "Deleted"
    }
  }

  namespace paths {
    const programFiles: string;
    const programFilesX86: string;
    const commonFiles: string;
    const commonFilesX86: string;
    const commonAppData: string;
    const desktop: string;
    const windows: string;
    const system: string;
    const systemX86: string;
    const documents: string;
    const videos: string;
    const pictures: string;
    const music: string;
    const commonDocuments: string;
    const favorites: string;
    const fonts: string;
    const startMenu: string;
    const localAppData: string;
    const overwolfInstallation: string;
    const overwolfInstallationWithVersion: string;
    const obsBin: string;
  }

  interface ReadFileOptions {
    encoding: enums.eEncoding;
    maxBytesToRead: number;
    offset: number;
  }

  interface ListenFileOptions {
    skipToEnd: boolean;
    encoding?: enums.eEncoding;
  }

  interface FileExistsResult extends Result {
    found?: boolean;
  }

  interface ExistsResult extends Result {
    exist?: boolean;
  }

  interface ReadFileContentsResult extends Result {
    status: string;
    content?: string;
  }

  interface DirResult extends Result {
    data?: FileInDir[];
  }

  interface FileInDir {
    name: string;
    type: 'dir' | 'file';
  }

  interface ReadBinaryFileResult extends Result {
    content: ArrayBuffer | null;
    length: number;
  }

  interface ReadTextFileResult extends Result {
    content?: string;
    info?: FileInfo;
  }

  interface ListenOnFileResult extends Result {
    content?: string;
  }

  interface WatchedFileChanged extends Result {
    eventType?: enums.WatchEventType,
    path?: string,
    newPath?: string
  }

  interface FileInfo {
    eof: boolean;
    totalRead: number;
    position: number;
    totalLines: number;
  }


  /**
   * Checks for the existence of the file in the given path.
   * @param filePath The path to check for.
   * @param callback Returns with the result.
   */
  function fileExists(
    filePath: string,
    callback: CallbackFunction<FileExistsResult>
  ): void;

  /**
   * Writes the content to the target file. If the file doesn't exist, it will
   * be created, along with any needed directories along the path. Otherwise,
   * the file's content will be overwritten.
   * @param filePath The full path of the file to write to.
   * @param content The content to write.
   * @param encoding The encoding to use, see more at
   * @param triggerUacIfRequired If additional permissions are required, allows
   * the triggering of the Windows UAC dialog.
   * @param callback Called with the status of the request.
   */
  function writeFileContents(
    filePath: string,
    content: string,
    encoding: enums.eEncoding,
    triggerUacIfRequired: boolean,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Read the content to the target file.
   * @param filePath The full path of the file to write to.
   * @param encoding The encoding to use, see more at
   * @param callback Called with the status of the request and the file content.
   */
  function readFileContents(
    filePath: string,
    encoding: enums.eEncoding,
    callback: CallbackFunction<ReadFileContentsResult>
  ): void;

  /**
   * Copy a file from the local extension directory to a destination on the
   * local machine.
   * @param src a relative (to the root of your extension's folder) file path or
   * a full overwolf-extension:// URI to the source file to be copied
   * @param dst The destination path (including filename) to copy to.
   * @param overrideFile true if you want an existing file to be overwritten,
   * false otherwise.
   * @param reserved for future use.
   * @param callback result callback.
   */
  function copyFile(
    src: string,
    dst: string,
    overrideFile: boolean,
    reserved: boolean,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Lists all files and folder in the target path.
   * @param path The target path
   * @param callback result callback.
   */
  function dir(path: string, callback: CallbackFunction<DirResult>): void;

  /**
   * Reads a file's contents and returns an array of byte values.
   * This function is extremely slow! Use it only for small files.
   * @param path The target path.
   * @param options Describes the different options to read a file.
   * @param callback result callback.
   */
  function readBinaryFile(
    path: string,
    options: ReadFileOptions,
    callback: CallbackFunction<ReadBinaryFileResult>
  ): void;

  /**
   * Reads a file's contents and returns it as text.
   * @param path The target path.
   * @param options Describes the different options to read a file.
   * @param callback result callback.
   */
  function readTextFile(
    path: string,
    options: ReadFileOptions,
    callback: CallbackFunction<ReadTextFileResult>
  ): void;

  /**
   * Is path exist.
   * @param path The target path.
   * @param callback result callback.
   */
  function exist(path: string, callback: CallbackFunction<ExistsResult>): void;

  /**
   * Start listening on file.
   * Stream a file (text files only), line-by-line, from the local filesystem.
   * @param id listen Id.
   * @param path The target path.
   * @param options Describes the different options to listen to a file.
   * @param callback result callback.
   */
  function listenOnFile(
    id: string,
    path: string,
    options: ListenFileOptions,
    callback: CallbackFunction<ListenOnFileResult>
  ): void;

  