/**
 * The Overwolf Ads SDK. Use this module to display and manage in-app
 * advertisements in your Overwolf app.
 * @packageDocumentation
 */

/** Callback function signature used by `EventDispatcher` listeners. */
export declare type EventDispCallback = (data: any) => void;

/** A minimal event-dispatcher utility used internally by `OwAd`. */
export declare class EventDispatcher {
    /**
     * Registers a listener for the given event name.
     * @param eventName The name of the event to listen for.
     * @param listener The callback to invoke when the event fires.
     * @returns `true` if the listener was added successfully.
     */
    addEventListener(
      eventName: string,
      listener: EventDispCallback): boolean;
    /**
     * Removes a previously registered listener for the given event name.
     * @param eventName The name of the event.
     * @param listener The callback to remove.
     * @returns `true` if the listener was removed successfully.
     */
    removeEventListener(
      eventName: string,
      listener: EventDispCallback): boolean;
    /**
     * Dispatches an event to all registered listeners.
     * @param eventName The name of the event to fire.
     * @param eventData The data to pass to each listener.
     * @returns `null` on success, `undefined` if no listeners were found.
     */
    fireEvent(eventName: string, eventData: any): null | undefined;
}

/** The pixel dimensions for an ad unit. */
export declare type OwAdOptionsSize = {
  /** Width of the ad in pixels. */
  width: number;
  /** Height of the ad in pixels. */
  height: number;
}

/** Configuration options for an `OwAd` instance. */
export interface OwAdOptions {
  /** Whether the ad should start playing automatically. Defaults to `true`. */
  autoplay?: boolean;
  /** One or more acceptable ad sizes. The ad server will use the best match. */
  size?: OwAdOptionsSize | OwAdOptionsSize[];
  /** When `true`, loads a test ad instead of a live ad. Use during development. */
  testAd?: boolean;
  /** When `true`, enables high-impact (larger/more intrusive) ad formats. */
  enableHighImpact?: boolean;
}

/** Manages the lifecycle and display of a single Overwolf in-app ad unit. */
export declare class OwAd {
  /**
   * Creates a new ad unit inside the given container element.
   * @param container The DOM element that will host the ad.
   * @param options Configuration options for the ad unit.
   */
  constructor(container: HTMLElement, options: OwAdOptions);
  /** The unique identifier assigned to this ad unit, or `null` if not yet initialized. */
  get uid(): string | null;
  /** The version string of the Overwolf Ads SDK. */
  get version(): string;
  /** The `id` of the container element hosting this ad. */
  get containerElem(): {
    id: string;
  };
  /**
   * Resumes playback of the ad.
   * @returns `true` if playback started successfully.
   */
  play(): boolean;
  /**
   * Pauses the currently playing ad.
   * @returns `true` if the ad was paused successfully.
   */
  pause(): boolean;
  /**
   * Requests a new ad from the ad server, replacing the current one.
   * @param refreshOptions Additional options to pass to the refresh call.
   * @returns `true` if the refresh request was accepted.
   */
  refreshAd(refreshOptions: any): boolean;
  /** Advances the ad to the next step in its current workflow. */
  refreshCurrentWFstep(): void;
  /**
   * Removes the ad from the DOM and releases associated resources.
   * @returns `true` if the ad was removed successfully.
   */
  removeAd(): boolean;
  /**
   * Shuts down the ad unit and releases all resources. Always call this
   * when the window hosting the ad is closing.
   */
  shutdown(): Promise<void>;
  /**
   * Registers a listener for an ad lifecycle event.
   * @param eventName The event to listen for (e.g. `"impression"`, `"complete"`).
   * @param listener The callback to invoke when the event fires.
   * @returns `true` if the listener was added successfully.
   */
  addEventListener(
    eventName: string,
    listener: EventDispCallback): boolean;
  /**
   * Removes a previously registered event listener.
   * @param eventName The name of the event.
   * @param listener The callback to remove.
   * @returns `true` if the listener was removed successfully.
   */
  removeEventListener(
    eventName: string,
    listener: EventDispCallback): boolean;
}
