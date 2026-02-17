## Generating MDX docs from `.d.ts` files

Quick steps:

1. Install dev deps:

```bash
npm install --save-dev typedoc typedoc-plugin-markdown minimist
```

2. Generate MDX and organize by master namespace:

```bash
npm run docs:mdx
```

3. Output is in `docs/markdown/api` — each master namespace (e.g. `overwolf.games`) will be in its own folder with an `Overview.mdx` file.

Notes:

- Config file: `typedoc.mdx.json` (root) contains the options used by `typedoc`.
- Postprocess: `scripts/organize-mdx-by-namespace.js` groups the generated files by the top two namespace segments and generates overviews.
- If you want different grouping (e.g. single-segment), edit `masterNamespace` in the script.
