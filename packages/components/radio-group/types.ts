import type { ExtractPropTypes, PropType } from 'vue';

export type RadioGroupButtonStyleType = 'outline' | 'solid';
export type RadioSize = 'large' | 'small';

export const radioGroupProps = {
	value: {
		type: [String, Number] as PropType<any>,
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	buttonStyle: {
		type: String as PropType<RadioGroupButtonStyleType>,
		default: 'outline',
	},
	size: {
		type: String as PropType<RadioSize>,
		default: '',
	},
} as const;

export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>;
