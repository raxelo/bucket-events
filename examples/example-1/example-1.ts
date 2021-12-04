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
