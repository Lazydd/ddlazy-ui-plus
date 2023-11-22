import type { ExtractPropTypes, PropType } from 'vue';

export const carouselProps = {
	autoplay: {
		type: Boolean,
		default: false,
	},
	dots: {
		type: Boolean,
		default: true,
	},
	interval: {
		type: Number,
		default: 3000,
	},
} as const;

export type CarouselProps = ExtractPropTypes<typeof carouselProps>;
