import type { ExtractPropTypes, PropType } from 'vue';

export type InputSizeType = 'large' | 'middle' | 'small';

export const inputProps = {
	size: {
		type: String as PropType<InputSizeType>,
		default: 'middle',
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	allowClear: {
		type: Boolean,
		default: false,
	},
	readonly: {
		type: Boolean,
		default: false,
	},
	type: {
		type: String,
	},
	value: {
		type: [String, Number] as PropType<any>,
	},
	showCount: {
		type: Boolean,
		default: false,
	},
	maxlength: {
		type: Number,
	},
	search: {
		type: Boolean,
		default: false,
	},
	loading: {
		type: Boolean,
		default: false,
	},
} as const;

export type InputProps = ExtractPropTypes<typeof inputProps>;
