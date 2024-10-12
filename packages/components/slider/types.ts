import type { ExtractPropTypes, PropType } from 'vue';

export const sliderProps = {
	value: {
		type: [Number] as PropType<number>,
	},
	step: {
		type: Number as PropType<number>,
		default: 1,
	},
} as const;

export type SliderProps = ExtractPropTypes<typeof sliderProps>;
