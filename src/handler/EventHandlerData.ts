import EventHandlerMethod from './EventHandlerMethod';
import EventHandlerSettings from './EventHandlerSettings';
import EventClass from '../event/EventClass';

interface EventHandlerData {
  eventType: EventClass;
  method: EventHandlerMethod;
  settings: EventHandlerSettings;
}

export default EventHandlerData;
