import type { ExtractPropTypes, PropType } from 'vue';
import type { Dayjs } from 'dayjs';
import type { TimePickerProps } from '../time-picker/types';

export type DatePickerSizeType = 'large' | 'middle' | 'small';

export type datePickerType = string | number | Date | Dayjs;
type Generic = string;
type GenericFn = (value: Dayjs) => string;
export type FormatType = Generic | GenericFn | Array<Generic | GenericFn>;

export type DatePickerModeType = 'time' | 'date' | 'week' | 'month' | 'quarter' | 'year' | 'dacade';

export const datePickerProps = {
	placeholder: {
		type: String,
	},
	value: {
		type: [String, Number, Date, Object] as PropType<datePickerType>,
	},
	open: {
		type: Boolean,
		defualt: undefined,
	},
	format: {
		type: String as PropType<FormatType>,
	},
	valueFormat: {
		type: String as PropType<FormatType>,
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	size: {
		type: String as PropType<DatePickerSizeType>,
		default: 'middle',
	},
	bordered: {
		type: Boolean,
		default: true,
	},
	mode: {
		type: String as PropType<DatePickerModeType>,
		default: 'date',
	},
	allowClear: {
		type: Boolean,
		default: true,
	},
	disabledDate: {
		type: Function,
		default: () => {
			return false;
		},
	},
	showTime: {
		type: [Boolean, Object] as PropType<TimePickerProps>,
		default: false,
	},
	showToday: {
		type: Boolean,
		default: true,
	},
	readonly: {
		type: Boolean,
		default: false,
	},
	onOk: {
		type: Function,
		default: () => {},
	},
} as const;

export const dateRangePickerProps = {
	placeholder: {
		type: [String, Array] as PropType<string | string[]>,
	},
	value: {
		type: Array as PropType<datePickerType[]>,
	},
	open: {
		type: Boolean,
		defualt: undefined,
	},
	format: {
		type: [String, Array] as PropType<FormatType | FormatType[]>,
	},
	valueFormat: {
		type: [String, Array] as PropType<FormatType | FormatType[]>,
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	size: {
		type: String as PropType<DatePickerSizeType>,
		default: 'middle',
	},
	bordered: {
		type: Boolean,
		default: true,
	},
	mode: {
		type: String as PropType<DatePickerModeType>,
		default: 'date',
	},
	allowClear: {
		type: Boolean,
		default: true,
	},
	disabledDate: {
		type: Function,
		default: () => {
			return false;
		},
	},
	showTime: {
		type: [Boolean, Object] as PropType<TimePickerProps>,
		default: false,
	},
	showToday: {
		type: Boolean,
		default: true,
	},
	readonly: {
		type: Boolean,
		default: false,
	},
	onOk: {
		type: Function,
		default: () => {},
	},
} as const;
export type DatePickerProps = ExtractPropTypes<typeof datePickerProps>;
