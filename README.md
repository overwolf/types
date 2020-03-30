# @overwolf/types

Overwolf type definition files for autocompletion and documentation purposes.  

## Install

This is the preferred method. Getting type declarations in TypeScript 2.0 and above requires no tools apart from npm.

```
$ npm i --save-dev @overwolf/types
```

## Usage

To use it in your Typescript project, you should include this line on the top of each file that use the types.

```
import "@overwolf/types";
```

In some configurations with webpack, you will get an error like this:
From vue-cli project:
```
This dependency was not found:

* @overwolf/types in ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!

To install it, you can run: npm install --save @overwolf/types
```
What works here is adding it as types to your tsconfig.json, **INSTEAD OF IMPPORTING IT**
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
