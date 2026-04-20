/**
 * Check whether a certain file exists and/or to write content into files.<br /><br />
 * For app-related I/O functionalities, use the `overwolf.extensions.io` API. <br /><br />In addition, the simple I/O plugin offers several more general I/O features that are not available through the APIs.
 * 
 * @packageDocumentation
 * /

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
  
      /**
     * A collection of constant enumerations used across the application
     * for data encoding and system events.
     */
    namespace enums {

      /**
       * Represents the primary character encoding formats supported.
       */
      export const enum eEncoding {
        /** 8-bit UCS Transformation Format. */
        UTF8 = "UTF8",
        /** UTF-8 with a Byte Order Mark. */
        UTF8BOM = "UTF8BOM",
        /** Standard Unicode encoding (usually UTF-16). */
        Unicode = "Unicode",
        /** Unicode with a Byte Order Mark. */
        UnicodeBOM = "UnicodeBOM",
        /** 7-bit American Standard Code for Information Interchange. */
        ASCII = "ASCII",
      }

      /**
       * Extended encoding options for file and stream operations.
       */
      export const enum encoding {
        /** The system default encoding. */
        Default = "Default",
        /** 8-bit UCS Transformation Format. */
        UTF8 = "UTF8",
        /** 32-bit UCS Transformation Format. */
        UTF32 = "UTF32",
        /** Standard Unicode encoding. */
        Unicode = "Unicode",
        /** 7-bit UCS Transformation Format (Legacy). */
        UTF7 = "UTF7",
        /** 7-bit ASCII encoding. */
        ASCII = "ASCII",
        /** Big-endian byte order Unicode encoding. */
        BigEndianUnicode = "BigEndianUnicode",
      }

      /**
       * Describes the type of file system or watcher event that occurred.
       */
      export const enum WatchEventType {
        /** The watcher has been successfully registered. */
        Registered = "Registered",
        /** The target resource has been modified. */
        Changed = "Changed",
        /** The target resource has been moved or renamed. */
        Renamed = "Renamed",
        /** The target resource has been removed. */
        Deleted = "Deleted"
      }
    }
  }

  /**
   * Well-known folder paths resolved at runtime for the current Windows environment.
   */
  namespace paths {
    /** The path to the `Program Files` directory (e.g. `C:\Program Files`). */
    const programFiles: string;
    /** The path to the 32-bit `Program Files` directory (e.g. `C:\Program Files (x86)`). */
    const programFilesX86: string;
    /** The path to the common program files directory. */
    const commonFiles: string;
    /** The path to the 32-bit common program files directory. */
    const commonFilesX86: string;
    /** The path to the common application data directory (e.g. `C:\ProgramData`). */
    const commonAppData: string;
    /** The path to the current user's Desktop folder. */
    const desktop: string;
    /** The path to the Windows installation directory (e.g. `C:\Windows`). */
    const windows: string;
    /** The path to the System32 directory. */
    const system: string;
    /** The path to the 32-bit SysWOW64 (or System32) directory. */
    const systemX86: string;
    /** The path to the current user's Documents folder. */
    const documents: string;
    /** The path to the current user's Videos folder. */
    const videos: string;
    /** The path to the current user's Pictures folder. */
    const pictures: string;
    /** The path to the current user's Music folder. */
    const music: string;
    /** The path to the shared (all-users) Documents folder. */
    const commonDocuments: string;
    /** The path to the current user's Favorites folder. */
    const favorites: string;
    /** The path to the Windows Fonts directory. */
    const fonts: string;
    /** The path to the current user's Start Menu folder. */
    const startMenu: string;
    /** The path to the current user's local application data directory (e.g. `%LOCALAPPDATA%`). */
    const localAppData: string;
    /** The path to the Overwolf installation directory. */
    const overwolfInstallation: string;
    /** The path to the versioned Overwolf installation directory (includes the current version number). */
    const overwolfInstallationWithVersion: string;
    /** The path to the OBS binary directory used by Overwolf. */
    const obsBin: string;
  }

  interface ReadFileOptions {
    /** The character encoding to use when reading the file. */
    encoding: enums.eEncoding;
    /** The maximum number of bytes to read from the file. Pass `0` to read the entire file. */
    maxBytesToRead: number;
    /** The byte offset within the file at which to begin reading. */
    offset: number;
  }

  interface ListenFileOptions {
    /** When `true`, starts reading from the end of the file, skipping any content already present. */
    skipToEnd: boolean;
    /** The character encoding to use when reading file lines. Defaults to UTF-8 if omitted. */
    encoding?: enums.eEncoding;
  }

  interface FileExistsResult extends Result {
    /** `true` if the file was found at the given path, `false` otherwise. */
    found?: boolean;
  }

  interface ExistsResult extends Result {
    /** `true` if the path exists on the filesystem, `false` otherwise. */
    exist?: boolean;
  }

  interface ReadFileContentsResult extends Result {
    /** `"success"` if the file was read successfully, otherwise an error status string. */
    status: string;
    /** The full text content of the file, if the read succeeded. */
    content?: string;
  }

  interface DirResult extends Result {
    /** The list of files and sub-directories found at the queried path. */
    data?: FileInDir[];
  }

  interface FileInDir {
    /** The name of the file or directory entry (not a full path). */
    name: string;
    /** Whether this entry is a directory (`"dir"`) or a file (`"file"`). */
    type: 'dir' | 'file';
  }

  interface ReadBinaryFileResult extends Result {
    /** The raw binary content of the file as an `ArrayBuffer`, or `null` if the read failed. */
    content: ArrayBuffer | null;
    /** The total number of bytes read from the file. */
    length: number;
  }

  interface ReadTextFileResult extends Result {
    /** The decoded text content of the file. */
    content?: string;
    /** Metadata about the read operation, including position and EOF status. */
    info?: FileInfo;
  }

  interface ListenOnFileResult extends Result {
    /** The most recently read line of text from the file being streamed. */
    content?: string;
  }

  interface WatchedFileChanged extends Result {
    /** The type of file system event that triggered this notification. */
    eventType?: enums.WatchEventType,
    /** The absolute path of the file or directory that was affected. */
    path?: string,
    /** The new absolute path of the file or directory, populated only when `eventType` is `Renamed`. */
    newPath?: string
  }

  interface FileInfo {
    /** `true` if the end of the file has been reached. */
    eof: boolean;
    /** The total number of bytes read so far. */
    totalRead: number;
    /** The current byte position within the file. */
    position: number;
    /** The total number of lines read so far. */
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

  