# DS_Docs

DS_Docs is a SSG for documentation written in vanilla markdown. The goal of the project is to satisfy, what I think is, a very niche use case. 
DS (Directory Structured) Docs recursively searches for .md files in the current directory. Then it generates a website based on the project's directory tree, including a navigation menu.
The markdown is parsed into a template using marked, and the template is made with Carbon Design System web components from IBM. 

DS_Docs is not currently stable. 

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- UI Shell and Navigation menu from IBM's Carbon Design System.
- Mirrors the source code's directory tree, making it easy for solo dev's to keep up with markdown files placed inline with their components source code.
- Allows for use of .doc.md file extension, so that you can separate other .md files for other purposes. 
- Allows you to exclude directories from the search path. e.g. "node_modules". 
- So far... It's fairly straight forward to edit. There's not much code here.

## Installation

There is currently no npm package. 

```bash
$ git clone https://github.com/masonkieth/ds_docs
$ cd ds_docs
$ yarn install # Or any other package manager/command
```

## Usage

You can run the app with ```./bin/ds_doc```. Optionally you can use ```npm link``` to symlink the project for use in other directories. As of v0.0.5 there is not an ```--init``` command, so you'll need to copy the ds-docs.json into the root of your project folder, or copy the code below into a file and pass it to ```ds-docs --config /path/to/file```.
```
    {
    "requireDoc": false, //requires files to end in .doc.md to be included
    "excludeDir": ["node_modules", ".git"],
    "buildDir": "./ds_docs",
    "projectName": "Project Name",
    "projetDescription": "Directly/Directory structured documentation."
    }
```
The dependencies include light-server, if you use the example files to test with, just set bs-config.json to the correct path to server you files. 

## Contributing

The following was just part of the readme template I chose, I'm assuming it's correct... Full disclosure, I have almost zero experience with github collaboration features. Please be patient. 

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/new-feature`.
3. Make your changes and commit them: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature/new-feature`.
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).