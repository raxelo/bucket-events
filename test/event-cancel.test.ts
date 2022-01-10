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

class TestListenerAddToCounterIgnoreCancelled extends BucketEventListener {
  @EventHandler({ ignoreCancelled: true })
  addOne(event: TestEvent) {
    event.counter += 1;
  }
}

test('Cancel an event using class handler', () => {
  const eventManager = newEventManager();
  eventManager.registerEvents(new TestListenerAddToCounter());

  const myEvent = new TestEvent();
  eventManager.fire(myEvent);

  // The event is cancelled now so the 2 following calls shouldn't do anything.
  myEvent.setCancelled(true);
  eventManager.fire(myEvent);
  eventManager.fire(myEvent);

  expect(myEvent.counter).toBe(3);

  /**
   * Register a new listener which has a handler with ignoreCancelled: true.
   *
   * From now on, even if the event is cancelled, the counter will get +1 added from this listener,
   * as well as +3 from the {@link TestListenerAddToCounter} as long as the event is not cancelled.
   */
  eventManager.registerEvents(new TestListenerAddToCounterIgnoreCancelled());
  eventManager.fire(myEvent);
  expect(myEvent.counter).toBe(4);

  // Uncancel the event.
  myEvent.setCancelled(false);

  eventManager.fire(myEvent);
  eventManager.fire(myEvent);

  expect(myEvent.counter).toBe(12);
});

test('Cancel an event using functional handler', () => {
  const eventManager = newEventManager();
  eventManager.on(TestEvent, (event) => {
    event.counter += 3;
  });

  const myEvent = new TestEvent();
  eventManager.fire(myEvent);

  // The event is cancelled now so the 2 following calls shouldn't do anything.
  myEvent.setCancelled(true);
  eventManager.fire(myEvent);
  eventManager.fire(myEvent);

  expect(myEvent.counter).toBe(3);

  eventManager.on(
    TestEvent,
    (event) => {
      event.counter += 1;
    },
    { ignoreCancelled: true },
  );

  eventManager.fire(myEvent);
  expect(myEvent.counter).toBe(4);
  myEvent.setCancelled(false);

  eventManager.fire(myEvent);
  eventManager.fire(myEvent);

  expect(myEvent.counter).toBe(12);
});
