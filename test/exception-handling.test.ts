import { BucketEvent, BucketEventListener, EventHandler, newEventManager } from '../index';
import { expect, test } from 'vitest';

function generateException() {
  const emptyArr = [];
  emptyArr[0].unexistentMethod();
}

class TestMessageEvent extends BucketEvent {
  message = 'hello!';
}

class TestListenerWithError extends BucketEventListener {
  @EventHandler()
  throwError(event: TestMessageEvent) {
    generateException();
  }
}

class RegularTestListener extends BucketEventListener {
  @EventHandler()
  addEmojiToMessage(event: TestMessageEvent) {
    event.message += ' 🐙';
  }
}

test('Handle exception on class handler', () => {
  const eventManager = newEventManager();
  eventManager.registerEvents(new TestListenerWithError());
  eventManager.registerEvents(new RegularTestListener());

  const myParentEvent = new TestMessageEvent();
  console.log('It is normal for the following line to show an error in console.');
  eventManager.fire(myParentEvent);

  expect(myParentEvent.message).toBe('hello! 🐙');
});

test('Handle exception on functional handler', () => {
  const eventManager = newEventManager();
  // Functional handler with error
  eventManager.on(TestMessageEvent, generateException);

  eventManager.on(TestMessageEvent, (event) => {
    event.message += ' 🐙';
  });

  const myParentEvent = new TestMessageEvent();
  console.log('It is normal for the following line to show an error in console.');
  eventManager.fire(myParentEvent);

  expect(myParentEvent.message).toBe('hello! 🐙');
});
