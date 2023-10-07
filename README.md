# Auto-compile typescript

- Typescript compile for your Javscript while locally developing in Franklin
- Beside compiling typescript to javscript, it also minifies and uglifies javscript code to speeds up your page loading

## Environments

- Preview: https://main--{repo}--{owner}.hlx.page/
- Live: https://main--{repo}--{owner}.hlx.live/

## Installation

```sh
npm i
```

## Run typescript auto-compile and Helix Pages

```sh
npm start
```

The above command will run `node tscompile.js` in parallel with `aem up` which will start your local Helix Pages development environment.

### Note on Typescript usage and Helix Local Development

The npm start will parse the scripts and blocks directory for any `.ts` files. Files that are found will be compiled to javascript and saved in the same location and name with a `.js` extension. It will then continue to watch for changes to `.ts` files and will compile to their associated javascript files on changes.

Examples:

- `{repo}/blocks/header/header.ts` will compile to `{repo}/blocks/header/header.js`
- `{repo}/scripts/scripts.ts` will compile to `{repo}/scripts/scripts.js`

As both `tscompile.js` and `aem up` are watching for changes, changes made to your typescript files while using the `npm start` command will be reflected automatically in your localhost.

File changes:

- `{repo}/.eslintignore` : Ignore linting javscript files
- `{repo}/.eslintrc`: Configure linting with typescript
- `{repo}/.nvmrc`: Using nvm to manage node version
- `{repo}/.package.json`: Update `lint`, `lint:ts` and `start` scripts
- `{repo}/tscompile.js`: Watch and compile typescript files
- `{repo}/tsconfig.json`: Configuration for typescript
- `{repo}/scripts/my-typescript.ts`: Just demo typescript file
- `{repo}/scripts/my-typescript.js`: Compiled javascript file

## Linting

```sh
npm run lint
```

## Local development

1. Create a new repository based on the `aem-boilerplate` template and add a mountpoint in the `fstab.yaml`
1. Add the [AEM Code Sync GitHub App](https://github.com/apps/aem-code-sync) to the repository
1. Install the [AEM CLI](https://github.com/adobe/aem-cli): `npm install -g @adobe/aem-cli`
1. Start AEM Proxy: `aem up` (opens your browser at `http://localhost:3000`)
1. Open the `{repo}` directory in your favorite IDE and start coding :)
