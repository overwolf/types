#!/usr/bin/env node
/**
 * Generates MDX documentation for owads.d.ts into docs/markdown/api/Owads/.
 * Run AFTER docs:mdx — that script cleans the output folder first, so this
 * must run second to avoid being wiped.
 */
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const API_OUT = path.join(ROOT, 'docs', 'markdown', 'api');
const OUT = path.join(API_OUT, 'Owads');
const ROOT_OVERVIEW = path.join(API_OUT, 'Overview.mdx');

function ensureDir(d) { fs.mkdirSync(d, { recursive: true }); }

function write(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Wrote', path.relative(ROOT, filePath));
}

// ---------------------------------------------------------------------------
// MDX file content
// ---------------------------------------------------------------------------

function writeOverview() {
  write(path.join(OUT, 'Overview.mdx'),
`---
sidebar_position: 1
sidebar_label: "Overview"
title: "Overview"
unlisted: false
toc_max_heading_level: 6
---

# Overview

The Overwolf Ads SDK. Use this module to display and manage in-app advertisements in your Overwolf app.

## Classes

| API | Description |
| --- | --- |
| [EventDispatcher](./Classes/EventDispatcher) | A minimal event-dispatcher utility used internally by \`OwAd\`. |
| [OwAd](./Classes/OwAd) | Manages the lifecycle and display of a single Overwolf in-app ad unit. |

## Interfaces

| API | Description |
| --- | --- |
| [OwAdOptions](./Interfaces/OwAdOptions) | Configuration options for an \`OwAd\` instance. |

## Type-aliases

| API | Description |
| --- | --- |
| [EventDispCallback](./Type-aliases/EventDispCallback) | Callback function signature used by \`EventDispatcher\` listeners. |
| [OwAdOptionsSize](./Type-aliases/OwAdOptionsSize) | The pixel dimensions for an ad unit. |
`);
}

function writeEventDispatcher() {
  write(path.join(OUT, 'Classes', 'EventDispatcher.mdx'),
`---
sidebar_label: "EventDispatcher"
---

OwAds / EventDispatcher

A minimal event-dispatcher utility used internally by \`OwAd\`.

## Methods

### addEventListener()

\`\`\`ts
addEventListener(eventName: string, listener: EventDispCallback): boolean;
\`\`\`

Registers a listener for the given event name.

#### Parameters

| Parameter   | Type                                                     | Description                                   |
| ----------- | -------------------------------------------------------- | --------------------------------------------- |
| \`eventName\` | \`string\`                                                 | The name of the event to listen for.          |
| \`listener\`  | [\`EventDispCallback\`](../Type-aliases/EventDispCallback) | The callback to invoke when the event fires.  |

#### Returns

\`boolean\` — \`true\` if the listener was added successfully.

---

### removeEventListener()

\`\`\`ts
removeEventListener(eventName: string, listener: EventDispCallback): boolean;
\`\`\`

Removes a previously registered listener for the given event name.

#### Parameters

| Parameter   | Type                                                     | Description                  |
| ----------- | -------------------------------------------------------- | ---------------------------- |
| \`eventName\` | \`string\`                                                 | The name of the event.       |
| \`listener\`  | [\`EventDispCallback\`](../Type-aliases/EventDispCallback) | The callback to remove.      |

#### Returns

\`boolean\` — \`true\` if the listener was removed successfully.

---

### fireEvent()

\`\`\`ts
fireEvent(eventName: string, eventData: any): null | undefined;
\`\`\`

Dispatches an event to all registered listeners.

#### Parameters

| Parameter   | Type     | Description                        |
| ----------- | -------- | ---------------------------------- |
| \`eventName\` | \`string\` | The name of the event to fire.     |
| \`eventData\` | \`any\`    | The data to pass to each listener. |

#### Returns

\`null\` on success, \`undefined\` if no listeners were found.
`);
}

