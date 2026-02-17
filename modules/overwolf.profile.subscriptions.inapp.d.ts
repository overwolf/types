/**
   * Fired when a user logged in or logged out.
   */
  const onLoginStateChanged: Event<LoginStateChangedEvent>;
}

declare namespace overwolf.profile.subscriptions.inapp {
  const enum Theme {
    Light = "Light",
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

  