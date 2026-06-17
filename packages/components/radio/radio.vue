<script setup lang="ts">
import { createName } from '../../utils/index';
import { radioProps, RadioProps } from './types';

defineOptions({
	name: createName('radio'),
});

const { disabled } = defineProps(radioProps);
const modelChecked = defineModel<RadioProps['checked']>('checked');
const emit = defineEmits<{
	change: [value: string | number | boolean];
}>();

const radioClick = () => {
	if (disabled || modelChecked) return;
	modelChecked.value = true;
	emit('change', true);
};
</script>

<template>
	<label
		:class="['dd-radio-wrapper', { 'dd-radio-wrapper-disabled': disabled }]"
		@click.stop="radioClick"
	>
		<span
			:class="[
				'dd-radio',
				{ 'dd-radio-checked': modelChecked, 'dd-radio-disabled': disabled },
			]"
		>
			<input type="radio" class="dd-radio-input" :disabled :value :checked="modelChecked" />
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
