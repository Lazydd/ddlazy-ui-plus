import type { ExtractPropTypes, PropType } from 'vue';

export const radioProps = {
	value: {
		type: [String, Number] as PropType<any>,
	},
	checked: {
		type: Boolean,
		default: false,
	},
	disabled: {
		type: Boolean,
		default: false,
	},
} as const;

export type RadioProps = ExtractPropTypes<typeof radioProps>;
