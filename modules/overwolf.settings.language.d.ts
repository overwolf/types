/**
 * The `overwolf.settings.language` namespace lets you retrieve the Overwolf client's current UI language
 * and listen for language change events.
 * @packageDocumentation
 */

/**
   * Fired on hotkey setting change.
   */
  const onChanged: Event<OnChangedEvent>;
}

declare namespace overwolf.settings.language {
  /** Result of a `get` call containing the current language code. */
  interface GetLanguageResult extends Result {
    /** The current Overwolf UI language as a two-letter ISO 639-1 code (e.g. `"en"`). */
    language: string;
  }

  /** Event data fired when the Overwolf UI language changes. */
  interface LanguageChangedEvent {
    /** The new language as a two-letter ISO 639-1 code. */
    language: string;
  }

  /**
   * Returns the current language Overwolf is set to in a two-letter ISO 639-1 format.
   * @param callback Called with the current language code.
   */
  function get(callback: CallbackFunction<GetLanguageResult>): void;

