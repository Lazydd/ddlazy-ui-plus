import type { ExtractPropTypes, PropType } from 'vue';

export type RadioButtonStyleType = 'outline' | 'solid';

export const radioButtonProps = {
	value: {
		type: [String, Number] as PropType<any>,
	},
	checked: {
		type: Boolean,
		default: false,
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	buttonStyle: {
		type: String as PropType<RadioButtonStyleType>,
		default: 'outline',
	},
} as const;

export type RadioButtonProps = ExtractPropTypes<typeof radioButtonProps>;
