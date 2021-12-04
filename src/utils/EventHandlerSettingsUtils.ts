import EventHandlerSettings from '../handler/EventHandlerSettings';
import { EventPriority } from '../handler/EventPriority';

function getDefaultEventHandlerSettings(settings: Partial<EventHandlerSettings>): EventHandlerSettings {
  const defaultSettings: EventHandlerSettings = { eventPriority: EventPriority.NORMAL, ignoreCancelled: false };
  if (!settings) return defaultSettings;

  return {
    ...defaultSettings,
    ...settings,
  };
}

export { getDefaultEventHandlerSettings };
