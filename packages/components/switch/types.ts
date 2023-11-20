import type { ExtractPropTypes, PropType } from 'vue';

export const switchProps = {
	value: {
		type: Boolean,
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
} as const;

export type SwitchProps = ExtractPropTypes<typeof switchProps>;
