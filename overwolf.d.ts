
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

  
/**
   * Decrypt provided ciphertext for current system user
   * @param ciphertext Text to decrypt
   * @param callback Will be called with decrypted plaintext
   */
  function decryptForCurrentUser(
    ciphertext: string,
    callback: CallbackFunction<DecryptedDataResult>
  ): void;
}

declare namespace overwolf.media {
  namespace enums {
    /**
     * Media type for the Media Event.
     */
    const enum eMediaType {
      Video = "Video",
      Image = "Image",
    }

    /** The source type for a video capture input. */
    const enum eSourceType {
      /** A webcam device. */
      Webcam = "Webcam"
    }

    /** The transform mode applied to a video source within the capture frame. */
    const enum eVideoSourceTransform {
      /** Stretch the video source to fill the capture frame. */
      Stretch = "Stretch"
    }
  }

  /** Parameters for rescaling an image or capture frame. */
  interface RescaleParams {
    /** The target width in pixels. */
    width: number;
    /** The target height in pixels. */
    height: number;
  }

  /** Parameters for cropping an image or capture frame. */
  interface CropParams {
    /** The horizontal offset of the crop region in pixels. */
    x: number;
    /** The vertical offset of the crop region in pixels. */
    y: number;
    /** The width of the crop region in pixels. */
    width: number;
    /** The height of the crop region in pixels. */
    height: number;
  }

  /** Parameters for taking an in-memory screenshot. */
  interface MemoryScreenshotParams {
    /** Whether to round dimensions away from zero when rescaling. */
    roundAwayFromZero?: boolean;
    /** Optional rescale dimensions to apply to the screenshot. */
    rescale?: RescaleParams;
    /** Optional crop region to apply to the screenshot. */
    crop?: CropParams;
  }

  /** Result of a screenshot or file operation, containing the file location. */
  interface FileResult extends Result {
    /** The URL pointing to the captured file. */
    url?: string;
    /** The local file system path of the captured file. */
    path?: string;
  }

  /** Result of a `getAppVideoCaptureFolderSize` call. */
  interface GetAppVideoCaptureFolderSizeResult extends Result {
    /** The total size of all video files in the app's video capture folder, in megabytes. */
    totalVideosSizeMB?: number;
  }

  /** Result of a `getAppScreenCaptureFolderSize` call. */
  interface GetAppScreenCaptureFolderSizeResult extends Result {
    /** The total size of all files in the app's screen capture folder, in megabytes. */
    screenCaptureSizeMB?: number;
  }

  /** Event data for a screenshot that has been saved to disk. */
  interface ScreenshotTakenEvent {
    /** The URL pointing to the saved screenshot file. */
    url: string;
  }

  /** Represents a connected webcam device. */
  interface Webcam {
    /** The human-readable name of the webcam device. */
    name: string;
    /** The device path of the webcam. */
    path: string;
    /** The unique identifier of the webcam device. */
    id: string;
  }

  /** Result of a `GetWebcams` call. */
  interface GetWebcamsResult extends Result {
    /** The list of connected webcam devices, if the request was successful. */
    webCams?: Webcam[];
  }

  /**
   * Takes a screenshot and calls the callback with the success status and the
   * screenshot URL. The screenshot is saved to the screenshots folder.
   * @param callback A function called after the screenshot was taken.
   */
  function takeScreenshot(callback: CallbackFunction<FileResult>): void;

  /**
   * Get all connected Webcams.
   * @param callback A callback function which will be called with the status of the request.
   */
  function GetWebcams(callback: CallbackFunction<GetWebcamsResult>): void;

  /**
   * Takes a screenshot and calls the callback with the success status and the
   * screenshot URL. The screenshot is saved to the screenshots folder.
   * @param targetFolder Target screen shot folder path.
   * @param callback A function called after the screenshot was taken.
   */
  function takeScreenshot(
    targetFolder: string,
    callback: CallbackFunction<FileResult>
  ): void;

  /**
   * Takes a window screenshot and calls the callback with the success status
   * and the screenshot URL. The screenshot is saved to the screenshots folder.
   * @param windowHandle The window Name
   * @param postMediaEvent set true to post media event (onMediaEvent)
   * @param targetFolder set target folder path to screen shot
   * @param callback A function called after the screenshot was taken.
   */
  function takeWindowsScreenshotByHandle(
    windowHandle: number,
    postMediaEvent: boolean,
    targetFolder: string,
    callback: CallbackFunction<FileResult>
  ): void;

  /**
   * Takes a window screenshot and calls the callback with the success status
   * and the screenshot URL. The screenshot is saved to the screenshots folder.
   * @param windowHandle The window Name
   * @param postMediaEvent set true to post media event (onMediaEvent)
   * @param callback A function called after the screenshot was taken.
   */
  function takeWindowsScreenshotByHandle(
    windowHandle: number,
    postMediaEvent: boolean,
    callback: CallbackFunction<FileResult>
  ): void;

  /**
   * Takes a window screenshot and calls the callback with the success status
   * and the screenshot URL. The screenshot is saved to the screenshots folder.
   * @param windowName The window Name
   * @param postMediaEvent set true to post media event (onMediaEvent)
   * @param targetFolder set target folder path to screen shot
   * @param callback A function called after the screenshot was taken.
   */
  function takeWindowsScreenshotByName(
    windowName: string,
    postMediaEvent: boolean,
    targetFolder: string,
    callback: CallbackFunction<FileResult>
  ): void;

  /**
   * Takes a window screenshot and calls the callback with the success status
   * and the screenshot URL. The screenshot is saved to the screenshots folder.
   * @param windowName The window Name
   * @param postMediaEvent set true to post media event (onMediaEvent)
   * @param callback A function called after the screenshot was taken.
   */
  function takeWindowsScreenshotByName(
    windowName: string,
    postMediaEvent: boolean,
    callback: CallbackFunction<FileResult>
  ): void;

  /**
   * Takes a memory screenshot and calls the callback with the success status
   * and the screenshot URL. The screenshot will only be placed in the memory
   * and will not be saved to a file (better performance). Can only be used
   * while in a game.
   * @param screenshotParams A JSON containing the parameters of the screenshot.
   * @param callback A function called after the screenshot was taken.
   */
  function getScreenshotUrl(
    screenshotParams: MemoryScreenshotParams,
    callback: CallbackFunction<FileResult>
  ): void;

