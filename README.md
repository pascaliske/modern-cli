# `pascaliske/modern-cli`

[![npm](https://img.shields.io/npm/v/modern-cli.svg?style=flat)]()
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://raw.githubusercontent.com/pascaliske/modern-cli/master/LICENSE.md)
[![Travis](https://img.shields.io/travis/pascaliske/modern-cli.svg?style=flat)]()
[![Greenkeeper badge](https://badges.greenkeeper.io/pascaliske/modern-cli.svg)](https://greenkeeper.io/)

> Library for class based modern cli scripts.

Write modern node cli scripts using ES6 classes.

## Install
```bash
$ yarn add modern-cli
```

## Basic Usage
Here are some basic examples for the usage. For more information see the [docs](https://pascaliske.github.io/modern-cli/docs).

### Using functions

###### `./examples/basic.js`:
```js
import { Cli } from 'modern-cli';

new Cli('script', '1.0.1')
    .addCommands([
        {
            name: 'command',
            description: '',
            execute: () => console.log('success')
        }
    ])
    .run();
```

Now you can use the script in one of the following ways:

```bash
$ babel-node ./examples/basic.js command
$ ./examples/basic.js --help
```

### Using a dedicated command class

###### `./examples/basic2.js`:
```js
import { Cli } from 'modern-cli';
import MyCommand from './mycommand.js';

new Cli('script')
    .addCommands([
        new MyCommand()
    ])
    .run();
```

###### `./examples/mycommand.js`:
```js
import { Command } from 'modern-cli';

export default class MyCommand extends Command {
    /**
     * Initializes the cli command
     */
    constructor() {
        super('mycommand', 'Some helpful description of "mycommand".');
    }

    async execute() {
        // here comes your code which should be executed by this command
    }
}
```

Again, you can use the script in one of the following ways:

```
$ ./examples/basic2.js mycommand
$ ./examples/basic2.js --help
```

## License
MIT © [Pascal Iske](https://pascal-iske.de)
