/**
  * Fired when a subscription in-app modal window is closed.
  */
  const onInAppSubModalClosed: Event<any>;

}

declare namespace overwolf.profile.subscriptions {
  namespace enums {
    const enum SubscriptionState {
      Active = "active",
      Cancelled = "cancelled",
      Revoked = "revoked",
    }
  }

  interface Info {
    title: string;
    description: string;
    periodMonths: number;
    price: number;
  }

  interface Subscription {
    id: number;
    pid: number;
    uid: string;
    extid: string;
    muid: string;
    exp: number;
    grc: number;
    state: overwolf.profile.subscriptions.enums.SubscriptionState;
    planInfo: Info;
    expired: boolean;
  }

  interface GetActivePlansResult extends Result {
    plans?: number[];
  }

  interface GetDetailedActivePlansResult extends Result {
    plans?: Plan[];
  }

  interface Plan {
    planId: number;
    state: overwolf.profile.subscriptions.enums.SubscriptionState;
    expiryDate: number;
    title: string;
    description: string;
    price: number;
    periodMonths: number;
  }

  interface SubscriptionChangedEvent {
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

  