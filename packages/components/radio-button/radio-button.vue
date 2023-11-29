<script setup lang="ts">
import { createName } from '../../utils/index';
import { radioButtonProps } from './types';

defineOptions({
	name: createName('radio-button'),
});

const props = defineProps(radioButtonProps);
const emit = defineEmits<{
	'update:checked': [value: boolean];
}>();

const radioClick = () => {
	if (props.disabled || props.checked) return;
	emit('update:checked', true);
};
console.log(props.disabled);

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
			<input
				type="radio"
				class="dd-radio-input"
				:disabled="disabled"
				:value="value"
				:checked="checked"
			/>
			<span class="dd-radio-button-inner" />
		</span>
		<span class="dd-radio-label" v-if="!($slots.defualt && value)">
			<slot v-if="$slots.default" />
			<template v-else>{{ value }}</template>
		</span>
	</label>
</template>

<style scoped>
@import './style/radio-button.less';
</style>
