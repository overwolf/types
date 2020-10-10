# @overwolf/types

Overwolf type definition files for autocompletion and documentation purposes.

## Install

This is the preferred method. Getting type declarations in TypeScript 2.0 and above requires no tools apart from npm.

```
$ npm i --save-dev @overwolf/types
```

> In some configurations with webpack, you will get an error like this:
>
> ```
> This dependency was not found:
>
> * @overwolf/types in ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??> ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!
> ```
>
> To install it, you can run:
> ```
> npm install --save @overwolf/types
> ```

## Usage

To use it in your Typescript project, you should add it as a `type` in your tsconfig.json

```
{
  "compilerOptions":{
    ...,
    "types": [
      ...,
      "@overwolf/types"
      ...
    ]
    ...,
  }
  ...
}
```

## Overwolf Adverts

To use the `owads` typings, add a triple-slash directive to the files that need to use the typings:

```
/// <reference path="../node_modules/@overwolf/types/owads.d.ts" />
```