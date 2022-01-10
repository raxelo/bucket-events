import { BucketEvent, BucketEventListener, EventHandler, newEventManager } from '../index';
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

test('Fire an event', () => {
  const eventManager = newEventManager();
  eventManager.registerEvents(new TestListenerAddToCounter());

  const myEvent = new TestEvent();
  eventManager.fire(myEvent);
  eventManager.fire(myEvent);
  eventManager.fire(myEvent);

  // Firing the event 3 times should add a total of 9.
  expect(myEvent.counter).toBe(9);
});

test('Fire an event using functional handler', () => {
  const eventManager = newEventManager();
  /**
   * Similar to {@link TestListenerAddToCounter} but using functional approach.
   */
  eventManager.on(TestEvent, (event) => {
    event.counter += 1;
  });
  eventManager.on(TestEvent, (event) => {
    event.counter += 2;
  });

  const myEvent = new TestEvent();
  eventManager.fire(myEvent);
  eventManager.fire(myEvent);
  eventManager.fire(myEvent);

  expect(myEvent.counter).toBe(9);
});
