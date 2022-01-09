import { BucketEvent, BucketEventListener, EventHandler, EventPriority, useEventManager } from '../index';
import { expect, test } from 'vitest';

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
    if (event.counter <= 9) return;

    event.counter = 0;
  }
}

const eventManager = useEventManager();

test('Event priority', () => {
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
