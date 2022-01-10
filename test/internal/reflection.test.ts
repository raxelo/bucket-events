import { EventHandler, getHandlersInListenerClass } from '../../src/reflection/reflectionManager';
import { BucketEvent, EventPriority } from '../../index';
import { expect, test } from 'vitest';

test('Reflection', () => {
  class TestEvent extends BucketEvent {}
  class TestListenerWithAnnotations {
    @EventHandler()
    testHandler(event: TestEvent) {
      console.log('hello!');
    }

    @EventHandler({ eventPriority: EventPriority.MONITOR, ignoreCancelled: true })
    secondTestHandler(event: TestEvent) {
      console.log('hi!');
    }
  }

  const handlers = getHandlersInListenerClass(TestListenerWithAnnotations);
  expect(handlers).toBeTruthy();
  expect(handlers).toHaveLength(2);

  const firstHandler = handlers[0];
  const secondHandler = handlers[1];

  expect(firstHandler.eventType).toHaveProperty('name', TestEvent.name);
  expect(firstHandler.listenerClass).toBe(TestListenerWithAnnotations);
  expect(firstHandler.method).toHaveProperty('name', TestListenerWithAnnotations.prototype.testHandler.name);
  expect(firstHandler.settings).toHaveProperty('eventPriority', 2);
  expect(firstHandler.settings).toHaveProperty('ignoreCancelled', false);

  expect(secondHandler.eventType).toHaveProperty('name', TestEvent.name);
  expect(secondHandler.listenerClass).toBe(TestListenerWithAnnotations);
  expect(secondHandler.method).toHaveProperty('name', TestListenerWithAnnotations.prototype.secondTestHandler.name);
  expect(secondHandler.settings).toHaveProperty('eventPriority', 4);
  expect(secondHandler.settings).toHaveProperty('ignoreCancelled', true);

  function testMethod(event: TestEvent) {}
  class TestListenerWithoutAnnotations {
    testMethod = testMethod;

    caca() {
      console.log('a');
    }
  }

  // Manually call EventHandler decorator.
  EventHandler({ eventPriority: EventPriority.LOW, ignoreCancelled: true })(
    TestListenerWithAnnotations.prototype,
    'secondTestHandler',
    null as PropertyDescriptor,
  );

  expect(handlers).toHaveLength(3);

  const throwErrorFromRegisteringEventsIncorrectly = () => {
    // Registering a handler without an event type will throw an error.
    class TestErrorListener {
      @EventHandler()
      wrongMethod() {
        console.log(`I don't have a method type so it will throw an error.`);
      }
    }
  };

  const throwErrorByIncorrectlyCallingEventHandlerAnnotationManually = () => {
    class TestEmpyClass {}

    EventHandler()(TestEmpyClass.prototype, 'noPropertyHasthisName', null);
  };

  expect(throwErrorFromRegisteringEventsIncorrectly).toThrowError(
    'Error when registering event handler with name wrongMethod on TestErrorListener',
  );

  expect(throwErrorByIncorrectlyCallingEventHandlerAnnotationManually).toThrowError(
    'Error when registering event handler with name noPropertyHasthisName on TestEmpyClass',
  );
});
