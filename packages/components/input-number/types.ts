import type { ExtractPropTypes, PropType } from 'vue';

export type InputNumberSizeType = 'large' | 'middle' | 'small';

export const inputNumberProps = {
	value: {
		type: [Number, String] as PropType<any>,
		default: false,
	},
	description: {
		type: String as PropType<any>,
		default: '暂无数据',
	},
	max: {
		type: Number,
		default: Infinity,
	},
	min: {
		type: Number,
		default: -Infinity,
	},
	step: {
		type: Number,
		default: 1,
	},
	size: {
		type: String as PropType<InputNumberSizeType>,
		default: 'middle',
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	bordered: {
		type: Boolean,
		default: true,
	},
	precision: {
		type: Number,
	},
} as const;

export type InputNumberProps = ExtractPropTypes<typeof inputNumberProps>;
