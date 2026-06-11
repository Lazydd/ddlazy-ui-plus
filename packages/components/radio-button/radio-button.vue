<script setup lang="ts">
import { createName } from '../../utils/index';
import { radioButtonProps, RadioButtonProps } from './types';

defineOptions({
	name: createName('radio-button'),
});

const { disabled } = defineProps(radioButtonProps);
const modelChecked = defineModel<RadioButtonProps['checked']>('checked')

const radioClick = () => {
	if (disabled || modelChecked) return;
	modelChecked.value = true
};
</script>

<template>
	<label :class="[
		'dd-radio-button-wrapper',
		{
			'dd-radio-button-wrapper-disabled': disabled,
			'dd-radio-button-wrapper-checked': modelChecked,
		},
	]" @click.stop="radioClick">
		<span :class="[
			'dd-radio-button',
			{ 'dd-radio-button-checked': modelChecked, 'dd-radio-disabled': disabled },
		]">
			<input type="radio" class="dd-radio-input" :disabled :value :checked="modelChecked" />
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
