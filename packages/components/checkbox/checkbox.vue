<script setup lang="ts">
import { createName } from '../../utils/index';
import { checkboxProps, CheckboxProps } from './types';

defineOptions({
	name: createName('checkbox'),
});

const { disabled, indeterminate, value } = defineProps(checkboxProps);
const modelChecked = defineModel<CheckboxProps['checked']>('checked');
const emit = defineEmits<{
	change: [checked: boolean];
}>();

const handleChange = (event: Event) => {
	if (disabled || !(event.target instanceof HTMLInputElement)) return;

	const checked = event.target.checked;
	event.target.indeterminate = indeterminate;
	modelChecked.value = checked;
	emit('change', checked);
};
</script>

<template>
	<label :class="['dd-checkbox-wrapper', { 'dd-checkbox-wrapper-disabled': disabled }]">
		<input
			type="checkbox"
			class="dd-checkbox-input"
			:disabled
			:value
			:checked="modelChecked"
			:indeterminate
			@change.stop="handleChange"
		/>
		<span class="dd-checkbox-label" v-if="$slots.default || value !== undefined">
			<slot>{{ value }}</slot>
		</span>
	</label>
</template>

<style scoped>
@import './style/checkbox.scss';
</style>
