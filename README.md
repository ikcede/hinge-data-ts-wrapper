Hinge Data Typescript Wrapper
==============================

A Typescript wrapper for downloaded Hinge data, which
will read an exported matches.json file and wrap everything
in Typescript classes.

Some included methods:
- Get total sent likes
- Get all matches
- Get all dates (matches with "We Met" set to "Yes")

## Build

Initial setup:

```sh
npm install
```

Compile JS to a build/ directory:

```sh
npm build
```

## Test

Testing is set up through Jest and Typescript-Jest

```sh
npm test
```

## Docs

Docs are generated through typedoc and also available on the
[wiki](https://github.com/ikcede/hinge-data-ts-wrapper/wiki).

```sh
npx typedoc
```

Github wiki style docs

```sh
npx typedoc --plugin typedoc-plugin-markdown --plugin typedoc-github-wiki-theme --out docs src/hinge-wrapper.ts
```