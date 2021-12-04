import ClassEventHandler from './class/ClassEventHandler';
import EventHandlerRegistry from './EventHandlerRegistry';
import FunctionalEventHandler from './functional/FunctionalEventHandler';
import BucketEvent from '../../event/Event';
import ListenerClass from '../../listener/ListenerClass';
import { getHandlersInListenerClass } from '../../reflection/reflectionManager';
import EventHandlerSettings from '../EventHandlerSettings';
import RegisteredEventHandler from '../RegisteredEventHandler';
import EventManager from '../../EventManager';

export default class BucketEventManager implements EventManager {
  private eventRegistry: EventHandlerRegistry = new EventHandlerRegistry();

  public registerEvents(eventListener: EventListener) {
    const listenerClass: ListenerClass = eventListener.constructor;

    const staticEventHandlers = getHandlersInListenerClass(listenerClass);
    const regsiteredEventHandlers: RegisteredEventHandler[] = staticEventHandlers.map(
      (eventHandlerData) => new ClassEventHandler(eventHandlerData, eventListener),
    );

    regsiteredEventHandlers.forEach((handler) => this.eventRegistry.registerEventHandler(handler));
  }

  public fire(event: BucketEvent) {
    const eventHandlers = this.eventRegistry.getEventHandlersForEventInstance(event);
    for (const handler of eventHandlers) {
      const ignoreCancelled = handler.data.settings.ignoreCancelled;

      if (event.cancelled && !ignoreCancelled) continue;

      handler.invoke(event);
    }
  }

  public on<E extends BucketEvent>(
    eventType: new (...args) => E,
    method: (event: E) => void,
    eventHandlerSettings?: Partial<EventHandlerSettings>,
  ) {
    const eventHandler = new FunctionalEventHandler(eventType, method, eventHandlerSettings);
    this.eventRegistry.registerEventHandler(eventHandler);
  }
}
