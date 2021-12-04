import EventHandlerData from './EventHandlerData';
import BucketEvent from '../event/Event';

interface RegisteredEventHandler {
  data: EventHandlerData;
  invoke(event: BucketEvent);
}

export default RegisteredEventHandler;
