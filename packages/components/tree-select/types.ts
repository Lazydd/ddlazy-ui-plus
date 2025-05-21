import type { ExtractPropTypes, PropType } from 'vue';

export type SelectTreeSizeType = 'large' | 'middle' | 'small';
export type SelectTreeOptionsType = { value: any; label?: any; disabled?: boolean; title?: any };

export const selectTreeProps = {
	value: {
		type: [String, Array] as PropType<any>,
	},
	checkedKeys: {
		type: Array as PropType<(string | number)[]>,
		default: () => [],
	},
	size: {
		type: String as PropType<SelectTreeSizeType>,
		default: 'middle',
	},
	options: {
		type: Array as PropType<SelectTreeOptionsType[]>,
		default: () => [],
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	placeholder: {
		type: String as PropType<any>,
		default: '请选择',
	},
	filterOption: {
		type: Function,
		default: () => {
			return true;
		},
	},
	multiple: {
		type: Boolean,
		default: false,
	},
	clearable: {
		type: Boolean,
		default: false,
	},
	maxTagCount: {
		type: Number,
		validator: (value) => {
			if (value < 0) {
				console.error('maxTagCount must be greater than or equal to 0');
				throw new Error('maxTagCount must be greater than or equal to 0');
			}
			return value >= 0;
		},
	},
	bordered: {
		type: Boolean,
		default: true,
	},
	generate: {
		type: Boolean,
		default: false,
	},
	treeData: {
		type: Array as PropType<any[]>,
		default: () => [],
	},
	height: {
		type: Number,
	},
	fieldNames: {
		type: Object as PropType<{ children: string; label: string; value: string }>,
		default: () => ({ children: 'children', label: 'label', value: 'value' }),
	},
	checkable: {
		type: Boolean,
		defualt: false,
	},
} as const;

export type selectTreeProps = ExtractPropTypes<typeof selectTreeProps>;
