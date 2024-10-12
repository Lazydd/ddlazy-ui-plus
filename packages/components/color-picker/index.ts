import { install } from '../../utils';
import colorPicker from './color-picker.vue';

export * from './types';
export const ddColorPicker = install(colorPicker);
export default ddColorPicker;
