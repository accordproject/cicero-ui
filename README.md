# Cicero UI Library

[![Build Status](https://travis-ci.org/accordproject/cicero-ui.svg?branch=master)](https://travis-ci.org/accordproject/cicero-ui) [![npm version](https://badge.fury.io/js/%40accordproject%2Fcicero-ui.svg)](https://badge.fury.io/js/%40accordproject%2Fcicero-ui)

The Accord Project Cicero UI Library can be used for implementing React components in your contract editing studio.

## Development Instructions - Build

1. Fork project to your repository.
2. Clone to your local machine with `git clone`
3. `cd` into the directory.
4. Run `npm install`.
5. Transpile code for build with `npm run transpile`.
6. Build a production state with `npm run build`.
7. Ensure the `<link href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans:300,400,500,500i,700" rel="stylesheet">` line is in the *.html file of Template Studio.
8. Create a global link with `npm link`.
9. Copy the <NAME> value from `package.json` for the link to Template Studio.

---

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.<br>
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.
**NOTE**: These require templates to be passed down through props from an app in which these components should be rendered.

### `npm run test`

Launches JEST over the repository.
Current snapshot tests requires `npm test -- -u` in order to update when all changes are final.

### `npm run lint`

Runs ESLint.

### `npm run build`

Builds the app for production to the `demo` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

---


## Structure of the Code Repository

Top level repository (cicero-ui), with sub packages. The entire package is published as an independent npm module:
- `TemplateLibrary` : Provides a ReactJS component to fetch and display a library of contract and clause templates in the [Accord Project Cicero format][cicero].
- `ContractEditor` : This is a ReactJS component for a rich text contract editor. It is based on the [@accordproject/markdown-editor][markdown] component.

[cicero]: https://github.com/accordproject/cicero
[markdown]: https://github.com/accordproject/markdown-editor

## License <a name="license"></a>
Accord Project source code files are made available under the Apache License, Version 2.0 (Apache-2.0), located in the LICENSE file. Accord Project documentation files are made available under the Creative Commons Attribution 4.0 International License (CC-BY-4.0), available at http://creativecommons.org/licenses/by/4.0/.