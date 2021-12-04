import BucketEvent from './event/Event';
import BucketEventListener from './listener/EventListener';
import EventHandlerSettings from './handler/EventHandlerSettings';

export default interface EventManager {
  /**
   * Registers all event handlers on a listener instance.
   *
   * @param eventListener the {@link EventListener} to register.
   */
  registerEvents(eventListener: BucketEventListener): void;

  /**
   * Fires a given event.
   *
   * All registered handlers for this even class and its superclasses will be triggered.
   *
   * @param event the {@link Event}.
   */
  fire(event: BucketEvent): void;

  /**
   * Provides a functional approach to register event handlers.
   *
   * @param eventType the class of the {@link Event}.
   * @param method the callback.
   * @param eventHandlerSettings optional {@link EventHandlerSettings} for this handler.
   */
  on<E extends BucketEvent>(
    eventType: new (...args) => E,
    method: (event: E) => void,
    eventHandlerSettings?: Partial<EventHandlerSettings>,
  ): void;
}
