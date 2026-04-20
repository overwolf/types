/**
 * Use this API to access the currently logged-in Overwolf user's profile information and monitor login state changes.
 * @packageDocumentation
 */

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