function writeOwAd() {
  write(path.join(OUT, 'Classes', 'OwAd.mdx'),
`---
sidebar_label: "OwAd"
---

OwAds / OwAd

Manages the lifecycle and display of a single Overwolf in-app ad unit.

## Constructors

### new OwAd()

\`\`\`ts
new OwAd(container: HTMLElement, options: OwAdOptions): OwAd;
\`\`\`

Creates a new ad unit inside the given container element.

#### Parameters

| Parameter   | Type                                      | Description                            |
| ----------- | ----------------------------------------- | -------------------------------------- |
| \`container\` | \`HTMLElement\`                             | The DOM element that will host the ad. |
| \`options\`   | [\`OwAdOptions\`](../Interfaces/OwAdOptions) | Configuration options for the ad unit. |

#### Returns

\`OwAd\`

---

## Accessors

### uid

\`\`\`ts
get uid(): string | null;
\`\`\`

The unique identifier assigned to this ad unit, or \`null\` if not yet initialized.

---

### version

\`\`\`ts
get version(): string;
\`\`\`

The version string of the Overwolf Ads SDK.

---

### containerElem

\`\`\`ts
get containerElem(): { id: string };
\`\`\`

The \`id\` of the container element hosting this ad.

---

## Methods

### play()

\`\`\`ts
play(): boolean;
\`\`\`

Resumes playback of the ad.

#### Returns

\`boolean\` — \`true\` if playback started successfully.

---

### pause()

\`\`\`ts
pause(): boolean;
\`\`\`

Pauses the currently playing ad.

#### Returns

\`boolean\` — \`true\` if the ad was paused successfully.

---

### refreshAd()

\`\`\`ts
refreshAd(refreshOptions: any): boolean;
\`\`\`

Requests a new ad from the ad server, replacing the current one.

#### Parameters

| Parameter        | Type  | Description                                     |
| ---------------- | ----- | ----------------------------------------------- |
| \`refreshOptions\` | \`any\` | Additional options to pass to the refresh call. |

#### Returns

\`boolean\` — \`true\` if the refresh request was accepted.

---

### refreshCurrentWFstep()

\`\`\`ts
refreshCurrentWFstep(): void;
\`\`\`

Advances the ad to the next step in its current workflow.

#### Returns

\`void\`

---

### removeAd()

\`\`\`ts
removeAd(): boolean;
\`\`\`

Removes the ad from the DOM and releases associated resources.

#### Returns

\`boolean\` — \`true\` if the ad was removed successfully.

---

### shutdown()

\`\`\`ts
shutdown(): Promise<void>;
\`\`\`

Shuts down the ad unit and releases all resources. Always call this when the window hosting the ad is closing.

#### Returns

\`Promise<void>\`

---

### addEventListener()

\`\`\`ts
addEventListener(eventName: string, listener: EventDispCallback): boolean;
\`\`\`

Registers a listener for an ad lifecycle event.

#### Parameters

| Parameter   | Type                                                     | Description                                                  |
| ----------- | -------------------------------------------------------- | ------------------------------------------------------------ |
| \`eventName\` | \`string\`                                                 | The event to listen for (e.g. \`"impression"\`, \`"complete"\`). |
| \`listener\`  | [\`EventDispCallback\`](../Type-aliases/EventDispCallback) | The callback to invoke when the event fires.                 |

#### Returns

\`boolean\` — \`true\` if the listener was added successfully.

---

### removeEventListener()

\`\`\`ts
removeEventListener(eventName: string, listener: EventDispCallback): boolean;
\`\`\`

Removes a previously registered event listener.

#### Parameters

| Parameter   | Type                                                     | Description             |
| ----------- | -------------------------------------------------------- | ----------------------- |
| \`eventName\` | \`string\`                                                 | The name of the event.  |
| \`listener\`  | [\`EventDispCallback\`](../Type-aliases/EventDispCallback) | The callback to remove. |

#### Returns

\`boolean\` — \`true\` if the listener was removed successfully.
`);
}

function writeOwAdOptions() {
  write(path.join(OUT, 'Interfaces', 'OwAdOptions.mdx'),
`---
sidebar_label: "OwAdOptions"
---

OwAds / OwAdOptions

Configuration options for an \`OwAd\` instance.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| <a id="property-autoplay"></a> \`autoplay?\` | \`boolean\` | Whether the ad should start playing automatically. Defaults to \`true\`. |
| <a id="property-size"></a> \`size?\` | [\`OwAdOptionsSize\`](../Type-aliases/OwAdOptionsSize) \\| [\`OwAdOptionsSize\`](../Type-aliases/OwAdOptionsSize)\`[]\` | One or more acceptable ad sizes. The ad server will use the best match. |
| <a id="property-testad"></a> \`testAd?\` | \`boolean\` | When \`true\`, loads a test ad instead of a live ad. Use during development. |
| <a id="property-enablehighimpact"></a> \`enableHighImpact?\` | \`boolean\` | When \`true\`, enables high-impact (larger/more intrusive) ad formats. |
`);
}

