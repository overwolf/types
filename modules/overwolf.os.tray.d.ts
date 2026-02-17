/**
   * Returns regional information about the user.
   * @param callback Called with the region info.
   */
  function getRegionInfo(callback: CallbackFunction<GetRegionInfoResult>): void;

  interface GetRegionInfoResult extends Result {
    info: RegionInfo;
  }

  interface RegionInfo {
    date_format?: string;
    time_format?: string;
    currency_symbol?: string;
    is_metric?: boolean;
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

  function changeIcon(
    path: string,
    callback: CallbackFunction<Result>
  ): void;

  function changeIcon(
    space: extensions.io.enums.StorageSpace,
    path: string,
    callback: CallbackFunction<Result>
  ): void;

  function restoreIcon(
    callback: CallbackFunction<Result>
  ): void;

  function destroy(): void;

  interface ExtensionTrayMenu {
    menu_items: menu_item[];
  }

  interface menu_item {
    label?: string;
    id?: string;
    enabled?: boolean;
    sub_items?: menu_item[];
  }

  /**
   * Fired when an item from the tray icon’s context menu is selected.
   */
  const onMenuItemClicked: Event<onMenuItemClickedEvent>;

  interface onMenuItemClickedEvent {
    item: string;
  }

  /**
   * Fired when the tray icon is left clicked.
   */
  const onTrayIconClicked: Event<any>;

  