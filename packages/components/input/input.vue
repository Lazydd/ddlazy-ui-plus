<script setup lang="ts">
import { createName } from '../../utils/index';
import { inputProps } from './types';

import { ref, computed, useSlots } from 'vue';

import Close from './icon/close.vue';
import EyeOutlined from './icon/eye-outlined.vue';
import EyeInvisibleOutlined from './icon/eye-invisible-outlined.vue';

defineOptions({
	name: createName('input'),
});

const props = defineProps(inputProps);
const emit = defineEmits(['update:value', 'change', 'clear', 'input']);
const slots = useSlots();

const ddInputRef = ref<HTMLInputElement | null>(null);
const ddInputTextAreaRef = ref<HTMLTextAreaElement | null>(null);

const handleInput = (e) => {
	if (props.maxlength && e.target.value.length > props.maxlength) {
		e.target.value = e.target.value.substring(0, props.maxlength);
		return;
	}
	emit('update:value', e.target.value);
	emit('change', e.target.value);
};

const clear = () => {
	emit('update:value', '');
	emit('change', '');
	emit('clear');
	emit('input', '');
	ddInputRef.value.focus();
};

const showClear = computed(
	() => props.allowClear && !props.disabled && !props.readonly && props.value
);
const showPwdVisible = computed(
	() => props.type == 'password' && !props.disabled && !props.readonly && props.value
);
const passwordVisible = ref(false);
const passwordIcon = computed(() => (passwordVisible.value ? EyeOutlined : EyeInvisibleOutlined));

const handlePasswordVisible = () => {
	passwordVisible.value = !passwordVisible.value;
	ddInputRef.value.focus();
};

const inputCount = computed(() => props.value?.toString().length || 0);

defineExpose({
	clear,
	input: ddInputRef,
	textarea: ddInputTextAreaRef,
});
</script>

<template>
	<span
		:class="[
			'dd-input-affix-wrapper',
			size,
			{
				'dd-input-textarea-affix-wrapper': type === 'textarea',
				'dd-input-affix-wrapper-disabled': disabled,
			},
		]"
	>
		<template v-if="type !== 'textarea'">
			<div class="dd-input-prefix" v-if="slots.prefix">
				<slot name="prefix" />
			</div>
			<input
				ref="ddInputRef"
				class="dd-input"
				v-bind="$attrs"
				:value
				:readonly
				:type="type == 'password' ? (passwordVisible ? 'text' : 'password') : type"
				:disabled
				@input="handleInput"
			/>
			<span class="dd-input-suffix">
				<Close v-show="showClear" class="dd-input-clear-icon" @click="clear" />
				<component
					v-if="showPwdVisible"
					class="dd-input-password-icon"
					:is="passwordIcon"
					@click="handlePasswordVisible"
				/>
				<slot name="suffix" />
				<span class="dd-input-data-count" v-if="showCount">
					{{ maxlength ? `${inputCount} / ${maxlength}` : inputCount }}
				</span>
			</span>
		</template>
		<template v-else>
			<textarea
				ref="ddInputTextAreaRef"
				class="dd-input"
				:value
				:readonly
				v-bind="$attrs"
				:maxlength
				@input="handleInput"
			/>
			<span class="dd-input-data-count" v-if="showCount">
				{{ maxlength ? `${inputCount} / ${maxlength}` : inputCount }}
			</span>
		</template>
	</span>
</template>

<style scoped>
@import './style/input.scss';
</style>
