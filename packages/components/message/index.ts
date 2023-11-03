import { install } from '../../utils';
import Message from './message';

export * from './types';
export const ddMessage = install(Message);
export default ddMessage;
