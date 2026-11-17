import type { ExtractPropTypes, PropType } from 'vue';

export const checkboxProps = {
	value: {
		type: [String, Number] as PropType<string | number>,
	},
	checked: {
		type: Boolean,
		default: false,
	},
	indeterminate: {
		type: Boolean,
		default: false,
	},
	disabled: {
		type: Boolean,
		default: false,
	},
} as const;

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>;
