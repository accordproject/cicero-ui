# Cicero UI Library

[![Build Status](https://travis-ci.org/accordproject/cicero-ui.svg?branch=master)](https://travis-ci.org/accordproject/cicero-ui) [![npm version](https://badge.fury.io/js/%40accordproject%2Fcicero-ui.svg)](https://badge.fury.io/js/%40accordproject%2Fcicero-ui)

The Accord Project Cicero UI Library can be used for implementing React components in your contract editing studio.

## Instructions
This is a short reference guide, for a more full context, please refer to our [CONTRIBUTING guide][contributing] and information for [DEVELOPERS][developers].

For using individual components in an app, refer to the individual component's README.

### Implementation

Components ready for use:
- [`ContractEditor`][contracteditor]
- [`TemplateLibrary`][templatelibrary]


Components still in development:
- [`ClauseEditor`][clauseeditor]
- [`ErrorLogger`][errorlogger]
- [`ParseResult`][parseresult]
- [`TemplateLoadingClauseEditor`][templateloadingclauseeditor]

### Development

1. Fork project to your repository
2. Clone to local machine with `git clone`
3. `cd` into the directory
4. Run `npm install`
5. Ensure the `IBM Plex Sans` is imported with `<link href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans:300,400,500,500i,700" rel="stylesheet">` is in the *.html file of your main app
6. Build a production state with `npm run build`
7. Transpile code for build with `npm run transpile`
8. Create a global link with `npm link`
9. In your main app directory, run `npm link @accordproject/cicero-ui`

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

## Styling

You can style most of the components in this library:

#### <a name="ContractEditor"></a> Contract Editor: `editorProps`

You can style the toolbar of this components, as well as the width of the editor:

An object may be passed down this component which will then be picked up by our `markdown-editor`, with the following possible css inputs as strings:
- `BUTTON_BACKGROUND_INACTIVE`
- `BUTTON_BACKGROUND_ACTIVE`
- `BUTTON_SYMBOL_INACTIVE`
- `BUTTON_SYMBOL_ACTIVE`
- `DROPDOWN_COLOR`
- `TOOLBAR_BACKGROUND`
- `TOOLTIP_BACKGROUND`
- `TOOLTIP`
- `TOOLBAR_SHADOW`
- `WIDTH`

#### <a name="TemplateLibrary"></a> Template Library: `libraryProps`

You can style the template card components, as well as the header:

An object may be passed down this component with the following possible css inputs as strings:
- `ACTION_BUTTON`
- `ACTION_BUTTON_BG`
- `ACTION_BUTTON_BORDER`
- `HEADER_TITLE`
- `TEMPLATE_BACKGROUND`
- `TEMPLATE_DESCRIPTION`
- `TEMPLATE_TITLE`

---

## <a name="Structure"></a> Structure of the Code Repository

Top level repository (cicero-ui), with sub packages. The entire package is published as an independent npm module:
- [`ClauseEditor`][clauseeditor]: Functional ReactJS component which displays text of Clause in [@accordproject/markdown-editor][markdown] and parses text using associated template.
- [`ContractEditor`][contracteditor]: Functional ReactJS component for a rich text contract editor which wraps the [@accordproject/markdown-editor][markdown] editor and assings the Clause plugin.
- [`ErrorLogger`][errorlogger]: Functional ReactJS component for displaying model and logic errors associated with contracts and clauses with location information when applicable.
- [`ParseResult`][parseresult]: 
- [`TemplateLibrary`][templatelibrary]: Provides a ReactJS component to fetch and display a library of contract and clause templates in the [Accord Project Cicero format][cicero].
- [`TemplateLoadingClauseEditor`][templateloadingclauseeditor]:

---

<a href="https://www.accordproject.org/">
  <img src="assets/APLogo.png" alt="Accord Project Logo" width="400" />
</a>

Accord Project is an open source, non-profit, initiative working to transform contract management and contract automation by digitizing contracts. Accord Project operates under the umbrella of the [Linux Foundation][linuxfound]. The technical charter for the Accord Project can be found [here][charter].

## Learn More About Accord Project

### Overview
* [Accord Project][apmain]
* [Accord Project News][apnews]
* [Accord Project Blog][apblog]
* [Accord Project Slack][apslack]
* [Accord Project Technical Documentation][apdoc]
* [Accord Project GitHub][apgit]


### Documentation
* [Getting Started with Accord Project][docwelcome]
* [Concepts and High-level Architecture][dochighlevel]
* [How to use the Cicero Templating System][doccicero]
* [How to Author Accord Project Templates][docstudio]
* [Ergo Language Guide][docergo]

## Contributing

The Accord Project technology is being developed as open source. All the software packages are being actively maintained on GitHub and we encourage organizations and individuals to contribute requirements, documentation, issues, new templates, and code.

Find out what’s coming on our [blog][apblog].

Join the Accord Project Technology Working Group [Slack channel][apslack] to get involved!

For code contributions, read our [CONTRIBUTING guide][contributing] and information for [DEVELOPERS][developers].

## License <a name="license"></a>

Accord Project source code files are made available under the [Apache License, Version 2.0][apache].
Accord Project documentation files are made available under the [Creative Commons Attribution 4.0 International License][creativecommons] (CC-BY-4.0).

Copyright 2018-2019 Clause, Inc. All trademarks are the property of their respective owners. See [LF Projects Trademark Policy](https://lfprojects.org/policies/trademark-policy/).

[contracteditor]: src/ContractEditor/README.md
[templatelibrary]: src/TemplateLibrary/README.md
[clauseeditor]: src/ClauseEditor/README.md
[errorlogger]: src/ErrorLogger/README.md
[parseresult]: src/ParseResult/README.md
[templateloadingclauseeditor]: src/TemplateLoadingClauseEditor/README.md

[cicero]: https://github.com/accordproject/cicero
[markdown]: https://github.com/accordproject/markdown-editor

[linuxfound]: https://www.linuxfoundation.org
[charter]: https://github.com/accordproject/cicero-ui/blob/master/CHARTER.md
[apmain]: https://accordproject.org/ 
[apworkgroup]: https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=MjZvYzIzZHVrYnI1aDVzbjZnMHJqYmtwaGlfMjAxNzExMTVUMjEwMDAwWiBkYW5AY2xhdXNlLmlv&tmsrc=dan%40clause.io
[apblog]: https://medium.com/@accordhq
[apnews]: https://www.accordproject.org/news/
[apgit]:  https://github.com/accordproject/
[apdoc]: https://docs.accordproject.org/
[apslack]: https://accord-project-slack-signup.herokuapp.com

[docspec]: https://docs.accordproject.org/docs/spec-overview.html
[docwelcome]: https://docs.accordproject.org/docs/accordproject.html
[dochighlevel]: https://docs.accordproject.org/docs/spec-concepts.html
[docergo]: https://docs.accordproject.org/docs/logic-ergo.html
[docstart]: https://docs.accordproject.org/docs/accordproject.html
[doccicero]: https://docs.accordproject.org/docs/basic-use.html
[docstudio]: https://docs.accordproject.org/docs/advanced-latedelivery.html

[contributing]: https://github.com/accordproject/cicero-ui/blob/master/CONTRIBUTING.md
[developers]: https://github.com/accordproject/cicero-ui/blob/master/DEVELOPERS.md

[apache]: https://github.com/accordproject/template-studio-v2/blob/master/LICENSE
[creativecommons]: http://creativecommons.org/licenses/by/4.0/