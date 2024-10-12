import type { ExtractPropTypes, PropType } from 'vue';

export type ColorPickerSizeType = 'large' | 'middle' | 'small';

export const colorPickerProps = {
	size: {
		type: String as PropType<ColorPickerSizeType>,
		default: 'middle',
	},
} as const;

export type ColorPickerProps = ExtractPropTypes<typeof colorPickerProps>;
