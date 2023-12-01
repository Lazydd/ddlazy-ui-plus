import type { ExtractPropTypes, PropType } from 'vue';

export const switchProps = {
	value: {
		type: [Boolean, String, Number] as PropType<boolean | string | number>,
	},
	disabled: {
		type: Boolean,
		defualt: false,
	},
	loading: {
		type: Boolean,
		defualt: false,
	},
	size: {
		type: String as PropType<'middle' | 'small'>,
		default: 'middle',
	},
	checkedChildren: {
		type: String,
	},
	unCheckedChildren: {
		type: String,
	},
	checkedValue: {
		type: [Boolean, String, Number] as PropType<boolean | string | number>,
		default: true,
	},
	unCheckedValue: {
		type: [Boolean, String, Number] as PropType<boolean | string | number>,
		default: false,
	},
} as const;

export type SwitchProps = ExtractPropTypes<typeof switchProps>;
