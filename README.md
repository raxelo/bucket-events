# Bucket

TypeScript event library inspired on Bukkit's event system and [ReflectedEventHandler](https://github.com/xXNurioXx/ReflectedEventHandler).

> ⚠️ If you want to enjoy the library to the fullest and use [decorators](https://www.typescriptlang.org/docs/handbook/decorators.html) to register event handlers, you must enable [`experimentalDecorators`](https://www.typescriptlang.org/tsconfig#experimentalDecorators) & [`emitDecoratorMetadata`](https://www.typescriptlang.org/tsconfig/emitDecoratorMetadata.html) on your [`tsconfig`](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) file.


## Usage


```ts
import { newEventManager, useEventManager } from 'bucket-events';
import ChatEvent from './chatEvent'

// You can create a new event manager:
const eventManager = newEventManager();

// Or use the global one:
const globalEventManager = useEventManager();


// Then, register event handlers:


// In a functional way:
eventManager


// You can register event handlers in a functional way:


```