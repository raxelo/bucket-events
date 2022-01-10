import EventHandlerRegistry from '../../src/handler/internal/EventHandlerRegistry';
import { BucketEvent, EventPriority } from '../../index';
import RegisteredEventHandler from '../../src/handler/RegisteredEventHandler';
import { expect, test } from 'vitest';

test('Event Handler Registry', () => {
  const registry = new EventHandlerRegistry();

  class EventWithNoHandlers extends BucketEvent {}

  class TestEvent extends BucketEvent {}
  class TestChildEvent extends TestEvent {}

  const myEvent = new TestEvent();
  const myChildEvent = new TestChildEvent();

  let eventHandlers = registry.getEventHandlersForEventInstance(myEvent);

  expect(eventHandlers).toBeTruthy();
  expect(eventHandlers).toHaveLength(0);

  const registeredEventHandler: RegisteredEventHandler = {
    data: {
      eventType: TestEvent,
      method: () => 1,
      settings: { eventPriority: EventPriority.HIGH, ignoreCancelled: true },
    },
    invoke: () => 1,
  };
  registry.registerEventHandler(registeredEventHandler);
  registry.registerEventHandler(registeredEventHandler);

  eventHandlers = registry.getEventHandlersForEventInstance(myEvent);
  expect(eventHandlers).toHaveLength(2);

  eventHandlers = registry.getEventHandlersForEventInstance(myChildEvent);
  expect(eventHandlers).toHaveLength(2);

  const anotherRegisteredEventHandler: RegisteredEventHandler = {
    data: {
      eventType: TestEvent,
      method: () => 1,
      settings: { eventPriority: EventPriority.LOW, ignoreCancelled: true },
    },
    invoke: () => 1,
  };
  registry.registerEventHandler(anotherRegisteredEventHandler);

  eventHandlers = registry.getEventHandlersForEventInstance(myEvent);
  expect(eventHandlers).toHaveLength(3);

  const myEventWithNoHandlers = new EventWithNoHandlers();
  eventHandlers = registry.getEventHandlersForEventInstance(myEventWithNoHandlers);
  expect(eventHandlers).toHaveLength(0);
});
