/**
 * overwolf.campaigns.crossapp
 *
 * An API that allows crossapp-promotions: One app can promote another app and
 * then get an indication for a successful conversion.
 *
 * For example - an app can promote a video capture and sharing app and receive
 * a notification as soon as the user shares a video from the promoted app.
 *
 * 1. Promoting app calls:
 *
 *    overwolf.campaigns.crossapp.set({
 *      id: 'lkjk23535', // An extension-specific unique campaign id
 *      action: 'social-share', // The action for conversion
 *      expiration: 1601510400000,
 *      target_apps_uids: [ 'PROMOTED-EXTENSION-ID' ], // '*' for any app
 *      data: {
 *        social_networks: [ 'twitter' ],
 *        game_ids: [9196, 5426],
 *        hashtags: [ 'got-here-from-XXX-app' ]
 *      }
 *    }, console.log);
 *
 * 2. Promoting app then redirects the user to download the promoted extension
 *
 *    e.g. overwolf.utils.openStore({
 *          uid: 'PROMOTED-EXTENSION-ID',
 *          page: overwolf.utils.enums.eStorePage.OneAppPage
 *         });
 *
 * 3. Promoted app, when an action of interest occurs, calls:
 *
 *    const getAvailCampaigns = () => {
 *      return new Promise((resolve, reject) => {
 *        overwolf.campaigns.crossapp.getAvailableActions(result => {
 *          if (!result.success) {
  *            return reject(result);
 *          }
 *
 *          return resolve(result);
 *        });
 *      });
 *    }
 *
 *    ...
 *
 *    // It is not recommended to call an Overwolf API from within a callback -
 *    // so we use await/async.
 *    const actions = await getAvailCampaigns();
 *    actions.forEach(action => {
 *      if (conversionComplete(action)) {
 *
 *        overwolf.campaigns.crossapp.reportConversion({
 *          id: action.id,
 *          owner_app_uid: action.owner_app_uid,
 *          data: {
 *            game_id: 9196,
 *            social_network: 'twitter',
 *            share_url: '...'
 *          }
 *        });
 *
 *      }
 *    });
 *
 * 4. Promoting app will then get launched with the 'campaign-event' source url
 * parameter. It will then call: overwolf.campaigns.crossapp.consumeConversions
 * to review the existing conversions (this will remove the conversions from
 * consecutive calls to consumeConversions)
 * 
 * @packageDocumentation
 */
declare namespace overwolf.campaigns.crossapp {
  /**
   * Container that represent a shared data parameters.
   */
  interface CrossAppCampaign {
    /**
     * An id to identify the campaign (action/conversion).
     * `id` should be unique per an extension (two different extensions can use
     * the same id).
     */
    id: string;

    /**
     * The type of action this cross-app campaign supports.
     * This is a free-text string.
     */
    action: string;

    /**
     * Expiration date expressed in milliseconds since epoch (Unix Time, UTC).
     *
     * e.g. Date.now() or (new Date()).getTime()
     */
    expiration: number;

    /**
     * The UID of the app that owns the targeted cross-app campaign.
     */
    owner_app_uid?: string;

    /**
     * An array of app UIDs this cross-app campaign targets.
     */
    target_apps_uids?: string[];

    /**
     * Information about the cross-app campaign.
     *
     * This is a free-form json object that gives more instructions on the
     * required action.
     */
    data: any;
  }

  /**
   * Container that represent a cross app campaign conversions.
   */
  interface CrossAppCampaignConversion {
    /**
     * The ID of the cross-app campaign the conversion targets.
     */
    id: string;

    /**
     * The UID of the app that owns the targeted cross-app campaign.
     */
    owner_app_uid: string;

    /**
     * Conversion data for the specified action.
     */
    data: any;

    /**
     * The UID of the app that performed the conversion (the promoted app).
     *
     * Set by the Overwolf client when calling `consumeConversions`.
     */
    readonly origin_app_uid?: string;

    /**
     * When the conversion took place.
     *
     * Set by the Overwolf client when calling `consumeConversions`.
     */
    readonly timestamp?: number;
  }

  /**
   * Object result from `overwolf.campaigns.crossapp.getAvailableActions`
   * 
   */
  interface GetCrossAppAvailableActionsResult extends Result {
    actions: CrossAppCampaign[];
  }

  /**
   * Object result from `overwolf.campaigns.crossapp.consumeConversions`
   */
  interface GetCrossAppConversionsResult extends Result {
    conversions: CrossAppCampaignConversion[];
  }

  /**
   * Receive all cross-app actions that target the currently running extension.
   * @param callback
   */
  function getAvailableActions(
    callback: CallbackFunction<GetCrossAppAvailableActionsResult>
  ): void;

  /**
   * Initiate or modify a cross-app campaign action for this extension.
   *
   * @param campaign
   * @param callback
   */
  function set(
    campaign: CrossAppCampaign,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Submit new conversion for a cross-app campaign.
   *
   * @param conversionInfo
   * @param callback
   */
  function reportConversion(
    conversionInfo: CrossAppCampaignConversion,
    callback: CallbackFunction<Result>
  ): void;

  
