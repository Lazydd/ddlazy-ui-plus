<script setup lang="ts">
import { computed } from 'vue';
import { createName } from '../../utils/index';
import DdCheckbox from '../checkbox';
import {
	checkboxGroupProps,
	type CheckboxGroupOption,
	type CheckboxValue,
} from './types';

defineOptions({
	name: createName('checkbox-group'),
});

const props = defineProps(checkboxGroupProps);
const modelValue = defineModel<CheckboxValue[]>('value', { default: () => [] });
const emit = defineEmits<{
	change: [value: CheckboxValue[]];
}>();

const normalizedOptions = computed(() =>
	props.options.map((option: CheckboxGroupOption) => {
		if (typeof option === 'string' || typeof option === 'number') {
			return {
				label: option,
				value: option,
				disabled: undefined,
				indeterminate: undefined,
				onChange: undefined,
			};
		}
		return option;
	}),
);

const toggle = (value: CheckboxValue, checked: boolean) => {
	const current = modelValue.value ?? [];
	if (checked === current.includes(value)) return;

	const next = checked ? [...current, value] : current.filter((item) => item !== value);
	modelValue.value = next;
	emit('change', next);
};
</script>

<template>
	<div class="dd-checkbox-group" role="group">
		<dd-checkbox
			v-for="option in normalizedOptions"
			:key="`${typeof option.value}:${option.value}`"
			:value="option.value"
			:checked="(modelValue ?? []).includes(option.value)"
			:disabled="props.disabled || option.disabled"
			:indeterminate="option.indeterminate"
			@change="
				(checked) => {
					toggle(option.value, checked);
					option.onChange?.(checked);
				}
			"
		>
			{{ option.label }}
		</dd-checkbox>
	</div>
</template>

<style scoped>
@import './style/checkbox-group.scss';
</style>
