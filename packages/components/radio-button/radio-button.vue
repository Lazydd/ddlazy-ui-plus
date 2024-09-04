<script setup lang="ts">
import { createName } from '../../utils/index';
import { radioButtonProps } from './types';

defineOptions({
	name: createName('radio-button'),
});

const { disabled, checked } = defineProps(radioButtonProps);
const emit = defineEmits<{
	'update:checked': [value: boolean];
}>();

const radioClick = () => {
	if (disabled || checked) return;
	emit('update:checked', true);
};

defineExpose({});
</script>

<template>
	<label
		:class="[
			'dd-radio-button-wrapper',
			{
				'dd-radio-button-wrapper-disabled': disabled,
				'dd-radio-button-wrapper-checked': checked,
			},
		]"
		@click.stop="radioClick"
	>
		<span
			:class="[
				'dd-radio-button',
				{ 'dd-radio-button-checked': checked, 'dd-radio-disabled': disabled },
			]"
		>
			<input type="radio" class="dd-radio-input" :disabled :value :checked />
			<span class="dd-radio-button-inner" />
		</span>
		<span class="dd-radio-label" v-if="!($slots.defualt && value)">
			<slot>{{ value }}</slot>
		</span>
	</label>
</template>

<style scoped>
@import './style/radio-button.scss';
</style>
