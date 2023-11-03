import type { ExtractPropTypes } from 'vue';

export const iconProps = {
	icon: {
		type: String,
		default: '',
	},
	color: {
		type: String,
	},
} as const;

export type IconProps = ExtractPropTypes<typeof iconProps>;
