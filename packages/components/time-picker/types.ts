import type { ExtractPropTypes, PropType } from 'vue';

import type { Dayjs } from 'dayjs';

export type TimePickerSizeType = 'large' | 'middle' | 'small';
export type timePickerType = string | number | Date | Dayjs;
export type timeRangePickerType = timePickerType[];

type Generic = string;
type GenericFn = (value: Dayjs) => string;
export type TimePickerFormatType = Generic | GenericFn | Array<Generic | GenericFn>;

export type TimePickerDisabledTime = (now: Dayjs) => {
	disabledHours: () => number[];
	disabledMinutes: (selectedHour: number) => number[];
	disabledSeconds: (selectedHour: number, selectedMinute: number) => number[];
};

export const timePickerProps = {
	size: {
		type: String as PropType<TimePickerSizeType>,
		default: 'middle',
	},
	value: {
		type: [String, Number, Date, Object] as PropType<timePickerType>,
	},
	open: {
		type: Boolean,
		defualt: undefined,
	},
	placeholder: {
		type: String,
		default: '请选择时间',
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	showNow: {
		type: Boolean,
		default: true,
	},
	allowClear: {
		type: Boolean,
		default: true,
	},
	bordered: {
		type: Boolean,
		default: true,
	},
	readonly: {
		type: Boolean,
		default: false,
	},
	format: {
		type: String as PropType<TimePickerFormatType>,
		default: 'HH:mm:ss',
	},
	valueFormat: {
		type: String as PropType<TimePickerFormatType>,
		default: 'HH:mm:ss',
	},
	disabledTime: {
		type: Function as PropType<TimePickerDisabledTime>,
		default: () => ({
			disabledHours: () => <number[]>[],
			disabledMinutes: (selectedHour: number) => <number[]>[],
			disabledSeconds: (selectedHour: number, selectedMinute: number) => <number[]>[],
		}),
	},
	hideDisabledOptions: {
		type: Boolean,
		default: true,
	},
	hourStep: {
		type: Number,
		defualt: 1,
	},
	minuteStep: {
		type: Number,
		defualt: 1,
	},
	secondStep: {
		type: Number,
		defualt: 1,
	},
} as const;

export const timeRangePickerProps = {
	size: {
		type: String as PropType<TimePickerSizeType>,
		default: 'middle',
	},
	value: {
		type: [Array] as PropType<timeRangePickerType>,
	},
	open: {
		type: Boolean,
		defualt: undefined,
	},
	placeholder: {
		type: Array as PropType<string[]>,
		default: () => ['开始时间', '结束时间'],
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	showNow: {
		type: Boolean,
		default: true,
	},
	allowClear: {
		type: Boolean,
		default: true,
	},
	bordered: {
		type: Boolean,
		default: true,
	},
	readonly: {
		type: Boolean,
		default: false,
	},
	format: {
		type: [String, Array] as PropType<TimePickerFormatType | TimePickerFormatType[]>,
		default: 'HH:mm:ss',
	},
	valueFormat: {
		type: [String, Array] as PropType<TimePickerFormatType | TimePickerFormatType[]>,
		default: 'HH:mm:ss',
	},
	disabledTime: {
		type: Function as PropType<TimePickerDisabledTime>,
		default: () => ({
			disabledHours: () => <number[]>[],
			disabledMinutes: (selectedHour: number) => <number[]>[],
			disabledSeconds: (selectedHour: number, selectedMinute: number) => <number[]>[],
		}),
	},
	hideDisabledOptions: {
		type: Boolean,
		default: true,
	},
	hourStep: {
		type: Number,
		defualt: 1,
	},
	minuteStep: {
		type: Number,
		defualt: 1,
	},
	secondStep: {
		type: Number,
		defualt: 1,
	},
	order: {
		type: Boolean,
		default: true,
	},
} as const;

export type TimePickerProps = ExtractPropTypes<typeof timePickerProps>;
