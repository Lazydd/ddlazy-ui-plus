import type { ExtractPropTypes, PropType } from 'vue';

export type SelectSizeType = 'large' | 'middle' | 'small';
export type SelectOptionsType = { value: any; label?: any; disabled?: boolean; title?: any };

export const selectProps = {
	value: {
		type: [String, Number, Boolean, Array] as PropType<any>,
	},
	size: {
		type: String as PropType<SelectSizeType>,
		default: 'middle',
	},
	options: {
		type: Array as PropType<SelectOptionsType[]>,
		default: () => [],
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	placeholder: {
		type: String as PropType<any>,
		default: 'Select',
	},
	showSearch: {
		type: Boolean,
		default: false,
	},
	filterOption: {
		type: Function,
		default: () => {
			return true;
		},
	},
	multiple: {
		type: Boolean,
		default: false,
	},
	clearable: {
		type: Boolean,
		default: false,
	},
	maxTagCount: {
		type: Number,
		validator: (value) => {
			if (value < 0) {
				console.error('maxTagCount must be greater than or equal to 0');
				throw new Error('maxTagCount must be greater than or equal to 0');
			}
			return value >= 0;
		},
	},
	bordered: {
		type: Boolean,
		default: true,
	},
	generate: {
		type: Boolean,
		default: false,
	},
} as const;

export type SelectProps = ExtractPropTypes<typeof selectProps>;
