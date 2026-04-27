/**
 * Use this API to create and manage a system tray icon for your Overwolf app,
 * including context menus, icon changes, and click events.
 * @packageDocumentation
 */

/**
   * Returns regional information about the user.
   * @param callback Called with the region info.
   */
  function getRegionInfo(callback: CallbackFunction<GetRegionInfoResult>): void;

  /** Result containing regional formatting information for the current user. */
  interface GetRegionInfoResult extends Result {
    /** The regional info object. */
    info: RegionInfo;
  }

  /** Regional formatting preferences for the current user's locale. */
  interface RegionInfo {
    /** The date format string used in the user's locale (e.g., `"MM/DD/YYYY"`). */
    date_format?: string;
    /** The time format string used in the user's locale (e.g., `"HH:mm"`). */
    time_format?: string;
    /** The currency symbol used in the user's locale (e.g., `"$"`). */
    currency_symbol?: string;
    /** Whether the user's locale uses the metric system. */
    is_metric?: boolean;
    /** The name of the user's locale or region. */
    name?: string;
  }
}

declare namespace overwolf.os.tray {
  /**
   * Create a tray icon for the calling extension with the supplied context menu object.
   * @param menu The menu object.
   * @param callback Called with the result.
   */
  function setMenu(
    menu: ExtensionTrayMenu,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Changes the tray icon to the image at the given file path.
   * @param path The path to the new icon image file.
   * @param callback Called with the result.
   */
  function changeIcon(
    path: string,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Changes the tray icon to the image at the given path within the specified storage space.
   * @param space The storage space where the icon file is located.
   * @param path The path to the new icon image file within the storage space.
   * @param callback Called with the result.
   */
  function changeIcon(
    space: extensions.io.enums.StorageSpace,
    path: string,
    callback: CallbackFunction<Result>
  ): void;

  /**
   * Restores the tray icon to the extension's default icon.
   * @param callback Called with the result.
   */
  function restoreIcon(
    callback: CallbackFunction<Result>
  ): void;

  /** Removes the tray icon for the calling extension. */
  function destroy(): void;

  /** The context menu displayed when the user right-clicks the tray icon. */
  interface ExtensionTrayMenu {
    /** The list of top-level menu items in the context menu. */
    menu_items: menu_item[];
  }

  /** A single item in the tray icon context menu. */
  interface menu_item {
    /** The visible label text for this menu item. */
    label?: string;
    /** A unique identifier for this menu item, returned in click events. */
    id?: string;
    /** Whether this menu item is clickable. Defaults to `true`. */
    enabled?: boolean;
    /** Nested sub-items that appear in a submenu under this item. */
    sub_items?: menu_item[];
  }

  /**
   * Fired when an item from the tray icon's context menu is selected.
   */
  const onMenuItemClicked: Event<onMenuItemClickedEvent>;

  /** Event data for a tray context menu item click. */
  interface onMenuItemClickedEvent {
    /** The `id` of the menu item that was clicked. */
    item: string;
  }

  /**
   * Fired when the tray icon is left clicked.
   */
  const onTrayIconClicked: Event<any>;
