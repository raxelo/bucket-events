import EventClass from '../../event/EventClass';
import RegisteredEventHandler from '../RegisteredEventHandler';
import { EventPriority, getPriorities } from '../EventPriority';
import BucketEvent from '../../event/Event';

class EventHandlerRegistry {
  private priorityMappedEventHandlers: Map<EventPriority, Map<EventClass, RegisteredEventHandler[]>> = new Map();

  /**
   * Returns all registered event handlers for this event or its superclasses.
   *
   * @param event the event instance.
   */
  public getEventHandlersForEventInstance(event: BucketEvent) {
    return getPriorities()
      .map((priority) => this.priorityMappedEventHandlers.get(priority))
      .filter((results) => !!results)
      .flatMap((eventMap) => {
        let eventType = event.constructor;
        const handlers = eventMap.get(eventType) ?? [];

        // Loop in order to get eventHandlers for superclasses of this eventType.
        while (eventType != BucketEvent) {
          eventType = Object.getPrototypeOf(eventType);
          const superHandlers = eventMap.get(eventType) || [];
          handlers.push(...superHandlers);
        }

        return handlers;
      });
  }

  /**
   * Adds an event handler to the registry.
   *
   * @param eventHandler the eventHandler to register.
   */
  public registerEventHandler(eventHandler: RegisteredEventHandler) {
    const eventType = eventHandler.data.eventType;
    const priority = eventHandler.data.settings.eventPriority;

    if (!this.priorityMappedEventHandlers.has(priority)) {
      this.priorityMappedEventHandlers.set(priority, new Map());
    }
    const eventMap = this.priorityMappedEventHandlers.get(priority);

    if (!eventMap.has(eventType)) {
      eventMap.set(eventType, []);
    }

    const events = eventMap.get(eventType);
    events.push(eventHandler);
  }
}

export default EventHandlerRegistry;
