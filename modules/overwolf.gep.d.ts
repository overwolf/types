/**
 * The `overwolf.gep` namespace exposes internal Game Events Provider metadata,
 * primarily used for diagnostics and version reporting.
 * @packageDocumentation
 */

/**
   * Fired when an error is returned from Reddit.
   */
  const onShareFailed: Event<ShareFailedEvent>;
}

declare namespace overwolf.gep {
  /** Internal GEP metadata, used for diagnostics. */
  type GepInternal = {
    /** The version string of the currently running GEP instance. */
    version_info: string;
  };
}
