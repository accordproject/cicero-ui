# Developing Cicero-UI

* [Development Setup](#setup)
* [Coding Rules](#rules)
* [Commit Message Guidelines](#commits)
* [Writing Documentation](#documentation)

## <a name="setup"> Development Setup

This document describes how to set up your development environment to build and test Cicero-UI, and
explains the basic mechanics of using `git`, `node`, `npm`.

### Installing Dependencies

Before you can build Cicero-UI, you must install and configure the following dependencies on your
machine:

* [Git][git]: The [Github Guide to
  Installing Git][git-setup] is a good source of information.

* [Node.js v10.15.3 'Dubnium' (LTS)][node]: We use Node to generate the documentation, run a
  development web server, run tests, and generate distributable files. Depending on your system,
  you can install Node either from source or as a pre-packaged bundle.

  We recommend using [nvm][nvm] (or
  [nvm-windows][nvm-windows])
  to manage and install Node.js, which makes it easy to change the version of Node.js per project.

### Forking Cicero-UI on Github

To contribute code to Cicero-UI, you must have a GitHub account so you can push code to your own
fork of Cicero-UI and open Pull Requests in the [GitHub Repository][github].

To create a Github account, follow the instructions [here][github-signup].
Afterwards, go ahead and [fork][github-forking] the
[main Cicero-UI repository][github].

### Building Cicero-UI

To build Cicero-UI, you clone the source code repository and use lerna to build:

```shell
# Clone your Github repository:
git clone https://github.com/<github username>/cicero-ui.git

# Go to the Cicero-UI directory:
cd cicero-ui

# Add the main Cicero-UI repository as an upstream remote to your repository:
git remote add upstream "https://github.com/acccordproject/cicero-ui.git"

# Install node.js dependencies:
npm install
```

### <a name="unit-tests"></a> Running the Unit Test Suite

We write unit and integration tests with Enzyme and execute them with Jest. To run all of the
tests once on Chrome run:

```shell
npm run test
```

## <a name="rules"></a> Coding Rules

To ensure consistency throughout the source code, keep these rules in mind as you are working:

* All features or bug fixes **must be tested** by one or more [specs](#unit-tests).
* All public API methods **must be documented** with jsdoc. To see how we document our APIs, please check
  out the existing source code and see the section about [writing documentation](#documentation)
* With the exceptions listed below, we follow the rules contained in
  [Google's JavaScript Style Guide][google].

## <a name="commits"></a> Git Commit Guidelines

We have very precise rules over how our git commit messages can be formatted.  This leads to **more
readable messages** that are easy to follow when looking through the **project history**.  But also,
we use the git commit messages to **generate the Cicero-UI change log**.

The commit message formatting can be added using a typical git workflow or through the use of a CLI
wizard ([Commitizen][commit]). To use the wizard, run `yarn run commit`
in your terminal after staging your changes in git.

### Commit Message Format
Each commit message consists of a **header**, a **body** and a **footer**.  The header has a special
format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier
to read on GitHub as well as in various git tools.

### Revert
If the commit reverts a previous commit, it should begin with `revert: `, followed by the header
of the reverted commit.
In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit
being reverted.
A commit with this format is automatically created by the [`git revert`][git-revert] command.

### Type
Must be one of the following:

* **feat**: A new feature
* **fix**: A bug fix
* **docs**: Documentation only changes
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing
  semi-colons, etc)
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **perf**: A code change that improves performance
* **test**: Adding missing or correcting existing tests
* **chore**: Changes to the build process or auxiliary tools and libraries such as documentation
  generation

### Scope
The scope could be anything specifying place of the commit change. For example `engine`,
`template`, `clause`, etc...

You can use `*` when the change affects more than a single scope.

### Subject
The subject contains succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize first letter
* no dot (.) at the end

### Body
Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

### Footer
The footer should contain any information about **Breaking Changes** and is also the place to
[reference GitHub issues that this commit closes][closing-issues].

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines.
The rest of the commit message is then used for this.

A detailed explanation can be found in this [document][commit-message-format].

## <a name="documentation"></a> Writing Documentation

The Cicero-UI project uses [jsdoc][jsdoc] for all of its code
documentation.

This means that all the docs are stored inline in the source code and so are kept in sync as it
changes.

This means that since we generate the documentation from the source code, we can easily provide
version-specific documentation by simply checking out a version of Cicero-UI and running the build.

[git]: http://git-scm.com/
[git-setup]: https://help.github.com/en/articles/set-up-git
[node]: https://nodejs.org/en/
[nvm]: https://github.com/creationix/nvm
[nvm-windows]: https://github.com/coreybutler/nvm-windows
[github-signup]: https://github.com/signup/free
[github-forking]: http://help.github.com/forking
[google]: https://google.github.io/styleguide/jsguide.html
[commit]: https://github.com/commitizen/cz-cli
[jsdoc]: http://usejsdoc.org/

## License <a name="license"></a>
Accord Project source code files are made available under the Apache License, Version 2.0 (Apache-2.0), located in the LICENSE file. Accord Project documentation files are made available under the Creative Commons Attribution 4.0 International License (CC-BY-4.0), available at http://creativecommons.org/licenses/by/4.0/.