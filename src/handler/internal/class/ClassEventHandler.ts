import ClassEventHandlerData from './ClassEventHandlerData';
import BucketEvent from '../../../event/Event';
import BucketEventListener from '../../../listener/EventListener';
import RegisteredEventHandler from '../../RegisteredEventHandler';

class ClassEventHandler implements RegisteredEventHandler {
  data: ClassEventHandlerData;
  listener: BucketEventListener;

  invoke(event: BucketEvent) {
    try {
      const method = this.data.method;
      const args = [event];
      method.apply(this.listener, args);
    } catch (err) {
      console.log(`Error while handling ${this.data.eventType.name} on ${this.data.listenerClass.name}.`);
      console.log(err);
    }
  }

  constructor(data: ClassEventHandlerData, listener: BucketEventListener) {
    this.data = data;
    this.listener = listener;
  }
}

export default ClassEventHandler;
