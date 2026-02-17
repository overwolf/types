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
  const enum ConnectionState {
    Unknown = "Unknown",
    Offline = "Offline",
    Connecting = "Connecting",
    Online = "Online",
    Disconnecting = "Disconnecting",
  }

  interface GetCurrentUserResult extends Result {
    avatar?: string;
    channel?: string;
    machineId?: string;
    partnerId?: number;
    userId?: string;
    username?: string;
    parameters?: Dictionary<string>;
    installParams?: any;
    installerExtension?: any;
    displayName?: string;
    uuid?: string;
  }

  interface LoginStateChangedEvent {
    status: string;
    connectionState: ConnectionState;
    username: string;
  }

  interface GenerateUserSessionTokenResult extends Result {
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

  function generateUserSessionToken(
    callback: CallbackFunction<GenerateUserSessionTokenResult>
  ): void;

  function performOverwolfSessionLogin(
    token: string,
    callback: CallbackFunction<Result>
  ): void

  