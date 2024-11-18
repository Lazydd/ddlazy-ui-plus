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

const { size, disabled, allowClear, readonly, type, value, showCount, maxlength, search, loading } =
	defineProps(inputProps);
const emit = defineEmits(['update:value', 'change', 'clear', 'input', 'search']);
const slots = useSlots();

const ddInputRef = ref<HTMLInputElement | null>(null);
const ddInputTextAreaRef = ref<HTMLTextAreaElement | null>(null);

const handleInput = (e) => {
	if (maxlength && e.target.value.length > maxlength) {
		e.target.value = e.target.value.substring(0, maxlength);
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

const showClear = computed(() => allowClear && !disabled && !readonly && value);
const showPwdVisible = computed(() => type == 'password' && !disabled && !readonly && value);
const passwordVisible = ref(false);
const passwordIcon = computed(() => (passwordVisible.value ? EyeOutlined : EyeInvisibleOutlined));

const handlePasswordVisible = () => {
	passwordVisible.value = !passwordVisible.value;
	ddInputRef.value.focus();
};

const inputCount = computed(() => value?.toString().length || 0);

const searchChange = () => {
	if (loading) return;
	emit('search', ddInputRef.value.value);
};

defineExpose({
	clear,
	input: ddInputRef,
	textarea: ddInputTextAreaRef,
});
</script>

<template>
	<span
		:class="[
			size,
			'dd-input-base',
			search ? 'dd-input-search' : 'dd-input-affix-wrapper',
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
				:class="['dd-input', { 'dd-input-affix-wrapper': search }]"
				v-bind="$attrs"
				:value
				:readonly
				:type="type == 'password' ? (passwordVisible ? 'text' : 'password') : type"
				:disabled
				@input="handleInput"
				@keyup.enter.native="searchChange"
			/>
			<span
				:class="['dd-input-group-addon', { 'dd-input-group-addon-disabled': disabled }]"
				v-if="search"
				type="submit"
				@click="searchChange"
			>
				<svg
					v-if="!loading"
					focusable="false"
					data-icon="search"
					width="1em"
					height="1em"
					fill="currentColor"
					aria-hidden="true"
					viewBox="64 64 896 896"
				>
					<path
						d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"
					/>
				</svg>
				<svg class="dd-circular" viewBox="0 0 50 50" width="1em" height="1em" v-else>
					<circle class="path" cx="25" cy="25" r="20" fill="none" />
				</svg>
			</span>
			<span class="dd-input-suffix" v-else>
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
