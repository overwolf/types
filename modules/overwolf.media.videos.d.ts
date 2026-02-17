/**
   * Fired when a screenshot was taken.
   */
  const onScreenshotTaken: Event<ScreenshotTakenEvent>;
}

declare namespace overwolf.media.videos {
  namespace enums {
    const enum WatermarkLocation {
      BottomCenter = "BottomCenter",
      BottomLeft = "BottomLeft",
      BottomRight = "BottomRight",
      Center = "Center",
      MidLeft = "MidLeft",
      MidRight = "MidRight",
      TopCenter = "TopCenter",
      TopLeft = "TopLeft",
      TopRight = "TopRight",
    }
  }
  interface VideoCompositionSegment {
    startTime: number;
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

  interface GetVideosResult extends Result {
    videos?: string[];
  }

  interface GetVideosSizeResult extends Result {
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

  