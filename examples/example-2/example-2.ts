import ChatEvent from './ChatEvent';
import { useEventManager } from '../../index';

// Use the global event manager:
const manager = useEventManager();

// Register event handler in a functional way:
manager.on(ChatEvent, (event) => {
  console.log(`author: ${event.author}, body: ${event.body}`);
});

// Fire an event:
manager.fire(new ChatEvent('Lucas', 'hello world!')); // "author: Lucas, body: hello world!"
