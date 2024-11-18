import { install } from '../../utils';
import DatePicker from './date-picker.vue';
import DateRangePicker from './date-range-picker.vue';

export * from './types';
export const ddDatePicker = install(DatePicker);
export const ddDateRangePicker = install(DateRangePicker);
export default [ddDatePicker, ddDateRangePicker];
