<script setup lang="ts">
import { createName } from '../../utils/index';
import { inputNumberProps, InputNumberProps } from './types';

import { computed } from 'vue';

defineOptions({
	name: createName('input-number'),
});

const { disabled, max, min, step, precision } = defineProps(inputNumberProps);
const modelValue = defineModel<InputNumberProps['value']>('value');
const emit = defineEmits<{
	change: [value: number | undefined];
}>();
const handleInput = (e) => {
	let temp = e.target.value;
	if (e.target.value >= max) {
		temp = max;
	} else if (e.target.value <= min) {
		temp = min;
	}
	modelValue.value = temp;
	emit('change', e.target.value);
};
const formatValue = computed(() => Number(modelValue.value));

const operate = (type: string) => {
	if (disabled) return;
	let newValue: any;
	if (type === 'add') {
		if (formatValue.value >= max) return;
		const temp = formatValue.value + Number(step);
		newValue = temp > max ? max : temp;
	} else {
		if (formatValue.value <= min) return;
		const temp = formatValue.value - Number(step);
		newValue = temp < min ? min : temp;
	}
	const temp =
		precision || precision === 0 ? Number(parseFloat(newValue).toFixed(precision)) : newValue;
	modelValue.value = temp;
	emit('change', temp);
};
</script>

<template>
	<div
		:class="[
			'dd-input-number',
			size,
			{ 'dd-input-number-disabled': disabled, 'dd-input-number-borderless': !bordered },
		]"
	>
		<div class="dd-input-number-handler-wrap" v-if="controls && !disabled">
			<span
				:class="[
					'dd-input-number-handler dd-input-number-handler-up',
					{ 'dd-input-number-handler-up-disabled': modelValue >= max },
				]"
				@click="operate('add')"
			>
				<span class="dd-input-number-handler-up-inner">
					<svg
						viewBox="64 64 896 896"
						focusable="false"
						data-icon="up"
						width="1em"
						height="1em"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							d="M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 00140 768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z"
						/>
					</svg>
				</span>
			</span>
			<span
				:class="[
					'dd-input-number-handler dd-input-number-handler-down',
					{ 'dd-input-number-handler-down-disabled': modelValue <= min },
				]"
				@click="operate('rem')"
			>
				<span class="dd-input-number-handler-down-inner">
					<svg
						viewBox="64 64 896 896"
						focusable="false"
						data-icon="down"
						width="1em"
						height="1em"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"
						/>
					</svg>
				</span>
			</span>
		</div>
		<div class="dd-input-number-input-wrap">
			<input
				class="dd-input-number-input"
				type="number"
				v-model="modelValue"
				:aria-valuenow="modelValue"
				:aria-valuemax="max"
				:aria-valuemin="min"
				v-bind="$attrs"
				@input="handleInput"
			/>
		</div>
	</div>
</template>

<style scoped>
@import './style/input-number.scss';
</style>
