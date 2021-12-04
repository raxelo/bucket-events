import ListenerClass from '../../../listener/ListenerClass';
import EventHandlerData from '../../EventHandlerData';

interface ClassEventHandlerData extends EventHandlerData {
  listenerClass: ListenerClass;
}

export default ClassEventHandlerData;
