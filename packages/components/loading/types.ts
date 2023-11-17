import type { ExtractPropTypes, PropType } from 'vue';

export type LoadingSizeType = 'large' | 'middle' | 'small';

export const loadingProps = {
	size: {
		type: String as PropType<LoadingSizeType>,
		default: 'middle',
	},
	tip: {
		type: String as any,
	},
	color: {
		type: String,
	},
	value: {
		type: Boolean,
		default: true,
	},
} as const;

export type LoadingProps = ExtractPropTypes<typeof loadingProps>;
