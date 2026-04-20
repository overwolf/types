/**
 * Use this API to display Windows toast notifications from your Overwolf app.
 * @packageDocumentation
 */

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

