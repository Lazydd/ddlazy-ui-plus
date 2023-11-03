import type { ExtractPropTypes, PropType } from 'vue';

export type ButtonSize = 'large' | 'small';
export type ButtonType = 'primary' | 'success' | 'info' | 'warning' | 'danger';

export const buttonProps = {
	type: {
		type: String as PropType<ButtonType>,
		default: '',
	},
	size: {
		type: String as PropType<ButtonSize>,
		default: '',
	},
	circle: {
		type: Boolean,
		default: false,
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	round: {
		type: Boolean,
		default: false,
	},
	plain: {
		type: Boolean,
		default: false,
	},
	loading: {
		type: Boolean,
		default: false,
	},
	icon: {
		type: String,
		default: '',
	},
	link: {
		type: Boolean,
		default: false,
	},
} as const;

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;
