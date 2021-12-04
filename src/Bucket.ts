import EventManager from './EventManager';
import BucketEventManager from './handler/internal/BucketEventManager';

/**
 * Creates a new {@link EventManager} instance.
 */
const newEventManager = (): EventManager => {
  return new BucketEventManager();
};

const globalEventManager: EventManager = newEventManager();

/**
 * Returns a global event manager, in case you don't want to create one yourself.
 */
const useEventManager = () => globalEventManager;

export { useEventManager, newEventManager };
