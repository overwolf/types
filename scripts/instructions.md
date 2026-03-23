# Markdown API Build Instructions

Purpose: generate API markdown under `docs/markdown/api` using TypeDoc and post-processing scripts.

Usage:

1. From repo root, install dependencies: `npm install`
2. Run: `npm run docs:mdx`

What it does:

- Runs `npm run docs:clean` and `npm run docs:prepare-folders`
- Builds temp TypeDoc options in `temp_typedoc/typedoc.mdx.json`
- Runs `npx typedoc --options temp_typedoc/typedoc.mdx.json`
- Organizes MDX by namespace and fixes breadcrumb links

Output:

- `docs/markdown/api`

Debug:

- After the options file is built, you can run `npx typedoc --options temp_typedoc/typedoc.mdx.json` directly.

Build the files in this repo, then copy the files to the docs site repo to the correct location. Test the build in the docs site and deploy when ready.
