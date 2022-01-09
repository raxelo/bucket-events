import { BucketEvent, BucketEventListener, EventHandler, useEventManager } from '../index';
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

const eventManager = useEventManager();
eventManager.registerEvents(new TestListenerAddToCounter());

test('Parent event', () => {
  const myParentEvent = new ParentEvent();
  eventManager.fire(myParentEvent);

  expect(myParentEvent.counter).toBe(1);
});

test('Child event', () => {
  const myChildEvent = new ChildEvent();
  eventManager.fire(myChildEvent);

  expect(myChildEvent.counter).toBe(3);
});
