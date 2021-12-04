import 'reflect-metadata';
import ListenerClass from '../listener/ListenerClass';
import EventHandlerMethod from '../handler/EventHandlerMethod';
import EventHandlerSettings from '../handler/EventHandlerSettings';
import { getDefaultEventHandlerSettings } from '../utils/EventHandlerSettingsUtils';
import ClassEventHandlerData from '../handler/internal/class/ClassEventHandlerData';

const staticEventHandlerMap: Map<ListenerClass, ClassEventHandlerData[]> = new Map();

/**
 * TypeScript decorator to register event handlers on a listener class.
 *
 * @param settings the EventHandler settings.
 */
function EventHandler(settings?: Partial<EventHandlerSettings>): MethodDecorator {
  const decorator = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const args = Reflect.getMetadata('design:paramtypes', target, propertyKey);
    if (!args || args.length !== 1) {
      throw 'error.';
    }

    const eventType = args[0];
    const method = target[propertyKey] as EventHandlerMethod;
    const listenerClass = target.constructor as ListenerClass;

    const eventHandlerData: ClassEventHandlerData = {
      eventType,
      method,
      settings: getDefaultEventHandlerSettings(settings),
      listenerClass,
    };

    if (!staticEventHandlerMap.has(listenerClass)) {
      staticEventHandlerMap.set(listenerClass, []);
    }

    const existingClassEventHandlers = staticEventHandlerMap.get(listenerClass);

    existingClassEventHandlers.push(eventHandlerData);
  };
  return decorator;
}

function getHandlersInListenerClass(listenerClass: ListenerClass) {
  return staticEventHandlerMap.get(listenerClass) || [];
}

export { EventHandler, getHandlersInListenerClass };
