import { install } from '../../utils';
import TimePicker from './time-picker.vue';
import TimeRangePicker from './time-range-picker.vue';

export * from './types';
export const ddTimePicker = install(TimePicker);
export const ddTimeRangePicker = install(TimeRangePicker);
export default [ddTimePicker, ddTimeRangePicker];
