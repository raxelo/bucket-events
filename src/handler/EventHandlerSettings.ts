import { EventPriority } from './EventPriority';

interface EventHandlerSettings {
  ignoreCancelled: boolean;
  eventPriority: EventPriority;
}

export default EventHandlerSettings;
