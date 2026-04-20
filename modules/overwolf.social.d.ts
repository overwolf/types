/**
 * Use this API to share videos and interact with social platforms (e.g., Twitch, YouTube, Discord)
 * from within an Overwolf app, including querying user info and upload progress.
 * @packageDocumentation
 */

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

}