function writeEventDispCallback() {
  write(path.join(OUT, 'Type-aliases', 'EventDispCallback.mdx'),
`---
sidebar_label: "EventDispCallback"
---

OwAds / EventDispCallback

Callback function signature used by \`EventDispatcher\` listeners.

\`\`\`ts
type EventDispCallback = (data: any) => void;
\`\`\`

## Parameters

| Parameter | Type  |
| --------- | ----- |
| \`data\`    | \`any\` |

## Returns

\`void\`
`);
}

function writeOwAdOptionsSize() {
  write(path.join(OUT, 'Type-aliases', 'OwAdOptionsSize.mdx'),
`---
sidebar_label: "OwAdOptionsSize"
---

OwAds / OwAdOptionsSize

The pixel dimensions for an ad unit.

\`\`\`ts
type OwAdOptionsSize = {
  width: number;
  height: number;
};
\`\`\`

## Properties

| Property | Type | Description |
| --- | --- | --- |
| <a id="property-width"></a> \`width\` | \`number\` | Width of the ad in pixels. |
| <a id="property-height"></a> \`height\` | \`number\` | Height of the ad in pixels. |
`);
}

// ---------------------------------------------------------------------------
// Sidebar position reassignment
// Reads all top-level dirs in API_OUT (which now includes Owads), sorts them
// alphabetically, and rewrites every _category_.json with a fresh position
// starting at 4 — keeping Owads in correct order relative to its siblings.
// ---------------------------------------------------------------------------

function reassignCategoryPositions() {
  const dirs = fs.readdirSync(API_OUT, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

  let pos = 4;
  for (const d of dirs) {
    const catPath = path.join(API_OUT, d, '_category_.json');
    let existing = {};
    try { existing = JSON.parse(fs.readFileSync(catPath, 'utf8')); } catch { /* new dir */ }
    const updated = { ...existing, label: existing.label || d, position: pos };
    fs.writeFileSync(catPath, JSON.stringify(updated, null, 2) + '\n', 'utf8');
    pos++;
  }
  console.log(`Reassigned sidebar positions for ${dirs.length} namespaces.`);
}

// ---------------------------------------------------------------------------
// Root Overview.mdx — insert the owads row if not already present.
// Alphabetically, "Owads" (case-insensitive) sorts after "overwolf" and before
// "paths", so the row is inserted between those two entries.
// ---------------------------------------------------------------------------

function updateRootOverview() {
  if (!fs.existsSync(ROOT_OVERVIEW)) {
    console.warn('Root Overview.mdx not found — skipping.');
    return;
  }

  let content = fs.readFileSync(ROOT_OVERVIEW, 'utf8');

  if (content.includes('./Owads/Overview')) {
    console.log('Root Overview.mdx already contains owads entry.');
    return;
  }

  const OWADS_ROW =
    '| [owads](./Owads/Overview) | The Overwolf Ads SDK.' +
    ' Use this module to display and manage in-app advertisements in your Overwolf app. |';

  // Insert between the [overwolf](...) row and the [overwolf.paths](...) row
  let updated = content.replace(
    /([ \t]*\| \[overwolf\]\(\.\/overwolf\/Overview\)[^\n]*\n)([ \t]*\| \[overwolf\.paths\])/,
    `$1${OWADS_ROW}\n$2`
  );

  if (updated === content) {
    // Fallback: append before the trailing newline of the last table row
    console.warn('Could not find exact insertion point; appending owads row at end of table.');
    updated = content.trimEnd() + '\n' + OWADS_ROW + '\n';
  }

  fs.writeFileSync(ROOT_OVERVIEW, updated, 'utf8');
  console.log('Updated', path.relative(ROOT, ROOT_OVERVIEW));
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

function run() {
  writeOverview();
  writeEventDispatcher();
  writeOwAd();
  writeOwAdOptions();
  writeEventDispCallback();
  writeOwAdOptionsSize();
  reassignCategoryPositions();
  updateRootOverview();
  console.log('Done generating OwAds docs.');
}

run();
