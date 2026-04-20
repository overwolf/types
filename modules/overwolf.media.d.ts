/**
 * Use this API to capture screenshots and videos, manage media files, and post media events from your Overwolf app.
 * @packageDocumentation
 */

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


