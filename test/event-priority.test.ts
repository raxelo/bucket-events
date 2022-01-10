import { BucketEvent, BucketEventListener, EventHandler, EventPriority, newEventManager } from '../index';
import { expect, test } from 'vitest';

function resetCounterIfGreaterOrEquals9(event: TestEvent) {
  if (event.counter <= 9) return;

  event.counter = 0;
}

class TestEvent extends BucketEvent {
  counter = 0;
}

class TestListenerAddToCounter extends BucketEventListener {
  @EventHandler()
  addOne(event: TestEvent) {
    event.counter += 1;
  }

  @EventHandler()
  addTwo(event: TestEvent) {
    event.counter += 2;
  }
}

/**
 * Reset the counter if it is above 9.
 * This is done using the HIGH event priority (after other handlers have updated the counter).
 */
class TestListenerResetCounter extends BucketEventListener {
  @EventHandler({ eventPriority: EventPriority.HIGH })
  resetCounter(event: TestEvent) {
    resetCounterIfGreaterOrEquals9(event);
  }
}

test('Event priority on class handler', () => {
  const eventManager = newEventManager();
  eventManager.registerEvents(new TestListenerResetCounter());
  eventManager.registerEvents(new TestListenerAddToCounter());

  const myEvent = new TestEvent();
  eventManager.fire(myEvent);
  eventManager.fire(myEvent);
  eventManager.fire(myEvent);

  // Firing the event 3 times should add a total of 9.
  expect(myEvent.counter).toBe(9);

  // Firing it once more should reset the counter
  eventManager.fire(myEvent);
  expect(myEvent.counter).toBe(0);
});

test('Event priority on functional handler', () => {
  const eventManager = newEventManager();
  eventManager.on(TestEvent, (event) => {
    event.counter += 3;
  });
  eventManager.on(TestEvent, resetCounterIfGreaterOrEquals9, { eventPriority: EventPriority.HIGH });

  const myEvent = new TestEvent();
  eventManager.fire(myEvent);
  eventManager.fire(myEvent);
  eventManager.fire(myEvent);

  // Firing the event 3 times should add a total of 9.
  expect(myEvent.counter).toBe(9);

  // Firing it once more should reset the counter
  eventManager.fire(myEvent);
  expect(myEvent.counter).toBe(0);
});
