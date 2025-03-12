import type { ExtractPropTypes, PropType } from 'vue';

export type ColorPickerSizeType = 'large' | 'middle' | 'small';
export type ColorPickerFormatType = 'auto' | 'rgb' | 'hex' | 'hsl';

export const colorPickerProps = {
	size: {
		type: String as PropType<ColorPickerSizeType>,
		default: 'middle',
	},
	value: {
		type: String as PropType<any>,
	},
	color: {
		type: String as PropType<any>,
	},
	format: {
		type: String as PropType<ColorPickerFormatType>,
		default: 'auto',
	},
	presets: {
		type: Array as PropType<string[]>,
		default: () => [],
	},
	disabled: {
		type: Boolean,
		defualt: false,
	},

	disabledAlpha: {
		type: Boolean,
		defualt: false,
	},
	allowClear: {
		type: Boolean,
		defualt: false,
	},
} as const;

export type ColorPickerProps = ExtractPropTypes<typeof colorPickerProps>;
