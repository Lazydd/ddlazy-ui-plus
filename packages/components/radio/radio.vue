<script setup lang="ts">
import { createName } from '../../utils/index';
import { radioProps } from './types';

defineOptions({
	name: createName('radio'),
});

const { disabled, checked } = defineProps(radioProps);
const emit = defineEmits<{
	'update:checked': [value: boolean];
	change: [value: string | number | boolean];
}>();

const radioClick = () => {
	if (disabled || checked) return;
	emit('update:checked', true);
	emit('change', true);
};
defineExpose({});
</script>

<template>
	<label
		:class="['dd-radio-wrapper', { 'dd-radio-wrapper-disabled': disabled }]"
		@click.stop="radioClick"
	>
		<span :class="['dd-radio', { 'dd-radio-checked': checked, 'dd-radio-disabled': disabled }]">
			<input type="radio" class="dd-radio-input" :disabled :value :checked />
			<span class="dd-radio-inner" />
		</span>
		<span class="dd-radio-label" v-if="!($slots.defualt && value)">
			<slot>{{ value }}</slot>
		</span>
	</label>
</template>

<style scoped>
@import './style/radio.scss';
</style>
