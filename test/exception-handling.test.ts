import { BucketEvent, BucketEventListener, EventHandler, useEventManager } from '../index';
import { expect, test } from 'vitest';

class TestMessageEvent extends BucketEvent {
  message = 'hello!';
}

class TestListenerWithError extends BucketEventListener {
  @EventHandler()
  throwError(event: TestMessageEvent) {
    const emptyArr = [];
    emptyArr[0].unexistentMethod();
  }
}

class RegularTestListener extends BucketEventListener {
  @EventHandler()
  addEmojiToMessage(event: TestMessageEvent) {
    event.message += ' 🐙';
  }
}

const eventManager = useEventManager();
eventManager.registerEvents(new TestListenerWithError());
eventManager.registerEvents(new RegularTestListener());

test('Exception handling', () => {
  const myParentEvent = new TestMessageEvent();
  console.log('It is normal for the following line to show an error in console.');
  eventManager.fire(myParentEvent);

  expect(myParentEvent.message).toBe('hello! 🐙');
});