  /**
   * Opens the social network sharing console to allow the user to share a
   * picture.
   * @param image A URL or image object to be shared.
   * @param description The description to be used when posting to social
   * networks.
   * @param callback A function called after the image was shared.
   */
  function shareImage(
    image: any,
    description: string,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Posts a media event for other apps to receive. The time info should be
   * received in UTC format.
   * @param mediaType The type of the event.
   * @param jsonInfo A json with additional info about the event.
   * @param callback A callback with the status if the call.
   */
  function postMediaEvent(
    mediaType: enums.eMediaType,
    jsonInfo: any,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Returns the total size of the video capture folder created by the app. This
   * includes all video/thumbnail and other files that are under the apps video
   * folder - which is located inside the configured Overwolf video capture
   * folder. NOTE: this function can take a long time to return if the folder
   * contains a large amount of files (on some computers) - therefore,try to
   * reduce the amount of times you call it.
   * @param callback A callback with the size in MB.
   */
  function getAppVideoCaptureFolderSize(
    callback: CallbackFunction<GetAppVideoCaptureFolderSizeResult>
  ): void;

  /**
   * Similar to `getAppVideoCaptureFolderSize` but looks at the apps screen
   * capture folder.
   * @param callback A callback with the size in MB.
   */
  function getAppScreenCaptureFolderSize(
    callback: CallbackFunction<GetAppScreenCaptureFolderSizeResult>
  ): void;

  /**
   * Fired when a media event has been posted.
   */
  const onMediaEvent: Event<any>;

/**
   * Fired when a screenshot was taken.
   */
  const onScreenshotTaken: Event<ScreenshotTakenEvent>;
}

declare namespace overwolf.media.videos {
  namespace enums {
    /** The position on screen where a watermark image is rendered. */
    const enum WatermarkLocation {
      /** Bottom-center of the video frame. */
      BottomCenter = "BottomCenter",
      /** Bottom-left corner of the video frame. */
      BottomLeft = "BottomLeft",
      /** Bottom-right corner of the video frame. */
      BottomRight = "BottomRight",
      /** Centered on the video frame. */
      Center = "Center",
      /** Middle of the left edge of the video frame. */
      MidLeft = "MidLeft",
      /** Middle of the right edge of the video frame. */
      MidRight = "MidRight",
      /** Top-center of the video frame. */
      TopCenter = "TopCenter",
      /** Top-left corner of the video frame. */
      TopLeft = "TopLeft",
      /** Top-right corner of the video frame. */
      TopRight = "TopRight",
    }
  }

  /** A time range within a video, used to specify segments for composition. */
  interface VideoCompositionSegment {
    /** The start time of the segment in milliseconds. */
    startTime: number;
    /** The end time of the segment in milliseconds. */
    endTime: number;
  }

  /**
   * A helper structure to describe watermark parameters.
   * @param startTime Segment start time (in milliseconds)
   * @param endTime Segment end time (in milliseconds)
   * @param location The location of the watermark
   * @param scaleHeight The height of the watermark image (in pixel)
   *
   */
  interface WatermarkParams {
    startTime?: number;
    endTime?: number;
    location?: enums.WatermarkLocation;
    scaleHeight?: number;
  }

  /** Result of `getVideos`, containing a list of video URLs created by this app. */
  interface GetVideosResult extends Result {
    /** An array of `overwolf://media` URLs for each video. */
    videos?: string[];
  }

  /** Result of `getVideosSize`, reporting the total disk usage of this app's videos. */
  interface GetVideosSizeResult extends Result {
    /** The total size of all videos in gigabytes. */
    totalSizeGbs?: number;
  }

  /**
   * Creates a compilation video out of a source video and a list of segments.
   * @param sourceVideoUrl The url of the source video in an overwolf://media
   * form.
   * @param segments A JSON containing a list of segments, each segment has a
   * start time and an end time in milliseconds. The segments must be sorted in
   * ascending order. Example:
   * {
   *   "segments": [
   *     { "startTime": 2000, "endTime": 4000 },
   *     { "startTime": 8000, "endTime": 10000 },
   *     { "startTime": 14000, "endTime": 18000 }
   *   ]
   * }
   * @param callback A callback function which will be called with the status of
   * the request and the url to the target video.
   */
  function createVideoComposition(
    sourceVideoUrl: string,
    segments: { segments: VideoCompositionSegment[]; },
    callback: CallbackFunction<FileResult>
  ): void;

  /**
   * Creates a compilation video out of a source video and a list of segments.
   * @param files list of files to composite to output video file
   * (overwolf://media form. or file:///)
   * @param outputFile the file output name
   * @param callback A callback function which will be called with the status of
   * the request and the url to the target video.
   */
  function createVideoCompositionFiles(
    files: string[],
    outputFile: string,
    callback: CallbackFunction<FileResult>
  ): void;

  /**
   * Gets a list of all of the videos created by this app.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function getVideos(callback: CallbackFunction<GetVideosResult>): void;

  /**
   * Returns the total size of the video files created by this app in gigabytes.
   * @param callback A callback with the videos size.
   */
  function getVideosSize(callback: CallbackFunction<GetVideosSizeResult>): void;

  /**
   * Deletes all videos created by this app with an option to keep the newest X
   * GBs (use with care).
   * @param keepNewestXGbs Keep the newest X GBs of videos. Pass 0 to delete all
   * videos.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function deleteOldVideos(
    keepNewestXGbs: number,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Deletes a specific video created by this app.
   * @param videoUrl The Overwolf URL of the video to delete.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function deleteVideo(
    videoUrl: string,
    callback: CallbackFunction<Result>
  ): void;

/**
   * Adds a video/image watermark to a video.
   * @param sourceVideoUrl The url of the source video in an overwolf://media form.
   * @param watermarkUrl The url of the watermark video/image in an overwolf://media form.
   * @param watermarkParams Use this object to mark the watermark
   * @param callback A callback function which will be called with the status of
   * the request and the url to the output video.
   */
  function addWatermark(
    sourceVideoUrl: string,
    watermarkUrl: string,
    watermarkParams: WatermarkParams,
    callback: CallbackFunction<FileResult>
  ): void;

}

declare namespace overwolf.media.replays {
  namespace enums {
    /** The type of replay media to capture. */
    const enum ReplayType {
      /** Video replay. */
      Video = "Video"
    }
  }

  /** Parameters for a webcam video source. */
  interface WebCamParam {
    /** The device identifier of the webcam. */
    device_id: string;
  }

  /**
   * Defines the video source settings.
   */
  interface VideoSource {
    /** The type of video source. */
    source_type: overwolf.media.enums.eSourceType;
    /** Display name of the source. */
    name: string;
    secondary_file: boolean; // Source will be saved to a secondary video file (i.e another ow-obs.exe process will be created with the same settings as the original one.
    /** Transform applied to the video source. */
    transform: overwolf.media.enums.eVideoSourceTransform;
    /** Source-specific parameters (e.g. webcam device info). */
    parameters: overwolf.media.replays.WebCamParam;
    /** Position of the source in the output frame. */
    position: { x: number, y: number }
    /** Scale factor applied to the source size. */
    size_scale: { x: number, y: number }
  }

  /**
   * Replays settings container.
   */
  interface ReplaySettings extends streaming.StreamSettings {
    /**
     * Auto highlights configuration.
     */
    highlights?: ReplayHighlightsSetting;
  }

  /**
   * Auto highlights settings.
   */
  interface ReplayHighlightsSetting {
    /**
     * Enable auto Highlights recording.
     */
    enable: boolean;
    /**
     * Array of requested highlights.
     * use ["*"] to register all features.
     */
    requiredHighlights: string[];
  }

  /** Result returned when turning off replay capture. */
  interface TurnOffResult extends Result {
    /** Human-readable description of the result. */
    description?: string;
    /** Additional metadata about the operation. */
    metadata?: string;
    /** OS version string. */
    osVersion?: string;
    /** OS build string. */
    osBuild?: string;
  }

  /** Result returned when turning on replay capture. */
  interface TurnOnResult extends Result {
    /** Human-readable description of the result. */
    description?: string;
    /** Additional metadata about the operation. */
    metadata?: string;
    /** Path to the folder where media files will be saved. */
    mediaFolder?: string;
    /** OS version string. */
    osVersion?: string;
    /** OS build string. */
    osBuild?: string;
  }

  /** Result returned when querying supported highlight features for a game. */
  interface GetHighlightsFeaturesResult extends Result {
    /** Array of supported highlight feature identifiers for the game. */
    features?: string[];
  }

  /** Result returned when querying the current replay capture state. */
  interface GetStateResult extends Result {
    /** Whether replay capture is currently active. */
    isOn?: boolean;
  }

  /** Result returned when a replay clip has been saved. */
  interface ReplayResult extends Result {
    /** Overwolf media URL to the saved replay video. */
    url?: string;
    /** File system path to the saved replay video. */
    path?: string;
    /** URL-encoded file system path to the saved replay video. */
    encodedPath?: string;
    /** Duration of the replay clip in milliseconds. */
    duration?: number;
    /** Overwolf media URL to the replay thumbnail image. */
    thumbnail_url?: string;
    /** File system path to the replay thumbnail image. */
    thumbnail_path?: string;
    /** URL-encoded file system path to the replay thumbnail image. */
    thumbnail_encoded_path?: string;
    /** Unix timestamp (ms) of when the clip starts within the recording session. */
    start_time?: number;
  }

  /** Result returned when starting a replay capture session. */
  interface StartReplayResult extends streaming.StartCaptureResult {
    status: string // backwards compatibility
    /** Human-readable description of the result. */
    description: string;
    /** Additional metadata about the capture session. */
    metadata: string;
    /** Path to the folder where media files are being saved. */
    mediaFolder: string;
    /** OS version string. */
    osVersion: string;
    /** OS build string. */
    osBuild: string;
    /** Whether the capture is sourced from the game window directly. */
    isGameWindowCapture: boolean;
  }

  /** Event data for a capture error. */
  interface CaptureErrorEvent {
    /** Status string of the capture at the time of error. */
    status: string;
    /** Identifier of the stream that encountered the error. */
    stream_id: number;
    /** Error description string. */
    error: string;
  }

  /** Event data fired when replay capture stops. */
  interface CaptureStoppedEvent {
    /** Status string at the time capture stopped. */
    status: string;
    /** Reason the capture was stopped. */
    reason: string;
    /** Additional metadata about the stopped capture. */
    metaData: string;
    /** OS version string. */
    osVersion: string;
    /** OS build string. */
    osBuild: string;
  }

  /** Event data for a capture warning. */
  interface CaptureWarningEvent {
    /** Warning identifier or code. */
    warning: string;
    /** Reason for the warning. */
    reason: string;
  }

  /** Event data fired when the replay service is started by any app. */
  interface ReplayServicesStartedEvent {
    /** Array of extension IDs that have started the replay service. */
    extensions: string[];
    /** Whether the replay service is capturing via game window capture. */
    is_game_window_capture?: boolean;
  }

  /** Event data fired when an auto-highlight clip is captured. */
  interface HighlightsCapturedEvent {
    /** The game ID for which the highlight was captured. */
    game_id: number;
    /** Identifier of the match. */
    match_id: string;
    /** Internal identifier of the match. */
    match_internal_id: string;
    /** Identifier of the current session. */
    session_id: string;
    /** Unix timestamp (ms) when the session started. */
    session_start_time: number;
    /** Unix timestamp (ms) when the match started. */
    match_start_time: number;
    /** Unix timestamp (ms) when the highlight clip starts. */
    start_time: number;
    /** Duration of the highlight clip in milliseconds. */
    duration: number;
    /** Array of event type strings that triggered this highlight. */
    events: string[];
    /** Array of raw event objects with type and timing. */
    raw_events: raw_events[];
    /** Overwolf media URL to the highlight video. */
    media_url: string;
    /** File system path to the highlight video. */
    media_path: string;
    /** URL-encoded file system path to the highlight video. */
    media_path_encoded: string;
    /** Overwolf media URL to the highlight thumbnail. */
    thumbnail_url: string;
    /** File system path to the highlight thumbnail. */
    thumbnail_path: string;
    /** URL-encoded file system path to the highlight thumbnail. */
    thumbnail_encoded_path: string;
    /** Unix timestamp (ms) of the start of the replay video containing this highlight. */
    replay_video_start_time: number;
  }

  /** A raw game event with its type and timestamp. */
  interface raw_events {
    /** Event type identifier. */
    type: string;
    /** Timestamp of the event in milliseconds relative to the session start. */
    time: number;
  }

  /**
   * Turns off background replay capturing. Call this as soon as you no longer
   * interesting in capturing, in order to free up resources.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function turnOff(callback: CallbackFunction<TurnOffResult>): void;

  /**
   * Turns on background replay capturing. Without calling it first, you will
   * not be able to create video replays. Notice that turning on replay
   * capturing will consume system resources so use it wisely.buffer_length
   * defines the amount of time in milliseconds to have captured in the memory
   * at all times.
   * @param settings The video capture settings.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function turnOn(
    settings: ReplaySettings,
    callback: CallbackFunction<TurnOnResult>
  ): void;

  /**
   * Returns whether replay capturing is turned on or off.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function getState(callback: CallbackFunction<GetStateResult>): void;

  /**
   * Returns whether replay capturing is turned on or off.
   * @deprecated Since version 0.155.
   * @param replayType The type of replay to get state for.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function getState(
    replayType: replays.enums.ReplayType,
    callback: CallbackFunction<GetStateResult>
  ): void;

  /**
   * Starts capturing a replay to a file. A replay id will be returned in the
   * callback which is needed to finish capturing the replay. You can only call
   * this method if replay mode is on and no other replay is currently being
   * captured to a file.
   * @param pastDuration The replay length, in milliseconds to include prior to
   * the time of this call.
   * @param futureDuration The replay lengh, in milliseconds to include after
   * the time of this call. To ignore it, simply give it a non-positive value
   * @param captureFinishedCallback A callback function which will be called
   * when capturing is finished, at the end of the future duration supplied to
   * this call.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function capture(
    pastDuration: number,
    futureDuration: number,
    captureFinishedCallback: CallbackFunction<ReplayResult>,
    callback: CallbackFunction<StartReplayResult>
  ): void;

  /**
   * Starts capturing a replay to a file. A replay id will be returned in the
   * callback which is needed to finish capturing the replay. You can only call
   * this method if replay mode is on and no other replay is currently being
   * captured to a file.
   * @deprecated Since version 0.155.
   * @param replayType The type of replay to capture.
   * @param pastDuration The replay length, in milliseconds to include prior to
   * the time of this call.
   * @param futureDuration The replay length, in milliseconds to include after
   * the time of this call. To ignore it, simply give it a non-positive value
   * @param captureFinishedCallback A callback function which will be called
   * when capturing is finished, at the end of the future duration supplied to
   * this call.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function capture(
    replayType: replays.enums.ReplayType,
    pastDuration: number,
    futureDuration: number,
    captureFinishedCallback: CallbackFunction<ReplayResult>,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Starts capturing a replay to a file. A replay id will be returned in the
   * callback which is needed to finish capturing the replay. You can only call
   * this method if replay mode is on and no other replay is currently being
   * captured to a file.
   * @param pastDuration The video length, in milliseconds to include prior to
   * the time of this call.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function startCapture(
    pastDuration: number,
    callback: CallbackFunction<FileResult>
  ): void;

  /**
   * Starts capturing a replay to a file. A replay id will be returned in the
   * callback which is needed to finish capturing the replay. You can only call
   * this method if replay mode is on and no other replay is currently being
   * captured to a file.
   * @deprecated Since version 0.155.
   * @param replayType The type of replay to capture.
   * @param pastDuration The video length, in milliseconds to include prior to
   * the time of this call.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function startCapture(
    replayType: replays.enums.ReplayType,
    pastDuration: number,
    callback: CallbackFunction<FileResult>
  ): void;

  /**
   * Finishes capturing a replay and returns a url to the created video file.
   * You can only call this method if replay mode is on and using a valid id of
   * a replay being captured to a file.
   * @param replayId The id of the replay you want to finish capturing.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function stopCapture(
    replayId: string,
    callback: CallbackFunction<ReplayResult>
  ): void;

  /**
   * Finishes capturing a replay and returns a url to the created video file.
   * You can only call this method if replay mode is on and using a valid id of
   * a replay being captured to a file.
   * @deprecated Since version 0.155.
   * @param replayType The type of replay to stop capture.
   * @param replayId The id of the replay you want to finish capturing.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function stopCapture(
    replayType: replays.enums.ReplayType,
    replayId: string,
    callback: CallbackFunction<FileResult>
  ): void;

  /**
   * change target sub folder of current running replay provider
   * @param replayType The type of replay to stop capture.
   * @param subFolderName the new sub folder name
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function setReplaysSubFolder(
    replayType: replays.enums.ReplayType,
    subFolderName: string,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Get supported auto highlights features for a game
   * @param gameId The id of the game you want to capture it highlights.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function getHighlightsFeatures(
    gameId: number,
    callback: CallbackFunction<GetHighlightsFeaturesResult>
  ): void;

  /**
   * Fired when an error has occurred with the capturing.
   */
  const onCaptureError: Event<CaptureErrorEvent>;

  /**
   * Fired when replay service is stopped.
   */
  const onCaptureStopped: Event<CaptureStoppedEvent>;

  /**
   * Fired on capture service warning.
   */
  const onCaptureWarning: Event<CaptureWarningEvent>;

  /**
   * Fired when the replay service is on (any other app);
   */
  const onReplayServicesStarted: Event<ReplayServicesStartedEvent>;

/**
   * Fired when a new Replay highlight recorded (when highlightsSetting is enabled).
   */
  const onHighlightsCaptured: Event<HighlightsCapturedEvent>;
}

declare namespace overwolf.notifications {
  namespace enums {
    /** Controls how the app logo is cropped inside the toast notification. */
    const enum AppLogoCrop {
      /** Use the platform default cropping. */
      Default = "Default",
      /** Display the logo without any cropping. */
      None = "None",
      /** Crop the logo into a circle. */
      Circle = "Circle",
    }

    /** The type of interaction event fired from a toast notification. */
    const enum ToatsEventType {
      /** The user dismissed the toast. */
      Dismiss = "dismiss",
      /** The user clicked one of the toast's action buttons. */
      ButtonClick = "buttonClick",
      /** An error occurred while displaying the toast. */
      Error = "error",
    }

    /** Error codes reported when a toast notification fails. */
    const enum ToastEventError {
      /** An unspecified error occurred. */
      Unknown = "unknown",
      /** The user or system has disabled notifications. */
      NotificationsDisabled = "notificationsDisabled ",
      /** A general error occurred. */
      Error = "error"
    }
  }

  /** Parameters used to construct and display a toast notification. */
  interface ToastNotificationParams {
    /** Optional header text displayed at the top of the toast. */
    header?: string;
    /**
     * Mandatory. Must include 1-3 texts (lines).
     */
    texts: string[];
    /**
     * By default, your toast will display your app's logo. However, you can override this logo with your own image.
     */
    logoOverride?: LogoOverride;
    /**
     * Toasts can display a hero image, which is displayed prominently within the toast banner and while inside Action Center. Image dimensions must be 364x180 pixels.
     */
    heroImage?: string;
    /**
     * You can provide a full-width inline-image that appears when you expand the toast.
     */
    inlineImage?: string;
    /**
     * If you need to reference the source of your content, you can use attribution text. This text is always displayed at the bottom of your notification, along with your app's identity or the notification's timestamp.
     */
    attribution?: string;
    /**
     * Buttons make your toast interactive, letting the user take quick actions on your toast notification without interrupting their current workflow. Buttons appear in the expanded portion of your notification.
     */
    buttons?: ToastNotificationButton[];
  }

  /** An image used to override the default app logo in a toast notification. */
  interface LogoOverride {
    /** URL of the replacement logo image. */
    url: string;
    /** How the logo image should be cropped. */
    cropType: enums.AppLogoCrop;
  }

  /** A clickable action button displayed inside a toast notification. */
  interface ToastNotificationButton {
    /** Unique identifier for this button, returned in the interaction event. */
    id: string;
    /** Label text displayed on the button. */
    text: string;
  }

  /** Result of a `showToastNotification` call. */
  interface ShowToastNotificationResult extends Result {
    /** The unique identifier assigned to the displayed toast notification. */
    id: string;
  }

  /** Event data fired when a user interacts with a toast notification. */
  interface ToastNotificationEvent {
    /** The identifier of the toast notification that was interacted with. */
    id: string;
    /** The type of interaction that occurred. */
    eventType: enums.ToatsEventType;
    /** The ID of the button clicked, if the event type is `buttonClick`. */
    buttonID: string;
    /** Human-readable error message, if the event type is `error`. */
    error: string;
    /** Error code, if the event type is `error`. */
    errorCode: enums.ToastEventError;
  }

  /**
   * Fired when a user tapped on the body of a toast notification or performed an action inside a toast notification.
   */
  const onToastInteraction: Event<ToastNotificationEvent>;

/**
  * Show Windows toast notification.
  * @param args  Toast notification params
  * @param callback A function called with the current user, or an error.
  */
  function showToastNotification(
    args: ToastNotificationParams,
    callback: CallbackFunction<ShowToastNotificationResult>
  ): void;

}

declare namespace overwolf.profile {
  /** Represents the current connection state of the Overwolf client to its services. */
  const enum ConnectionState {
    /** The connection state is not known. */
    Unknown = "Unknown",
    /** The client is not connected. */
    Offline = "Offline",
    /** The client is in the process of connecting. */
    Connecting = "Connecting",
    /** The client is connected. */
    Online = "Online",
    /** The client is in the process of disconnecting. */
    Disconnecting = "Disconnecting",
  }

  /** Result of a `getCurrentUser` or `refreshUserProfile` call. */
  interface GetCurrentUserResult extends Result {
    /** URL of the user's avatar image. */
    avatar?: string;
    /** The channel the user is associated with. */
    channel?: string;
    /** Unique identifier for the user's machine. */
    machineId?: string;
    /** The partner ID associated with the user's account. */
    partnerId?: number;
    /** The user's Overwolf user ID. */
    userId?: string;
    /** The user's Overwolf username. */
    username?: string;
    /** Additional parameters associated with the user's account. */
    parameters?: Dictionary<string>;
    /** Parameters passed at install time, if any. */
    installParams?: any;
    /** The extension that triggered this install, if any. */
    installerExtension?: any;
    /** The user's display name. */
    displayName?: string;
    /** A universally unique identifier for this user session. */
    uuid?: string;
  }

  /** Event data fired when the user's login state changes. */
  interface LoginStateChangedEvent {
    /** The new login status string. */
    status: string;
    /** The new connection state of the Overwolf client. */
    connectionState: ConnectionState;
    /** The username of the user whose state changed. */
    username: string;
  }

  /** Result of a `generateUserSessionToken` call. */
  interface GenerateUserSessionTokenResult extends Result {
    /** The generated session token string. */
    token: string;
  }

  /**
   * Calls the given callback with the currently logged-in Overwolf user.
   * @param callback A function called with the current user, or an error.
   */
  function getCurrentUser(
    callback: CallbackFunction<GetCurrentUserResult>
  ): void;

  /**
   * Opens the login dialog.
   */
  function openLoginDialog(): void;

  /**
   * Fetches user profile from server, then invokes the callback with the currently logged-in Overwolf user.
   * @param callback A function called with the current user, or an error.
   */
  function refreshUserProfile(
    callback: CallbackFunction<GetCurrentUserResult>
  ): void;

  /** Generates a short-lived session token for the currently logged-in user.
   * @param callback A function called with the generated token, or an error.
   */
  function generateUserSessionToken(
    callback: CallbackFunction<GenerateUserSessionTokenResult>
  ): void;

  /** Performs an Overwolf session login using a previously obtained token.
   * @param token The session token to authenticate with.
   * @param callback A function called with the result of the login attempt.
   */
  function performOverwolfSessionLogin(
    token: string,
    callback: CallbackFunction<Result>
  ): void

/**
   * Fired when a user logged in or logged out.
   */
  const onLoginStateChanged: Event<LoginStateChangedEvent>;
}

declare namespace overwolf.profile.subscriptions.inapp {
  /** The color theme to apply to the in-app subscription modal. */
  const enum Theme {
    /** Light color theme. */
    Light = "Light",
    /** Dark color theme. */
    Dark = "Dark",
  }
  /**
   * Shows the in-app subscription page as a modal window on top of the current window.
   * @param planId  The plan Id to display.
   * @param theme Optional. "Dark" or "Light. If not defined, the default is light.
   * @param callback A callback function which will be called with the status of the request.
   */
  function show(
    planId: number,
    theme: string,
  ): void;

  /**
   * Hide the current active in-app subscription modal window.
   * @param callback A callback function which will be called with the status of the request.
   */
  function hide(
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Fired when a subscription in-app modal window is opened.
   */
  const onInAppSubModalOpened: Event<any>;

/**
  * Fired when a subscription in-app modal window is closed.
  */
  const onInAppSubModalClosed: Event<any>;

}

declare namespace overwolf.profile.subscriptions {
  namespace enums {
    /** The current state of a subscription. */
    const enum SubscriptionState {
      /** The subscription is active and in good standing. */
      Active = "active",
      /** The subscription has been cancelled but may still be within its paid period. */
      Cancelled = "cancelled",
      /** The subscription has been revoked and is no longer valid. */
      Revoked = "revoked",
    }
  }

  /** Descriptive information about a subscription plan. */
  interface Info {
    /** The display title of the plan. */
    title: string;
    /** A brief description of what the plan includes. */
    description: string;
    /** The billing period length in months. */
    periodMonths: number;
    /** The price of the plan. */
    price: number;
  }

  /** Represents a single user subscription record. */
  interface Subscription {
    /** The unique subscription record ID. */
    id: number;
    /** The plan ID associated with this subscription. */
    pid: number;
    /** The user ID of the subscriber. */
    uid: string;
    /** The extension ID this subscription belongs to. */
    extid: string;
    /** The machine user ID. */
    muid: string;
    /** The Unix timestamp (in seconds) when this subscription expires. */
    exp: number;
    /** Grace period count for this subscription. */
    grc: number;
    /** The current state of the subscription. */
    state: overwolf.profile.subscriptions.enums.SubscriptionState;
    /** Detailed information about the subscribed plan. */
    planInfo: Info;
    /** Whether the subscription has already expired. */
    expired: boolean;
  }

  /** Result of a `getActivePlans` call. */
  interface GetActivePlansResult extends Result {
    /** Array of active plan IDs for the calling extension. */
    plans?: number[];
  }

  /** Result of a `getDetailedActivePlans` call. */
  interface GetDetailedActivePlansResult extends Result {
    /** Array of detailed active plan objects for the calling extension. */
    plans?: Plan[];
  }

  /** Detailed information about a single active subscription plan. */
  interface Plan {
    /** The unique plan ID. */
    planId: number;
    /** The current state of this plan. */
    state: overwolf.profile.subscriptions.enums.SubscriptionState;
    /** The Unix timestamp (in seconds) when this plan expires. */
    expiryDate: number;
    /** The display title of the plan. */
    title: string;
    /** A brief description of the plan. */
    description: string;
    /** The price of the plan. */
    price: number;
    /** The billing period length in months. */
    periodMonths: number;
  }

  /** Event data fired when the user's active subscriptions change. */
  interface SubscriptionChangedEvent {
    /** The updated list of active plan IDs, if available. */
    plans?: number[];
  }

  /**
   * Returns active subscriptions for the calling extension via callback.
   * @param callback Returns an array of plan IDs, or an error.
   */
  function getActivePlans(
    callback: CallbackFunction<GetActivePlansResult>
  ): void;

  /**
   * Returns more details about all the active subscriptions for the calling extension via callback.
   * @param callback Returns an array of active plans, or an error.
   */
  function getDetailedActivePlans(
    callback: CallbackFunction<GetDetailedActivePlansResult>
  ): void;

  /**
   * Fired when the subscription state for the calling extension changes
   * (e.g. a plan is activated, cancelled, or revoked).
   */
  const onSubscriptionChanged: Event<SubscriptionChangedEvent>;

}

declare namespace overwolf.windows {
  namespace enums {
    /** Visual and input-handling styles that can be applied to a window. */
    const enum WindowStyle {
      /** Mouse and keyboard input passes through the window to the game below. */
      InputPassThrough = "InputPassThrough",
      /** The window is rendered below all other Overwolf windows. */
      BottomMost = "BottomMost"
    }

    /** The edge or corner from which a window drag-resize operation originates. */
    const enum WindowDragEdge {
      /** No edge — drag-resize is disabled. */
      None = "None",
      /** Resize from the left edge. */
      Left = "Left",
      /** Resize from the right edge. */
      Right = "Right",
      /** Resize from the top edge. */
      Top = "Top",
      /** Resize from the bottom edge. */
      Bottom = "Bottom",
      /** Resize from the top-left corner. */
      TopLeft = "TopLeft",
      /** Resize from the top-right corner. */
      TopRight = "TopRight",
      /** Resize from the bottom-left corner. */
      BottomLeft = "BottomLeft",
      /** Resize from the bottom-right corner. */
      BottomRight = "BottomRight",
    }

    /** The icon displayed in a message prompt dialog. */
    const enum MessagePromptIcon {
      /** No icon is shown. */
      None = "None",
      /** A question mark icon is shown. */
      QuestionMark = "QuestionMark",
      /** An exclamation mark icon is shown. */
      ExclamationMark = "ExclamationMark",
    }

    /** Controls the taskbar flash behavior for a window. */
    const enum FlashBehavior {
      /** Flash behavior is determined automatically by the system. */
      automatic = "automatic",
      /** The window flashes continuously. */
      on = "on",
      /** The window does not flash. */
      off = "off",
    }

    /** The possible display states of an Overwolf window. */
    const enum WindowStateEx {
      /** The window is closed and no longer exists. */
      closed = "closed",
      /** The window exists but is not visible. */
      hidden = "hidden",
      /** The window occupies the full screen. */
      maximized = "maximized",
      /** The window is minimized to the taskbar. */
      minimized = "minimized",
      /** The window is visible at its normal size. */
      normal = "normal"
    }

    /** The rendering context type of a window. */
    const enum WindowType {
      /** A standard desktop-rendered window. */
      Desktop = "Desktop",
      /** A hidden background/controller window with no visible surface. */
      Background = "Background",
      /** An off-screen rendered window. */
      OffScreen = " OffScreen"
    }
  }

  /** Describes a currently known Overwolf window and its current state. */
  interface WindowInfo {
    /** The name of the window as declared in the app manifest. */
    name: string;
    /** The unique runtime ID of the window. */
    id: string;
    /** The window state as a plain string (legacy). */
    state: string;
    /** The window state as a typed enum value. */
    stateEx: enums.WindowStateEx;
    /** Whether the window is currently visible to the user. */
    isVisible: boolean;
    /** The window's left edge position in pixels from the left of the monitor. */
    left: number;
    /** The window's top edge position in pixels from the top of the monitor. */
    top: number;
    /** The window's width in pixels. */
    width: number;
    /** The window's height in pixels. */
    height: number;
    /** The ID of the monitor the window is on. */
    monitorId: string;
  }

  /** Optional properties used when obtaining a declared window. */
  interface WindowProperties {
    /** Whether to create the window as a native (CEF) window. */
    nativeWindow: boolean;
    /** Whether to enable the popup blocker for this window. */
    enablePopupBlocker: boolean;
  }

  /** Instructs `obtainDeclaredWindow` to apply the manifest's default size and location. */
  interface DefaultSizeAndLocation {
    /** Set to `true` to use the manifest-defined size and position instead of any saved state. */
    useDefaultSizeAndLocation: boolean;
  }

  /** A rectangle defined by its top-left origin, width, and height, all in pixels. */
  interface ODKRect {
    /** Distance from the top of the screen in pixels. */
    top: number;
    /** Distance from the left of the screen in pixels. */
    left: number;
    /** Width of the rectangle in pixels. */
    width: number;
    /** Height of the rectangle in pixels. */
    height: number;
  }

  /** Describes a relative position for a window with respect to another process window. */
  interface SetWindowPositionProperties {
    /** The target process window to position relative to. */
    relativeTo: { processName: string; windowTitle: string; };
    /** If `true`, insert the Overwolf window above the target; otherwise insert below. */
    insertAbove: boolean;
  }

  /** Parameters for the `displayMessageBox` prompt dialog. */
  interface MessageBoxParams {
    /** The title text of the message box. */
    message_title: string;
    /** The body text of the message box. */
    message_body: string;
    /** The label on the confirm/OK button. */
    confirm_button_text: string;
    /** The label on the cancel button. */
    cancel_button_text: string;
    /** The icon to display in the message box. */
    message_box_icon: windows.enums.MessagePromptIcon;
  }

  /** Result of window operations that return a `WindowInfo` object. */
  interface WindowResult extends Result {
    /** The window that was created or retrieved. */
    window: WindowInfo;
  }

  /** Result of a drag-resize operation, containing the new dimensions. */
  interface DragResizeResult extends Result {
    /** The ID of the window that was resized. */
    id?: string;
    /** The new width of the window in pixels. */
    width?: number;
    /** The new height of the window in pixels. */
    height?: number;
  }

  /** Result of window operations that return only the window's ID. */
  interface WindowIdResult extends Result {
    /** The ID of the affected window. */
    window_id?: string;
  }

  /** Result of a `dragMove` operation, reporting how far the window moved. */
  interface DragMovedResult extends Result {
    /** The number of pixels the window moved horizontally. */
    HorizontalChange: number;
    /** The number of pixels the window moved vertically. */
    VerticalChange: number;
  }

  /** Result of `getWindowState`, describing the current state of a single window. */
  interface GetWindowStateResult extends Result {
    /** The ID of the queried window. */
    window_id?: string;
    /** The window state as a plain string (legacy). */
    window_state?: string;
    /** The window state as a typed enum value. */
    window_state_ex?: enums.WindowStateEx;
  }

  /** Result of `getWindowsStates`, describing the state of all app windows. */
  interface GetWindowsStatesResult extends Result {
    /** A map of window name to state string (legacy). */
    result: Dictionary<string>;
    /** A map of window name to typed `WindowStateEx` enum value. */
    resultV2: Dictionary<enums.WindowStateEx>;
  }

  /** Result of `isMuted`, indicating whether the window's audio is muted. */
  interface IsMutedResult extends Result {
    /** `true` if the window is currently muted. */
    muted: boolean;
  }

  /** Result of `isWindowVisibleToUser`, indicating how much of the window is visible. */
  interface IsWindowVisibleToUserResult extends Result {
    /** `"hidden"` if fully obscured, `"partial"` if partially visible, `"full"` if fully visible. */
    visible: "hidden" | "full" | "partial";
  }

  /** Result of `isAccelreatedOSR`, reporting GPU acceleration status for an OSR window. */
  interface IsAccelreatedOSRResult extends WindowIdResult {
    /** Whether the window is using GPU acceleration. */
    accelerated?: boolean;
    /** Whether GPU acceleration is supported on this machine. */
    supported?: boolean;
    /** Whether rendering is optimized (only valid in-game for accelerated windows). */
    optimized?: boolean;
  }

  /** Parameters for the `changeSize` overload that supports DPI-aware resizing. */
  interface ChangeWindowSizeParams {
    /** The ID of the window to resize. */
    window_id: string;
    /** The new width in pixels. */
    width: number;
    /** The new height in pixels. */
    height: number;
    /** If `true`, the size values are automatically scaled for the current DPI. */
    auto_dpi_resize?: boolean;
  }

  /** Event data fired when a window's state changes. */
  interface WindowStateChangedEvent {
    /** The ID of the window whose state changed. */
    window_id: string;
    /** The new state as a plain string (legacy). */
    window_state: string;
    /** The previous state as a plain string (legacy). */
    window_previous_state: string;
    /** The new state as a typed enum value. */
    window_state_ex: enums.WindowStateEx;
    /** The previous state as a typed enum value. */
    window_previous_state_ex: enums.WindowStateEx;
    /** The ID of the app that owns the window. */
    app_id: string;
    /** The name of the window as declared in the manifest. */
    window_name: string;
  }

  /** Event data fired when a window receives a message via `sendMessage`. */
  interface MessageReceivedEvent {
    /** The ID of the window that received the message. */
    id: string;
    /** The content of the received message. */
    content: any;
  }

  /** Event data fired when an isolated iframe process crashes. */
  interface IsolatedIframeProcessCrashedEvent {
    /** The ID of the window whose iframe process crashed. */
    id: string;
    /** A description of the crash error. */
    error: string;
  }

  /** Event data fired when the user attempts to close a window with Alt+F4 and is blocked. */
  interface AltF4BlockedEvent {
    /** The ID of the window on which Alt+F4 was blocked. */
    id: string;
  }

  /** Event data fired when a window's screen or monitor properties change. */
  interface onScreenPropertyChangedEvent {
    /** The ID of the affected window. */
    id: string;
    /** The name of the affected window. */
    name: string;
    /** The updated display/monitor information. */
    monitor: utils.Display;
  }

  /**
   * Calls the given callback function with the current window object as a
   * parameter.
   * @param callback A callback function which will be called with the current
   * window object as a parameter. See
   */
  function getCurrentWindow(callback: CallbackFunction<WindowResult>): void;

  /**
   * Creates or returns a window by the window name that was declared in the
   * manifest.
   * @param windowName The name of the window that was declared in the
   * data.windows section in the manifest.
   * @param overrideSetting Override manifest settings
   * @param callback A callback function which will be called with the requested
   * window as a parameter. See
   */
  function obtainDeclaredWindow(
    windowName: string,
    overrideSetting: WindowProperties,
    callback: CallbackFunction<WindowResult>
  ): void;

  /**
   * Creates or returns a window by the window name that was declared in the
   * manifest.
   * @param windowName The name of the window that was declared in the
   * data.windows section in the manifest.
   * @param callback A callback function which will be called with the requested
   * window as a parameter.
   */
  function obtainDeclaredWindow(
    windowName: string,
    callback: CallbackFunction<WindowResult>
  ): void;

  /**
   * Creates an instance of your window (the window's name has to be declared
   * in the manifest.json) or returns a window by the window name.
   * @param windowName The name of the window that was declared in the
   * data.windows section in the manifest.
   * @param useDefaultSizeAndLocation Enable the manifest size and position
   * settings (default is false).
   * @param callback A callback function which will be called with the requested
   * window as a parameter.
   */
  function obtainDeclaredWindow(
    windowName: string,
    useDefaultSizeAndLocation: DefaultSizeAndLocation,
    callback: CallbackFunction<WindowResult>
  ): void;

  /**
   * Returns WindowResult object for a specific open window.
   * @param windowName The name of the window that was declared in the data.windows section in the manifest
   * @param callback Callback will be invoked with the WindowResult object.
   */
  function getWindow(
    windowName: string,
    callback: CallbackFunction<WindowResult>
  ): void;

  /**
   * Start dragging a window.
   * @param windowId The id or name of the window to drag.
   * @param callback A callback which is called when the drag is completed.
   */
  function dragMove(
    windowId: string,
    callback?: CallbackFunction<DragMovedResult>
  ): void;

  /**
   * Start resizing the window from a specific edge or corner.
   * @param windowId The id or name of the window to resize.
   * @param edge The edge or corner from which to resize the window.
   */
  function dragResize(
    windowId: string,
    edge: windows.enums.WindowDragEdge
  ): void;

  /**
   * Start resizing the window from a specific edge or corner.
   * @param windowId The id or name of the window to resize.
   * @param edge The edge or corner from which to resize the window.
   * @param contentRect The real content of the window (for the in-game drawing
   * resizing white area)
   */
  function dragResize(
    windowId: string,
    edge: windows.enums.WindowDragEdge,
    contentRect: ODKRect
  ): void;

  /**
   * Start resizing the window from a specific edge or corner.
   * @param windowId The id or name of the window to resize.
   * @param edge The edge or corner from which to resize the window.
   * @param callback Will be called when the resizing process is completed.
   */
  function dragResize(
    windowId: string,
    edge: windows.enums.WindowDragEdge,
    rect: ODKRect,
    callback: CallbackFunction<DragResizeResult>
  ): void;

  /**
   * Changes the window size to the new width and height, in pixels.
   * @param windowId The id or name of the window for which to change the size.
   * @param width The new window width in pixels.
   * @param height The new window height in pixels.
   * @param callback A callback which is called when the size change is
   * completed.
   */
  function changeSize(
    windowId: string,
    width: number,
    height: number,
    callback?: CallbackFunction<Result>
  ): void;

  /**
   * Changes the window size to the new width and height, in pixels, including DPI scale when resizing.
   * @param changeSizeParams Container for the window settings.
   * @param callback A callback which is called when the size change is
   * completed.
   */
  function changeSize(
    changeSizeParams: ChangeWindowSizeParams,
    callback?: CallbackFunction<Result>
  ): void;

  /**
   * Changes the window minimum size to the new width and height, in pixels.
   * @param windowId windowId The id or name of the window for which to change
   * the minimum size.
   * @param width The new window minimum width in pixels.
   * @param height The new window minimum height in pixels.
   * @param callback A callback which is called when the minimum size change is
   * completed.
   */
  function setMinSize(
    windowId: string,
    width: number,
    height: number,
    callback?: CallbackFunction<Result>
  ): void;

  /**
   * Flashes a window.
   * @param windowId ID of the window to flash.
   * @param behavior Defines window flashing behavior.
   * @param callback A callback which is called when the minimum size change is
   * completed.
   */
  function flash(
    windowId: string,
    behavior: windows.enums.FlashBehavior,
    callback?: CallbackFunction<Result>
  ): void;

  /**
   * Set window zoom level (0.0 for reset).
   * @param winzoomFactorowId The zoome factor.
   * @param windowId The window id, empty for current window.
   */
  function setZoom(
    winzoomFactorowId: number,
    windowId: string
  ): void;

  /**
   * Changes the window position in pixels from the top left corner.
   * @param windowId The id or name of the window for which to change the
   * position.
   * @param left The new window position on the X axis in pixels from the left.
   * @param top The new window position on the Y axis in pixels from the top.
   * @param callback A callback which is called when the position change is
   * completed.
   */
  function changePosition(
    windowId: string,
    left: number,
    top: number,
    callback?: CallbackFunction<WindowIdResult>
  ): void;

  /**
   * Closes the window.
   * @param windowId The id or name of the window to close.
   * @param callback Called after the window is closed.
   */
  function close(
    windowId: string,
    callback?: CallbackFunction<WindowIdResult>
  ): void;

  /**
   * Minimizes the window.
   * @param windowId The id or name of the window to minimize.
   * @param callback Called after the window is minimized.
   */
  function minimize(
    windowId: string,
    callback?: CallbackFunction<WindowIdResult>
  ): void;

  /**
   * Hides the window.
   * @param windowId The id or name of the window to hide.
   * @param callback Called after the window is hidden.
   */
  function hide(
    windowId: string,
    callback?: CallbackFunction<WindowIdResult>
  ): void;

  /**
   * Maximizes the window.
   * @param windowId The id or name of the window to maximize.
   * @param callback Called after the window is maximized.
   */
  function maximize(
    windowId: string,
    callback?: CallbackFunction<WindowIdResult>
  ): void;

  /**
   * Restores a minimized window.
   * @param windowId The id or name of the window to restore.
   * @param callback Called after the window is restored.
   */
  function restore(
    windowId: string,
    callback?: CallbackFunction<WindowIdResult>
  ): void;

  /**
   * Returns the state of the window (normal/minimized/maximized/closed).
   * @param windowId The id or name of the window.
   * @param callback Called with the window state.
   */
  function getWindowState(
    windowId: string,
    callback: CallbackFunction<GetWindowStateResult>
  ): void;

  /**
   * Returns the state of all windows owned by the app
   * (normal/minimized/maximized/closed).
   * @param callback Called with an array containing the states of the windows.
   */
  function getWindowsStates(
    callback: CallbackFunction<GetWindowsStatesResult>
  ): void;

  /**
   * Sends a message to an open window.
   * @param windowId The id or name of the window to send the message to.
   * @param messageId A message id.
   * @param messageContent The content of the message.
   * @param callback Called with the status of the request
   */
  function sendMessage(
    windowId: string,
    messageId: string,
    messageContent: any,
    callback: CallbackFunction<WindowIdResult>
  ): void;

  /**
   * Returns an array of all open windows as objects. The objects can be
   * manipulated like any other window.
   * @param callback A callback function which will be called with a map object
   * of (window-name, Window Object) items
   */
  function getOpenWindows(
    callback: (windows: Dictionary<Window>) => void
  ): void;

  /**
   * Returns a window object of the index page.
   */
  function getMainWindow(): Window;

  /**
   * Opens the options page specified in the manifest file. Does nothing if no
   * such page has been specified.
   * @param callback
   */
  function openOptionsPage(callback: CallbackFunction<WindowIdResult>): void;

  /**
   * Add Window In Game styling
   * @param windowId The id or name of the window to send the message to.
   * @param style The style to add : overwolf.windows.enum.WindowStyle
   * @param callback Called with the status of the request
   */
  function setWindowStyle(
    windowId: string,
    style: windows.enums.WindowStyle,
    callback: CallbackFunction<WindowIdResult>
  ): void;

  /**
   * Remove Window In Game Styling
   * @param windowId The id or name of the window to send the message to.
   * @param style The style to add : overwolf.windows.enum.WindowStyle
   * @param callback Called with the status of the request
   */
  function removeWindowStyle(
    windowId: string,
    style: windows.enums.WindowStyle,
    callback: CallbackFunction<WindowIdResult>
  ): void;

  /**
   * Sets whether the window should be injected to games or not.
   * @deprecated Since version 0.159.
   * @param windowId
   * @param shouldBeDesktopOnly
   * @param callback
   */
  function setDesktopOnly(
    windowId: string,
    shouldBeDesktopOnly: boolean,
    callback: CallbackFunction<WindowIdResult>
  ): void;

  /**
   * Sets whether the window should have minimize/restore animations while in
   * game.
   * @param windowId
   * @param shouldEnableAnimations
   * @param callback
   */
  function setRestoreAnimationsEnabled(
    windowId: string,
    shouldEnableAnimations: boolean,
    callback: CallbackFunction<WindowIdResult>
  ): void;

  /**
   * Change the window's topmost status. Handle with care as topmost windows can
   * negatively impact user experience.
   * @param windowId
   * @param shouldBeTopmost
   * @param callback
   */
  function setTopmost(
    windowId: string,
    shouldBeTopmost: boolean,
    callback: CallbackFunction<WindowIdResult>
  ): void;

  /**
   * Sends the window to the back.
   * @param windowId The id or name of the window.
   * @param callback Called with the result of the request.
   */
  function sendToBack(
    windowId: string,
    callback: CallbackFunction<WindowIdResult>
  ): void;

  /**
   * Brings the requested window to the front.
   * @param windowId The id or name of the window.
   * @param callback Called with the result of the request.
   */
  function bringToFront(
    windowId: string,
    callback: CallbackFunction<WindowIdResult>
  ): void;

  /**
   * Brings this window to the front.
   * @param callback Called with the result of the request.
   */
  function bringToFront(callback: CallbackFunction<WindowIdResult>): void;

  /**
   * Brings this window to the front.
   * @param grabFocus Window will take system focus.
   * @param callback Called with the result of the request.
   */
  function bringToFront(
    grabFocus: boolean,
    callback: CallbackFunction<WindowIdResult>
  ): void;

  /**
   * Brings the requested window to the front.
   * @param windowId The id or name of the window.
   * @param grabFocus Window will take system focus.
   * @param callback Called with the result of the request.
   */
  function bringToFront(
    windowId: string,
    grabFocus: boolean,
    callback: CallbackFunction<WindowIdResult>
  ): void;

  /**
   * Change window position (see SetWindowPositionProperties))
   * @param windowId The id or name of the window
   * @param properties where to place window
   * @param callback Called with the result of the request.
   */
  function setPosition(
    windowId: string,
    properties: SetWindowPositionProperties,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Change this window position (see SetWindowPositionProperties))
   * @param properties where to place window
   * @param callback Called with the result of the request.
   */
  function setPosition(
    properties: SetWindowPositionProperties,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Displays a customized popup message prompt.
   * @param messageParams The type and texts that the message prompt will have.
   * @param callback The user action.
   */
  function displayMessageBox(
    messageParams: MessageBoxParams,
    callback: (confirmed: boolean) => void
  ): void;

  /**
   * Set current window Mute state.
   * @param mute window mute (on\off).
   * @param callback Called with the result of the request.
   */
  function setMute(mute: boolean, callback: CallbackFunction<Result>): void;

  /**
   * Mute all sound source include all excluded white list
   * @param callback Called with the result of the request.
   */
  function muteAll(callback: CallbackFunction<Result>): void;

  /**
   * Is window muted.
   * @param callback Called with the result of the request ({"muted": null}).
   */
  function isMuted(callback: CallbackFunction<IsMutedResult>): void;

  /**
   * Is window fully visible to user (has overlap windows)
   * @param callback Called with the result of the request:{"status": "error"
   * "reason": the reason} or{"status": "success" "visible": "hidden" | "full" |
   * "partial"}
   */
  function isWindowVisibleToUser(
    callback: CallbackFunction<IsWindowVisibleToUserResult>
  ): void;

  /**
   * For OSR window only (for other window the callback return `error` status.
   * {
   *    "status": string (|error, success|), "reason": string (error reason),
   *    "accelerated": bool, "optimized"  : bool  (for accelerated windows only
   *    and only valid in Game)
   * }
   * @param windowId The id or name of the window.
   * @param callback Called with the result of the request.
   */
  function isAccelreatedOSR(
    windowId: string,
    callback: CallbackFunction<IsAccelreatedOSRResult>
  ): void;

  /**
   * Is current window accelerated
   * @param callback Called with the result of the request.
   */
  function isAccelreatedOSR(
    callback: CallbackFunction<IsAccelreatedOSRResult>
  ): void;

  /**
   * Get Window DPI.
   * @param callback Called with the result of the request (result e.g: {dpi:
   * 120, scale: 1.25}).
   */
  function getWindowDPI(
    callback: (result: { dpi: number; scale: number; }) => void
  ): void;

  /**
   * Fired when the main window is restored.
   */
  const onMainWindowRestored: Event<null>;

  /**
   * Fired when the state of a window is changed.
   */
  const onStateChanged: Event<WindowStateChangedEvent>;

  /**
   * Fired when this window received a message.
   */
  const onMessageReceived: Event<MessageReceivedEvent>;

  /**
   * Fired when out of process iframe crashed.
   */
  const onIsolatedIframeProcessCrashed: Event<IsolatedIframeProcessCrashedEvent>;

  /**
   * Fired when the user was prevented from closing a window using Alt+F4
   */
  const onAltF4Blocked: Event<AltF4BlockedEvent>;

/**
   * Fired when native window (or OSR on desktop) moved to other monitoror when current monitor resolution changed
   */
  const onScreenPropertyChanged: Event<onScreenPropertyChangedEvent>;
}

declare namespace overwolf.windows.mediaPlayerElement {
  /** Result of a `create` call, containing the new player's ID. */
  interface CreateResult extends Result {
    /** The unique ID assigned to the newly created media player. */
    id?: number;
  }

  /** Result of a `setVideo` call, containing the video duration. */
  interface SetVideoResult extends Result {
    /** The total duration of the loaded video, in seconds. */
    duration?: number;
  }

  /** Result of a `getProgress` call, containing the current playback position. */
  interface GetProgressResult extends Result {
    /** The current playback position, in seconds. */
    progress?: number;
  }

  /** Event data for media player playback events. */
  interface PlaybackEvent {
    /** The ID of the media player that triggered the event. */
    id: number;
  }

  /**
   * Creates a media player a places it in the given location with given
   * dimensions.
   * @param x The top position of the player.
   * @param y The left position of the player.
   * @param width The width of the player.
   * @param height The height of the player.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function create(
    x: number,
    y: number,
    width: number,
    height: number,
    callback: CallbackFunction<CreateResult>
  ): void;

  /**
   * Remove all media players created for this window.
   */
  function removeAllPlayers(): void;

  /**
   * Relocates the media player to a given location with given dimensions.
   * @param id The id of the player.
   * @param x The top position of the player.
   * @param y The left position of the player.
   * @param width The width of the player.
   * @param height The height of the player.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function setBounds(
    id: number,
    x: number,
    y: number,
    width: number,
    height: number,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Sets the current video to be played.
   * @param id The id of the player.
   * @param videoUrl An url to the video.
   * @param callback A callback function which will be called with the status of
   * the request. If successful, the callback will contain the total seconds in
   * the video.
   */
  function setVideo(
    id: number,
    videoUrl: string,
    callback: CallbackFunction<SetVideoResult>
  ): void;

  /**
   * Plays the current video.
   * @param id The id of the player.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function play(id: number, callback: CallbackFunction<Result>): void;

  /**
   * Pauses the current video.
   * @param id The id of the player.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function pause(id: number, callback: CallbackFunction<Result>): void;

  /**
   * Resumes the current video.
   * @param id The id of the player.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function resume(id: number, callback: CallbackFunction<Result>): void;

  /**
   * Sets the volume.
   * @param id The id of the player.
   * @param volume A volume between 0 and 100 (inclusive).
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function setVolume(
    id: number,
    volume: number,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Stops the current video.
   * @param id The id of the player.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function stop(id: number, callback: CallbackFunction<Result>): void;

  /**
   * Seeks the current video to the given number of seconds.
   * @param id The id of the player.
   * @param seconds The numbers of seconds to seek to.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function seek(
    id: number,
    seconds: number,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Gets the current progress, in seconds, of the playback.
   * @param id The id of the player.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function getProgress(
    id: number,
    callback: CallbackFunction<GetProgressResult>
  ): void;

  /**
   * Sets the speed ratio of the playback.
   * @param id The id of the player.
   * @param speedRatio The speed ratio of the playback. A double between 0 and
   * 16 (inclusive).
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function setPlaybackSpeed(
    id: number,
    speedRatio: number,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Sends the media player to the front of the window.
   * @param id The id of the player.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function toFront(id: number, callback: CallbackFunction<Result>): void;

  /**
   * Sends the media player to the back of the window.
   * @param id The id of the player.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function toBack(id: number, callback: CallbackFunction<Result>): void;

  /**
   * Sets the stretch mode of the player.
   * @param id The id of the media player.
   * @param stretchMode The desired stretch mode, see
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function setStretchMode(
    id: number,
    stretchMode: any,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Fired when playback is starting/resuming.
   */
  const onPlaybackStarted: Event<PlaybackEvent>;

  /**
   * Fired when playback is paused.
   */
  const onPlaybackPaused: Event<PlaybackEvent>;

  /**
   * Fired when playback is stopped.
   */
  const onPlaybackStopped: Event<PlaybackEvent>;

  /**
   * Fired when playback ends.
   */
  const onPlaybackEnded: Event<PlaybackEvent>;

  /**
   * Fired when there was an error while trying to open a video.
   */
  const onPlaybackError: Event<PlaybackEvent>;
}

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

/**
   * Fired when fps information is ready with a JSON containing the information.
   */
  const onFpsInfoReady: Event<any>;
}

declare namespace overwolf.games {
  namespace enums {
    /** Indicates whether the game entry represents a game executable or a launcher. */
    const enum GameInfoType {
      /** A standard game process. */
      Game = 0,
      /** A game launcher process. */
      Launcher = 1,
    }

    /** Describes the reason a `GameInfoUpdatedEvent` was fired. */
    const enum GameInfoChangeReason {
      /** General game state change. */
      Game = "game",
      /** The active game changed. */
      GameChanged = "gameChanged",
      /** The game window focus state changed. */
      GameFocusChanged = "gameFocusChanged",
      /** A game was launched. */
      GameLaunched = "gameLaunched",
      /** A coexisting overlay application was detected. */
      GameOverlayCoexistenceDetected = "gameOverlayCoexistenceDetected",
      /** The overlay cursor visibility changed. */
      GameOverlayCursorVisibility = "gameOverlayCursorVisibility",
      /** The overlay exclusive mode changed. @deprecated Use `GameOverlayExclusiveModeChanged` instead. */
      GameOverlayExlusiveModeChanged = "gameOverlayExlusiveModeChanged",
      /** The overlay input hook encountered a failure. */
      GameOverlayInputHookFailure = "gameOverlayInputHookFailure",
      /** The game renderer was detected. */
      GameRendererDetected = "gameRendererDetected",
      /** The game resolution changed. */
      GameResolutionChanged = "gameResolutionChanged",
      /** The game process was terminated. */
      GameTerminated = "gameTerminated",
      /** The game window data changed. */
      GameWindowDataChanged = "gameWindowDataChanged",
      /** The overlay exclusive mode changed. */
      GameOverlayExclusiveModeChanged = "gameOverlayExclusiveModeChanged",
      /** Alternate coexisting overlay application detection flag. */
      GameOverlayCoexistenceDetectedb = "gameOverlayCoexistenceDetectedb"
    }

    /**
     * Third-party applications known to coexist with the Overwolf overlay,
     * which may cause rendering or input conflicts.
     */
    const enum KnownOverlayCoexistenceApps {
      /** ASUS software (e.g., Armoury Crate). */
      Asus = "asus",
      /** Discord overlay. */
      Discord = "discord",
      /** MSI Afterburner overlay. */
      MSIAfterBurner = "MSIAfterBurner",
      /** Nahimic audio software. */
      Nahimic = "nahimic",
      /** Nahimic 2 audio software. */
      Nahimic2 = "nahimic2",
      /** No coexisting overlay detected. */
      None = "none",
      /** OBS Studio. */
      ObsStudio = "obsStudio",
      /** Plays.TV overlay. */
      PlaysTV = "playsTV",
      /** Razer Synapse. */
      RazerSynapse = "razerSynapse",
    }
  }

  /**
   * Raw game configuration entry from the Overwolf game database.
   * Contains static metadata and internal overlay compatibility flags for a specific game.
   * Most fields are low-level flags used by the Overwolf injection engine.
   */
  interface GameInfo {
    /** Bitmask of renderers actually detected during game injection. */
    ActualDetectedRenderers: number;
    /** Whether the detected renderer supports video capture. */
    ActualGameRendererAllowsVideoCapture: boolean;
    /** Allow color correction mixing mode. */
    AllowCCMix: boolean;
    /** Allow cursor mixing between game and overlay. */
    AllowCursorMix: boolean;
    /** Allow raw input mixing mode. */
    AllowRIMix: boolean;
    /** Input control mode as reported by the game client. */
    Client_GameControlMode: number;
    /** Command line string used to launch the game executable. */
    CommandLine?: string;
    /** Bitmask of supported input control modes. */
    ControlModes: number;
    /** Cursor rendering mode used by the overlay. */
    CursorMode: number;
    /** Detection interval threshold (internal timing value). */
    DIT: number;
    /** Single registry key used to detect the game installation directory. */
    DetectDirKey?: string;
    /** Multiple registry keys used to detect the game installation directory. */
    DetectDirKeys?: string[];
    /** Disable mixed action input mode. */
    DisableActionMixed: boolean;
    /** Disable game activity information tracking. */
    DisableActivityInfo: boolean;
    /** Disable Windows Aero when running on DirectX 11. */
    DisableAeroOnDX11: boolean;
    /** Disable blockchain-based process detection. */
    DisableBlockChain: boolean;
    /** Disable Direct3D 9 Extended (D3D9Ex) mode. */
    DisableD3d9Ex: boolean;
    /** Disable DirectInput device acquisition. */
    DisableDIAquire: boolean;
    /** Disable extended handle injection mode. */
    DisableEXHandle: boolean;
    /** Disable eternal process enumeration. */
    DisableEternalEnum: boolean;
    /** Disable the exclusive mode UI rendering path. */
    DisableExclusiveModeUI: boolean;
    /** Disable TeamSpeak 3 integration feature. */
    DisableFeature_TS3: boolean;
    /** Disable the video capture feature for this game. */
    DisableFeature_VideoCapture: boolean;
    /** Prevent multiple overlay injections into the same process. */
    DisableMultipleInjections: boolean;
    /** Disable Overwolf gesture recognition. */
    DisableOWGestures: boolean;
    /** Disable AI-based render detection. */
    DisableRenderAI: boolean;
    /** Disable input release on window resize. */
    DisableResizeRelease: boolean;
    /** Disable smart input mix mode. */
    DisableSmartMixMode: boolean;
    /** Human-readable display name of the game. */
    DisplayName?: string;
    /** Enable clock gesture for overlay activation. */
    EnableClockGesture: boolean;
    /** Give the overlay focus on any mouse click. */
    EnableFocusOnAnyClick: boolean;
    /** Enable multi-touch cursor support. */
    EnableMTCursor: boolean;
    /** Enable raw input processing. */
    EnableRawInput: boolean;
    /** Enable smart DirectInput focus handling. */
    EnableSmartDIFocus: boolean;
    /** Enable smart DirectInput focus handling (variant 2). */
    EnableSmartDIFocus2: boolean;
    /** Enable smart focus mode for overlay switching. */
    EnableSmartFocus: boolean;
    /** Enable texture replacement mode. */
    EnableTXR: boolean;
    /** Whether the game has been executed more than once. */
    ExecutedMoreThan: boolean;
    /** Internal flag for in-game video texture hook detection. */
    FIGVTH: boolean;
    /** FPS value below which a major frame rate drop event is fired. */
    FPSIndicationThreshold: number;
    /** Initial game window height in pixels at first launch. */
    FirstGameResolutionHeight: number;
    /** Initial game window width in pixels at first launch. */
    FirstGameResolutionWidth: number;
    /** Apply action focus compatibility fix. */
    FixActionFocus: boolean;
    /** Apply color correction compatibility fix. */
    FixCC: boolean;
    /** Apply overlay coexistence compatibility fix. */
    FixCOEx: boolean;
    /** Apply cursor visibility compatibility fix. */
    FixCVCursor: boolean;
    /** Apply cursor offset compatibility fix. */
    FixCursorOffset: boolean;
    /** Apply DirectInput block compatibility fix. */
    FixDIBlock: boolean;
    /** Apply DirectInput focus compatibility fix. */
    FixDIFocus: boolean;
    /** Apply DirectX thread-safety compatibility fix. */
    FixDXThreadSafe: boolean;
    /** Apply full-screen taskbar compatibility fix. */
    FixFSTB: boolean;
    /** Apply hotkey raw input compatibility fix. */
    FixHotkeyRI: boolean;
    /** Apply input block compatibility fix. */
    FixInputBlock: boolean;
    /** Apply invisible cursor compatibility fix for cursor rendering. */
    FixInvisibleCursorCR: boolean;
    /** Apply mix-mode cursor compatibility fix. */
    FixMixModeCursor: boolean;
    /** Apply modifier key mix-mode compatibility fix. */
    FixModifierMixMode: boolean;
    /** Apply mouse DirectInput exclusive mode compatibility fix. */
    FixMouseDIExclusive: boolean;
    /** Apply render context exclusive mode compatibility fix. */
    FixRCEx: boolean;
    /** Apply resolution change compatibility fix. */
    FixResolutionChange: boolean;
    /** Apply software layer restore compatibility fix. */
    FixRestoreSWL: boolean;
    /** Apply software layer compatibility fix. */
    FixSWL: boolean;
    /** Apply software layer window compatibility fix. */
    FixSWLW: boolean;
    /** Force rehook on capture device change. */
    ForceCaptureChangeRehook: boolean;
    /** Force rehook of control input hooks. */
    ForceControlRehook: boolean;
    /** Force game border bypass. */
    ForceGBB: boolean;
    /** Comma-separated list of genres for this game. */
    GameGenres?: string;
    /** URL for the game's external information page. */
    GameLinkURL?: string;
    /** Internal developer notes about this game's configuration. */
    GameNotes?: string;
    /** Bitmask of renderers supported by this game. */
    GameRenderers: number;
    /** Official title of the game. */
    GameTitle?: string;
    /** Whether the game uses a common/generic process name shared with other applications. */
    GenericProcessName: boolean;
    /** Title of the game series or group this game belongs to. */
    GroupTitle?: string;
    /** Unique Overwolf game ID (full ID including instance suffix). */
    ID: number;
    /** Filename of the game's icon asset. */
    IconFile?: string;
    /** Ignore multiple input device enumeration. */
    IgnoreMultipleDevices: boolean;
    /** Ignore input release events. */
    IgnoreRelease: boolean;
    /** Whether the game uses ImGui for its UI rendering. */
    ImGuiRendering: boolean;
    /** Current overlay injection decision value. */
    InjectionDecision: number;
    /** Input handling mode bitmask. */
    Input: number;
    /** Hint string for locating the game installation. */
    InstallHint?: string;
    /** Whether the game's controls conflict with Overwolf hotkeys. */
    IsConflictingWithControlHotkey: boolean;
    /** Whether this is a newly added entry in the game database. */
    IsNew: boolean;
    /** Whether the game is distributed via Steam. */
    IsSteamGame: boolean;
    /** Maintain in-game overlay state when the game window loses focus. */
    KeepInGameOnLostFocus: boolean;
    /** Internal label for the game entry. */
    Label?: string;
    /** Previous overlay injection decision value. */
    LastInjectionDecision: number;
    /** Last known file system path to the game executable. */
    LastKnownExecutionPath?: string;
    /** Additional parameters appended when launching the game. */
    LaunchParams?: string;
    /** Whether the game can be launched directly from Overwolf. */
    Launchable: boolean;
    /** Single registry key for locating the launcher directory. */
    LauncherDirectoryRegistryKey?: string;
    /** Multiple registry keys for locating the launcher directory. */
    LauncherDirectoryRegistryKeys?: string[];
    /** Class ID of the associated game launcher entry. */
    LauncherGameClassId: number;
    /** Known process names for this game's launcher. */
    LauncherNames?: string[];
    /** Current modifier key status bitmask. */
    ModifierStatus: number;
    /** Native platform (e.g., Steam app) ID for this game. */
    NativeID: number;
    /** Pixel offset applied to the pass-through click bounds. */
    PassThruBoundsOffsetPixel: number;
    /** Press-to-click-through input threshold value. */
    PressToClickThrough: number;
    /** Full command line string used to start the game process. */
    ProcessCommandLine?: string;
    /** OS process ID of the currently running game instance. */
    ProcessID: number;
    /** Known executable process names for this game. */
    ProcessNames: string[];
    /** Recreate the swap buffer on the next frame. */
    RecreateSB: boolean;
    /** Release keyboard input to the game when the overlay has focus. */
    ReleaseKBInOverlayFocus: boolean;
    /** Send resize notifications when the game resolution changes. */
    ResizeNotifyResolution: boolean;
    /** Restore the back buffer after overlay rendering. */
    RestoreBB: boolean;
    /** Restore the render target after overlay rendering. */
    RestoreRT: boolean;
    /** Whether the game process requires elevated (administrator) privileges. */
    RunElevated: boolean;
    /** Send hotkey events via raw input. */
    SendHotkeyRI: boolean;
    /** Set DirectInput to exclusive mode. */
    SetDIInExclusive: boolean;
    /** Abbreviated title of the game. */
    ShortTitle?: string;
    /** Skip game process detection during injection. */
    SkipGameProc: boolean;
    /** Smart keyboard release when the overlay receives focus. */
    SmartReleaseKBInOverlayFocus: boolean;
    /** FPS value considered a stable frame rate for this game. */
    StableFPSThreshold: number;
    /** Pixel margin used to detect the stuck-in-transparency state. */
    StuckInTrans_Margin: number;
    /** Mouse movement gap (in pixels) for stuck-in-transparency detection. */
    StuckInTrans_MouseMoveGap?: number;
    /** URI scheme supported for launching this game. */
    SupportedScheme?: string;
    /** Minimum supported version string for this game. */
    SupportedVersion?: string;
    /** Texture capture modes bitmask. */
    TCModes: number;
    /** Whether to terminate game tracking when the main window closes. */
    TerminateOnWindowClose: boolean;
    /** Numeric type identifier for the game entry. */
    Type: number;
    /** String representation of the game type. */
    TypeString?: string;
    /** URI scheme that is explicitly not supported for launching this game. */
    UnsupportedScheme?: string;
    /** Enable cursor position tracking updates. */
    UpdateCursor: boolean;
    /** Enable cursor position tracking in multi-threaded mode. */
    UpdateCursorMT: boolean;
    /** Use all-safe hook mode for injection. */
    UseAllSafeHook: boolean;
    /** Use extended hook mode. */
    UseEH?: string;
    /** Use hardware input device for cursor input. */
    UseHardwareDevice: boolean;
    /** Use the launcher's icon instead of the game's own icon. */
    UseLauncherIcon: boolean;
    /** Use long hook mode for injection. */
    UseLongHook: boolean;
    /** Use multi-context hook mode. */
    UseMCH?: string;
    /** Use message hook for input. */
    UseMH: boolean;
    /** URI scheme for the message hook. */
    UseMHScheme?: string;
    /** Use mouse/keyboard low-level hook. */
    UseMKLL: boolean;
    /** Use mouse wheel hook. */
    UseMW: boolean;
    /** Use process replacement injection method. */
    UsePR: boolean;
    /** Use raw input for keyboard and mouse. */
    UseRI: boolean;
    /** Use raw input block mode. */
    UseRIB: boolean;
    /** Use safe hook mode for injection. */
    UseSafeHook: boolean;
    /** Use thread-safe hook mode. */
    UseTSHook: boolean;
    /** Wait for window restore before processing input. */
    WaitRestore: boolean;
    /** Support level for Windows 7 (0 = unsupported, higher = better support). */
    Win7Support: number;
    /** Support level for Windows 8 (0 = unsupported, higher = better support). */
    Win8Support: number;
    /** Support level for Windows 10 (0 = unsupported, higher = better support). */
    Win10Support: number;
    /** Support level for Windows XP (0 = unsupported, higher = better support). */
    XPSupport: number;
  }

  /**
   * Information about a game that is currently running.
   * Returned by `getRunningGameInfo` and included in events such as `onGameLaunched`.
   */
  interface RunningGameInfo {
    /** Whether the game window currently has input focus. */
    isInFocus: boolean;
    /** Whether the game process itself has focus (may differ from window focus). */
    gameIsInFocus: boolean;
    /** Whether the game process is currently running. */
    isRunning: boolean;
    /** Whether the game allows video capture via the Overwolf API. */
    allowsVideoCapture: boolean;
    /** The full title of the game. */
    title: string;
    /** The human-readable display name of the game. */
    displayName: string;
    /** The abbreviated short title of the game. */
    shortTitle: string;
    /** The full Overwolf game ID, including the instance suffix. */
    id: number;
    /** The Overwolf game class ID (without instance suffix), used to identify the game type. */
    classId: number;
    /** The game window width in physical pixels. */
    width: number;
    /** The game window height in physical pixels. */
    height: number;
    /** The game window width in logical (DPI-independent) pixels. */
    logicalWidth: number;
    /** The game window height in logical (DPI-independent) pixels. */
    logicalHeight: number;
    /** List of renderer names used by the game. */
    renderers: string[];
    /** The primary renderer detected for the running game. */
    detectedRenderer: string;
    /** Full file system path to the game executable. */
    executionPath: string;
    /** A unique identifier for the current game session. */
    sessionId: string;
    /** The command line string used to launch the game. */
    commandLine: string;
    /** Whether this entry represents a game or a launcher. */
    type: enums.GameInfoType;
    /** String representation of the `type` field. */
    typeAsString: string;
    /** The native OS window handle for the game window. */
    windowHandle: { value: number; };
    /** The native OS monitor handle for the monitor the game is running on. */
    monitorHandle: { value: number; };
    /** The OS process ID of the running game. */
    processId: number;
    /** Whether the out-of-process (OOP) overlay is active. */
    oopOverlay?: boolean;
    /** Whether the Overwolf overlay is currently enabled for this game. */
    isOverlayEnabled: boolean;
    /** Whether the Overwolf overlay is supported for this game. */
    isOverlaySupported: boolean;
  }

  /**
   * Describes what changed in a game info update.
   * @deprecated Use `GameInfoUpdatedEvent` instead, which includes overlay change details and change reasons.
   */
  interface GameInfoUpdate {
    /** The current state of the running game. */
    gameInfo: RunningGameInfo;
    /** Whether the game's screen resolution changed. */
    resolutionChanged: boolean;
    /** Whether the game started or stopped running. */
    runningChanged: boolean;
    /** Whether the game window's focus state changed. */
    focusChanged: boolean;
    /** Whether the active game changed to a different game. */
    gameChanged: boolean;
  }

  /**
   * Information about a game detected as installed on the local machine,
   * combining database metadata with installation-specific details.
   */
  interface InstalledGameInfo {
    /** Static game metadata from the Overwolf game database. */
    GameInfo: GameInfo;
    /** The game class ID from the database (without instance suffix). */
    GameInfoClassID?: number;
    /** The full game ID from the database (with instance suffix). */
    GameInfoID?: number;
    /** The timestamp when the installation was last verified. */
    LastTimeVerified?: Date;
    /** Command line parameters used when launching via the game's launcher. */
    LauncherCommandLineParams?: string;
    /** File system path to the game's launcher executable. */
    LauncherPath?: string;
    /** Whether the game was manually added by the user rather than auto-detected. */
    ManuallyAdded?: boolean;
    /** File system path to the game's main process executable. */
    ProcessPath?: string;
    /** Whether the game entry was automatically created by process-name detection. */
    WasAutoAddedByProcessDetection?: boolean;
  }

  /**
   * Result of a `getGameDBInfo` call.
   * Exactly one of `gameInfo` or `installedGameInfo` will be populated,
   * depending on whether the game is installed on the local machine.
   */
  interface GetGameDBInfoResult extends Result {
    /**
     * Database metadata for the game.
     * Populated when the game is **not** installed locally; `null` otherwise.
     */
    gameInfo?: GameInfo;
    /**
     * Installation details combined with database metadata.
     * Populated when the game **is** installed locally; `null` otherwise.
     * Note: `installedGameInfo` contains a `GameInfo` object within it.
     */
    installedGameInfo?: InstalledGameInfo;
  }

  /** Result of a `getRecentlyPlayedGames` call. */
  interface GetRecentlyPlayedResult extends Result {
    /** Array of Overwolf game class IDs for recently played games, most recent first. */
    games: number[];
  }

  /** Result of a `getGameInfo` call. */
  interface GetGameInfoResult extends Result {
    /** Installation details for the requested game, or undefined if not found. */
    gameInfo?: InstalledGameInfo;
  }

  /**
   * Result of a `getRunningGameInfo` call.
   * Contains the same fields as `RunningGameInfo` plus overlay information.
   */
  interface GetRunningGameInfoResult extends Result {
    /** Whether the game window currently has input focus. */
    isInFocus: boolean;
    /** Whether the game process itself has focus. */
    gameIsInFocus: boolean;
    /** Whether the game process is currently running. */
    isRunning: boolean;
    /** Whether the game allows video capture via the Overwolf API. */
    allowsVideoCapture: boolean;
    /** The full title of the game. */
    title: string;
    /** The human-readable display name of the game. */
    displayName: string;
    /** The abbreviated short title of the game. */
    shortTitle: string;
    /** The full Overwolf game ID, including the instance suffix. */
    id: number;
    /** The Overwolf game class ID (without instance suffix). */
    classId: number;
    /** The game window width in physical pixels. */
    width: number;
    /** The game window height in physical pixels. */
    height: number;
    /** The game window width in logical (DPI-independent) pixels. */
    logicalWidth: number;
    /** The game window height in logical (DPI-independent) pixels. */
    logicalHeight: number;
    /** List of renderer names used by the game. */
    renderers: string[];
    /** The primary renderer detected for the running game. */
    detectedRenderer: string;
    /** Full file system path to the game executable. */
    executionPath: string;
    /** A unique identifier for the current game session. */
    sessionId: string;
    /** The command line string used to launch the game. */
    commandLine: string;
    /** Whether this entry represents a game or a launcher. */
    type: enums.GameInfoType;
    /** String representation of the `type` field. */
    typeAsString: string;
    /** The native OS window handle for the game window. */
    windowHandle: { value: number; };
    /** The native OS monitor handle for the display the game is running on. */
    monitorHandle: { value: number; };
    /** The OS process ID of the running game. */
    processId: number;
    /** Current overlay status information. */
    overlayInfo: OverlayInfo;
  }

  /**
   * Extended running game info returned inside `GetRunningGameInfoResult2`.
   * Identical to `GetRunningGameInfoResult` but also includes overlay enabled/supported flags.
   */
  interface GetRunningGameInfoResult2GameInfo {
    /** Whether the game window currently has input focus. */
    isInFocus: boolean;
    /** Whether the game process itself has focus. */
    gameIsInFocus: boolean;
    /** Whether the game process is currently running. */
    isRunning: boolean;
    /** Whether the game allows video capture via the Overwolf API. */
    allowsVideoCapture: boolean;
    /** The full title of the game. */
    title: string;
    /** The human-readable display name of the game. */
    displayName: string;
    /** The abbreviated short title of the game. */
    shortTitle: string;
    /** The full Overwolf game ID, including the instance suffix. */
    id: number;
    /** The Overwolf game class ID (without instance suffix). */
    classId: number;
    /** The game window width in physical pixels. */
    width: number;
    /** The game window height in physical pixels. */
    height: number;
    /** The game window width in logical (DPI-independent) pixels. */
    logicalWidth: number;
    /** The game window height in logical (DPI-independent) pixels. */
    logicalHeight: number;
    /** List of renderer names used by the game. */
    renderers: string[];
    /** The primary renderer detected for the running game. */
    detectedRenderer: string;
    /** Full file system path to the game executable. */
    executionPath: string;
    /** A unique identifier for the current game session. */
    sessionId: string;
    /** The command line string used to launch the game. */
    commandLine: string;
    /** Whether this entry represents a game or a launcher. */
    type: enums.GameInfoType;
    /** String representation of the `type` field. */
    typeAsString: string;
    /** The native OS window handle for the game window. */
    windowHandle: { value: number; };
    /** The native OS monitor handle for the display the game is running on. */
    monitorHandle: { value: number; };
    /** The OS process ID of the running game. */
    processId: number;
    /** Current overlay status information. */
    overlayInfo: OverlayInfo;
    /** Whether the Overwolf overlay is currently enabled for this game. */
    isOverlayEnabled: boolean;
    /** Whether the Overwolf overlay is supported for this game. */
    isOverlaySupported: boolean;
  }

  /** Result of a `getRunningGameInfo2` call. */
  interface GetRunningGameInfoResult2 extends Result {
    /** Current running game information, or `null` if no game is running. */
    gameInfo: GetRunningGameInfoResult2GameInfo | null
  }

  /** Describes the current state of the Overwolf overlay for a running game. */
  interface OverlayInfo {
    /** Third-party overlay apps detected as coexisting with the Overwolf overlay. */
    coexistingApps?: enums.KnownOverlayCoexistenceApps[];
    /** Whether the overlay input hook encountered a failure. */
    inputFailure?: boolean;
    /** Whether the overlay has rendered at least one frame in-game. */
    hadInGameRender?: boolean;
    /** Whether the overlay cursor is currently visible. */
    isCursorVisible?: boolean;
    /** Whether exclusive rendering mode has been disabled for this game. */
    exclusiveModeDisabled?: boolean;
    /** Whether the out-of-process (OOP) overlay is active. */
    oopOverlay?: boolean;
    /** Whether Windows full-screen optimization is disabled for this game. */
    isFullScreenOptimizationDisabled?: boolean;
  }

  /**
   * Payload of the `onGameInfoUpdated` event.
   * Fired whenever game state changes, such as launch, termination, focus, resolution, or overlay state.
   */
  interface GameInfoUpdatedEvent {
    /** The current running game info, or `null` if no game is running. */
    gameInfo?: RunningGameInfo | null;
    /** Whether the game's screen resolution changed. */
    resolutionChanged: boolean;
    /** Whether the game started or stopped running. */
    runningChanged: boolean;
    /** Whether the game window's focus state changed. */
    focusChanged: boolean;
    /** Whether the active game changed to a different title. */
    gameChanged: boolean;
    /** Whether the overlay state changed (e.g., exclusive mode, coexistence). */
    gameOverlayChanged: boolean;
    /** Whether the overlay input hook encountered an error during this update. */
    overlayInputHookError?: boolean;
    /** One or more reasons describing what triggered this update. */
    reason: ReadonlyArray<enums.GameInfoChangeReason>;
  }

  /**
   * Payload of the `onMajorFrameRateChange` event.
   * Fired when the game's FPS changes significantly relative to its stable threshold.
   */
  interface MajorFrameRateChangeEvent {
    /** Whether the FPS is stable, has dropped, or has increased relative to the threshold. */
    fps_status: "None" | "Stable" | "Drop" | "Increase";
    /** The current measured frames per second. */
    fps: number;
  }

  /** Payload of the `onGameRendererDetected` event. */
  interface GameRendererDetectedEvent {
    /** The name of the rendering API detected (e.g., `"D3D11"`, `"Vulkan"`). */
    detectedRenderer: string;
  }

  /**
   * Returns an object with information about the currently running game (or
   * active games, if more than one), or null if no game is running.
   * @param callback Called with the currently running or active game info. See
   */
  function getRunningGameInfo(
    callback: CallbackFunction<GetRunningGameInfoResult>
  ): void;

  /**
   * Returns an object with information about the currently running game (or
   * active games, if more than one), or null if no game is running.
   * @param callback Called with the currently running or active game info. See
   */
  function getRunningGameInfo2(
    callback: CallbackFunction<GetRunningGameInfoResult2>
  ): void;

  /**
   * Returns information about a game with a given game id.Will only return
   * information if the game is detected on the local machine (i.e. installed)
   * @param gameClassId The class id of the game.
   * @param callback Called with the info about the game.
   */
  function getGameInfo(
    gameClassId: number,
    callback: CallbackFunction<GetGameInfoResult>
  ): void;

  /**
   * This is the same as `getGameDBInfo`, except that it can return two different
   * results: 1. if the game is detected as installed - then the
   * `installedGameInfo` member of the result will be set and the `gameInfo`
   * member will be null 2. if the game is NOT detected as installed, then the
   * `installedGameInfo` member of the result will be set to null and the
   * `gameInfo` member will be set NOTE: `installedGameInfo` contains `gameInfo`
   * in it.
   * @param classId The class id of the game.
   * @param callback Called with the info about the game.
   */
  function getGameDBInfo(
    classId: number,
    callback: CallbackFunction<GetGameDBInfoResult>
  ): void;

  /**
   * Returns an array of the maxNumOfGames most recently played game IDs.An
   * empty array will be returned if none have been recorded.
   * @param maxNumOfGames The maximum number of games to receive.
   * @param callback Called with the array of game IDs.
   */
  function getRecentlyPlayedGames(
    maxNumOfGames: number,
    callback: CallbackFunction<GetRecentlyPlayedResult>
  ): void;

  /**
   * Returns the last played gameinfo (when no game is currently running).
   * @param callback Called with the result.
   */
  function getLastRunningGameInfo(
    callback: CallbackFunction<GetGameInfoResult>
  ): void;

  /**
   * Fired when the game info is updated, including game name, game running,
   * game terminated, game changing focus, etc.
   */
  const onGameInfoUpdated: Event<GameInfoUpdatedEvent>;

  /**
   * Fired when a game is launched.
   */
  const onGameLaunched: Event<RunningGameInfo>;

  /**
   * Fired when the rendering frame rate of the currently injected game changes
   * dramatically.
   */
  const onMajorFrameRateChange: Event<MajorFrameRateChangeEvent>;

/**
   * Fired when the rendering method of the game has been detected.
   */
  const onGameRendererDetected: Event<GameRendererDetectedEvent>;
}

declare namespace overwolf.games.tracked {
  /** Fired when a tracked (unsupported / overlay disabled) game process is terminated. */
  const onTerminated: Event<GameInfoUpdatedEvent>;

  /**
   * Fired when an unsupported / overlay disabled game is launched.
   */
  const onGameLaunched: Event<GetRunningGameInfoResult2>;

  /** Result containing information about all currently running tracked games. */
  interface GetAnyRunningGamesInfoResult extends Result {
    /** An array of info objects for each currently running tracked game. */
    gameInfos: GetRunningGameInfoResult2GameInfo[];
    /** Whether the request succeeded. */
    success: boolean;
  }

  /**
   * Returns an array of all the currently running unsupported / overlay disabled games.
   * @param callback Called with the array of game infos.
   */
  function getAnyRunningGamesInfo(
    callback: CallbackFunction<GetAnyRunningGamesInfoResult>
  ): void;
}

declare namespace overwolf.games.launchers {
  /** Information about a currently running game launcher. */
  interface LauncherInfo {
    /** The display title of the launcher. */
    title: string;
    /** The full Overwolf launcher ID, including the instance suffix. */
    id: number;
    /** The Overwolf launcher class ID (without instance suffix). */
    classId: number;
    /** Whether the launcher window currently has input focus. */
    isInFocus: boolean;
    /** The screen position and dimensions of the launcher window. */
    position: Position;
    /** The native OS window handle for the launcher window. */
    handle: number;
    /** The command line string used to start the launcher. */
    commandLine: string;
    /** The OS process ID of the running launcher. */
    processId: number;
    /** The file system path to the launcher executable. */
    path: string;
  }

  /** Screen position and dimensions of a window. */
  interface Position {
    /** The height of the window in pixels. */
    height: number;
    /** The distance from the left edge of the screen in pixels. */
    left: number;
    /** The distance from the top edge of the screen in pixels. */
    top: number;
    /** The width of the window in pixels. */
    width: number;
  }

  /** Result of a `getRunningLaunchersInfo` call. */
  interface GetRunningLaunchersInfoResult extends Result {
    /** Array of info objects for each currently running launcher. */
    launchers: LauncherInfo[];
  }

  /** Payload of the `onUpdated` event. */
  interface UpdatedEvent {
    /** The current state of the launcher that was updated. */
    info: LauncherInfo;
    /** List of property names that changed in this update. */
    changeType: string[];
  }

  /**
   * Returns an object with information about the currently running launchers.
   * @param callback Called with the currently running detected launchers.
   */
  function getRunningLaunchersInfo(
    callback: CallbackFunction<GetRunningLaunchersInfoResult>
  ): void;

  /**
   * Fired when the launcher info is updated, including game name, game running,
   * game terminated, game changing focus, etc.
   */
  const onUpdated: Event<UpdatedEvent>;

  /**
   * Fired when a game is launched.
   */
  const onLaunched: Event<LauncherInfo>;

  /**
   * Fired when a launcher is closed.
   */
  const onTerminated: Event<LauncherInfo>;
}


declare namespace overwolf.games.launchers.events {
  /**
   * Result of a `getInfo` call.
   * @template T The shape of the launcher info payload. Defaults to `any`.
   */
  interface GetInfoResult<T = any> extends Result {
    /** The current launcher info payload. */
    res: T;
  }

  /** Result of a `setRequiredFeatures` call. */
  interface SetRequiredFeaturesResult extends Result {
    /** The subset of requested features that the launcher actually supports. */
    supportedFeatures: string[];
  }

  /**
   * Sets the required features from the provider.
   * @param launcherClassId The class ID of the target launcher.
   * @param features A string array of features to utilize.
   * @param callback Called with success or failure state.
   */
  function setRequiredFeatures(
    launcherClassId: number,
    features: string[],
    callback: CallbackFunction<SetRequiredFeaturesResult>
  ): void;

  /**
   * Gets the current game info.
   * @param launcherClassId The class ID of the target launcher.
   * @param callback Called with the current launcher info.
   */
  function getInfo(
    launcherClassId: number,
    callback: CallbackFunction<GetInfoResult>
  ): void;

  /**
   * Fired when there are game info updates with a JSON object of the updates.
   */
  const onInfoUpdates: Event<any>;

/**
   * Fired when there are new game events with a JSON object of the events
   * information.
   */
  const onNewEvents: Event<any>;
}

declare namespace overwolf.games.launchers.events.provider {
  /** A single game event info update entry containing feature, category, key, and value. */
  interface GameEventsInfo {
    /** The feature that produced this info update. */
    feature: string;
    /** The category of the info update within the feature. */
    category: string;
    /** The key identifying the specific info field. */
    key: string;
    /** The new value for the info field. */
    value: string;
  }

  /** Triggers a synthetic game event for the specified launcher. */
  function triggerEvent(
    launcherClassId: number,
    feature: string,
    name: string,
    data?: any,
    callback?: CallbackFunction<Result>
  ): void;

  /** Updates a launcher info field with the provided `GameEventsInfo` data. */
  function updateInfo(
    launcherClassId: number,
    info: GameEventsInfo,
    callback?: CallbackFunction<Result>
  ): void;

  /** Declares the set of features that this launcher event provider supports. */
  function setSupportedFeatures(
    launcherClassId: number,
    features: string[],
    callback?: CallbackFunction<Result>
  ): void;
}

declare namespace overwolf.games.events {
  /** Result of a `setRequiredFeatures` call, listing which features were successfully enabled. */
  interface SetRequiredFeaturesResult extends Result {
    /** The subset of requested features that are supported and active. */
    supportedFeatures?: string[];
  }

  /** Result of a `getInfo` call containing the current game info state. */
  interface GetInfoResult<T = any> extends Result {
    /** The game info object returned by the provider. */
    res: T;
  }

  /** Describes a single game event emitted by the events provider. */
  interface GameEvent {
    /** The name of the event. */
    name: string;
    /** The serialized data payload of the event. */
    data: string;
  }

  /** Base type for typed game event dictionary shapes. */
  type GameEventDictionary2 = {};

  /** A typed game event whose name is constrained to keys of the dictionary type `T`. */
  interface GameEvent2<T extends GameEventDictionary2 = any> {
    /** The name of the event, restricted to known keys of `T`. */
    name: keyof T;
    /** The event data payload. */
    data: any;
  }

  /** Payload of the `onNewEvents` event, containing a batch of game events. */
  interface NewGameEvents {
    /** The list of game events in this batch. */
    events: GameEvent[];
  }

  /** Payload of the `onError` event describing a game events system error. */
  interface ErrorEvent {
    /** A string describing the reason for the error. */
    reason: string;
  }

  /** Base interface for typed info update objects; extend to define feature-specific shapes. */
  interface InfoUpdate2 { }

  /** Payload of the `onInfoUpdates2` event, pairing an info update with its feature name. */
  interface InfoUpdates2Event
    <Feature = string, Info extends InfoUpdate2 = InfoUpdate2> {
    /** The info update data for the relevant feature. */
    info: Info;
    /** The feature that produced this info update. */
    feature: Feature;
  }

  /**
   * Sets the required features from the provider.
   * @param features A string array of features to utilize.
   * @param callback Called with success or failure state.
   */
  function setRequiredFeatures(
    features: string[],
    callback: CallbackFunction<SetRequiredFeaturesResult>
  ): void;

  /**
   * Gets the current game info.
   * @param callback
   */
  function getInfo(callback: CallbackFunction<GetInfoResult>): void;

  /**
   * Fired when there was an error in the game events system.
   */
  const onError: Event<ErrorEvent>;

  /**
   * Obsolete. Fired when there are game info updates with a JSON object of the
   * updates.
   */
  const onInfoUpdates: Event<any>;

  /**
   * Fired when there are game info updates with a JSON object of the updates.
   */
  const onInfoUpdates2: Event<InfoUpdates2Event>;

/**
   * Fired when there are new game events with a JSON object of the events
   * information.
   */
  const onNewEvents: Event<NewGameEvents>;
}

declare namespace overwolf.games.events.provider {
  /**
   * Describes a single game event or state update to be pushed into the
   * Overwolf game events system via `updateInfo`.
   */
  interface GameEventsInfo {
    /** The feature this event or info key belongs to (e.g., `"kill"`, `"death"`). */
    feature: string;
    /** The category grouping for this event or info key. */
    category: string;
    /** The specific event or info key name. */
    key: string;
    /** The value associated with this event or info key. */
    value: string;
  }

  /**
   * Triggers a named game event for the specified feature.
   * Use this to fire discrete one-time occurrences (e.g., a kill, a death).
   * @param feature The feature name this event belongs to (e.g., `"kill"`).
   * @param name The name of the event to trigger.
   * @param data Optional additional payload data for the event.
   */
  function triggerEvent(feature: string, name: string, data?: any): void;

  /**
   * Pushes a game info state update into the Overwolf events system.
   * Use this to report continuous or changing state values (e.g., health, score).
   * @param info The info key/value pair to update.
   */
  function updateInfo(info: GameEventsInfo): void;

  /**
   * Declares which game features this provider supports.
   * Must be called before triggering events or updating info for those features.
   * @param features Array of feature names this provider will emit data for.
   * @param callback Called with the result of the registration.
   */
  function setSupportedFeatures(
    features: string[],
    callback: CallbackFunction<Result>
  ): void;
}

declare namespace overwolf.games.inputTracking {
  /** The current position of the mouse cursor. */
  interface MousePosition {
    /** Horizontal cursor position in pixels. */
    x: number;
    /** Vertical cursor position in pixels. */
    y: number;
    /** Whether the cursor is positioned over the game window (as opposed to an Overwolf widget). */
    onGame: boolean;
    /** Native OS window handle for the window under the cursor. */
    handle: { value: number; };
  }

  /** Aggregated input activity statistics for the current game session. */
  interface InputActivity {
    /** Total active (non-idle) time in milliseconds. */
    aTime: number;
    /** Total idle time in milliseconds. */
    iTime: number;
    /** Actions per minute across all input devices. */
    apm: number;
    /** Mouse activity stats including total clicks, cursor distance traveled, and a per-button breakdown. */
    mouse: { total: number; dist: number; keys: any; };
    /** Keyboard activity stats including total key presses and a per-key breakdown. */
    keyboard: { total: number; keys: any; };
  }

  /** Result of a `getActivityInformation` or `getMatchActivityInformation` call. */
  interface GetActivityResult extends Result {
    /** The aggregated input activity data for the session or match. */
    activity: InputActivity;
  }

  /** Result of a `getMousePosition` call. */
  interface GetMousePositionResult extends Result {
    /** The current mouse position, or `undefined` if unavailable. */
    mousePosition?: MousePosition;
  }

  /** Payload of the `onKeyUp` and `onKeyDown` events. */
  interface KeyEvent {
    /** The virtual key code of the key that was pressed or released. */
    key: string;
    /** Whether the key event occurred while the game window had focus. */
    onGame: boolean;
  }

  /** Payload of the `onMouseUp` and `onMouseDown` events. */
  interface MouseEvent {
    /** Which mouse button was pressed or released (e.g., `"left"`, `"right"`, `"middle"`). */
    button: string;
    /** Horizontal cursor position in pixels at the time of the event. */
    x: number;
    /** Vertical cursor position in pixels at the time of the event. */
    y: number;
    /** Whether the mouse event occurred while the game window had focus. */
    onGame: boolean;
  }

  /** Payload of a mouse wheel scroll event. */
  interface WheelEvent {
    /** Scroll amount and direction (positive = scroll up, negative = scroll down). */
    delta: number;
    /** Horizontal cursor position in pixels at the time of the event. */
    x: number;
    /** Vertical cursor position in pixels at the time of the event. */
    y: number;
    /** Whether the scroll event occurred while the game window had focus. */
    onGame: boolean;
  }

  /**
   * Returns the input activity information. The information includes presses
   * for keyboard/mouse, total session time, idle time and actions-per-minute.
   * This information resets between game executions.
   * @param callback A callback with the activity information.
   */
  function getActivityInformation(
    callback: CallbackFunction<GetActivityResult>
  ): void;

  function init(
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Returns the input activity information (similar to
   * `getActivityInformation`). However, when this is supported, it will return
   * data only for the latestmatch of the current game
   * @param callback A callback with the activity information.
   */
  function getMatchActivityInformation(
    callback: CallbackFunction<GetActivityResult>
  ): void;

  /**
   * Returns the eye tracking information. The information includes gaze points,
   * fixations, user presence (screen/keyboard/other) and minimap glances. This
   * information resets between game executions.
   * @param callback A callback with the eye tracking information
   */
  function getEyeTrackingInformation(
    callback: CallbackFunction<GetActivityResult>
  ): void;

  /**
   * Returns the input last mouse position in game. the data includes the mouse
   * position and a boolean stating whether the keypress was on a game or on an
   * Overwolf widget (onGame).
   * @param callback A callback with the mouse position information
   */
  function getMousePosition(
    callback: CallbackFunction<GetMousePositionResult>
  ): void;

  /**
   * Eye tracking data trakcing will pause, and stop collect Eye tracking data
   * until resumeEyeTracking will be called.
   */
  function pauseEyeTracking(): void;

  /**
   * Resume collecting Eye tracking data.
   */
  function resumeEyeTracking(): void;

  /**
   * Fired when a keyboard key has been released. The event information includes
   * the virtual key code (key) and a boolean stating whether the keypress was
   * on a game or on an Overwolf widget (onGame).
   */
  const onKeyUp: Event<KeyEvent>;

  /**
   * Fired when a keyboard key has been pressed.
   * Event information is similar to `onKeyUp`.
   */
  const onKeyDown: Event<KeyEvent>;

  /**
   * Fired when a mouse key has been released. The event information includes
   * whether the left or white mouse button was clicked(button), x and y
   * coordinates (x, y) and a boolean stating whether the keypress was on a game
   * or on an Overwolf widget (onGame).
   */
  const onMouseUp: Event<MouseEvent>;

  /**
   * Fired a mouse key has been pressed.
   * Event information is similar to `onMouseUp`.
   */
  const onMouseDown: Event<MouseEvent>;

/**
   * Fired a mouse wheel has been used.
   */
  const onMouseWheel: Event<WheelEvent>;

}

declare namespace overwolf.web {
  namespace enums {
    /** The HTTP method to use when sending a fetch request. */
    const enum HttpRequestMethods {
      /** Retrieve a resource. */
      GET = "GET",
      /** Retrieve only the headers for a resource. */
      HEAD = "HEAD",
      /** Submit data to a resource. */
      POST = "POST",
      /** Replace a resource entirely. */
      PUT = "PUT",
      /** Remove a resource. */
      DELETE = "DELETE",
      /** Apply a partial update to a resource. */
      PATCH = "PATCH",
    }
    /** The type of a WebSocket message. */
    const enum MessageType {
      /** A ping control frame. */
      Ping = "ping",
      /** A binary data frame. */
      Binary = "binary",
      /** A UTF-8 text data frame. */
      Text = "text",
    }

  }

  /** Connection parameters used to create a `WebSocket` client. */
  interface WebSocketConnectionParams {
    /** Whether to use a secure (`wss://`) connection. */
    secured: boolean;
    /** The port number to connect to. */
    port: number;
    /** Optional credentials for basic authentication. */
    credentials: { username: string; password: string; };
    /** A list of sub-protocols to negotiate with the server. */
    protocols: string[];
  }

  /** A local HTTP web server instance returned by `createServer`. */
  interface WebServer {
    /**
     * Listens for requests on the given port. If the port is already in use, or
     * this instance is already listening, an error will be returned.
     * @param callback Fired with the status of the request.
     */
    listen(callback: CallbackFunction<any>): void;
    /**
     * Closes the web server. It can be re-opened again.
     */
    close(): void;
    /**
     * Fired when the web server receives an incoming request. The event
     * contains three strings: 'url', 'content' and 'contentType'.
     */
    onRequest: Event<RequestEvent>;
  }

  /** A WebSocket client instance returned by `createWebSocket`. */
  interface WebSocket {
    /**
     * Listens for requests on the given port.
     * @param callback
     */
    connect(callback: CallbackFunction<Result>): void;
    /**
     * Send message.
     * @param message
     * @param callback
     */
    send(message: string, callback: CallbackFunction<Result>): void;
    /**
     * Closes the websocket. It can be re-opened again.
     */
    close(): void;
    /**
     * Fired when the websocket receives an incoming message.
     */
    onMessage: Event<MessageEvent>;
    /**
     * Fired on error.
     */
    onError: Event<ErrorEvent>;
    /**
     * Fired on websocket connection Opened.
     */
    onOpen: Event<{}>;
    /**
     * Fired when connection closed.
     */
    onClosed: Event<ClosedEvent>;
  }

  /** A single HTTP header key-value pair used in a fetch request. */
  interface FetchHeader {
    /** The header field name. */
    key: string;
    /** The header field value. */
    value: string;
  }

  /** Result of `createServer`, containing the new `WebServer` instance. */
  interface CreateServerResult extends Result {
    /** The created web server instance. */
    server?: WebServer;
  }

  /** Result of `createWebSocket`, containing the new `WebSocket` client instance. */
  interface CreateWebSocketResult extends Result {
    /** The created WebSocket client instance. */
    client?: WebSocket;
  }

  /** Result of a `sendHttpRequest` call, containing the HTTP status code and response body. */
  interface SendHttpRequestResult extends Result {
    /** The HTTP status code returned by the server. */
    statusCode?: number;
    /** The response body as a string. */
    data?: string;
  }

  /** Describes an incoming HTTP request received by a `WebServer`. */
  interface RequestEvent {
    /** The request URL path. */
    url: string;
    /** The request body content. */
    content: string;
    /** The MIME type of the request body. */
    contentType: string;
  }

  /** Describes a message received on a WebSocket connection. */
  interface MessageEvent {
    /** The message payload. */
    message: string;
    /** The type of the message frame. */
    type: overwolf.web.enums.MessageType;
  }

  /** Describes an error that occurred on a WebSocket connection. */
  interface ErrorEvent {
    /** A human-readable description of the error. */
    message: string;
    /** The underlying exception object, if available. */
    exception: any;
  }

  /** Describes the reason a WebSocket connection was closed. */
  interface ClosedEvent {
    /** The WebSocket close status code. */
    code: number;
    /** A human-readable explanation for why the connection was closed. */
    reason: string;
  }

  /**
   * Creates a local HTTP web server on the specified port. The returned
   * `WebServer` instance must have its `listen` method called before it will
   * accept connections.
   * @param port The port number to bind the server to.
   * @param callback Called with the result, including the new `WebServer` instance on success.
   */
  function createServer(
    port: number,
    callback: CallbackFunction<CreateServerResult>
  ): void;

  /**
   * Creates a WebSocket client connection to localhost/127.0.0.1, bypassing
   * certificate verification. Call `connect` on the returned `WebSocket`
   * instance to open the connection.
   * @param connectionParams Connection parameters including port, protocol list, and optional credentials.
   * @param callback Called with the result, including the new `WebSocket` client instance on success.
   */
  function createWebSocket(
    connectionParams: WebSocketConnectionParams,
    callback: CallbackFunction<CreateWebSocketResult>
  ): void;

/**
   * Send an https request (of different methods) to localhost/127.0.0.1
   * while by-passing a valid certificate verification.
   * @param url
   * @param method
   * @param headers
   * @param data
   * @param callback
   */
  function sendHttpRequest(
    url: string,
    method: enums.HttpRequestMethods,
    headers: FetchHeader[],
    data: string,
    callback: CallbackFunction<SendHttpRequestResult>
  ): void;
}

declare namespace overwolf.logitech {
  /** Information about a connected Logitech peripheral device. */
  interface Device {
    /** The display name of the device. */
    name: string;
    /** The USB product ID of the device. */
    pid: number;
    /** The numeric ID of the device's lighting zone. */
    lightingId: number;
    /** The display name of the device's lighting zone. */
    lightingName: string;
    /** The numeric type identifier of the device. */
    typeId: number;
    /** The display name of the device type. */
    typeName: string;
  }

  /** Result containing the installed LGS version string. */
  interface GetVersionResult extends Result {
    /** The version string of the currently installed Logitech Gaming Software. */
    version?: string;
  }

  /** Result containing the list of connected Logitech devices. */
  interface GetDevicesResult extends Result {
    /** An array of connected Logitech peripheral devices. */
    devices?: Device[];
  }

  /**
   * Gets the current version of the LGS.
   * @param callback Called with the version of LGS currently installed.
   */
  function getVersion(callback: CallbackFunction<GetVersionResult>): void;

/**
   * Gets the currently installed Logitech devices.
   * @param callback Called with the current device information.
   */
  function getDevices(callback: CallbackFunction<GetDevicesResult>): void;
}

declare namespace overwolf.logitech.led {
  namespace enums {
    /** Logical names for individual keys on a Logitech per-key RGB keyboard. */
    const enum KeyboardNames {
      /** Escape key. */
      ESC = "ESC",
      /** F1 function key. */
      F1 = "F1",
      /** F2 function key. */
      F2 = "F2",
      /** F3 function key. */
      F3 = "F3",
      /** F4 function key. */
      F4 = "F4",
      /** F5 function key. */
      F5 = "F5",
      /** F6 function key. */
      F6 = "F6",
      /** F7 function key. */
      F7 = "F7",
      /** F8 function key. */
      F8 = "F8",
      /** F9 function key. */
      F9 = "F9",
      /** F10 function key. */
      F10 = "F10",
      /** F11 function key. */
      F11 = "F11",
      /** F12 function key. */
      F12 = "F12",
      /** Print Screen key. */
      PRINT_SCREEN = "PRINT_SCREEN",
      /** Scroll Lock key. */
      SCROLL_LOCK = "SCROLL_LOCK",
      /** Pause/Break key. */
      PAUSE_BREAK = "PAUSE_BREAK",
      /** Tilde/backtick key. */
      TILDE = "TILDE",
      /** Number 1 key. */
      ONE = "ONE",
      /** Number 2 key. */
      TWO = "TWO",
      /** Number 3 key. */
      THREE = "THREE",
      /** Number 4 key. */
      FOUR = "FOUR",
      /** Number 5 key. */
      FIVE = "FIVE",
      /** Number 6 key. */
      SIX = "SIX",
      /** Number 7 key. */
      SEVEN = "SEVEN",
      /** Number 8 key. */
      EIGHT = "EIGHT",
      /** Number 9 key. */
      NINE = "NINE",
      /** Number 0 key. */
      ZERO = "ZERO",
      /** Minus/hyphen key. */
      MINUS = "MINUS",
      /** Equals key. */
      EQUALS = "EQUALS",
      /** Backspace key. */
      BACKSPACE = "BACKSPACE",
      /** Insert key. */
      INSERT = "INSERT",
      /** Home key. */
      HOME = "HOME",
      /** Page Up key. */
      PAGE_UP = "PAGE_UP",
      /** Num Lock key. */
      NUM_LOCK = "NUM_LOCK",
      /** Numpad slash (divide) key. */
      NUM_SLASH = "NUM_SLASH",
      /** Numpad asterisk (multiply) key. */
      NUM_ASTERISK = "NUM_ASTERISK",
      /** Numpad minus key. */
      NUM_MINUS = "NUM_MINUS",
      /** Tab key. */
      TAB = "TAB",
      /** Q key. */
      Q = "Q",
      /** W key. */
      W = "W",
      /** E key. */
      E = "E",
      /** R key. */
      R = "R",
      /** T key. */
      T = "T",
      /** Y key. */
      Y = "Y",
      /** U key. */
      U = "U",
      /** I key. */
      I = "I",
      /** O key. */
      O = "O",
      /** P key. */
      P = "P",
      /** Open bracket key (`[`). */
      OPEN_BRACKET = "OPEN_BRACKET",
      /** Close bracket key (`]`). */
      CLOSE_BRACKET = "CLOSE_BRACKET",
      /** Backslash key (`\`). */
      BACKSLASH = "BACKSLASH",
      /** Delete key (main keyboard). */
      KEYBOARD_DELETE = "KEYBOARD_DELETE",
      /** End key. */
      END = "END",
      /** Page Down key. */
      PAGE_DOWN = "PAGE_DOWN",
      /** Numpad 7 key. */
      NUM_SEVEN = "NUM_SEVEN",
      /** Numpad 8 key. */
      NUM_EIGHT = "NUM_EIGHT",
      /** Numpad 9 key. */
      NUM_NINE = "NUM_NINE",
      /** Numpad plus key. */
      NUM_PLUS = "NUM_PLUS",
      /** Caps Lock key. */
      CAPS_LOCK = "CAPS_LOCK",
      /** A key. */
      A = "A",
      /** S key. */
      S = "S",
      /** D key. */
      D = "D",
      /** F key. */
      F = "F",
      /** G key. */
      G = "G",
      /** H key. */
      H = "H",
      /** J key. */
      J = "J",
      /** K key. */
      K = "K",
      /** L key. */
      L = "L",
      /** Semicolon key. */
      SEMICOLON = "SEMICOLON",
      /** Apostrophe/single-quote key. */
      APOSTROPHE = "APOSTROPHE",
      /** Enter/Return key. */
      ENTER = "ENTER",
      /** Numpad 4 key. */
      NUM_FOUR = "NUM_FOUR",
      /** Numpad 5 key. */
      NUM_FIVE = "NUM_FIVE",
      /** Numpad 6 key. */
      NUM_SIX = "NUM_SIX",
      /** Left Shift key. */
      LEFT_SHIFT = "LEFT_SHIFT",
      /** Z key. */
      Z = "Z",
      /** X key. */
      X = "X",
      /** C key. */
      C = "C",
      /** V key. */
      V = "V",
      /** B key. */
      B = "B",
      /** N key. */
      N = "N",
      /** M key. */
      M = "M",
      /** Comma key. */
      COMMA = "COMMA",
      /** Period key. */
      PERIOD = "PERIOD",
      /** Forward slash key. */
      FORWARD_SLASH = "FORWARD_SLASH",
      /** Right Shift key. */
      RIGHT_SHIFT = "RIGHT_SHIFT",
      /** Up arrow key. */
      ARROW_UP = "ARROW_UP",
      /** Numpad 1 key. */
      NUM_ONE = "NUM_ONE",
      /** Numpad 2 key. */
      NUM_TWO = "NUM_TWO",
      /** Numpad 3 key. */
      NUM_THREE = "NUM_THREE",
      /** Numpad Enter key. */
      NUM_ENTER = "NUM_ENTER",
      /** Left Control key. */
      LEFT_CONTROL = "LEFT_CONTROL",
      /** Left Windows key. */
      LEFT_WINDOWS = "LEFT_WINDOWS",
      /** Left Alt key. */
      LEFT_ALT = "LEFT_ALT",
      /** Spacebar. */
      SPACE = "SPACE",
      /** Right Alt key. */
      RIGHT_ALT = "RIGHT_ALT",
      /** Right Windows key. */
      RIGHT_WINDOWS = "RIGHT_WINDOWS",
      /** Application/context menu key. */
      APPLICATION_SELECT = "APPLICATION_SELECT",
      /** Right Control key. */
      RIGHT_CONTROL = "RIGHT_CONTROL",
      /** Left arrow key. */
      ARROW_LEFT = "ARROW_LEFT",
      /** Down arrow key. */
      ARROW_DOWN = "ARROW_DOWN",
      /** Right arrow key. */
      ARROW_RIGHT = "ARROW_RIGHT",
      /** Numpad 0 key. */
      NUM_ZERO = "NUM_ZERO",
      /** Numpad period/decimal key. */
      NUM_PERIOD = "NUM_PERIOD",
    }

    /** Logitech device lighting type, used to target devices by their lighting capability. */
    const enum LogitechDeviceLightingType {
      /** Single-color (monochrome) lighting. */
      Mono = "Mono",
      /** Zone-based RGB lighting. */
      RGB = "RGB",
      /** Per-key RGB lighting. */
      PerkeyRGB = "PerkeyRGB",
      /** All connected Logitech lighting devices. */
      All = "All",
    }
  }

  /** Raw byte array type used to pass bitmap data for LED lighting. */
  type ByteArray = Int8Array;

  /**
   * Initializes the LED API.
   * @param callback A callback with the result of the request.
   */
  function init(callback: CallbackFunction<Result>): void;

  /**
   * Sets the target devices to use.
   * @param targetDevices An array of
   * @param callback A callback with the result of the request.
   */
  function setTargetDevice(
    targetDevices: enums.LogitechDeviceLightingType[],
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Saves the current lighting.
   * @param callback A callback with the result of the request.
   */
  function saveCurrentLighting(callback: CallbackFunction<Result>): void;

  /**
   * Sets the lighting for the entire device.
   * @param redPercentage Red percentage (0 - 100)
   * @param greenPercentage Green percentage (0 - 100)
   * @param bluePercentage Blue percentage (0 - 100)
   * @param callback A callback with the result of the request.
   */
  function setLighting(
    redPercentage: number,
    greenPercentage: number,
    bluePercentage: number,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Restores the lightning to the last previously saved state.
   * @param callback A callback with the result of the request.
   */
  function restoreLighting(callback: CallbackFunction<Result>): void;

  /**
   * Flashes the lighting on the device.
   * @param redPercentage Red percentage (0 - 100)
   * @param greenPercentage Green percentage (0 - 100)
   * @param bluePercentage Blue percentage (0 - 100)
   * @param milliSecondsDuration The duration to flash in milliseconds.
   * @param milliSecondsInterval The interval for flashes in milliseconds.
   * @param callback A callback with the result of the request.
   */
  function flashLighting(
    redPercentage: number,
    greenPercentage: number,
    bluePercentage: number,
    milliSecondsDuration: number,
    milliSecondsInterval: number,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Pulses the lighting on the device.
   * @param redPercentage Red percentage (0 - 100)
   * @param greenPercentage Green percentage (0 - 100)
   * @param bluePercentage Blue percentage (0 - 100)
   * @param milliSecondsDuration The duration to flash in milliseconds.
   * @param milliSecondsInterval The interval for flashes in milliseconds.
   * @param callback A callback with the result of the request.
   */
  function pulseLighting(
    redPercentage: number,
    greenPercentage: number,
    bluePercentage: number,
    milliSecondsDuration: number,
    milliSecondsInterval: number,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Stops ongoing pulse/flash effects.
   * @param callback A callback with the result of the request.
   */
  function stopEffects(callback: CallbackFunction<Result>): void;

  /**
   * Sets the lighting from an overwolf-extension:// or overwolf-media:// url.
   * The file must be 21x6.
   * @param bitmapUrl The Overwolf url to add.
   * @param callback A callback with the result of the request.
   */
  function setLightingFromBitmap(
    bitmapUrl: string,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Sets the lighting from a bitmap byte array.
   * @param bitmap A byte array representing a 21x6 bitmap.
   * @param callback A callback with the result of the request.
   */
  function setLightingFromBitmap(
    bitmap: ByteArray,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Sets the lighting for a specific key by scan code.
   * @param keyCode The key scan code.
   * @param redPercentage Red percentage (0 - 100)
   * @param greenPercentage Green percentage (0 - 100)
   * @param bluePercentage Blue percentage (0 - 100)
   * @param callback A callback with the result of the request.
   */
  function setLightingForKeyWithScanCode(
    keyCode: number,
    redPercentage: number,
    greenPercentage: number,
    bluePercentage: number,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Sets the lighting for a specific key by HID code.
   * @param keyCode The key HID code.
   * @param redPercentage Red percentage (0 - 100)
   * @param greenPercentage Green percentage (0 - 100)
   * @param bluePercentage Blue percentage (0 - 100)
   * @param callback A callback with the result of the request.
   */
  function setLightingForKeyWithHidCode(
    keyCode: number,
    redPercentage: number,
    greenPercentage: number,
    bluePercentage: number,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Sets the lighting for a specific key by quartz code.
   * @param keyCode The key quartz code.
   * @param redPercentage Red percentage (0 - 100)
   * @param greenPercentage Green percentage (0 - 100)
   * @param bluePercentage Blue percentage (0 - 100)
   * @param callback A callback with the result of the request.
   */
  function setLightingForKeyWithQuartzCode(
    keyCode: number,
    redPercentage: number,
    greenPercentage: number,
    bluePercentage: number,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Sets the lighting for a specific key by key name.
   * @param keyName The key name. For a list of key names see
   * @param redPercentage Red percentage (0 - 100)
   * @param greenPercentage Green percentage (0 - 100)
   * @param bluePercentage Blue percentage (0 - 100)
   * @param callback A callback with the result of the request.
   */
  function setLightingForKeyWithKeyName(
    keyName: enums.KeyboardNames,
    redPercentage: number,
    greenPercentage: number,
    bluePercentage: number,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Saves the current lighting of a specific key.
   * @param keyName The key name. For a list of key names see
   * @param callback A callback with the result of the request.
   */
  function saveLightingForKey(
    keyName: enums.KeyboardNames,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Restores a previously saved lighting for a specific key.
   * @param keyName The key name. For a list of key names see
   * @param callback A callback with the result of the request.
   */
  function restoreLightingForKey(
    keyName: enums.KeyboardNames,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Flashes a single key.
   * @param keyName The key name. For a list of key names see
   * @param redPercentage Red percentage (0 - 100)
   * @param greenPercentage Green percentage (0 - 100)
   * @param bluePercentage Blue percentage (0 - 100)
   * @param milliSecondsDuration The duration to flash in milliseconds.
   * @param milliSecondsInterval The interval for flashes in milliseconds.
   * @param callback A callback with the result of the request.
   */
  function flashSingleKey(
    keyName: enums.KeyboardNames,
    redPercentage: number,
    greenPercentage: number,
    bluePercentage: number,
    milliSecondsDuration: number,
    milliSecondsInterval: number,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Pulses a single key.
   * @param keyName The key name. For a list of key names see
   * @param startRedPercentage >Red start percentage (0 - 100)
   * @param startGreenPercentage Green start percentage (0 - 100)
   * @param startBluePercentage Blue start percentage (0 - 100)
   * @param finishRedPercentage Red finish percentage (0 - 100)
   * @param finishGreenPercentage Green finish percentage (0 - 100)
   * @param finishBluePercentage Blue finish percentage (0 - 100)
   * @param milliSecondsDuration The duration to pulse in milliseconds.
   * @param isInfinite States whether the effect is infinite or not.
   * @param callback A callback with the result of the request.
   */
  function pulseSingleKey(
    keyName: enums.KeyboardNames,
    startRedPercentage: number,
    startGreenPercentage: number,
    startBluePercentage: number,
    finishRedPercentage: number,
    finishGreenPercentage: number,
    finishBluePercentage: number,
    milliSecondsDuration: number,
    isInfinite: boolean,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Stops ongoing pulse/flash effects on a specific key.
   * @param keyName The key name. For a list of key names see
   * @param callback A callback with the result of the request.
   */
  function stopEffectsOnKey(
    keyName: enums.KeyboardNames,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Shuts down the API.
   */
  function shutdown(): void;

/**
   * Triggered when an error occurs, sent with an error code.
   */
  const onError: Event<string>;
}

declare namespace overwolf.streaming {
  namespace enums {
    /** Error codes returned by capture and streaming operations. */
    const enum CaptureErrorCode {
      /** The operation completed successfully. */
      Success = 0,
      /** The output folder could not be created. */
      FolderCreation = 1,
      /** Ransomware protection prevented writing to the output folder. */
      RansomwareProtection = 2,
      /** A stream is already active. */
      AlreadyStreaming = 3,
      /** A required setting was not provided. */
      MissingSetting = 4,
      /** A setting value is invalid or misconfigured. */
      SettingError = 5,
      /** An internal OBS error occurred. */
      InternalOBSError = 6,
      /** Streaming is not allowed while in this game. */
      NotAllowedInGame = 7,
      /** High-performance capture is not supported on this hardware. */
      HighPerformanceCaptureNotSupported = 8,
      /** The operation requires an active game session. */
      NotInGame = 9,
      /** An unknown error occurred. */
      Unknown = 1000
    }

    /** Controls when the mouse cursor is captured in a stream. */
    const enum StreamMouseCursor {
      /** Capture the cursor in both game and desktop captures. */
      both = "both",
      /** Capture the cursor only when capturing the game window. */
      gameOnly = "gameOnly",
      /** Capture the cursor only when capturing the desktop. */
      desktopOnly = "desktopOnly",
      /** Never capture the mouse cursor. */
      none = "none"
    }

    /** Controls how Overwolf windows are handled when OBS is the streaming provider. */
    const enum ObsStreamingMode {
      /** OBS has no awareness of Overwolf windows. */
      OBSNoAwareness = "OBSNoAwareness",
      /** OBS is aware of and captures Overwolf windows. */
      OBSAwareness = "OBSAwareness",
      /** OBS is aware of Overwolf windows but hides them from the desktop view. */
      OBSAwarenessHideFromDeskTop = "OBSAwarenessHideFromDeskTop",
    }

    /** The streaming service or output provider to use. */
    const enum StreamingProvider {
      /** The provider could not be determined. */
      Unknown = "Unknown",
      /** Stream to Twitch. */
      Twitch = "Twitch",
      /** Record to a local video file. */
      VideoRecorder = "VideoRecorder",
      /** Stream to a custom RTMP endpoint. */
      RTMP = "RTMP",
    }

    /** Controls when an Overwolf window is included in a stream or recording. */
    const enum StreamingMode {
      /** Include the window in the stream only when it is visible. */
      WhenVisible = "WhenVisible",
      /** Always include the window in the stream, even if hidden. */
      Always = "Always",
      /** Never include the window in the stream. */
      Never = "Never",
    }

    /** The video encoder hardware/software backend to use. */
    const enum StreamEncoder {
      /** Intel Quick Sync Video encoder. */
      INTEL = "INTEL",
      /** Software x264 encoder. */
      X264 = "X264",
      /** NVIDIA NVENC encoder (legacy). */
      NVIDIA_NVENC = "NVIDIA_NVENC",
      /** NVIDIA NVENC encoder (new/updated). */
      NVIDIA_NVENC_NEW = "NVIDIA_NVENC_NEW",
      /** AMD Advanced Media Framework encoder. */
      AMD_AMF = "AMD_AMF",
    }

    /** Quality presets for the Intel Quick Sync encoder. */
    const enum StreamEncoderPreset_Intel {
      /** Low quality, lowest resource usage. */
      LOW = "LOW",
      /** Balanced quality and resource usage. */
      MEDIUM = "MEDIUM",
      /** High quality, highest resource usage. */
      HIGH = "HIGH",
    }

    /** Speed/quality presets for the x264 software encoder. */
    const enum StreamEncoderPreset_x264 {
      /** Fastest encoding, lowest quality. */
      ULTRAFAST = "ULTRAFAST",
      /** Very fast encoding with reduced quality. */
      SUPERFAST = "SUPERFAST",
      /** Fast encoding with moderate quality reduction. */
      VERYFAST = "VERYFAST",
      /** Faster than medium, slightly lower quality. */
      FASTER = "FASTER",
      /** Fast encoding preset. */
      FAST = "FAST",
      /** Balanced speed and quality. */
      MEDIUM = "MEDIUM",
      /** Slower encoding for better quality. */
      SLOW = "SLOW",
      /** Slower than slow for improved quality. */
      SLOWER = "SLOWER",
      /** Very slow encoding for near-maximum quality. */
      VERYSLOW = "VERYSLOW",
      /** Maximum compression quality regardless of time. */
      PLACEBO = "PLACEBO",
    }

    /** Quality presets for the AMD AMF encoder. */
    const enum StreamEncoderPreset_AMD_AMF {
      /** Automatically select the best preset. */
      AUTOMATIC = "AUTOMATIC",
      /** Balanced quality and performance. */
      BALANCED = "BALANCED",
      /** Optimized for encoding speed. */
      SPEED = "SPEED",
      /** Optimized for output quality. */
      QUALITY = "QUALITY",
      /** Ultra-low latency mode. */
      ULTRA_LOW_LATENCY = "ULTRA_LOW_LATENCY",
      /** Low latency mode. */
      LOW_LATENCY = "LOW_LATENCY",
    }

    /** Rate control modes for the AMD AMF encoder. */
    const enum StreamEncoderRateControl_AMD_AMF {
      /** Constant Bit Rate. */
      RC_CBR = "RC_CBR",
      /** Constant Quantization Parameter. */
      RC_CQP = "RC_CQP",
      /** Variable Bit Rate. */
      RC_VBR = "RC_VBR",
      /** Variable Bit Rate with minimum QP constraint. */
      RC_VBR_MINQP = "RC_VBR_MINQP",
    }

    /** Quality presets for NVIDIA NVENC encoder. */
    const enum StreamEncoderPreset_NVIDIA {
      /** Automatically select the best preset. */
      AUTOMATIC = "AUTOMATIC",
      /** The encoder's default preset. */
      DEFAULT = "DEFAULT",
      /** Optimized for high output quality. */
      HIGH_QUALITY = "HIGH_QUALITY",
      /** Optimized for high encoding performance. */
      HIGH_PERFORMANCE = "HIGH_PERFORMANCE",
      /** Preset tuned for Blu-ray disc output. */
      BLURAY_DISK = "BLURAY_DISK",
      /** Low latency encoding. */
      LOW_LATENCY = "LOW_LATENCY",
      /** High performance combined with low latency. */
      HIGH_PERFORMANCE_LOW_LATENCY = "HIGH_PERFORMANCE_LOW_LATENCY",
      /** High quality combined with low latency. */
      HIGH_QUALITY_LOW_LATENCY = "HIGH_QUALITY_LOW_LATENCY",
      /** Lossless encoding. */
      LOSSLESS = "LOSSLESS",
      /** High performance lossless encoding. */
      HIGH_PERFORMANCE_LOSSLESS = "HIGH_PERFORMANCE_LOSSLESS",
    }

    /** Rate control modes for the NVIDIA NVENC encoder. */
    const enum StreamEncoderRateControl_NVIDIA {
      /** Constant Bit Rate. */
      RC_CBR = "RC_CBR",
      /** Constant Quantization Parameter. */
      RC_CQP = "RC_CQP",
      /** Variable Bit Rate. */
      RC_VBR = "RC_VBR",
      /** Variable Bit Rate with minimum QP constraint. */
      RC_VBR_MINQP = "RC_VBR_MINQP",
      /** Two-pass VBR optimized for quality. */
      RC_2_PASS_QUALITY = "RC_2_PASS_QUALITY",
    }

    /** Rate control modes for the x264 software encoder. */
    const enum StreamEncoderRateControl_x264 {
      /** Constant Bit Rate. */
      RC_CBR = "RC_CBR",
      /** Constant Quantization Parameter. */
      RC_CQP = "RC_CQP",
      /** Variable Bit Rate. */
      RC_VBR = "RC_VBR",
      /** Variable Bit Rate with minimum QP constraint. */
      RC_VBR_MINQP = "RC_VBR_MINQP",
      /** Two-pass VBR optimized for quality. */
      RC_2_PASS_QUALITY = "RC_2_PASS_QUALITY",
    }

    /** The screen position where the recording indicator overlay is shown. */
    const enum IndicationPosition {
      /** No indicator is shown. */
      None = "None",
      /** Indicator appears in the top-left corner. */
      TopLeftCorner = "TopLeftCorner",
      /** Indicator appears in the top-right corner. */
      TopRightCorner = "TopRightCorner",
      /** Indicator appears in the bottom-left corner. */
      BottomLeftCorner = "BottomLeftCorner",
      /** Indicator appears in the bottom-right corner. */
      BottomRightCorner = "BottomRightCorner",
    }

    /** The visual style of the recording indicator overlay. */
    const enum IndicationType {
      /** No recording indicator is shown. */
      NoIndication = "NoIndication",
      /** A colored dot is shown. */
      Dot = "Dot",
      /** A colored dot with an elapsed-time timer is shown. */
      DotAndTimer = "DotAndTimer",
    }

    /** Determines the source used to establish the base video frame size. */
    const enum eVideoBaseFrameSizeSource {
      /** The base frame size is determined automatically. */
      Auto = "Auto",
      /** The base frame size is taken from the `StreamVideoOptions` settings. */
      Setting = "Setting",
    }

    /** The algorithm used to calculate the final encoded video frame size. */
    const enum eVideoFrameSizeCalcMethod {
      /** Use the original game resolution without modification. */
      Original = "Original",
      /** Use the exact requested resolution, or keep the aspect ratio if not achievable. */
      ExactOrKeepRatio = "ExactOrKeepRatio",
      /** Use the exact requested resolution, or the closest supported resolution. */
      ExactOrClosestResolution = "ExactOrClosestResolution",
    }
  }

  /**
   * Stream settings container.
   */
  interface GetWindowStreamingModeResult extends Result {
    /** The streaming mode string for the queried window. */
    streaming_mode?: string;
  }

  /**
   * Stream settings container.
   */
  interface StreamSettings {
    /**
     * The stream provider name.
     */
    provider?: enums.StreamingProvider;
    /**
     * The stream provider settings.
     */
    settings?: StreamParams;
  }

  /**
   * Represents the settings required to start a stream.
   */
  interface StreamParams {
    /**
     * The replay type to use.
     */
    replay_type?: media.replays.enums.ReplayType;
    /**
     * The basic stream information.
     */
    stream_info?: StreamInfo;
    /**
     * Stream authorization data.
     */
    auth?: StreamAuthParams;
    /**
     * Stream video options.
     */
    video?: StreamVideoOptions;
    /**
     * Stream audio options.
     */
    audio?: StreamAudioOptions;
    /**
     * Defines how peripherals (i.e. mouse cursor) are streamed.
     */
    peripherals?: StreamPeripheralsCaptureOptions;
    /**
     * Information on the server that is being streamed to.
     */
    ingest_server?: StreamIngestServer;
    /**
     * Max media folder size in GB. Deprecated
     */
    max_quota_gb?: number;

    /**
     * Quota information
     */
    quota?: StreamQuotaParams;
  }

  /** Basic metadata about the stream destination. */
  interface StreamInfo {
    /**
     * The URL where the stream can be watched.
     */
    url?: string;
    /**
     * The stream title.
     */
    title?: string;
  }

  /**
   * Stream authorization data.
   */
  interface StreamAuthParams {
    /**
     * The client id part of the authorization data. This part is usually
     * constant for each application.
     */
    client_id?: string;
    /**
     * The token part of the authorization data. This part if usually
     * user-specific, and received after login.
     */
    token?: string;
  }

  /**
   * Stream video options.
   */
  interface StreamVideoOptions {
    /**
     * Defines if to try to automatically calculate the kbps. If set to true,
     * then the max_kbps field is ignored.
     */
    auto_calc_kbps?: boolean;
    /**
     * Defines the Frames Per Second for the stream.
     */
    fps?: number;
    /**
     * Defines the stream width in pixels.
     */
    width?: number;
    /**
     * Defines the stream height in pixels.
     */
    height?: number;
    /**
     * Defines the maximum KB per second of the stream.
     */
    max_kbps?: number;
    /**
     * Defines the length of the buffer to be recorded in millisenconds (max 40
     * seconds)
     */
    buffer_length?: number;
    /**
     * The interval, in milliseconds, in which to test for dropped frames.
     */
    test_drop_frames_interval?: number;
    /**
     * The ratio of dropped to non-dropped frames for which to issue a
     * notification.
     */
    notify_dropped_frames_ratio?: number;
    /**
     * Defines file maximum size. when video reach `max_file_size_bytes`, the
     * recorder will flash the video file and stat a new video file.
     * `onFileSpilt` event will be fired.
     */
    max_file_size_bytes?: number;
    /**
     * In case `max_file_size_bytes` is on, full video will be recorded to disk,
     * parallel to splits videos.
     */
    include_full_size_video?: boolean;
    /**
     * Defines Sub folder for video file path destination (Optional).
     * OverwolfVideoFolder\AppName\<sub_folder_name>\<file_name> In case
     * `folder_name` is empty: `OverwolfVideoFolder\AppName\<sub_folder_name>`
     */
    sub_folder_name?: string;
    /**
     * Defines the video encoder settings to use.
     */
    encoder?: StreamingVideoEncoderSettings;
    /**
     * Defines the desktop streaming options.
     */
    capture_desktop?: StreamDesktopCaptureOptions;
    /**
     * Do not use Overwolf capture setting. In case True you must provider all
     * video setting (encoder..)
     */
    override_overwolf_setting?: boolean;
    /**
     * Do not start video replay service in case shared texture is not
     * supported.
     */
    disable_when_sht_not_supported?: boolean;
    /**
     * Position of the recorder indicator. Available for video capture only.
     */
    indication_position?: enums.IndicationPosition;
    /**
     * Type of the recorder indicator. Available for video capture only.
     */
    indication_type?: enums.IndicationType;

    /**
     *  use the app "short name" as the folder name, instead of using the app name from the manifest.
     */
    use_app_display_name?: boolean;

    /**
     * Add sources to video (currently only webcam is supported)
     */
    sources?: overwolf.media.replays.VideoSource[];

    /**
     * The method used to calculate the output frame size from the base frame size.
     */
    frame_size_method?: enums.eVideoFrameSizeCalcMethod;

    /**
     * The source used to determine the base frame size before applying `frame_size_method`.
     */
    base_frame_size_source?: enums.eVideoBaseFrameSizeSource;

    /**
     * When `true`, enables on-demand video file splitting via the `split` function.
     */
    enable_on_demand_split?: boolean;

    /**
     * Options controlling game window capture behavior.
     */
    game_window_capture?: GameWindowCapture;
    /**
     * Keep capturing the game when the game loses focus (i.e do not show "Be Right Back").
     * Note: if game is minimized, BRB will be shown.
     */
    keep_game_capture_on_lost_focus?: boolean;

    /**
     * Disables automatic shutdown of the streaming API once the targeted game session ended.
     */
    disable_auto_shutdown_on_game_exit?: boolean;
  }

  /**
   * Game window capture options.
   */
  interface GameWindowCapture {
    /** Enable game window capture when the game window is available. Disabled by default. */
    enable_when_available: boolean; //Disabled by default
    /** Whether to capture Overwolf windows on top of the game. Default value is taken from the Overwolf Settings */
    capture_overwolf_windows: boolean; //Default value is taken from the Overwolf Settings
  }

  /**
   * Defines the video encoder settings.
   */
  interface StreamingVideoEncoderSettings {
    /**
     * Defines which video encoder to use.
     */
    name?: enums.StreamEncoder;
    /**
     * Defines the settings of the specific encoder.
     */
    config?:
    | StreamingVideoEncoderNVIDIA_NVENCSettings
    | StreamingVideoEncoderIntelSettings
    | StreamingVideoEncoderx264Settings
    | StreamingVideoEncoderAMD_AMFSettings;
  }

  /**
   * Defines the configuration for the NVIDIA NVENC encoder.
   */
  interface StreamingVideoEncoderNVIDIA_NVENCSettings {
    /**
     * Defines which preset the encoder should use.
     */
    preset?: enums.StreamEncoderPreset_NVIDIA;
    /**
     * Defines the rate control mode the encoder should use.
     */
    rate_control?: enums.StreamEncoderRateControl_NVIDIA;
    /**
     * Defines the time, in seconds, after which to send a keyframe.
     */
    keyframe_interval: number;
  }

  /**
   * Defines the configuration for an Intel encoder.
   */
  interface StreamingVideoEncoderIntelSettings { }

  /**
   * Defines the configuration for an x264 encoder.
   */
  interface StreamingVideoEncoderx264Settings {
    /**
     * Defines which preset the encoder should use.
     */
    preset?: enums.StreamEncoderPreset_x264;
    /**
     * Defines the rate control mode the encoder should use.
     */
    rate_control?: enums.StreamEncoderRateControl_x264;
    /**
     * Defines the number of frames after which to send a keyframe.
     */
    keyframe_interval: number;
  }

  /**
   * Defines the configuration for the AMD AMF encoder.
   */
  interface StreamingVideoEncoderAMD_AMFSettings {
    /**
     * Defines which preset the encoder should use.
     */
    preset?: enums.StreamEncoderPreset_AMD_AMF;
    /**
     * Defines the rate control mode the encoder should use.
     */
    rate_control?: enums.StreamEncoderRateControl_AMD_AMF;
    /**
     * Defines the time, in seconds, after which to send a keyframe.
     */
    keyframe_interval: number;
  }

  /**
   * Stream desktop capture options.
   */
  interface StreamDesktopCaptureOptions {
    /**
     * Defines if to capture the desktop while game is not running or not in
     * focus.
     */
    enable: boolean;
    /**
     * Defines which monitor to stream when streaming desktop.
     */
    monitor_id?: number;
    /**
     * Defines if to force desktop streaming even when a game is in foreground.
     */
    force_capture?: boolean;
  }

  /**
   * Stream audio options.
   */
  interface StreamAudioOptions {
    /**
     * Defines the microphone volume as applied to the stream.
     */
    mic?: StreamDeviceVolume;
    /**
     * Defines the microphone volume as applied to the stream in a range of 0 to 100.
     */
    mic_volume?: number;
    /**
     * Defines the game volume as applied to the stream.
     */
    game?: GameAudioDevice;
    /**
     * Defines the game volume as applied to the stream in a range of 0 to 100.
     */
    game_volume?: number;
    /**
    * Enable multiple audio tracks: Track 1: Microphone + Desktop, Track 2: Desktop output, Track 3: Microphone input.
    */
    separate_tracks?: boolean;
  }

  /**
   * Defines a device volume and enablement settings.
   */
  interface StreamDeviceVolume {
    /**
     * Defines if the device is enabled.
     */
    enable?: boolean;
    /**
     * Defines the device volume in the range of 0 to 100.
     */
    volume?: number;
    /**
     * Defines the device ID to use.
     */
    device_id?: string;
  }

  /**
   * Defines game volume and enablement settings.
   */
  interface GameAudioDevice extends StreamDeviceVolume {
    /** Options controlling which game processes have their audio captured. */
    filtered_capture: GameCaptureOptions;
  }

  /**
   * Returns the list of apps currently recording or streaming.
   * @param callback Called with the list of active recording apps.
   */
  function getActiveRecordingApps(
    callback: CallbackFunction<GetActiveRecordingAppsResult>
  ): void;

  /** Result of `getActiveRecordingApps`, listing apps that are currently capturing. */
  interface GetActiveRecordingAppsResult extends Result {
    /** An array of apps that are currently streaming or recording. */
    streaming: ActiveRecordingApps[];
  }

  /** Identifies an app that is currently recording or streaming. */
  interface ActiveRecordingApps {
    /** The unique ID of the recording app. */
    uid: string;
    /** The display name of the recording app. */
    displayName: string;
  }

  /** Options for filtering which game processes have their audio captured. */
  interface GameCaptureOptions {
    /** Whether filtered game audio capture is enabled. */
    enable: boolean;
    /** Additional process names (beyond the main game process) to include in audio capture. */
    additional_process_names: string[];
  }

  /**
   * Stream capture options for peripheral devices.
   */
  interface StreamPeripheralsCaptureOptions {
    /**
     * Defines when to capture the mouse cursor while streaming is on.
     */
    capture_mouse_cursor: enums.StreamMouseCursor;
  }

  /**
   * Information on the server that is being streamed to.
   */
  interface StreamIngestServer {
    /**
     * The server name that is being streamed to.
     */
    name: string;
    /**
     * The server's url template. Use the token {stream_key} to specify the
     * stream key in the url.
     */
    template_url: string;
  }

  /**
   * Basic quota information
   */
  interface StreamQuotaParams {
    /** The maximum total size of media files in gigabytes before old files are pruned. */
    max_quota_gb: number;
    /** Directories to exclude from quota calculation. */
    excluded_directories?: string[];
  }

  /**
   * A settings container for a stream Overwolf watermark settings.
   */
  interface WatermarkSettings {
    /**
     * Determines whether or not to display the Overwolf watermark on the
     * stream.
     */
    showWatermark: boolean;
  }

  /** Metadata describing an available video encoder. */
  interface EncoderData {
    /** The internal name of the encoder. */
    name: string;
    /** The human-readable display name of the encoder. */
    display_name: string;
    /** Whether this encoder is currently enabled and usable. */
    enabled: boolean;
    /** The list of preset names supported by this encoder. */
    presets: string[];
    /** Whether the encoder passed validation and is ready for use. */
    valid: boolean;
    /** A vendor-level error string, if any. */
    vendor_error: string;
    /** A human-readable description of any encoder error. */
    error_decsription: string;
  }

  /** Metadata describing an available audio device. */
  interface AudioDeviceData {
    /** The human-readable display name of the audio device. */
    display_name: string;
    /** The unique system identifier of the audio device. */
    device_id: string;
    /** Whether the device supports audio recording (input). */
    can_record: boolean;
    /** Whether the device supports audio playback (output). */
    can_playback: boolean;
    /** The current state of the device (e.g. active, disabled). */
    device_state: string;
    /** The settings identifier for this device. */
    device_setting_id: string;
  }

  /** Result of `start`, containing the ID of the newly created stream. */
  interface StreamResult extends StartCaptureResult {
    /** The ID assigned to the started stream. */
    stream_id?: number;
  }

  /** Base result for capture start operations, including error details. */
  interface StartCaptureResult extends Result {
    /** The error code describing the outcome of the capture start attempt. */
    errorCode: enums.CaptureErrorCode;
    /** A human-readable description of the error, if any. */
    errorDescription: string;
  }

  /** Event data for streaming lifecycle events such as start and error. */
  interface StreamEvent {
    /** The ID of the affected stream. */
    stream_id?: number;
    /** An optional sub-error message with additional detail. */
    SubErrorMessage?: string;
    /** Whether the stream is capturing the game window specifically. */
    is_game_window_capture?: boolean;
  }

  /** Result of `getWatermarkSettings`. */
  interface GetWatermarkSettingsResult extends Result {
    /** Whether the Overwolf watermark is currently enabled on the stream. */
    showWatermark: boolean;
  }

  /** Result of `getWindowStreamingMode` for a specific window. */
  interface GetWindowStreamingModeResult extends Result {
    /** The current streaming mode string for the queried window. */
    streaming_mode?: string;
  }

  /** Result of `getStreamEncoders`, listing available video encoders. */
  interface GetStreamEncodersResult extends Result {
    /** The status string of the request. */
    status: string;
    /** An array of available encoder descriptors. */
    encoders?: EncoderData[];
  }

  /** Result of `getCapabilities`, describing what the current system supports. */
  interface StreamingCapabilities extends Result {
    /** Available video encoders on this system. */
    video?: EncoderData[];
    /** Available audio devices on this system. */
    audio?: AudioDeviceData[];
    /** Whether per-process audio capture is supported on this system. */
    audioProcessCaptureSupported?: boolean;
  }

  /** Result of `getAudioDevices`, listing available audio input and output devices. */
  interface GetAudioDevicesResult extends Result {
    /** An array of available audio devices. */
    devices?: AudioDeviceData[];
    /** The system's default recording (input) device ID. */
    default_recording_device_id?: string;
    /** The system's default playback (output) device ID. */
    default_playback_device_id?: string;
  }

  /** Result of a `split` operation. */
  interface SplitResult extends Result { }

  /** Event data fired when the stream's image source changes (e.g. switches between game and desktop). */
  interface StreamingSourceImageChangedEvent {
    /** The ID of the stream whose source changed. */
    stream_id: number;
    /** The previous image source identifier. */
    old_source: string;
    /** The new image source identifier. */
    new_source: string;
  }

  /** Event data fired when a stream stops. */
  interface StopStreamingEvent {
    /** The ID of the stream that stopped. */
    stream_id: number;
    /** The URL the stream was broadcasting to, if applicable. */
    url: string;
    /** The path to the recorded video file, if applicable. */
    file_path: string;
    /** The total duration of the stream in milliseconds. */
    duration: number;
    /** The path to the last video file segment written. */
    last_file_path: string;
    /** Whether the recording was split into multiple files. */
    split: boolean;
    /** Extra metadata associated with the stream session. */
    extra: string;
    /** The OS version string of the system. */
    osVersion: string;
    /** The OS build string of the system. */
    osBuild: string;
    /** The total number of frames captured during the stream. */
    total_frames: number;
  }

  /** Result of `stop`, describing the completed stream session. */
  interface StopStreamingResult extends Result {
    /** The ID of the stream that was stopped. */
    stream_id: number;
    /** The URL the stream was broadcasting to, if applicable. */
    url: string;
    /** The path to the recorded video file. */
    file_path: string;
    /** The total duration of the stream in milliseconds. */
    duration: number;
    /** The path to the last video file segment written. */
    last_file_path: string;
    /** Whether the recording was split into multiple files. */
    split: boolean;
    /** Extra metadata associated with the stream session. */
    extra: string;
    /** The OS version string of the system. */
    osVersion: string;
    /** The OS build string of the system. */
    osBuild: string;
  }

  /** Event data fired when a video file is split due to reaching the size limit. */
  interface VideoFileSplitedEvent {
    /** The ID of the stream whose file was split. */
    stream_id: number;
    /** The name of the completed file segment. */
    file_name: string;
    /** The duration of the completed file segment in milliseconds. */
    duration: number;
    /** The sequential index of this file segment. */
    count: number;
    /** The file path of the next segment that recording will continue into. */
    next_file: string;
  }

  /** Event data fired when the set of supported encoders changes. */
  interface SupportedEncodersUpdatedEvent {
    /** The updated array of available encoder descriptors. */
    encoders?: EncoderData[];
  }

  /**
   * Start a new stream.
   * @param settings The stream settings.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function start(
    settings: StreamSettings,
    callback: CallbackFunction<StreamResult>
  ): void;

  /**
   * Stops the given stream.
   * @param streamId The id of the stream to stop.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function stop(
    streamId: number,
    callback?: (result: StreamResult | StopStreamingResult) => void
  ): void;

  /**
   * Request to split video now.
   * @param streamId The id of the stream to split.
   * @param callback A callback function which will be called with the status of
   * the request.
   */
  function split(
    streamId: number,
    callback: CallbackFunction<SplitResult>
  ): void;

  /**
   * Changes the volume of the stream.
   * @param streamId The id of the stream on which the volume is changed.
   * @param audioOptions The new volumes encapsulated in an object.
   * @param callback A function that will be called with success or error
   * status.
   */
  function changeVolume(
    streamId: number,
    audioOptions: any,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Sets the watermark settings.
   * @param settings The new watermark settings.
   * @param callback A callback to call when done setting the new watermark
   * settings.
   */
  function setWatermarkSettings(
    settings: WatermarkSettings,
    callback?: CallbackFunction<Result>
  ): void;

  /**
   * Gets the watermark settings.
   * @param callback A function that will be called with a JSON containing the
   * status and the watermark settings if successful or an error message if not.
   */
  function getWatermarkSettings(
    callback: CallbackFunction<GetWatermarkSettingsResult>
  ): void;

  /**
   * Call the given callback function with the window's streaming mode as a
   * parameter.
   * @param windowId The id of the window for which to get the streaming mode.
   * @param callback The callback function to call with the window's streaming
   * mode as a parameter.
   */
  function getWindowStreamingMode(
    windowId: string,
    callback: CallbackFunction<GetWindowStreamingModeResult>
  ): void;

  /**
   * Set the window's stream mode.
   * @param windowId The id of the window for which to set the streaming mode.
   * @param streamingMode The desired streaming mode.
   * @param callback A function called after streaming mode was set indicating
   * success, or error in case of an error.
   */
  function setWindowStreamingMode(
    windowId: string,
    streamingMode: enums.StreamingMode,
    callback?: CallbackFunction<Result>
  ): void;

  /**
   * Sets the streaming mode for the window when using OBS.
   * @param windowId The id of the window for which to set the streaming mode.
   * @param obsStreamingMode The desired OBS streaming mode
   * @param callback A function called after streaming mode was set indicating
   * success, or error in case of an error.
   */
  function setWindowObsStreamingMode(
    windowId: string,
    obsStreamingMode: enums.ObsStreamingMode,
    callback?: CallbackFunction<Result>
  ): void;

  /**
   * Set a stream's Be Right Back image.
   * @param streamId The id of the stream for which to set the Be Right Back
   * image.
   * @param image The image to set, as an IMG object or a URL.
   * @param backgroundColor The color to paint the last game frame with before
   * overlaying the image.
   * @param callback A callback function to call with success or failure
   * indication.
   */
  function setBRBImage(
    streamId: number,
    image: any,
    backgroundColor: string,
    callback?: CallbackFunction<Result>
  ): void;

  /**
   * Update stream desktop capture options.
   * @deprecated Since version 0.155.
   * @param streamId The id of the stream for which to set the Be Right Back
   * image.
   * @param newOptions The updated desktop capture streaming options.
   * @param mouseCursorStreamingMethod The updated value of the mouse cursor
   * streaming method.
   * @param callback A callback function to call with success or failure
   * indication.
   */
  function updateStreamingDesktopOptions(
    streamId: number,
    newOptions: StreamDesktopCaptureOptions,
    mouseCursorStreamingMethod: enums.StreamMouseCursor,
    callback?: CallbackFunction<Result>
  ): void;

  /**
   * Returns an array of supported streaming encoders, with extra metadata for
   * each one.
   * @param callback A callback function to call with the array of encoders and
   * their metadata.
   */
  function getStreamEncoders(
    callback: CallbackFunction<GetStreamEncodersResult>
  ): void;

  /**
   * Returns an array of all audio devices that can be used.
   * @param callback A callback function to call with the array of audio devices
   * and their metadata.
   */
  function getAudioDevices(
    callback: CallbackFunction<GetAudioDevicesResult>
  ): void;

  /**
   * Returns the streaming capabilities of the current system.
   * @param callback Called with the system's streaming capabilities.
   */
  function getCapabilities(
    callback: CallbackFunction<StreamingCapabilities>
  ): void;

  /**
   * Fired when the stream started streaming a new image source (desktop, game).
   */
  const onStreamingSourceImageChanged: Event<StreamingSourceImageChangedEvent>;

  /**
   * Fired when the stream has stopped.
   */
  const onStopStreaming: Event<StopStreamingEvent>;

  /**
   * Fired when the stream has stopped.
   */
  const onStartStreaming: Event<StreamEvent>;

  /**
   * Fired upon an error with the stream.
   */
  const onStreamingError: Event<StreamEvent>;

  /**
   * Fired upon a warning with the stream.
   */
  const onStreamingWarning: Event<StreamEvent>;

  /**
   * Fired upon video file splited.
   */
  const onVideoFileSplited: Event<VideoFileSplitedEvent>;

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

/**
   * Writes error level log message to the common log.
   * @param msg The message to write to the log file.
   */
  function critical(msg: string): void;
}

declare namespace overwolf.os {

/**
   * Returns regional information about the user.
   * @param callback Called with the region info.
   */
  function getRegionInfo(callback: CallbackFunction<GetRegionInfoResult>): void;

  /** Result containing regional formatting information for the current user. */
  interface GetRegionInfoResult extends Result {
    /** The regional info object. */
    info: RegionInfo;
  }

  /** Regional formatting preferences for the current user's locale. */
  interface RegionInfo {
    /** The date format string used in the user's locale (e.g., `"MM/DD/YYYY"`). */
    date_format?: string;
    /** The time format string used in the user's locale (e.g., `"HH:mm"`). */
    time_format?: string;
    /** The currency symbol used in the user's locale (e.g., `"$"`). */
    currency_symbol?: string;
    /** Whether the user's locale uses the metric system. */
    is_metric?: boolean;
    /** The name of the user's locale or region. */
    name?: string;
  }
}

declare namespace overwolf.os.tray {
  /**
   * Create a tray icon for the calling extension with the supplied context menu object.
   * @param menu The menu object.
   * @param callback Called with the result.
   */
  function setMenu(
    menu: ExtensionTrayMenu,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Changes the tray icon to the image at the given file path.
   * @param path The path to the new icon image file.
   * @param callback Called with the result.
   */
  function changeIcon(
    path: string,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Changes the tray icon to the image at the given path within the specified storage space.
   * @param space The storage space where the icon file is located.
   * @param path The path to the new icon image file within the storage space.
   * @param callback Called with the result.
   */
  function changeIcon(
    space: extensions.io.enums.StorageSpace,
    path: string,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Restores the tray icon to the extension's default icon.
   * @param callback Called with the result.
   */
  function restoreIcon(
    callback: CallbackFunction<Result>
  ): void;

  /** Removes the tray icon for the calling extension. */
  function destroy(): void;

  /** The context menu displayed when the user right-clicks the tray icon. */
  interface ExtensionTrayMenu {
    /** The list of top-level menu items in the context menu. */
    menu_items: menu_item[];
  }

  /** A single item in the tray icon context menu. */
  interface menu_item {
    /** The visible label text for this menu item. */
    label?: string;
    /** A unique identifier for this menu item, returned in click events. */
    id?: string;
    /** Whether this menu item is clickable. Defaults to `true`. */
    enabled?: boolean;
    /** Nested sub-items that appear in a submenu under this item. */
    sub_items?: menu_item[];
  }

  /**
   * Fired when an item from the tray icon's context menu is selected.
   */
  const onMenuItemClicked: Event<onMenuItemClickedEvent>;

  /** Event data for a tray context menu item click. */
  interface onMenuItemClickedEvent {
    /** The `id` of the menu item that was clicked. */
    item: string;
  }

  /**
   * Fired when the tray icon is left clicked.
   */
  const onTrayIconClicked: Event<any>;

/**
   * Fired when the tray icon is double clicked.
   */
  const onTrayIconDoubleClicked: Event<any>;
}

declare namespace overwolf.extensions {
  /**
   * A union of all permission strings an app may request in its manifest.
   */
  type Permission =
    | "Camera"
    | "Microphone"
    | "Logging"
    | "Extensions"
    | "Streaming"
    | "DesktopStreaming"
    | "Profile"
    | "Clipboard"
    | "Hotkeys"
    | "Media"
    | "GameInfo"
    | "GameControl"
    | "FileSystem"
    | "LogitechLed"
    | "LogitechArx"
    | "OwWebview"
    | "VideoCaptureSettings";

  /** The type of an Overwolf extension. */
  const enum ExtensionType {
    /** A standard web-based Overwolf app. */
    WebApp = "WebApp",
    /** An Overwolf built-in extension. */
    BuiltIn = "BuiltIn",
    /** A Twitch-channel (TC) app. */
    TCApp = "TCApp",
    /** A giveaway extension. */
    Giveaway = "Giveaway",
    /** The Overwolf Store extension. */
    Store = "Store",
    /** A skin extension. */
    Skin = "Skin",
    /** A TypeScript-based skin extension. */
    TSSkin = "TSSkin",
    /** An extension that provides game events. */
    GameEventsProvider = "GameEventsProvider",
    /** The extension type could not be determined. */
    Unknown = "Unknown",
  }

  /** The update state of an extension. */
  const enum ExtensionUpdateState {
    /** The extension is up to date. */
    UpToDate = "UpToDate",
    /** A newer version of the extension is available for download. */
    UpdateAvailable = "UpdateAvailable",
    /** An update has been downloaded and is waiting for an app restart. */
    PendingRestart = "PendingRestart",
  }

  /**
   * Representation of manifest.json
   */
  interface Manifest {
    /**
     * Targets the manifest version you are working on. Currently there is only
     * one version, therefore this value is always "1"
     */
    manifest_version: number;
    /**
     * Declares the type of application. Can only be "WebApp"
     */
    type: "WebApp"; //should be changed in the future to the enum "ExtensionType"
    /**
     * Includes app metadata
     */
    meta: Metadata;

    /** The unique identifier (UID) of the extension. */
    UID: string;
    /**
     * 	An array of permissions that the app requires.
     */
    permissions: Permission[];
    /**
     * A list of additional meta-data on the app
     */
    data: WebAppSettings;
    /**
     * Increase the app's log file rotation (defaults to 10, max is 40).
     */
    max_rotation_log_files: number;
  }

  /** App metadata as declared in the manifest `meta` block. */
  interface Metadata {
    /**
     * Name of your app
     */
    name: string;
    /**
     * The app's developer
     */
    author: string;
    /**
     * Up to four dot-separated integers identifying the current app version.
     */
    version: string;
    /**
     * Minimum version of the Overwolf Client with which the app is compatible.
     * The format is similar to the "version" field.
     */
    "minimum-overwolf-version": string;
    /**
     * Minimum version of the Overwolf Game Events Provider with which the app
     * is compatible. The format is similar to the "version" field.
     */
    "minimum-gep-version"?: string;
    /**
     * Minimum version of the Overwolf Game Summary with which the app is
     * compatible. The format is similar to the "version" field.
     */
    "minimum-gs-version"?: string;
    /**
     * Your app's description in the Appstore tile. Limited to 180 characters.
     */
    description: string;
    /**
     * Short name of your app. Provide a short title that will fit in the dock
     * button area – 18 chars max.
     */
    dock_button_title: string;
    /**
     * A relative path from the app folder to the icon's png file. This is the
     * mouse-over (multi-colored) version of the icon that will be displayed on
     * the Overwolf dock. The icon dimensions should be 256×256 pixels, 72 PPI.
     * Overwolf will resize it to 37×37. Please make sure the png is smaller
     * than 30KB.
     */
    icon: string;
    /**
     * A relative path from the app folder to the icon's png file. This
     * grayscale version of the icon is for the default state that will be
     * displayed on the Overwolf dock. The icon dimensions should be 256×256
     * pixels, 72 PPI. Overwolf will resize it to 37×37. Please make sure the
     * png is smaller than 30KB
     */
    icon_gray: string;
    /**
     * A relative path from the app folder to the desktop shortcut icon's ico
     * file. This is a colored icon for the app's desktop shortcut.
     */
    launcher_icon: string;
    /**
     * A relative path from the app folder to the splash image icon's png file.
     * The image size should be 256x256px. If a this image is missing, Overwolf
     * will use the "icon" image as a splash image
     */
    splash_image: string;
    /**
     * A relative path from the app folder to the icon's png file. This is the
     * window task bar icon \ window header. The icon dimensions should be
     * 256x256 pixels.
     */
    window_icon: string;
  }

  /** The `data` block of the manifest, containing all app-level settings. */
  interface WebAppSettings {
    /**
     * An app can declare itself as targeted for one game or more.
     */
    game_targeting?: {
      /**
       * "all" – All games (e.g voice communication apps). "dedicated" –
       * Dedicated to a game or several games. "none" – No games.
       */
      type: "all" | "dedicated" | "none";
      /**
       * The game IDs that your app targets
       */
      game_ids?: number[];
    };
    /**
     * The name of the window (from the "windows" list) to initially load when
     * the app starts.
     */
    start_window: string;
    /**
     * A map from window names to window settings.
     */
    windows: Dictionary<ExtensionWindowData>;
    /**
     * Enable/Disable printing of ads log to the console. Default value is
     * "false".
     */
    enable_top_isolated_sites_console?: boolean;
    /**
     * A definition of external URLs the web app should be able to access.
     */
    externally_connectable?: { matches: string[]; };
    /**
     * Overrides the relative protocol with a preferred one.
     */
    protocol_override_domains?: Dictionary<string>;
    /**
     * Choose whether links in the app will be opened using the user's default
     * browser or Overwolf's browser. Possible values: "user" or "overwolf".
     */
    force_browser?: string;
    /**
     * @deprecated No longer supported
     *
     * Enable OSR/GPU acceleration if supported by this machine. Note: this flag
     * is still in Beta. It may not function as expected in some machines.
     */
    enable_osr_acceleration?: boolean;
    /**
     * A list of game ids for which game events are required.
     */
    game_events?: number[];
    /**
     * Disable the log file's 1000-line limitation. Note: Do not enable it
     * without Overwolf's approval.
     */
    disable_log_limit?: boolean;
    /**
     * Allows access to custom plugin dlls.
     */
    "extra-objects"?: Dictionary<{ file: string; class: string; }>;
    /**
     * Shortcut keys that trigger an app action.
     */
    hotkeys?: {
      [hotkeyName: string]: {
        /**
         * Name of the hotkey as it will appear in the Hotkey tab in the
         * settings.
         */
        title: string;
        /**
         * Defines the behavior of the hotkey.
         */
        "action-type"?: "toggle" | "custom";
        /**
         * The default key combination.
         */
        default?: string;
        /**
         * Defines the behavior of the hotkey.
         */
        passthrough?: boolean;
      };
    };
    /**
     * A list of content scripts to be loaded for specific windows.
     */
    content_scripts?: {
      /**
       * The list of windows for which to apply this content script.
       */
      windows?: string[];
      /**
       * The list of URLs for which to apply this content script.
       */
      matches?: string[];
      /**
       * The list of CSS files to be applied in this content script.
       */
      css?: string[];
      /**
       * The list of JS files to be applied in this content script.
       */
      js?: string[];
    }[];
    /**
     * A list of events causing the app to launch.
     */
    launch_events?: {
      /**
       * The type name of the event.
       */
      event: "GameLaunch" | "AllGamesLaunch" | "LaunchWithOverwolf";
      /**
       * The list of game class IDs for which the app will launch.
       */
      event_data?: {
        /**
         * The list of game class IDs for which the app will launch.
         */
        game_ids: number[];
        /**
         * The app won't start until the game's framerate will stabilize around
         * or above the stated framerate.
         */
        wait_for_stable_framerate: number[];
      };
      /**
       * The app's main window will start minimized.
       */
      start_minimized?: boolean;
      /**
       * The app will be launched when game launcher is detected.
       */
      include_launchers?: boolean;
    }[];
    /**
     * A custom user agent for the app to use when creating http requests. Note:
     * using 'navigator.userAgent' will not return the custom user agent, but
     * the default one.
     */
    user_agent?: string;
    /**
     * Disable opening of the developer tools for the app (with Ctrl+shift+I).
     * Default value – "false"
     */
    disable_dt?: boolean;
    /**
     * Hosting app flexible data.
     * If you app wants to provide some sort of service (like GS provides a
     * "tab-hosting" service for apps) - you can use this flag to set different
     * parameters that are relevant for the service provider app.
     */
    service_providers?: string;
    /**
     * Additional setting for developers.
     */
    developer?: {
      /**
       * Enable auto App reloading when detecting files changes. default is true
       */
      enable_auto_refresh: boolean;
      /**
       * 	Delay in milliseconds. When detecting file changes (for multiple
       * 	changes). default value is 1000 milliseconds (1 second)
       */
      reload_delay: number;
      /**
       * Filter files which will be tracked.e.g (.js;.html. default value is "."
       * -> all files, but you can use several value like ".json;.html"
       */
      filter: string;
    };
    /**
     * If set to true, app localStorage data will not be cleaned up after app uninstallation.
     * Default value – "false"
     */
    disable_cleanup?: boolean;
    /**
     * Allow overriding the OverwolfBrowser.exe process name in task manager.
     */
    process_name?: string;
    /**
     * Ability to open an application from a browser using a link.
     */
    url_protocol?: Dictionary<string>;
  }

  /** Per-window configuration declared in the manifest `data.windows` map. */
  interface ExtensionWindowData {
    /**
     * Points to a local HTML file to be loaded inside the window. If you wish
     * to host your app in a remote web-site, you'll have to have a local page
     * that redirects to that remote website. In such cases, you need to make
     * sure that the block_top_window_navigation property is set to false.
     */
    file: string;
    /**
     * Define if the window is displayed in the Windows taskbar and alt-tab
     * window selection menu.
     */
    show_in_taskbar?: boolean;
    /**
     * Indicates whether the window will be transparent and borderless. Any part
     * of your window with transparent background (`"background: transparent;"`)
     * will become a see-through area that blends with the game or desktop. If
     * set to false a standard Overwolf window will be created.
     */
    transparent?: boolean;
    /**
     * Indicates whether the window's locally saved data should be overridden
     * when the window's size/location/opacity changes after a version update.
     */
    override_on_update?: boolean;
    /**
     * Indicates whether the window can be resized.
     */
    resizable?: boolean;
    /**
     * Indicates whether to show the window minimize button. Only relevant when
     * not in transparent mode.
     */
    show_minimize?: boolean;
    /**
     * Indicates whether the window will not receive clicks in-game, instead,
     * the clicks will be passed on to the game. To change this property at
     * runtime, use setWindowStyle().
     */
    clickthrough?: boolean;
    /**
     * Indicates whether the   Mouse and keyboard input will pass to the window AND to the game (no input blocking). To change this property at
     * runtime, use setWindowStyle().
     */
    style?: overwolf.windows.enums.WindowStyle;
    /**
     * When set to true, disable right clicks entirely for this window.
     */
    disable_rightclick?: boolean;
    /**
     * Indicates whether this window should always be included in recordings,
     * overriding any other setting.
     */
    forcecapture?: boolean;
    /**
     * Indicates whether this window is visible only in streams (not visible to
     * the streamer), overriding any other setting.
     */
    show_only_on_stream?: boolean;
    /**
     * Indicates whether the window will receive keyboard events or pass them on
     * to the game.
     */
    ignore_keyboard_events?: boolean;
    /**
     * Marks the window as available in-game only (Not accessible on Desktop).
     */
    in_game_only?: boolean;
    /**
     * Marks the window as available on desktop only, and not in-game. This flag
     * should be used (set to "true") when "use_os_windowing" or "native_window"
     * flags are set to true. Note: using "desktop_only" and "native_window"
     * flags for desktop windows will dramatically improve your app's
     * performance.
     */
    desktop_only?: boolean;
    /**
     * Indicates whether the window will animate on minimize/restore while in
     * game.
     */
    disable_restore_animation?: boolean;
    /**
     * Indicates whether the in-game window will 'steal' the keyboard focus
     * automatically from the game when it opens, or leave the keyboard focus
     * untouched. Default value is false.
     */
    grab_keyboard_focus?: boolean;
    /**
     * Indicates whether the desktop window will grab the focus automatically
     * when it opens, or leave the focus untouched. Default value is true.
     */
    grab_focus_on_desktop?: boolean;
    /**
     * Defines the size of the window in pixels when it is first opened. If your
     * window is not resizable, this will be the constant size of your window.
     * However, if your app is resizable – the app size is saved by Overwolf
     * when closed so that the next time it is opened, it will preserve it.
     */
    size?: Size;
    /**
     * Defines the minimum size of the window in pixels.
     */
    min_size?: Size;
    /**
     * Defines the maximum size of the window in pixels.
     */
    max_size?: Size;
    /**
     * The default starting position of the window counted in pixels from the
     * top left corner of the screen.
     */
    start_position?: Point;
    /**
     * Indicates whether the window will be on top of other Overwolf windows.
     * Handle with care as topmost windows can negatively impact user experience.
     */
    topmost?: boolean;
    /**
    * Indicates whether the window will be on bottom of other Overwolf windows.
    * Handle with care as bottommost windows can negatively impact user experience.
    */
    bottommost?: boolean;
    /**
     * Refrain from non _blank elements from "taking-over" the entire app's
     * window.
     */
    block_top_window_navigation?: boolean;
    /**
     * Window location won't be changed when game focus is changed.
     */
    keep_window_location?: boolean;
    /**
     * When set to true, allows your window to have a full-screen maximize when
     * calling the overwolf.windows.maximize function, and a real taskbar
     * minimize when calling overwolf.windows.minimize. Note: Should only be
     * used with desktop_only windows.
     */
    use_os_windowing?: boolean;
    /**
     * Enables JS engine background optimization. Default value is true.
     */
    background_optimization?: boolean;
    /**
     * Mutes sounds in window.
     */
    mute?: boolean;
    /**
     * Excludes hosts list so a stream from these hosts origins will not get
     * muted even if the window is on "mute": true.
     */
    mute_excluded_hosts?: string[];
    /**
     * 	Prevents new browser windows being opened automatically using script.
     * 	Default value is false.
     */
    popup_blocker?: boolean;
    /**
     * Enables window maximize button. Relevant only for the standard Overwolf
     * window ("transparent": false) Default value is false.
     */
    show_maximize?: boolean;
    /**
     * Causes the app's window to never "lose focus", so the window.onblur event
     * is never triggered. Default value is false.
     */
    disable_blur?: boolean;
    /**
     * Creates a native CEF desktop only window (which improves performance)
     * Note: Should only be used with desktop_only windows. Default value is
     * false.
     */
    native_window?: boolean;
    /**
     * This flag MUST be used with background/hidden controller windows. Note:
     * With this flag set to 'true', there's no need to set window related
     * properties such as size, focus, transparency, etc.
     */
    is_background_page?: boolean;
    /**
     * Allows you to control the behavior of an app window while in a
     * "mouse-less" game state.
     */
    focus_game_takeover?: "ReleaseOnHidden" | "ReleaseOnLostFocus";
    /**
     * 	Allow Overwolf to display your app's hotkey combination on the screen
     * 	when the user switches to "exclusive mode". The string value should be
     * 	the hotkey name from the hotkeys section. Relevant only if you set
     * 	focus_game_takeover=ReleaseOnHidden.
     */
    focus_game_takeover_release_hotkey?: string;
    /**
     * 	Enable iframe isolation: runs it in a different process, so if some
     * 	iframe is misbehaving (e.g. memory leak, etc.) it won't crash your app
     * 	and will only crash the iframe process. useful with Overwolf ads that
     * 	run in an iframe. Note: Please contact us before adding it to your app.
     * 	Default value is true.
     */
    enable_top_isolation?: boolean;
    /**
     * Allows access to local files that are not located in your app's
     * (extension) folder. Default value is false.
     */
    allow_local_file_access?: boolean;
    /**
     * 	Blocks the user from closing the window by using Alt+F4. You can
     * 	register to the onAltF4Blocked event to be noticed when a "block" was
     * 	triggered.
     */
    is_alt_f4_blocked?: boolean;
    /**
     * Opens developer tools in dedicated window.
     */
    dev_tools_window_style?: boolean;
    /**
     * For local-server debugging (like react apps). You can use this field to
     * set the localhost:port URL. Notes: You must have a local web server
     * installed on your machine. Valid only when loading unpacked extensions.
     * Valid only with "localhost" / "127.0.0.1".
     */
    debug_url: string;
    /**
     * @deprecated No longer supported.
     *
     * Valid only for transparent windows. Valid only if enable_osr_acceleration
     * is on.
     */
    optimize_accelerate_rendering: boolean;
    /**
     * Relevant only for native windows. Disable the DPI Aware behavior of native windows.
     */
    disable_auto_dpi_sizing: boolean;
    /**
     * A window will always stay inside the game window while dragging.
     */
    restrict_to_game_bounds: boolean;
    /**
     * Disable GPU hardware acceleration, per window. Relevant only to native windows.
     * Notes: Use this flag mainly for native windows that run as a second-screen with fps intensive games. It improves the performance of the game by reducing usage of the GPU while you are playing.
     */
    disable_hardware_acceleration: boolean;
  }

  /** A width/height pair used to describe window dimensions. */
  interface Size {
    /** Width in pixels. */
    width: number;
    /** Height in pixels. */
    height: number;
  }

  /** A top/left coordinate pair used to describe a window's starting position. */
  interface Point {
    /** Distance from the top of the screen in pixels. */
    top: number;
    /** Distance from the left of the screen in pixels. */
    left: number;
  }

  /** Result of `getManifest`, combining the base `Result` with the full `Manifest` object. */
  interface GetManifestResult extends Result, Manifest { }

  /** Result containing the phased rollout percentage for the calling extension. */
  interface GetPhasedPercentResult extends Result {
    /** The percentage (0–100) of users receiving the phased update. */
    phasedPercent: number;
  }

  /** Result of `getInfo`, containing the info string or object set by another extension. */
  interface GetInfoResult extends Result {
    /** The info value posted by the target extension. */
    info: string | { [key: string]: any };
  }

  /** Result of `getRunningState`, indicating whether the target extension is active. */
  interface GetRunningStateResult extends Result {
    /** `true` if the target extension is currently running. */
    isRunning: boolean;
  }

  /** Result of `updateExtension`, describing the outcome of an update attempt. */
  interface UpdateExtensionResult extends Result {
    /** The update state after the operation. */
    state?: string;
    /** Additional human-readable information about the update. */
    info?: string;
    /** The version string of the installed or pending update. */
    version?: string;
  }

  /** Result of `checkForExtensionUpdate`, reporting whether an update is available. */
  interface CheckForUpdateResult extends Result {
    state?: "UpToDate" | "UpdateAvailable" | "PendingRestart"; //should be changed in the future to the enum "ExtensionUpdateState"
    /** The version string of the available update, if any. */
    updateVersion?: string;
  }

  /** Result of `getServiceConsumers`, providing service-provider manifest data. */
  interface ServiceProvidersDataResult extends Result {
    /** A dictionary mapping provider keys to their data strings. */
    data: Dictionary<string>;
  }

  /** Event data fired when the app is launched while already running. */
  interface AppLaunchTriggeredEvent {
    /** The origin that triggered the launch (e.g. `"dock"`, `"storeapi"`, `"odk"`). */
    origin: string;
    /** An optional parameter passed to the app at launch. */
    parameter: string;
  }

  /** Event data fired when the extension has been updated to a new version. */
  interface ExtensionUpdatedEvent {
    /** The version string of the newly installed update. */
    version: string;
    /** The current update state of the extension. */
    state: ExtensionUpdateState;
  }

  /** Event data fired when an extension is installed. */
  interface AppInstallationEvent {
    /** The unique identifier (UID) of the installed extension. */
    UID: string;
  }

  /**
   * The following types are related to the `onUncaughtException` event - which
   * is a different than the usual events.
   */
  type UncaughtExceptionCallback = (
    message: string,
    functionName: string,
    scriptName: string
  ) => void;

  /** Event interface for the `onUncaughtException` event, which uses a custom callback signature. */
  interface UncaughtExceptionEvent {
    /** Register a listener for uncaught exception events. */
    addListener(callback: UncaughtExceptionCallback): void;
    /** Remove a previously registered uncaught exception listener. */
    removeListener(callback: UncaughtExceptionCallback): void;
  }

  /** Result of `getExtensions`, containing the list of installed extensions. */
  interface GetExtensionsResult extends Result {
    /** An array of extension objects describing installed extensions. */
    extensions: any[];
  }

  /**
   * Launch an extension by its unique id.
   * @param uid The extension unique id.
   * @param parameter A parameter to pass to the extension. The extension may or
   * may not use this parameter.
   */
  function launch(uid: string, parameter?: any): void;

  /**
   * Sets a string or object for other extensions to read.
   * @param info A string or object to post.
   */
  function setInfo(info: any): void;

  /**
   * Gets an extension's info string.
   * @param id The id of the extension to get info for.
   * @param callback Called with the info.
   */
  function getInfo(id: string, callback: CallbackFunction<GetInfoResult>): void;

  /**
   * Requests info updates for extension. Will also be called when the extension
   * launches/closes.
   * @param id The id of the extension to get updates for.
   * @param eventsCallback A callback to receive info updates.
   * @param callback The status of the request.
   */
  function registerInfo(
    id: string,
    eventsCallback: (info: {
      status?: string;
      id?: string;
      info?: string;
      isRunning?: boolean;
    }) => void,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Stop requesting info for extension.
   * @param id The id of the extension to stop getting updates for.
   * @param callback The status of the request.
   */
  function unregisterInfo(id: string, callback: CallbackFunction<Result>): void;

  /**
   * Gets the running state of an extension.
   * @param id The id of the extension to get updates for.
   * @param callback The result of the request.
   */
  function getRunningState(
    id: string,
    callback: CallbackFunction<GetRunningStateResult>
  ): void;

  /**
   * Returns the requested extension's manifest object.
   * @param id The id of the extension to get the manifest for.
   * @param callback A function called with the manifest data.
   */
  function getManifest(
    id: string,
    callback: CallbackFunction<GetManifestResult>
  ): void;

  /**
   * The app will relaunch itself.
   */
  function relaunch(): void;

  /**
   * This functions allows apps to check and perform an update without having to
   * wait for Overwolf to do so.
   */
  function updateExtension(
    callback: CallbackFunction<UpdateExtensionResult>
  ): void;

  /**
   * Checks if an update is available for the calling extension.
   * @param callback
   */
  function checkForExtensionUpdate(
    callback: CallbackFunction<CheckForUpdateResult>
  ): void;

  /**
   * Return service providers manifest data.
   * @param callback
   */
  function getServiceConsumers(
    callback: CallbackFunction<ServiceProvidersDataResult>
  ): void;

  /**
 * Return service providers manifest data.
 * @param callback
 */
  function getExtensions(
    callback: CallbackFunction<GetExtensionsResult>
  ): void;

  /**
   * Fires when the current app is launched while already running. This is
   * useful in the case where the app has custom logic for clicking its dock
   * button while it is already running. The event contaisn an 'origin'
   * string which what triggered the app launch (dock, storeapi, odk, etc...)
   */
  const onAppLaunchTriggered: Event<AppLaunchTriggeredEvent>;

  /**
   * Fires when the current app's newest version has been installed.
   * This most often means that an app relaunch is required in order for the
   * update to apply.
   */
  const onExtensionUpdated: Event<ExtensionUpdatedEvent>;

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

/**
   * Repairs the schema registration, for an extension where the manifest contains
   * url_protocol
   * @param callback A function called with the manifest data.
   */
  function repairUrlProtocol(
    callback: CallbackFunction<Result>
  ): void;
}


declare namespace overwolf.extensions.sharedData {
  /**
   * Container that represent a shared data parameters.
   */
  interface SharedDataParams {
    /** The app ID of the extension that set the shared data (the owner). */
    origin?: string;
    /** The app ID of the extension that should receive the shared data (the consumer). */
    target?: string;
  }

  /** Result of `get`. */
  interface GetResult extends Result {
    /** A dictionary of shared data values keyed by owner app ID. */
    data: Dictionary<string>;
  }

  /**
   * Used by the owner app to set data for the consumer app, by appId.
   * @param appId The app ID of the consumer extension to share data with.
   * @param value The data to share with the consumer app.
   * @param callback Called with the result of the operation.
   */
  function set(
    appId: string,
    value: any,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Used by the consumer app to get data set by the owner app.
   * @param param Filter parameters specifying the origin and/or target app IDs.
   * @param callback Called with the result containing the shared data.
   */
  function get(
    param: SharedDataParams,
    callback: CallbackFunction<GetResult>
  ): void;

  /** Event data for when shared data is changed by the owner app. */
  interface onChangedEvent {
    /** The app ID of the extension that set the shared data. */
    origin: string;
    /** The app ID of the extension the data was shared with. */
    target: string;
    /** The updated shared data value. */
    data: string;
  }
}


declare namespace overwolf.campaigns.crossapp {
  /**
   * Container that represent a shared data parameters.
   */
  interface CrossAppCampaign {
    /**
     * An id to identify the campaign (action/conversion).
     * `id` should be unique per an extension (two different extensions can use
     * the same id).
     */
    id: string;

    /**
     * The type of action this cross-app campaign supports.
     * This is a free-text string.
     */
    action: string;

    /**
     * Expiration date expressed in milliseconds since epoch (Unix Time, UTC).
     *
     * e.g. Date.now() or (new Date()).getTime()
     */
    expiration: number;

    /**
     * The UID of the app that owns the targeted cross-app campaign.
     */
    owner_app_uid?: string;

    /**
     * An array of app UIDs this cross-app campaign targets.
     */
    target_apps_uids?: string[];

    /**
     * Information about the cross-app campaign.
     *
     * This is a free-form json object that gives more instructions on the
     * required action.
     */
    data: any;
  }

  /**
   * Container that represent a cross app campaign conversions.
   */
  interface CrossAppCampaignConversion {
    /**
     * The ID of the cross-app campaign the conversion targets.
     */
    id: string;

    /**
     * The UID of the app that owns the targeted cross-app campaign.
     */
    owner_app_uid: string;

    /**
     * Conversion data for the specified action.
     */
    data: any;

    /**
     * The UID of the app that performed the conversion (the promoted app).
     *
     * Set by the Overwolf client when calling `consumeConversions`.
     */
    readonly origin_app_uid?: string;

    /**
     * When the conversion took place.
     *
     * Set by the Overwolf client when calling `consumeConversions`.
     */
    readonly timestamp?: number;
  }

  /**
   * Object result from `overwolf.campaigns.crossapp.getAvailableActions`
   * 
   */
  interface GetCrossAppAvailableActionsResult extends Result {
    actions: CrossAppCampaign[];
  }

  /**
   * Object result from `overwolf.campaigns.crossapp.consumeConversions`
   */
  interface GetCrossAppConversionsResult extends Result {
    conversions: CrossAppCampaignConversion[];
  }

  /**
   * Receive all cross-app actions that target the currently running extension.
   * @param callback
   */
  function getAvailableActions(
    callback: CallbackFunction<GetCrossAppAvailableActionsResult>
  ): void;

  /**
   * Initiate or modify a cross-app campaign action for this extension.
   *
   * @param campaign
   * @param callback
   */
  function set(
    campaign: CrossAppCampaign,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Submit new conversion for a cross-app campaign.
   *
   * @param conversionInfo
   * @param callback
   */
  function reportConversion(
    conversionInfo: CrossAppCampaignConversion,
    callback: CallbackFunction<Result>
  ): void;

  

/**
   * Consume all pending conversions for this extension. Consumed conversions
   * are deleted.
   *
   * @param callback
   */
  function consumeConversions(
    callback: CallbackFunction<GetCrossAppConversionsResult>
  ): void;

  /*
   * Called when an available action has updated (or added)
   */
  const onAvailableActionUpdated: Event<CrossAppCampaign>;
}

declare namespace overwolf.utils {
  namespace enums {
    /** Pages available in the Overwolf store that can be opened via `openStore`. */
    const enum eStorePage {
      /** The store login page. */
      LoginPage = "LoginPage",
      /** A specific app's page in the store. */
      OneAppPage = "OneAppPage",
      /** The subscription page for an app. */
      SubscriptionPage = "SubscriptionPage",
      /** The reviews page for an app. */
      ReviewsPage = "ReviewsPage",
    }
  }

  /** Information about a single display/monitor connected to the system. */
  interface Display {
    /** Display name as reported by the OS. */
    name: string;
    /** Unique display identifier. */
    id: string;
    /** Horizontal position of the display in the virtual desktop (pixels). */
    x: number;
    /** Vertical position of the display in the virtual desktop (pixels). */
    y: number;
    /** Horizontal DPI of the display. */
    dpiX: number;
    /** Vertical DPI of the display. */
    dpiY: number;
    /** Width of the display in pixels. */
    width: number;
    /** Height of the display in pixels. */
    height: number;
    /** Whether this is the primary display. */
    is_primary: boolean;
    /** Native OS handle for the display. */
    handle: { value: number; };
  }

  /** Information about a GPU installed in the system. */
  interface GPUInfo {
    /** GPU chip type identifier. */
    ChipType: string;
    /** GPU manufacturer name. */
    Manufacturer: string;
    /** GPU model name. */
    Name: string;
  }

  /** Information about a hard disk or storage device in the system. */
  interface HardDiskInfo {
    /** Display name/caption of the disk. */
    Caption: string;
    /** Whether the drive is a solid-state disk. */
    IsSsd: boolean;
    /** Total disk size in bytes. */
    Size: number;
  }

  /** Information about a connected input device (keyboard, mouse, gamepad, etc.). */
  interface InputDeviceInfo {
    /** Numeric identifier for the input device. */
    id: number;
    /** Type of input device (e.g. keyboard, mouse). */
    type: string;
    /** Vendor ID of the input device. */
    vendor: number;
  }

  /** Information about a monitor as reported by the system. */
  interface MonitorInfo {
    /** Horizontal DPI of the monitor. */
    Dpix: number;
    /** Vertical DPI of the monitor. */
    Dpiy: number;
    /** Whether this is the main/primary monitor. */
    IsMain: boolean;
    /** Physical or logical location identifier. */
    Location: string;
    /** Monitor name. */
    Name: string;
    /** Monitor resolution string (e.g. "1920x1080"). */
    Resolution: string;
  }

  /** Comprehensive system hardware and software information. */
  interface SystemInfo {
    /** Names of audio output/input devices. */
    AudioDevices?: string[];
    /** CPU model name. */
    CPU?: string;
    /** Array of GPU information objects. */
    GPUs?: GPUInfo[];
    /** Array of hard disk information objects. */
    HardDisks?: HardDiskInfo[];
    /** Array of connected input device information objects. */
    InputDevices?: InputDeviceInfo[];
    /** Whether the system is a laptop. */
    IsLaptop?: boolean;
    /** Number of logical CPU cores. */
    LogicalCPUCount?: number;
    /** System or motherboard manufacturer. */
    Manufacturer?: string;
    /** Total installed RAM as a formatted string. */
    MemorySize?: string;
    /** System model name. */
    Model?: string;
    /** Array of monitor information objects. */
    Monitors?: MonitorInfo[];
    /** Motherboard model name. */
    Motherboard?: string;
    /** Installed .NET Framework version string. */
    NetFramework?: string;
    /** Number of connected screens. */
    NumberOfScreens?: number;
    /** Operating system name. */
    OS?: string;
    /** OS build number string. */
    OSBuild?: string;
    /** OS release identifier string. */
    OSReleaseId?: string;
    /** Number of physical CPU packages. */
    PhysicalCPUCount?: number;
    /** Whether hardware video encoding is supported. */
    VideoEncSupport?: boolean;
    /** indicates if the current OS enabled the [Windows 10 Hardware-Accelerated GPU Scheduling](/ow-native/guides/general-tech/video-capture-best-practices#windows-10-hardware-accelerated-gpu-scheduling-notice) feature */
    HAGSEnabled?: boolean
  }

  /** Parameters for opening a page in the Overwolf store. */
  interface OpenStoreParams {
    /**
     * The target app id.
     */
    uid?: string;
    /**
     * Store page to open.
     */
    page: enums.eStorePage;
  }

  /** Result returned from a file picker dialog. */
  interface OpenFilePickerResult extends Result {
    /** Overwolf media URL of the selected file (single selection). */
    url?: string;
    /** File system path of the selected file (single selection). */
    file?: string;
    /** Overwolf media URLs of the selected files (multi-selection). */
    urls?: string[];
    /** File system paths of the selected files (multi-selection). */
    files?: string[];
  }

  /** Result returned from a folder picker dialog. */
  interface OpenFolderPickerResult extends Result {
    /** Full file system path of the selected folder. */
    path?: string;
  }

  /** Result returned from `getSystemInformation`. */
  interface GetSystemInformationResult extends Result {
    /** The collected system information. */
    systemInfo?: SystemInfo;
  }

  /** Result returned from `isTouchDevice`. */
  interface IsTouchDeviceResult extends Result {
    /** Whether the current device has touch input capability. */
    isTouch?: boolean;
  }

  /** Result returned from `getPeripherals`. */
  interface GetPeripheralsResult extends Result {
    /** Object containing connected input devices and audio devices. */
    peripherals?: { inputDevices: InputDeviceInfo[]; audioDevices: string[]; };
  }

  /** Result returned from `isMouseLeftButtonPressed`. */
  interface IsMouseLeftButtonPressedResult extends Result {
    /** Whether the left mouse button is currently pressed. */
    pressed?: boolean;
  }

  /** Result returned from `getMonitorsList`. */
  interface getMonitorsListResult extends Result {
    /** Array of connected display information objects. */
    displays: Display[];
  }

  /** Result returned when querying Overwolf client installation and uptime info. */
  interface ClientInfoResult extends Result {
    // timestamp
    /** Unix timestamp (ms) of when the Overwolf client was installed. */
    installTime: number;
    /** Number of seconds the Overwolf client has been running since last launch. */
    uptimeSeconds: number;
  }

  /** Options for the `uploadClientLogs` function. */
  interface UploadClientLogsOptions {
    /** Prefix string applied to the uploaded log file name. */
    filePrefix: string;
  }

  /**
   * Copies the given string to the clipboard.
   * @param data The string to be copied to the clipboard.
   */
  function placeOnClipboard(data: string): void;

  /**
   * Gets the string currently placed on the clipboard. If no string is placed
   * on the clipboard, returns null.
   * @param callback Called with the string from the clipboard.
   */
  function getFromClipboard(callback: (result: string) => void): void;

  /**
   * Returns an array with all monitors data including their display resolution,
   * bounds, and names.
   * @param callback Called with the monitors array.
   */
  function getMonitorsList(callback: CallbackFunction<getMonitorsListResult>): void;

  /**
   * Sends a string representing a key stroke to the game, causing a simulated
   * key stroke.
   * @param keyString The key or key combination to send, as a string. e.g.
   * "Alt+I"
   */
  function sendKeyStroke(keyString: string): void;

  /**
   * Opens a file picker dialog to browse for a file. A url to the selected file
   * will be returned.
   * @param filter A file filter. Supports wild cards (*) and seperated by
   * commas (,). Ex. myFile*.*,*.txt
   * @param callback Called with a url to the selected file.
   */
  function openFilePicker(
    filter: string,
    callback: CallbackFunction<OpenFilePickerResult>
  ): void;

  /**
   * Opens a file picker dialog to browse for a file. A url to the selected file
   * will be returned.
   * @param filter A file filter. Supports wild cards (*) and seperated by
   * commas (,). Ex. myFile*.*,*.txt
   * @param initialPath Path to start browsing from
   * @param callback Called with a url(s) to the selected file(s).
   * @param multiSelect Allow selection of multiple files
   */
  function openFilePicker(
    filter: string,
    initialPath: string,
    callback: CallbackFunction<OpenFilePickerResult>,
    multiSelect: boolean
  ): void;

  /**
   * Opens a Folder picker dialog to browse for a folder. A full path to the
   * selected folder will be returned.
   * @param initialPath The starting folder's path
   * @param callback Called with the selected folder.
   */
  function openFolderPicker(
    initialPath: string,
    callback: CallbackFunction<OpenFolderPickerResult>
  ): void;

  /**
   * Opens Windows Explorer and selects a file received as an Overwolf media
   * url.
   * @param url An overwolf media url (overwolf://media/*)
   * @param callback Called with the result of the request.
   */
  function openWindowsExplorer(
    url: string,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Returns whether the current device has touch capabilities.
   * @param callback Called with the result of the request.
   */
  function isTouchDevice(callback: CallbackFunction<IsTouchDeviceResult>): void;

  /**
   * Opens the url in the user's default browser.
   * @param url A url to open.
   */
  function openUrlInDefaultBrowser(url: string): void;

  /**
   * Opens the url in Overwolf's browser.
   * @param url A url to open.
   */
  function openUrlInOverwolfBrowser(url: string, targetTabName?: string): void;

  /**
   * Returns system information which includes information about CPU, Monitors,
   * GPU, HDD, RAM and more.
   * @param callback Called with the system information.
   */
  function getSystemInformation(
    callback: (result: GetSystemInformationResult) => void
  ): void;

  /**
   * Sends Overwolf logs to Overwolf servers for debugging.
   * @param description The reason for sending the logs.
   * @param callback A callback with the status of the request.
   */
  function sendLogs(
    description: string,
    callback: CallbackFunction<Result>
  ): void;

  /**
  * Upload Overwolf client logs to Overwolf servers for current calling app.
  * @param callback A callback with the status of the request.
  */
  function uploadClientLogs(callback: CallbackFunction<Result>): void;

  /**
  * Upload Overwolf client logs to Overwolf servers for current calling app
  * with options (such as file prefix)
  * @param callback A callback with the status of the request.
  */
  function uploadClientLogs(
    options: UploadClientLogsOptions,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Returns system Peripherals information.
   * @param callback Called with the system information.
   */
  function getPeripherals(callback: () => void): void;

  /**
   * Open Overwolf store one app page.
   * @param appId The requesterd app id.
   */
  function openStoreOneAppPage(appId: string): void;

  /**
   * Opens the requested app's profile/login/subscription page in the Overwolf
   * Appstore.
   * @param param The requested store page.
   */
  function openStore(param: OpenStoreParams): void;

  /**
   * Simulate Mouse click on current mouse Position.
   * @param callback A callback with the status of the request.
   */
  function simulateMouseClick(callback: CallbackFunction<Result>): void;

  /**
   * Simulate Mouse click on {x,y} mouse Position.
   * @param x The Mouse X position.
   * @param y The Mouse Y position.
   * @param callback A callback with the status of the request.
   */
  function simulateMouseClick(
    x: number,
    y: number,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Is mouse left button pressed.
   * @param callback A callback with the result.
   */
  function isMouseLeftButtonPressed(
    callback: CallbackFunction<IsMouseLeftButtonPressedResult>
  ): void;

/**
   * Retrieve information about the client - such as when it was first installed
   * and how long is it running.
   * @param callback A callback with the result.
   */
  function getClientInfo(
    callback: CallbackFunction<ClientInfoResult>
  ): void;
}

declare namespace overwolf.settings {
  namespace enums {
    /** The video resolution setting for capture. */
    const enum ResolutionSettings {
      /** Capture at the original (native) resolution. */
      Original = "Original",
      /** Capture at 1080p resolution. */
      R1080p = "R1080p",
      /** Capture at 720p resolution. */
      R720p = "R720p",
      /** Capture at 480p resolution. */
      R480p = "R480p",
    }

    /** The screen position of an on-screen indicator (e.g. the FPS counter). */
    const enum eIndicationPosition {
      /** No position / indicator is hidden. */
      None = -1,
      /** Positioned in the top-left corner of the screen. */
      TopLeftCorner = 0,
      /** Positioned in the top-right corner of the screen. */
      TopRightCorner = 1,
      /** Positioned in the bottom-left corner of the screen. */
      BottomLeftCorner = 2,
      /** Positioned in the bottom-right corner of the screen. */
      BottomRightCorner = 3,
    }
  }

  /** Configuration for the Overwolf FPS counter overlay. */
  interface FpsSettings {
    /** The pixel offset of the FPS indicator from its corner position. */
    offset?: { x: number; y: number; };
    /** The scale factor for the FPS indicator (0–1). */
    scale?: number;
    /** Whether the FPS indicator is enabled. */
    enabled?: boolean;
    /** The screen corner where the FPS indicator is displayed. */
    position?: enums.eIndicationPosition;
  }

  /** General settings for an Overwolf extension. */
  interface GeneralExtensionSettings {
    /** Whether the extension should launch automatically when Overwolf starts. */
    auto_launch_with_overwolf?: boolean;
    /** Whether Overwolf should exit when the extension exits. */
    exit_overwolf_on_exit?: boolean;
    /** The update channel the extension subscribes to. */
    channel?: string;
  }

  /** Result of a `getHotKey` call. */
  interface GetHotKeyResult extends Result {
    /** The hotkey string assigned to the feature. */
    hotkey: string;
    /** Whether the hotkey is currently enabled. */
    isEnabled: boolean;
  }

  /** Result of a hotkey registration callback. */
  interface HotKeyResult extends Result {
    /** The feature ID associated with the triggered hotkey, if available. */
    featureId?: string;
  }

  /** Result containing a folder path returned by Overwolf. */
  interface FolderResult extends Result {
    path: {
      /** "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089" */
      Type: string;
      /** the actual filepath */
      Value: string;
      /** "Folders_VideoCapturesFolder" */
      Name: string;
    };
  }

  /** Result of a set-folder operation, containing the newly applied path. */
  interface SetFolderResult extends Result {
    /** The folder path that was set. */
    path: string;
  }

  /** Result of a `getVideoCaptureSettings` call. */
  interface GetVideoCaptureSettingsResult extends Result {
    /** The name of the video encoder in use. */
    encoder: string;
    /** The encoder preset currently selected. */
    preset: string;
    /** The configured capture frame rate (frames per second). */
    fps: number;
    /** The configured capture resolution as a numeric value. */
    resolution: number;
  }

  /** Result of a `getAudioCaptureSettings` call. */
  interface GetAudioCaptureSettingsResult extends Result {
    /** Whether system sound capture is enabled. */
    sound_enabled: boolean;
    /** Whether microphone capture is enabled. */
    microphone_enabled: boolean;
  }

  /** Result of a `getFpsSettings` call. */
  interface GetFpsSettingsResult extends Result {
    /** The current FPS overlay settings. */
    settings: FpsSettings;
  }

  /** Result of a `getExtensionSettings` call. */
  interface GetExtensionSettingsResult extends Result {
    /** The current general extension settings. */
    settings: GeneralExtensionSettings;
  }

  /** Event data fired when a FPS overlay setting changes. */
  interface FpsSettingsChangedEvent {
    /** The name of the FPS setting that changed. */
    setting: "OnScreenLocation" | "Enabled" | "Scale" | "Offset";
  }

  /** Event data fired when a video capture setting changes. */
  interface VideoCaptureSettingsChangedEvent {
    /** The name of the video capture setting that changed. */
    setting: "resolution" | "fps" | "unknown";
  }

  /** Event data fired when an audio capture setting changes. */
  interface AudioCaptureSettingsChangedEvent {
    /** The name of the audio capture setting that changed. */
    setting: "speakers" | "microphone" | "unknown";
  }

  /** Event data fired when a hotkey binding changes. */
  interface HotKeyChangedEvent {
    /** The source extension or feature that owns the hotkey. */
    source: string;
    /** A human-readable description of the hotkey action. */
    description: string;
    /** The new hotkey string. */
    hotkey: string;
  }

  /**
   * Returns the hotkey assigned to a given feature id by calling the callback.
   * @param featureId The feature id for which to get the set hotkey.
   * @param callback A function called with the result of the request which
     contains the hotkey if successful.
   */
  function getHotKey(
    featureId: string,
    callback: CallbackFunction<GetHotKeyResult>
  ): void;

  /**
   * Registers a callback for a given hotkey action. If the registration had
   * failed, the callback function will be called immediately with the status
   * "error" and another property, "error", indicating the reason for the
   * failure. Otherwise, the callback function will be called when the hotkey is
   * pressed and the status will be "success". Note that Shift can only be
   * combined with F keys.
   * @deprecated Since version 0.155.
   * @param actionId The action id for which to register the callback.
   * @param callback The function to run when the hotkey is pressed.
   */
  function registerHotKey(
    actionId: string,
    callback: CallbackFunction<HotKeyResult>
  ): void;

  /**
   * Returns the current language overwolf is set to in a two letter ISO name
   * format.
   * @deprecated Since version 0.155.
   * @param callback
   */
  function getCurrentOverwolfLanguage(
    callback: (result: { language: string; }) => void
  ): void;

  /**
   * Returns the current folder overwolf uses to store screenshots.
   * @param callback
   */
  function getOverwolfScreenshotsFolder(
    callback: CallbackFunction<FolderResult>
  ): void;

  /**
   * Sets the folder Overwolf uses to store screenshots.
   * @param path The folder to use
   * @param callback Whether the request was successful
   */
  function setOverwolfScreenshotsFolder(
    path: string,
    callback: CallbackFunction<FolderResult>
  ): void;

  /**
   * Returns the current folder overwolf uses to store videos.
   * @param callback
   */
  function getOverwolfVideosFolder(
    callback: CallbackFunction<FolderResult>
  ): void;

  /**
   * Sets the folder Overwolf uses to store videos.
   * @param path The folder to use
   * @param callback Whether the request was successful
   */
  function setOverwolfVideosFolder(
    path: string,
    callback: CallbackFunction<FolderResult>
  ): void;

  /**
   * Returns the current video capture settings.
   * @param callback
   */
  function getVideoCaptureSettings(
    callback: CallbackFunction<GetVideoCaptureSettingsResult>
  ): void;

  /**
   * Sets new video capture settings.
   * @param resolutionSettings
   * @param fps
   * @param callback
   */
  function setVideoCaptureSettings(
    resolutionSettings: enums.ResolutionSettings,
    fps: number,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Returns the current audio capture settings.
   * @param callback
   */
  function getAudioCaptureSettings(
    callback: CallbackFunction<GetAudioCaptureSettingsResult>
  ): void;

  /**
   * Sets new audio capture settings.
   * @param enableSound
   * @param enableMicrophone
   * @param callback
   */
  function setAudioCaptureSettings(
    enableSound: boolean,
    enableMicrophone: boolean,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Sets the state (on/off), position, offset (in pixels) and scale [0, 1] of
   * the Fps control.
   * @deprecated Since version 0.155.
   * @param settings
   * @param callback
   */
  function setFpsSettings(
    settings: FpsSettings,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Gets the status of the FPS control (on/off), its position, its offset (in
   * pixels) and its scale [0, 1].
   * @param callback
   */
  function getFpsSettings(
    callback: CallbackFunction<GetFpsSettingsResult>
  ): void;

  /**
   * Sets the extension settings.
   * @param settings
   * @param callback
   */
  function setExtensionSettings(
    settings: GeneralExtensionSettings,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Gets the extension settings.
   * @param callback
   */
  function getExtensionSettings(
    callback: CallbackFunction<GetExtensionSettingsResult>
  ): void;

  /**
   * Fired when fps settings are changed.
   */
  const onFpsSettingsChanged: Event<FpsSettingsChangedEvent>;

  /**
   * Fired when video capture settings are changed.
   */
  const OnVideoCaptureSettingsChanged: Event<VideoCaptureSettingsChangedEvent>;

  /**
   * Fired when audio capture settings are changed.
   */
  const OnAudioCaptureSettingsChanged: Event<AudioCaptureSettingsChangedEvent>;

/**
   * Fired when a hotkey is modified. Apps will only be notified ofhotkey
   * changes that relate to them.
   * @deprecated Since version 0.155.
   */
  const OnHotKeyChanged: Event<HotKeyChangedEvent>;
}

declare namespace overwolf.settings.games {
  /** Base result containing the game class ID the result relates to. */
  interface GameClassResult extends Result {
    /** The game class ID this result pertains to. */
    gameClassId: number;
  }

  /** Result indicating whether auto-launch is enabled for a specific game class. */
  interface AutolaunchEnabledResult extends GameClassResult {
    /** Whether auto-launch is currently enabled for the calling app in this game. */
    autoLaunchEnabled: boolean;
  }

  /** Result indicating whether the Overwolf overlay is enabled for a specific game class. */
  interface OverlayEnabledResult extends GameClassResult {
    /** Whether the Overwolf overlay is currently enabled for this game. */
    enabled: boolean;
  }

  /** Event data describing a change in overlay enablement for a game. */
  interface OverlayEnablementChangedEvent {
    /** The ID of the game whose overlay setting changed. */
    gameId: number;
    /** The new overlay enabled state. */
    enabled: boolean;
  }

  /** Event data describing a change in auto-launch enablement for a game. */
  interface AutoLaunchEnablementChangedEvent {
    /** The ID of the game whose auto-launch setting changed. */
    gameId: number;
    /** The new auto-launch enabled state. */
    enabled: boolean;
    /** The ID of the app whose auto-launch setting changed. */
    appId: string;
  }

  /**
   * Returns the current Overlay setting for the given game (if any exist).
   * @param gameClassId the game id for which the flag is retrieved for
   * @param callback
   */
  function getOverlayEnabled(
    gameClassId: number,
    callback: CallbackFunction<OverlayEnabledResult>
  ): void;

  /**
   * Returns the current Auto-Launch enabled setting for the calling app in a given game (gameClassId).
   * @param gameClassId the game id for which the flag is retrieved for
   * @param callback
   */
  function getAutoLaunchEnabled(
    gameClassId: number,
    callback: CallbackFunction<AutolaunchEnabledResult>
  ): void;

  /**
   * Sets the current Auto-Launch enabled setting for the calling app in a given game (gameClassId).
   * @param gameClassId the game id for which the flag is retrieved for
   * @param enabled whether auto-launch should be enabled
   * @param callback
   */
  function setAutoLaunchEnabled(
    gameClassId: number,
    enabled: boolean,
    callback: CallbackFunction<AutolaunchEnabledResult>
  ): void;

  /**
   * Fired when the overlay is enabled or disabled for a game.
   */
  const onOverlayEnablementChanged: Event<OverlayEnablementChangedEvent>;

/**
   * Fired when auto launch is enabled or disabled for a game.
   */
  const onAutoLaunchEnablementChanged: Event<AutoLaunchEnablementChangedEvent>;
}

declare namespace overwolf.settings.hotkeys {
  /** Describes a single hotkey registered to an extension or the platform. */
  interface IHotkey {
    /** The internal name of the hotkey as defined in the manifest. */
    name: string;
    /** The human-readable display title of the hotkey. */
    title: string;
    /** The virtual key code of the primary key. */
    virtualKeycode: number;
    /** A bitmask of the active modifier keys (Ctrl, Alt, Shift). */
    modifierKeys: number;
    /** The UID of the extension that owns this hotkey. */
    extensionuid: string;
    /** Whether the hotkey is a pass-through key that does not consume the input. */
    isPassthrough: boolean;
    /** Whether this hotkey is configured as a hold hotkey. */
    hold: boolean;
    /** Whether the hotkey is currently unassigned. */
    IsUnassigned: boolean;
    /** The string representation of the key binding (e.g. `"Ctrl+F2"`). */
    binding: string;
  }

  /** Result of `getAllApps`, mapping each app's hotkeys alongside platform-level hotkeys. */
  interface GetAllAssignedHotkeysResult extends Result {
    /** A map of app IDs to their assigned hotkey results. */
    apps: {
      [appId: string]: Omit<GetAssignedHotkeyResult, 'success' | 'error'>;
    },
    /** Platform-wide hotkeys not associated with any specific app. */
    platform: IHotkey[];
  }

  /** Result of `get`, containing global and per-game hotkeys for the current extension. */
  interface GetAssignedHotkeyResult extends Result {
    /** Hotkeys that apply globally across all games. */
    globals: IHotkey[];
    /** A map of game IDs to their game-specific hotkey assignments, if any. */
    games?: Record<string, IHotkey[]>;
  }

  /** Payload of the `onHold` event, indicating the hold state of a hotkey. */
  interface OnHoldEvent {
    /** The internal name of the hotkey being held. */
    name: string;
    /** Whether the key is currently pressed down (`"down"`) or released (`"up"`). */
    state: "up" | "down";
  }

  /** Payload of the `onPressed` event, fired when a non-hold hotkey is activated. */
  interface OnPressedEvent {
    /** The internal name of the hotkey that was pressed. */
    name: string;
  }

  /** Payload of the `onChanged` event, describing the updated hotkey binding. */
  interface OnChangedEvent {
    /** The internal name of the hotkey that changed. */
    name: string;
    /** The game ID the changed binding applies to, or `0` for global. */
    gameId: number;
    /** A human-readable description of the hotkey. */
    description: string;
    /** The new string representation of the binding. */
    binding: string;
    /** The bitmask of modifier keys in the new binding. */
    modifierKeys: number;
    /** The virtual key code of the primary key in the new binding. */
    virtualKeycode: number;
  }

  /** Specifies which modifier keys are active in a hotkey combination. */
  interface HotkeyModifiers {
    /** Whether the Ctrl modifier is active. */
    ctrl?: boolean;
    /** Whether the Alt modifier is active. */
    alt?: boolean;
    /** Whether the Shift modifier is active. */
    shift?: boolean;
  }

  /** Identifies a hotkey to unassign by name and optional game scope. */
  interface UnassignHotkeyObject {
    /** The internal name of the hotkey as defined in the manifest. */
    name: string;
    /** The game ID to scope the unassignment to, or omit for the global hotkey. */
    gameId?: number;
  }

  /** Identifies a hotkey to assign, including the key combination to bind. */
  interface AssignHotkeyObject extends UnassignHotkeyObject {
    /** The modifier keys to include in the binding. */
    modifiers: HotkeyModifiers;
    /** The virtual key code of the primary key to bind. */
    virtualKey: number;
  }

  /** Parameters for updating hotkey pass-through or custom modifier settings. */
  interface UpdateHotkeyObject extends UnassignHotkeyObject {
    /** A custom modifier key code to apply, if applicable. */
    customModifierKeyCode?: number;
    /** Whether to enable pass-through behavior for this hotkey. */
    isPassThrough?: boolean;
  }

  /**
   * Returns the hotkey assigned for the current extension in all the games.
   * @param callback Called with the global and per-game hotkey assignments for the calling extension.
   */
  function get(callback: CallbackFunction<GetAssignedHotkeyResult>): void;

  /**
   * Returns the hotkeys assigned for all installed extensions + the platform, in all the games.
   * @param callback Called with a map of all app hotkey assignments alongside platform-level hotkeys.
   */
  function getAllApps(callback: CallbackFunction<GetAllAssignedHotkeysResult>): void;

  /**
   * Assign global hotkey for the current extension, OR, if a gameId is specified, assign/unassign a dedicated hotkey.
   * @param hotkey The hotkey to assign, including the name, key binding, and optional game scope.
   * @param callback Called with the result of the assignment request.
   */
  function assign(
    hotkey: AssignHotkeyObject,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Unassign global hotkey for the current extension, OR, if a gameId is specified, assign/unassign a dedicated hotkey.
   * @param hotkey The hotkey to unassign, identified by name and optional game scope.
   * @param callback Called with the result of the unassignment request.
   */
  function unassign(
    hotkey: UnassignHotkeyObject,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Updates the pass-through or custom modifier settings for an existing hotkey.
   * @param hotkey The hotkey to update, including the name and the settings to change.
   * @param callback Called with the result of the update request.
   */
  function update(
    hotkey: UpdateHotkeyObject,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Fired only for hotkeys that are set in the manifest as hold.
   */
  const onHold: Event<OnHoldEvent>;

  /**
   * Fired for hotkeys that are NOT set as hold hotkeys.
   */
  const onPressed: Event<OnPressedEvent>;

/**
   * Fired on hotkey setting change.
   */
  const onChanged: Event<OnChangedEvent>;
}

declare namespace overwolf.settings.language {
  /** Result of a `get` call containing the current language code. */
  interface GetLanguageResult extends Result {
    /** The current Overwolf UI language as a two-letter ISO 639-1 code (e.g. `"en"`). */
    language: string;
  }

  /** Event data fired when the Overwolf UI language changes. */
  interface LanguageChangedEvent {
    /** The new language as a two-letter ISO 639-1 code. */
    language: string;
  }

  /**
   * Returns the current language Overwolf is set to in a two-letter ISO 639-1 format.
   * @param callback Called with the current language code.
   */
  function get(callback: CallbackFunction<GetLanguageResult>): void;

/**
   * Fired when user changes client language.
   */
  const onLanguageChanged: Event<LanguageChangedEvent>;
}

declare namespace overwolf.social {
  namespace enums {
    /** The current state of a social share operation. */
    const enum ShareState {
      /** The share operation has started. */
      Started,
      /** The content is currently being uploaded. */
      Uploading,
      /** The share operation has finished. */
      Finished
    }
  }

  /** Result containing information about the authenticated user. */
  interface GetUserInfoResult<T> extends Result {
    /** The user info object returned by the social platform. */
    userInfo?: T;
  }

  /** Parameters required to initiate a video upload to a social platform. */
  interface VideoUploadParams {
    /** A unique identifier for this upload operation. */
    id: string;
    /** The local file system path to the video file to upload. */
    filePath: string;
  }

  /** Result returned after a successful video upload. */
  interface VideoUploadResult extends Result {
    /** The public URL of the uploaded video. */
    url: string;
  }

  /** Progress update fired during a video upload operation. */
  interface VideoUploadProgress extends Result {
    /** The current upload progress as a percentage (0–100). */
    progress: number;
    /** The unique identifier of the upload operation. */
    id: string;
    /** The current state of the share operation. */
    state: enums.ShareState;
  }

  /** Event data describing a change in the user's social platform login state. */
  interface LoginStateChangedEvent {
    /** Whether the user is now `"connected"` or `"disconnected"`. */
    state: "connected" | "disconnected";
  }

  /** Result containing a list of social services currently disabled for the app. */
  interface GetDisabledServicesResult<T> extends Result {
    /** An array of service identifiers that are currently disabled. */
    disabled_services?: string[];
  }

/**
   * Checks which of the supported sharing services are disabled or enabled.
   * @param callback Returns a list of disabled services
   */
  function getDisabledServices(callback: CallbackFunction<GetDisabledServicesResult<void>>): void;

  function uploadVideo(uploadParams: VideoUploadParams, resultCallback: CallbackFunction<VideoUploadResult>, progressCallback: CallbackFunction<VideoUploadProgress>): void;

  function cancelUpload(id: string, resultCallback: CallbackFunction<Result>): void;
}

declare namespace overwolf.social.discord {
  namespace enums {
    /** Represents the posting permissions available for a Discord channel. */
    const enum PostPermission {
      /** No posting permission. */
      None = 0,
      /** Permission to post text messages. */
      Text,
      /** Permission to post files (images or videos). */
      File,
    }

    /** Represents the current state of a share operation. */
    const enum ShareState {
      /** The share operation has started. */
      Started,
      /** The file is currently being uploaded. */
      Uploading,
      /** The share operation has finished. */
      Finished
    }
  }

  /** Represents a Discord user account. */
  interface User {
    /** The unique Discord user ID. */
    id: string;
    /** The user's discriminator number (the four digits after the `#`). */
    discriminator: number;
    /** The user's Discord username. */
    username: string;
    /** The user's email address. */
    email: string;
    /** The user's avatar hash, if set. */
    avatar?: string;
    /** Whether the user's email address has been verified. */
    verified: boolean;
  }

  /** Represents a Discord guild (server). */
  interface Guild {
    /** The guild's icon hash, if set. */
    icon?: string;
    /** The unique guild ID. */
    id: string;
    /** The name of the guild. */
    name: string;
    /** The ID of the guild owner, if available. */
    owner_id?: string;
    /** The list of roles defined in the guild, if available. */
    roles?: Role[];
  }

  /** Represents a Discord role within a guild. */
  interface Role {
    /** The unique role ID. */
    id: string;
    /** The name of the role. */
    name: string;
    /** The permissions bitfield for this role. */
    permissions: number;
  }

  /** Represents a Discord channel within a guild. */
  interface Channel {
    /** The ID of the guild this channel belongs to. */
    guild_id: string;
    /** The unique channel ID. */
    id: string;
    /** The name of the channel. */
    name: string;
    /** The ID of the parent category channel, if any. */
    parent_id?: string;
    /** The list of permission overwrites applied to this channel. */
    permission_overwrites: PermissionOverwrite[];
    /** The channel type as a numeric value. */
    type: number;
    /** The current user's post permission level for this channel. */
    user_post_permission: enums.PostPermission;
  }

  /** Represents a permission overwrite entry for a Discord channel. */
  interface PermissionOverwrite {
    /** The ID of the role or user this overwrite applies to. */
    id: string;
    /** Whether this overwrite applies to a role or a member. */
    type: string;
    /** Bitfield of permissions that are explicitly allowed. */
    allow: number;
    /** Bitfield of permissions that are explicitly denied. */
    deny: number;
  }

  /** Parameters for sharing media to a Discord channel. */
  interface ShareParameters {
    /** The file to share.
    * Note: Since version 0.153, the "file" param is optional when calling overwolf.social.discord.share(). Instead, you can use the "message" param to include a URL of a file that you want to share.*/
    file?: string;
    /** The ID of the Discord channel to share to. */
    channelId: string;
    /** An optional identifier for the share operation. */
    id?: string;
    /** Whether to display Overwolf notifications during the share. */
    useOverwolfNotifications: boolean;
    /** The text message to accompany the shared media. */
    message: string;
    /** An object containing start time and end time for the desired VideoCompositionSegment */
    trimming?: media.videos.VideoCompositionSegment;
    /** An array of event labels associated with the captured clip. */
    events?: string[];
    /** The class ID of the associated game. */
    gameClassId?: number;
    /** The title of the associated game. */
    gameTitle?: string;
    /** Extra information about the game session (How is this used?) */
    metadata?: any;
  }

  /** Parameters for posting a text message to a Discord channel. */
  interface PostParameters {
    /** The ID of the Discord channel to post to. */
    channelId: string;
    /** The text content of the post. */
    message: string;
  }

  /** Reports the progress of an ongoing share operation. */
  interface SocialShareProgress extends Result {
    /** The upload progress as a percentage (0–100). */
    progress: number;
    /** The identifier of the share operation. */
    id: string;
    /** The current state of the share operation. */
    state: enums.ShareState;
  }

  /** Result of a successful share operation. */
  interface SocialShareResult extends Result {
    /** The URL of the shared content on Discord. */
    url: string;
  }

  /** Result of a `getGuilds` call. */
  interface GetGuildsResult extends Result {
    /** The list of guilds the user belongs to, if the request was successful. */
    guilds?: Guild[];
  }

  /** Result of a `getChannels` call. */
  interface GetChannelsResult extends Result {
    /** The list of channels in the guild that the user can post to, if the request was successful. */
    channels?: Channel[];
  }

  /**
   * Opens the login dialog. There is no callback for this method and the only
   * way to know if the user signed in is via `onLoginStateChanged`.
   */
  function performUserLogin(): void;

  /**
   * Performs a "strong" sign out of Discord, so that even if the user performs
   * a login via the Overwolf Settings / Accounts page, they will be considered
   * signed out.
   * @param callback
   */
  function performLogout(callback: CallbackFunction<Result>): void;

  /**
   * If the user is currently logged into Discord, this will return user
   * information. Otherwise, an error is returned.
   * @param callback Will contain user information or error if the request has
   * failed.
   */
  function getUserInfo(
    callback: CallbackFunction<GetUserInfoResult<User>>
  ): void;

  /**
   * If the user is currently logged into Discord, this will return the guilds
   * that the user is registered to. Otherwise, an error is returned
   * @param callback Will contain guild (server) information or error if the
   * request has failed.
   */
  function getGuilds(callback: CallbackFunction<GetGuildsResult>): void;

  /**
   * If the user is currently logged into Discord, this will return the channels
   * of the given `guildId`, for which the user has privileges to share
   * images/videos to. Otherwise, an error is returned
   * @param guildId The id of the guild
   * @param callback Will contain guild (server) channels or error if the
   * request has failed.
   */
  function getChannels(
    guildId: string,
    callback: CallbackFunction<GetChannelsResult>
  ): void;

  /**
   * If the user is currently logged into Discord, this will perform the media
   * share (image or video).Possible errors that can occur:- Disconnected (user
   * isn't signed in)- MissingFile (trying to share a missing file)-
   * UnsupportedFile (trying to share an unsupported format)- ExceedsMaxSize
   * (the file is too large: > 8 MB for images, > 100 MBfor videos)
   * @param discordShareParams The share parameters. See DiscordShareParameters
   * @param callback Will contain the status of the request.
   */
  function share(
    discordShareParams: overwolf.social.discord.ShareParameters,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Shares a media file to a Discord channel with separate result and progress callbacks.
   * @param discordShareParams The share parameters.
   * @param resultCallback Called with the final share result, including the URL of the shared content.
   * @param progressCallback Called periodically with upload progress updates.
   */
  function shareEx(
    discordShareParams: overwolf.social.discord.ShareParameters,
    resultCallback: CallbackFunction<SocialShareResult>,
    progressCallback: CallbackFunction<SocialShareProgress>
  ): void;

  /**
   * Posts a text message to a Discord channel.
   * @param discordPostParams The post parameters, including the channel ID and message text.
   */
  function post(
    discordPostParams: overwolf.social.discord.PostParameters
  ): void;

  /**
   * Fired when the user's login state changes.
   */
  const onLoginStateChanged: Event<LoginStateChangedEvent>;
}

/**
 * @deprecated No longer in service.
 */
declare namespace overwolf.social.gfycat {
  namespace enums {
    /** The current stage of a media share operation. */
    const enum ShareState {
      /** The share operation has started. */
      Started,
      /** The media file is being uploaded. */
      Uploading,
      /** The share operation has completed successfully. */
      Finished
    }
  }

  /** Information about the currently logged-in Gfycat user. */
  interface User {
    /** The Gfycat user ID. */
    userid: string;
    /** The email address associated with the user's Gfycat account. */
    email: string;
    /** Whether the user's email address has been verified. */
    emailVerified: boolean;
    /** URL of the user's Gfycat profile image. */
    profileImageUrl: string;
    /** The user's Gfycat username. */
    username: string;
    /** The canonical (normalized) form of the username. */
    canonicalUsername: string;
    /** Total number of views across all the user's Gfycats. */
    views: number;
    /** Number of users following this account. */
    followers: number;
    /** Number of users this account is following. */
    following: number;
    /** Number of publicly published Gfycats. */
    publishedGyfcats: number;
    /** Total number of Gfycats (including private). */
    totalGyfcats: number;
    /** The URL of the user's Gfycat profile page. */
    url: string;
  }

  /** Parameters for sharing a media file to Gfycat. */
  interface ShareParameters {
    /** Path to the media file to share. */
    file: string;
    /** Optional identifier for this share operation. */
    id?: string;
    /** Whether to use Overwolf's built-in share notifications. */
    useOverwolfNotifications: boolean;
    /** Optional trimming segment if sharing a video clip. */
    trimming?: media.videos.VideoCompositionSegment;
    /** The title to assign to the uploaded Gfycat. */
    title: string;
    /** Whether to upload the Gfycat as private. */
    privateMode: boolean;
    /** Optional list of tags to associate with the upload. */
    tags?: string[];
    /** The Overwolf game class ID related to this share, if applicable. */
    gameClassId?: number;
    /** Optional arbitrary metadata to attach to this share. */
    metadata?: any;
  }

  /** Progress update for an in-flight `shareEx` operation. */
  interface SocialShareProgress extends Result {
    /** Upload progress as a value between 0 and 100. */
    progress: number;
    /** The identifier of the share operation. */
    id: string;
    /** The current stage of the share operation. */
    state: enums.ShareState;
  }

  /** Result of a completed `shareEx` operation. */
  interface SocialShareResult extends Result {
    /** The URL of the published Gfycat. */
    url: string;
  }

  /**
   * Opens the login dialog. There is no callback for this method and theonly
   * way to know if the user signed in is via `onLoginStateChanged`.
   */
  function performUserLogin(): void;

  /**
   * Performs a "strong" sign out of Gfycat, so that even if the userperforms a
   * login via the Overwolf Settings / Accounts page, he willbe considered
   * signed out.
   * @param callback
   */
  function performLogout(callback: CallbackFunction<Result>): void;

  /**
   * If the user is currently logged into Gfycat, this will return
   * userinformation:
   * https://developers.gfycat.com/api/#getting-the-authenticated-user-s-details
   * Otherwise, an error is returned.
   * @param callback Will contain user information or error if the request has
   * failed.
   */
  function getUserInfo(
    callback: CallbackFunction<GetUserInfoResult<User>>
  ): void;

  /**
   * Possible errors that can occur:- Disconnected (user isn't signed in)-
   * MissingFile (trying to share a missing file)- UnsupportedFile (trying to
   * share an unsupported format)- ExceedsMaxSize (the file is too large: > 8 MB
   * for images, > 100 MBfor videos)
   * @param gfycatShareParams The share parameters. See GfycatShareParameters
   * @param callback Will contain the status of the request.
   */
  function share(
    gfycatShareParams: ShareParameters,
    callback: CallbackFunction<Result>
  ): void;

  /** Shares media to Gfycat with separate result and progress callbacks.
   * @param discordShareParams The share parameters.
   * @param resultCallback Called with the final share result, including the published URL.
   * @param progressCallback Called periodically with upload progress updates.
   */
  function shareEx(
    discordShareParams: overwolf.social.gfycat.ShareParameters,
    resultCallback: CallbackFunction<overwolf.social.gfycat.SocialShareResult>,
    progressCallback: CallbackFunction<SocialShareProgress>
  ): void;

  /**
   * Fired when a media event has been posted.
   */
  const onLoginStateChanged: Event<LoginStateChangedEvent>;
}

/**
 * @deprecated APIs moved to X
 */
declare namespace overwolf.social.twitter {
  namespace enums {
    /** The current stage of a media share operation. */
    const enum ShareState {
      /** The share operation has started. */
      Started,
      /** The media file is being uploaded. */
      Uploading,
      /** The share operation has completed successfully. */
      Finished
    }
  }

  /** Parameters for sharing a media file to Twitter. */
  interface ShareParameters {
    /** Path to the media file (image or video) to share. */
    file: string;
    /** Optional identifier for this share operation. */
    id?: string;
    /** Whether to use Overwolf's built-in share notifications. */
    useOverwolfNotifications: boolean;
    /** The tweet text to post alongside the media. */
    message: string;
    /** Optional trimming segment if sharing a video clip. */
    trimming?: media.videos.VideoCompositionSegment;
    /** Optional list of tags to associate with the post. */
    tags?: string[];
    /** The Overwolf game class ID related to this share, if applicable. */
    gameClassId?: number;
    /** The title of the game related to this share, if applicable. */
    gameTitle?: string;
    /** Optional arbitrary metadata to attach to this share. */
    metadata?: any;
  }

  /** Information about the currently logged-in Twitter user. */
  interface User {
    /** The Twitter user's unique ID. */
    id: string;
    /** The Twitter screen name (handle) of the user. */
    screenName: string;
    /** The display name of the user. */
    name: string;
    /** The email address associated with the user's Twitter account. */
    email: string;
    /** URL of the user's Twitter avatar image. */
    avatar: string;
  }

  /** Progress update for an in-flight `shareEx` operation. */
  interface SocialShareProgress extends Result {
    /** Upload progress as a value between 0 and 100. */
    progress: number;
    /** The identifier of the share operation. */
    id: string;
    /** The current stage of the share operation. */
    state: enums.ShareState;
  }

  /** Result of a completed `shareEx` operation. */
  interface SocialShareResult extends Result {
    /** The URL of the published tweet. */
    url: string;
  }

  /**
   * Opens the login dialog. There is no callback for this method and theonly
   * way to know if the user signed in is via `onLoginStateChanged`.
   */
  function performUserLogin(): void;

  /**
   * Performs a "strong" sign out of Twitter, so that even if the userperforms a
   * login via the Overwolf Settings / Accounts page, he will be considered
   * signed out.
   * @param callback
   */
  function performLogout(callback: CallbackFunction<Result>): void;

  /**
   * If the user is currently logged into Twitter, this will return
   * userinformation:{ avatar: "http://abs.twimg.com/sticky/...", id:
   * "111111111112222222" name: "full name" screenName:
   * "screenname123"}
   * Otherwise, an error is returned.
   * @param callback Will contain user information or error if the request has
   * failed.
   */
  function getUserInfo(
    callback: CallbackFunction<GetUserInfoResult<User>>
  ): void;

  /**
   * If the user is currently logged into Twitter, this will perform the media
   * share (image or video).
   * @param twitterShareParams The share parameters.
   * @param callback Will contain the status of the request.
   */
  function share(
    twitterShareParams: ShareParameters,
    callback: CallbackFunction<Result>
  ): void;

  /** Shares media to Twitter with separate result and progress callbacks.
   * @param discordShareParams The share parameters.
   * @param resultCallback Called with the final share result, including the published URL.
   * @param progressCallback Called periodically with upload progress updates.
   */
  function shareEx(
    discordShareParams: overwolf.social.twitter.ShareParameters,
    resultCallback: CallbackFunction<overwolf.social.twitter.SocialShareResult>,
    progressCallback: CallbackFunction<overwolf.social.twitter.SocialShareProgress>
  ): void;

/**
   * Fired when the user's login state changes.
   */
  const onLoginStateChanged: Event<LoginStateChangedEvent>;
}

declare namespace overwolf.social.youtube {
  namespace enums {
    /** The visibility setting for a video uploaded to YouTube. */
    const enum YouTubePrivacy {
      /** The video is visible to everyone. */
      Public = "Public",
      /** The video is visible only to users who have the link. */
      Unlisted = "Unlisted",
      /** The video is visible only to the owner. */
      Private = "Private",
    }

    /** The current stage of a video share operation. */
    const enum ShareState {
      /** The share operation has started. */
      Started,
      /** The video file is being uploaded. */
      Uploading,
      /** The share operation has completed successfully. */
      Finished
    }
  }

  /** Parameters for sharing a video to YouTube. */
  interface ShareParameters {
    /** Path to the video file to share. */
    file: string;
    /** Optional identifier for this share operation. */
    id?: string;
    /** Whether to use Overwolf's built-in share notifications. */
    useOverwolfNotifications: boolean;
    /** The title to assign to the uploaded YouTube video. */
    title: string;
    /** The description to assign to the uploaded YouTube video. */
    description: string;
    /** Optional trimming segment if sharing a video clip. */
    trimming?: media.videos.VideoCompositionSegment;
    /** The privacy setting for the uploaded video. */
    privacy: enums.YouTubePrivacy;
    /** Optional list of tags to associate with the video. */
    tags?: string[];
    /** The Overwolf game class ID related to this share, if applicable. */
    gameClassId?: number;
    /** The title of the game related to this share, if applicable. */
    gameTitle?: string;
    /** Optional arbitrary metadata to attach to this share. */
    metadata?: any;
  }

  /** Information about the currently logged-in YouTube user. */
  interface User {
    /** The display name of the YouTube account. */
    name: string;
    /** URL of the user's YouTube channel profile picture. */
    picture: string;
    /** The YouTube channel ID. */
    id: string;
  }

  /** Progress update for an in-flight `shareEx` operation. */
  interface SocialShareProgress extends Result {
    /** Upload progress as a value between 0 and 100. */
    progress: number;
    /** The identifier of the share operation. */
    id: string;
    /** The current stage of the share operation. */
    state: enums.ShareState;
  }

  /** Result of a completed `shareEx` operation. */
  interface SocialShareResult extends Result {
    /** The URL of the published YouTube video. */
    url: string;
  }

  /**
   * Opens the login dialog. There is no callback for this method and the only
   * way to know if the user signed in is via `onLoginStateChanged`.
   */
  function performUserLogin(): void;

  /**
   * Performs a "strong" sign out of YouTube, so that even if the user performs
   * a login via the Overwolf Settings / Accounts page, he will be considered
   * signed out.
   * @param callback
   */
  function performLogout(callback: CallbackFunction<Result>): void;

  /**
   * If the user is currently logged into YouTube, this will return user
   * information:
   * {
   *   avatar: "http://abs.twimg.com/sticky/...", id: "111111111112222222",
   *   name: "full name", screenName: "screenname123"
   * }
   * Otherwise, an error is returned.
   * @param callback Will contain user information or error if the request has
   * failed.
   */
  function getUserInfo(
    callback: CallbackFunction<GetUserInfoResult<User>>
  ): void;

  /**
   * If the user is currently logged into YouTube, this will perform the video
   * share.
   *
   * Possible errors that can occur:
   * - Disconnected (user isn't signed in)
   * - MissingFile (trying to share a missing file)
   * - UnsupportedFile (trying to share an unsupported format)
   * @param youTubeShareParams The share parameters.
   * @param callback Will contain the status of the request.
   */
  function share(
    youTubeShareParams: ShareParameters,
    callback: CallbackFunction<Result>
  ): void;

  /** Shares a video to YouTube with separate result and progress callbacks.
   * @param discordShareParams The share parameters.
   * @param resultCallback Called with the final share result, including the published URL.
   * @param progressCallback Called periodically with upload progress updates.
   */
  function shareEx(
    discordShareParams: overwolf.social.youtube.ShareParameters,
    resultCallback: CallbackFunction<overwolf.social.youtube.SocialShareResult>,
    progressCallback: CallbackFunction<overwolf.social.youtube.SocialShareProgress>
  ): void;

/**
   * Fired when the user's login state changes.
   */
  const onLoginStateChanged: Event<LoginStateChangedEvent>;
}

declare namespace overwolf.social.reddit {
  namespace enums {
    /** Represents the current state of a share operation. */
    const enum ShareState {
      /** The share operation has started. */
      Started,
      /** The file is currently being uploaded. */
      Uploading,
      /** The share operation has finished. */
      Finished
    }
  }

  /** Represents a Reddit post flair. */
  interface Flair {
    /** The unique identifier of the flair. */
    id: string;
    /** The display text of the flair. */
    text: string;
    /** Whether this flair is restricted to moderators only. */
    mod_only: boolean;
    /** The type of content the flair allows (e.g. `"all"`, `"link"`, `"text"`). */
    allowable_content: string;
  }

  /** Parameters for sharing a video to a subreddit. */
  interface ShareParameters {
    /**
     * The file to share.
     */
    file: string;
    /**
     * The subreddit to which the file will be shared.
     */
    id?: string;
    /** Whether to display Overwolf notifications during the share. */
    useOverwolfNotifications: boolean;
    /** The name of the subreddit to share to (without the `r/` prefix). */
    subreddit: string;
    /**
     * The shared video's title.
     */
    title: string;
    /**
     * The shared video's description.
     */
    description: string;
    /**
     * An object containing start time and end time for the desired video
     * segment.
     * Optional parameter.
     */
    trimming?: media.videos.VideoCompositionSegment;
    /**
     * An array of chronological events that occurred during the capture.
     * Optional parameter.
     */
    tags?: string[];
    /**
     * The associated game's class ID.
     * Optional parameter.
     */
    gameClassId?: number;
    /**
     * The associated game's title.
     * Optional parameter.
     */
    gameTitle?: string;
    /**
     * Extra information about the game session.
     * Optional parameter.
     */
    metadata?: any;

    /** The flair to apply to the post, if any. */
    flair_id?: Flair;
  }

  /** Parameters for creating a text post on a subreddit. */
  interface PostParameters {
    /**
     * The subreddit to which the post will be shared.
     */
    subreddit: string;
    /**
     * The shared post's title.
     */
    title: string;
    /**
     * The shared post's content.
     */
    content: string;
    /** The flair to apply to the post, if any. */
    flair_id?: Flair;
  }

  /** Represents a Reddit user account. */
  interface User {
    /** The URL of the user's avatar image. */
    avatar: string;
    /** The user's display name (e.g. `u/foobar`). */
    displayName: string;
    /** The user's Reddit username. */
    name: string;
  }

  /** Represents a Reddit subreddit. */
  interface Subreddit {
    /** The number of subscribers the subreddit has. */
    numSubscribers: number;
    /** The internal name of the subreddit (without the `r/` prefix). */
    name: string;
    /** The human-readable display name of the subreddit. */
    displayName: string;
    /** The post types allowed in this subreddit. */
    allowedPostTypes: RedditAllowedPostTypes;
    /** The URL of the subreddit's community icon image. */
    communityIcon: string;
  }

  /** Describes which post types are permitted in a subreddit. */
  interface RedditAllowedPostTypes {
    /** Whether image posts are allowed. */
    images: boolean;
    /** Whether text posts are allowed. */
    text: boolean;
    /** Whether video posts are allowed. */
    videos: boolean;
    /** Whether link posts are allowed. */
    links: boolean;
    /** Whether spoiler-tagged posts are allowed. */
    spoilers: boolean;
  }

  /** Result of a `searchSubreddits` call. */
  interface SearchSubredditsResult extends Result {
    /** The list of subreddits matching the search query, if the request was successful. */
    subreddits?: Subreddit[];
  }

  /** Event data for a failed share attempt. */
  interface ShareFailedEvent {
    /** A string identifying the error that occurred. */
    error: string;
    /** Additional details about the error, if available. */
    details?: string;
  }

  /** Reports the progress of an ongoing share operation. */
  interface SocialShareProgress extends Result {
    /** The upload progress as a percentage (0–100). */
    progress: number;
    /** The identifier of the share operation. */
    id: string;
    /** The current state of the share operation. */
    state: enums.ShareState;
  }

  /** Result of a successful share operation. */
  interface SocialShareResult extends Result {
    /** The URL of the shared post on Reddit. */
    url: string;
  }

  /**
   * Returns a list of flairs supported by the given subreddit
   * @param subredditName The given subreddit
   * @param callback Will contain  a list of flairs supported by the given subreddit
   */
  function getSubredditFlairs(
    subredditName: string,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Opens the login dialog. There is no callback for this method and the only
   * way to know if the user signed in is via `onLoginStateChanged`.
   */
  function performUserLogin(): void;

  /**
   * Performs a "strong" sign out of Reddit, so that even if the user performs
   * a login via the Overwolf Settings / Accounts page, he will be considered
   * signed out.
   * @param callback
   */
  function performLogout(callback: CallbackFunction<Result>): void;

  /**
   * If the user is currently logged into Reddit, this will return user
   * information:
   * {
   *   userInfo: {
   *     avatar: "http://abs.twimg.com/sticky/...",
   *     displayName: "u/foobar",
   *     name: "foobar"
   *   }
   * }
   * Otherwise, an error is returned.
   * @param callback Will contain user information or error if the request has
   * failed.
   */
  function getUserInfo(
    callback: CallbackFunction<GetUserInfoResult<User>>
  ): void;

  /**
   * Search for subreddits whose names begin with a substring.
   * @param query The search string.
   * @param callback Will contain an array of subreddits that match the search
   * string.
   */
  function searchSubreddits(
    query: string,
    callback: CallbackFunction<SearchSubredditsResult>
  ): void;

  /**
   * If the user is currently logged into Reddit, this will perform the video
   * share.
   *
   * Possible errors that can occur:
   * - Disconnected (user isn't signed in)
   * - MissingFile (trying to share a missing file)
   * - UnsupportedFile (trying to share an unsupported format)
   * @param redditShareParams The share parameters.
   * @param callback Will contain the status of the request.
   */
  function share(
    redditShareParams: ShareParameters,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Shares a media file to a subreddit with separate result and progress callbacks.
   * @param discordShareParams The share parameters.
   * @param resultCallback Called with the final share result, including the URL of the published post.
   * @param progressCallback Called periodically with upload progress updates.
   */
  function shareEx(
    discordShareParams: overwolf.social.reddit.ShareParameters,
    resultCallback: CallbackFunction<overwolf.social.reddit.SocialShareResult>,
    progressCallback: CallbackFunction<overwolf.social.reddit.SocialShareProgress>
  ): void;

  /**
   * Posts a link or text post to a subreddit.
   * @param redditShareParams The post parameters, including the subreddit, title, and content.
   */
  function post(
    redditShareParams: overwolf.social.reddit.PostParameters
  ): void;

  /**
   * Fired when the user's login state changes.
   */
  const onLoginStateChanged: Event<LoginStateChangedEvent>;

/**
   * Fired when an error is returned from Reddit.
   */
  const onShareFailed: Event<ShareFailedEvent>;
}

declare namespace overwolf.gep {
  /** Internal GEP metadata, used for diagnostics. */
  type GepInternal = {
    /** The version string of the currently running GEP instance. */
    version_info: string;
  };
}
