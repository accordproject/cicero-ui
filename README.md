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
