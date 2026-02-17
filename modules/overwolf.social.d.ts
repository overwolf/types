/**
   * Fired when user changes client language.
   */
  const onLanguageChanged: Event<LanguageChangedEvent>;
}

declare namespace overwolf.social {
  namespace enums {
    const enum ShareState {
      Started,
      Uploading,
      Finished
    }
  }
  interface GetUserInfoResult<T> extends Result {
    userInfo?: T;
  }

  interface VideoUploadParams {
    id: string;
    filePath: string;
  }

  interface VideoUploadResult extends Result {
    url: string;
  }

  interface VideoUploadProgress extends Result {
    progress: number;
    id: string;
    state: enums.ShareState;
  }

  interface LoginStateChangedEvent {
    state: "connected" | "disconnected";
  }

  interface GetDisabledServicesResult<T> extends Result {
    disabled_services?: string[];
  }

  