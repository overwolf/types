/**
   * Fired on hotkey setting change.
   */
  const onChanged: Event<OnChangedEvent>;
}

declare namespace overwolf.settings.language {
  interface GetLanguageResult extends Result {
    language: string;
  }

  interface LanguageChangedEvent {
    language: string;
  }

  /**
   * Returns the current language overwolf is set to in a two letter ISO name format.
   *
   * @param callback
   */
  function get(callback: CallbackFunction<GetLanguageResult>): void;

  