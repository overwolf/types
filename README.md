### DefinitelyTyped
The repository for Overwolf TypeScript type definition.

Type definition files allow you to provide type information for JavaScript code that is by itself (by its very nature) not statically typed. The file extension for such a file is “d.ts”, where d stands for definition. Type definition files make it possible to enjoy the benefits of type checking, autocompletion, and member documentation.

### Using def file without Typescript

Even if your application uses plain JavaScript and no TypeScript at all, you can use the type definition files for autocompletion and documentation purposes. Simply include them in your Visual Studio Code project. will then include the found types in its auto-completion list, given that you've got TypeScript installed.

Of course, you won't get the benefit of type checking because you're not actually using TypeScript, but still, the provided information can be very helpful for working with the dynamic and loosely typed language that is JavaScript.

### Install using npm

his is the preferred method. Getting type declarations in TypeScript 2.0 and above requires no tools apart from npm.

```
npm install --save-dev @types/jquery
```

The types should then be automatically included by the compiler. See more in the handbook.

### Download the def file

Download a declaration file from the repository and include a line like this:

```
/// <reference types="typescript" />

```

### Consuming from Typescript project

From there you’ll be able to use lodash in your TypeScript code with no fuss. This works for both modules and global code.

For example, once you’ve npm install-ed your type declarations, you can use imports and write

```
import * as _ from "lodash";
_.padStart("Hello TypeScript!", 20, " ");
```

or if you’re not using modules, you can just use the global variable _.

```
_.padStart("Hello TypeScript!", 20, " ");

```




