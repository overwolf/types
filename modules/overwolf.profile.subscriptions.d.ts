/**
 * Use this API to query and monitor the active subscription plans for the calling Overwolf extension.
 * @packageDocumentation
 */

/**
  * Fired when a subscription in-app modal window is closed.
  */
  const onInAppSubModalClosed: Event<any>;

}

declare namespace overwolf.profile.subscriptions {
  namespace enums {
    /** The current state of a subscription. */
    const enum SubscriptionState {
      /** The subscription is active and in good standing. */
      Active = "active",
      /** The subscription has been cancelled but may still be within its paid period. */
      Cancelled = "cancelled",
      /** The subscription has been revoked and is no longer valid. */
      Revoked = "revoked",
    }
  }

  /** Descriptive information about a subscription plan. */
  interface Info {
    /** The display title of the plan. */
    title: string;
    /** A brief description of what the plan includes. */
    description: string;
    /** The billing period length in months. */
    periodMonths: number;
    /** The price of the plan. */
    price: number;
  }

  /** Represents a single user subscription record. */
  interface Subscription {
    /** The unique subscription record ID. */
    id: number;
    /** The plan ID associated with this subscription. */
    pid: number;
    /** The user ID of the subscriber. */
    uid: string;
    /** The extension ID this subscription belongs to. */
    extid: string;
    /** The machine user ID. */
    muid: string;
    /** The Unix timestamp (in seconds) when this subscription expires. */
    exp: number;
    /** Grace period count for this subscription. */
    grc: number;
    /** The current state of the subscription. */
    state: overwolf.profile.subscriptions.enums.SubscriptionState;
    /** Detailed information about the subscribed plan. */
    planInfo: Info;
    /** Whether the subscription has already expired. */
    expired: boolean;
  }

  /** Result of a `getActivePlans` call. */
  interface GetActivePlansResult extends Result {
    /** Array of active plan IDs for the calling extension. */
    plans?: number[];
  }

  /** Result of a `getDetailedActivePlans` call. */
  interface GetDetailedActivePlansResult extends Result {
    /** Array of detailed active plan objects for the calling extension. */
    plans?: Plan[];
  }

  /** Detailed information about a single active subscription plan. */
  interface Plan {
    /** The unique plan ID. */
    planId: number;
    /** The current state of this plan. */
    state: overwolf.profile.subscriptions.enums.SubscriptionState;
    /** The Unix timestamp (in seconds) when this plan expires. */
    expiryDate: number;
    /** The display title of the plan. */
    title: string;
    /** A brief description of the plan. */
    description: string;
    /** The price of the plan. */
    price: number;
    /** The billing period length in months. */
    periodMonths: number;
  }

  /** Event data fired when the user's active subscriptions change. */
  interface SubscriptionChangedEvent {
    /** The updated list of active plan IDs, if available. */
    plans?: number[];
  }


  /**
   * Returns active subscriptions for the calling extension via callback.
   * @param callback Returns an array of plan IDs, or an error.
   */
  function getActivePlans(
    callback: CallbackFunction<GetActivePlansResult>
  ): void;

  /**
   * Returns more details about all the active subscriptions for the calling extension via callback.
   * @param callback Returns an array of active plans, or an error.
   */
  function getDetailedActivePlans(
    callback: CallbackFunction<GetDetailedActivePlansResult>
  ): void;

  /**
   * Fired when the subscription state for the calling extension changes
   * (e.g. a plan is activated, cancelled, or revoked).
   */
  const onSubscriptionChanged: Event<SubscriptionChangedEvent>;

