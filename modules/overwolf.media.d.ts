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

    const enum eSourceType {
      Webcam = "Webcam"
    }

    const enum eVideoSourceTransform {
      Stretch = "Stretch"
    }
  }

  interface RescaleParams {
    width: number;
    height: number;
  }

  interface CropParams {
    x: number;
    y: number;
    width: number;
    height: number;
  }

  interface MemoryScreenshotParams {
    roundAwayFromZero?: boolean;
    rescale?: RescaleParams;
    crop?: CropParams;
  }

  interface FileResult extends Result {
    url?: string;
    path?: string;
  }

  interface GetAppVideoCaptureFolderSizeResult extends Result {
    totalVideosSizeMB?: number;
  }

  interface GetAppScreenCaptureFolderSizeResult extends Result {
    screenCaptureSizeMB?: number;
  }

  interface ScreenshotTakenEvent {
    url: string;
  }

  interface Webcam {
    name: string;
    path: string;
    id: string;
  }

  interface GetWebcamsResult extends Result {
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
   * Similar to |getAppVideoCaptureFolderSize| but looks at the apps screen
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

  