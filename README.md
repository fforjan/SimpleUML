# SimpleUML [![Build Status](https://travis-ci.org/fforjan/SimpleUML.svg?branch=master)](https://travis-ci.org/fforjan/SimpleUML)

Simple UMl is a technical project.

The goal was to discover the electron platform and do a full project in typescript on top of it using Visual Studio Code.
Set of tools used :
-  [Electron](http://electron.atom.io/) 
- [Typescript](http://www.typescriptlang.org/) with [Visual Studio Code](https://code.visualstudio.com/), 
typings with [Tsd](http://definitelytyped.org/tsd/).
- [Tslint](https://github.com/palantir/tslint), [Typedoc](http://typedoc.io/) for quality
- [Grunt](gruntjs.com) / [Travis](https://travis-ci.org/) for building
- homemade grunt tasks for making the distribution

And for the libraries, at the moment mostly JQuery and jumly. Thinking of trying Angular2 on top of it.
To complete, only the code which is from me should be checkin as part of the repository.
External tools & libraries should be downloaded as part of the build.

Part of the idea around the Electron platform was how well is this integrated with the OS and using some graphicals document.
It's reusing Jumly (http://jumly.tmtk.net).

So far, features are 
- displaying all jumly files (*.jm) found into your home directory
- screenshot & copy to clipboard about the rendered document.
- simple multi-document management.


 
