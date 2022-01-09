import { BucketEvent, BucketEventListener, EventHandler, useEventManager } from '../index';
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

const eventManager = useEventManager();

test('Fire an event', () => {
  eventManager.registerEvents(new TestListenerAddToCounter());

  const myEvent = new TestEvent();
  eventManager.fire(myEvent);
  eventManager.fire(myEvent);
  eventManager.fire(myEvent);

  // Firing the event 3 times should add a total of 9.
  expect(myEvent.counter).toBe(9);
});
