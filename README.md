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

#### `npm run start`

Runs the app in the development mode.<br>
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.
**NOTE**: These require templates to be passed down through props from an app in which these components should be rendered.

#### `npm run test`

Launches JEST over the repository.
Current snapshot tests requires `npm test -- -u` in order to update when all changes are final.

#### `npm run lint`

Runs ESLint.

#### `npm run build`

Builds the app for production to the `demo` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

---

## Structure of the Code Repository

Top level repository (cicero-ui), with sub packages. The entire package is published as an independent npm module:
- `ClauseEditor`: Functional ReactJS component which displays text of Clause in [@accordproject/markdown-editor][markdown] and parses text using associated template.
- `ContractEditor`: Functional ReactJS component for a rich text contract editor which wraps the [@accordproject/markdown-editor][markdown] editor and assings the Clause plugin.
- `ErrorLogger`: Functional ReactJS component for displaying model and logic errors associated with contracts and clauses with location information when applicable.
- `ParseResult`: 
- `SlateCommands`: 
- `TemplateLibrary`: Provides a ReactJS component to fetch and display a library of contract and clause templates in the [Accord Project Cicero format][cicero].
- `TemplateLoadingClauseEditor`: 
- `Tile`: 

---

<a href="https://docs.accordproject.org/">
	<img src="assets/APLogo.png" alt="Accord Project Logo" />
</a>

Accord Project is an open source, non-profit, initiative working to transform contract management and contract automation by digitizing contracts.

## Contributing

Read our [contributing guide][contribute] and information for [developers][developer]. Find out what’s coming on our [blog][apblog].

## Getting Started

### Learn About Accord Project
* [Welcome][welcome]
* [Concepts and High-level Architecture][highlevel]
* [Ergo Language][ergolanguage]

### Try Accord Project
* [Using a Template with Cicero][usingcicero]
* [Authoring in Template Studio][authoring]

### Technical Reads
* [Ergo Compiler][ergocompiler]

### Blog
* [Accord Project News][apnews]

### Accord Project Codebase
* [Cicero][cicero]
* [Ergo][ergo]
* [Cicero Template Library][CTL]
* [Models][models]

* [Template Studio][tsv2]
* [Cicero UI][ciceroui]
* [Concerto UI][concertoui]
* [Markdown Editor][mdeditor]

## Community

The Accord Project technology is being developed as open source. All the software packages are being actively maintained on GitHub and we encourage organizations and individuals to contribute requirements, documentation, issues, new templates, and code.

Join the Accord Project Technology Working Group [Slack channel][slack] to get involved!

## License <a name="license"></a>

Accord Project source code files are made available under the [Apache License, Version 2.0][apache].

Accord Project documentation files are made available under the [Creative Commons Attribution 4.0 International License][creativecommons] (CC-BY-4.0).

[cicero]: https://github.com/accordproject/cicero
[markdown]: https://github.com/accordproject/markdown-editor

[contribute]: https://github.com/accordproject/cicero-ui/blob/master/CONTRIBUTING.md
[developer]: https://github.com/accordproject/cicero-ui/blob/master/DEVELOPERS.md
[apblog]: https://medium.com/@accordhq

[welcome]: https://docs.accordproject.org/docs/accordproject.html#what-is-accord-project
[highlevel]: https://docs.accordproject.org/docs/spec-concepts.html
[ergolanguage]: https://docs.accordproject.org/docs/logic-ergo.html

[usingcicero]: https://docs.accordproject.org/docs/basic-use.html
[authoring]: https://docs.accordproject.org/docs/advanced-latedelivery.html

[ergocompiler]: https://docs.accordproject.org/docs/ref-logic-specification.html

[apnews]: https://www.accordproject.org/news/
[cicero]: https://github.com/accordproject/cicero
[ergo]: https://github.com/accordproject/ergo
[CTL]: https://github.com/accordproject/cicero-template-library
[models]: https://github.com/accordproject/models

[tsv2]: https://github.com/accordproject/template-studio-v2
[ciceroui]: https://github.com/accordproject/cicero-ui
[concertoui]: https://github.com/accordproject/concerto-ui
[mdeditor]: https://github.com/accordproject/markdown-editor

[slack]: https://accord-project-slack-signup.herokuapp.com
[apache]: https://github.com/accordproject/cicero-ui/blob/master/LICENSE
[creativecommons]: http://creativecommons.org/licenses/by/4.0/