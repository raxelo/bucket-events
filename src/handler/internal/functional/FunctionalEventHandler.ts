import BucketEvent from '../../../event/Event';
import EventClass from '../../../event/EventClass';
import { getDefaultEventHandlerSettings } from '../../../utils/EventHandlerSettingsUtils';
import EventHandlerData from '../../EventHandlerData';
import EventHandlerSettings from '../../EventHandlerSettings';
import RegisteredEventHandler from '../../RegisteredEventHandler';

class FunctionalEventHandler implements RegisteredEventHandler {
  data: EventHandlerData;
  invoke(event: BucketEvent) {
    try {
      this.data.method(event);
    } catch (err) {
      console.log(`Error while handling ${this.data.eventType.name} on a functional event handler.`);
    }
  }

  constructor(
    eventType: EventClass,
    method: (event: BucketEvent) => void,
    eventHandlerSettings?: Partial<EventHandlerSettings>,
  ) {
    this.data = {
      eventType,
      method,
      settings: getDefaultEventHandlerSettings(eventHandlerSettings),
    };
  }
}

export default FunctionalEventHandler;
