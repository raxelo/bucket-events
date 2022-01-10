import { BucketEvent, BucketEventListener, EventHandler, newEventManager } from '../index';
import { expect, test } from 'vitest';

class ParentEvent extends BucketEvent {
  counter = 0;
}

class ChildEvent extends ParentEvent {}

/**
 * Parent events only get +1 added to their counter.
 *
 * Child events get +1 from their parents, and also +2 (total of +3).
 */
class TestListenerAddToCounter extends BucketEventListener {
  @EventHandler()
  addOneToParent(event: ParentEvent) {
    event.counter += 1;
  }

  @EventHandler()
  addTwoToChild(event: ChildEvent) {
    event.counter += 2;
  }
}

test('Parent event using class handler', () => {
  const eventManager = newEventManager();
  eventManager.registerEvents(new TestListenerAddToCounter());

  const myParentEvent = new ParentEvent();
  eventManager.fire(myParentEvent);

  expect(myParentEvent.counter).toBe(1);
});

test('Child event using class handler', () => {
  const eventManager = newEventManager();
  eventManager.registerEvents(new TestListenerAddToCounter());

  const myChildEvent = new ChildEvent();
  eventManager.fire(myChildEvent);

  expect(myChildEvent.counter).toBe(3);
});

test('Parent event using functional handler', () => {
  const eventManager = newEventManager();
  eventManager.on(ChildEvent, (event) => {
    event.counter += 2;
  });
  eventManager.on(ParentEvent, (event) => {
    event.counter += 1;
  });

  const myChildEvent = new ChildEvent();
  eventManager.fire(myChildEvent);

  expect(myChildEvent.counter).toBe(3);
});

test('Child event using functional handler', () => {
  const eventManager = newEventManager();
  eventManager.on(ChildEvent, (event) => {
    event.counter += 2;
  });
  eventManager.on(ParentEvent, (event) => {
    event.counter += 1;
  });

  const myChildEvent = new ChildEvent();
  eventManager.fire(myChildEvent);

  expect(myChildEvent.counter).toBe(3);
});
