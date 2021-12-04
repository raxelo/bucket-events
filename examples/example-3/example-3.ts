import ChatEvent from './ChatEvent';
import ChatListener from './ChatListener';
import { useEventManager } from '../../index';

// Use the global event manager:
const manager = useEventManager();

const listener = new ChatListener();

// Register all event handlers on a listener instance:
manager.registerEvents(listener);

// Fire an event:
manager.fire(new ChatEvent('Lucas', 'hello world!')); // This message won't be shown because the author name is banned.

manager.fire(new ChatEvent('Ruben', 'hi!')); // "author: Ruben, body: hi!"

manager.fire(new ChatEvent('Lucas', '🐙 this message is special'));
// will print "🐙 this message is special" because octopuses are special.
