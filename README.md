# Bucket

TypeScript event library inspired on Bukkit's event system and [ReflectedEventHandler](https://github.com/xXNurioXx/ReflectedEventHandler).

> ⚠️ If you want to enjoy the library to the fullest and use [decorators](https://www.typescriptlang.org/docs/handbook/decorators.html) to register event handlers, you must enable [`experimentalDecorators`](https://www.typescriptlang.org/tsconfig#experimentalDecorators) & [`emitDecoratorMetadata`](https://www.typescriptlang.org/tsconfig/emitDecoratorMetadata.html) on your [`tsconfig`](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) file.

## Installation

```
npm i bucket-events
```

## Usage


> This code is taken from [one of the examples](https://github.com/pragmare/bucket-events/tree/main/examples/example-1)

```ts
import ChatListener from './ChatListener';
import ChatEvent from './ChatEvent';
import { newEventManager } from 'bucket-events';

// Create a new event manager:
const manager = newEventManager();

const listener = new ChatListener();

// Register all event handlers on a listener instance:
manager.registerEvents(listener);

// Fire an event:
manager.fire(new ChatEvent('Lucas', 'hello world!')); // "author: Lucas, body: hello world!"
```