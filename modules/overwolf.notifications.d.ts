/**
   * Fired when a new Replay highlight recorded (when highlightsSetting is enabled).
   */
  const onHighlightsCaptured: Event<HighlightsCapturedEvent>;
}

declare namespace overwolf.notifications {
  namespace enums {
    const enum AppLogoCrop {
      Default = "Default",
      None = "None",
      Circle = "Circle",
    }

    const enum ToatsEventType {
      Dismiss = "dismiss",
      ButtonClick = "buttonClick",
      Error = "error",
    }

    const enum ToastEventError {
      Unknown = "unknown",
      NotificationsDisabled = "notificationsDisabled ",
      Error = "error"
    }
  }

  interface ToastNotificationParams {
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

  interface LogoOverride {
    url: string;
    cropType: enums.AppLogoCrop;
  }

  interface ToastNotificationButton {
    id: string;
    text: string;
  }

  interface ShowToastNotificationResult extends Result {
    id: string;
  }

  interface ToastNotificationEvent {
    id: string;
    eventType: enums.ToatsEventType;
    buttonID: string;
    error: string;
    errorCode: enums.ToastEventError;
  }

  /**
   * Fired when a user tapped on the body of a toast notification or performed an action inside a toast notification.
   */
  const onToastInteraction: Event<ToastNotificationEvent>;

  