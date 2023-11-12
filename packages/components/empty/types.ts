import type { ExtractPropTypes, PropType, CSSProperties } from 'vue';

export const emptyProps = {
	description: {
		type: String as PropType<any>,
		default: '暂无数据',
	},
	image: {
		type: [String, Boolean] as PropType<any>,
		default: false,
	},
	imageStyle: {
		type: Object as PropType<CSSProperties>,
	},
} as const;

export type EmptyProps = ExtractPropTypes<typeof emptyProps>;
