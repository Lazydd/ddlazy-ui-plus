import type { ExtractPropTypes, PropType } from 'vue';

export type CheckboxValue = string | number;

export interface CheckboxOption {
	label: string | number;
	value: CheckboxValue;
	disabled?: boolean;
	indeterminate?: boolean;
	onChange?: (checked: boolean) => void;
}

export type CheckboxGroupOption = CheckboxValue | CheckboxOption;

export const checkboxGroupProps = {
	value: {
		type: Array as PropType<CheckboxValue[]>,
		default: () => [],
	},
	options: {
		type: Array as PropType<CheckboxGroupOption[]>,
		default: () => [],
	},
	disabled: {
		type: Boolean,
		default: false,
	},
} as const;

export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>;
