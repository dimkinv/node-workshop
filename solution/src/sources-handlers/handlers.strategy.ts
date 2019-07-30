import { HandlerInterface } from './handler.interface';
import { JSONHandler } from './json.handler';
import { XMLHandler } from './xml.handler';
import { ImageHandler } from './image.handler';

export const handlersStrategies = new Map<string, HandlerInterface>();
handlersStrategies.set('json', new JSONHandler())
handlersStrategies.set('image', new ImageHandler())
handlersStrategies.set('xml', new XMLHandler())