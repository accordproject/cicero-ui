# Cicero UI Library

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

### `npm run lint`

Runs ESLint.

### `npm run build`

Builds the app for production to the `demo` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

---

## How this project is structured

Packages: 
- `TemplateLibrary`: Provides a ReactJS component to fetch and display a library of contract and clause templates in the [Accord Project Cicero format](https://github.com/accordproject/cicero).

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

Describe cicero-ui here.

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
