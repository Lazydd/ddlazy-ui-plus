<script setup lang="ts">
import { ref } from 'vue';
import { useElementSize } from '@vueuse/core';
import { Dayjs } from 'dayjs';
const props = withDefaults(
	defineProps<{
		formatShow: string | undefined;
		formatValue: Dayjs | undefined;
		disabled: boolean;
		placeholder: string;
		allowClear: boolean;
		suffix?: boolean;
		showIcon?: boolean;
		readonly?: boolean;
	}>(),
	{
		suffix: true,
		showIcon: true,
		readonly: false,
	}
);
const emit = defineEmits<{
	clearClick: [];
}>();

const timePickerInputRef = ref<HTMLInputElement | null>();
const clearClick = () => {
	if (!props.allowClear) return;
	emit('clearClick');
};
const focus = (options?: FocusOptions) => {
	timePickerInputRef.value?.focus(options);
};
const { width } = useElementSize(timePickerInputRef);

defineExpose({
	focus,
	width,
});
</script>

<template>
	<div class="dd-picker-input" :disabled>
		<input
			ref="timePickerInputRef"
			autocomplete="off"
			:placeholder="placeholder ?? '请选择时间'"
			:value="formatShow"
			:disabled
			:readonly
			size="10"
		/>
		<span class="dd-picker-suffix" v-if="suffix">
			<slot name="suffixIcon">
				<svg
					v-if="showIcon"
					focusable="false"
					data-icon="clock-circle"
					width="1em"
					height="1em"
					fill="currentColor"
					aria-hidden="true"
					viewBox="64 64 896 896"
				>
					<path
						d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
					/>
					<path
						d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z"
					/>
				</svg>
			</slot>
		</span>
		<span
			class="dd-picker-clear"
			role="button"
			@click.stop="clearClick"
			v-if="allowClear && formatValue && !disabled"
		>
			<svg
				focusable="false"
				data-icon="close-circle"
				width="1em"
				height="1em"
				fill="currentColor"
				aria-hidden="true"
				viewBox="64 64 896 896"
			>
				<path
					d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"
				/>
			</svg>
		</span>
	</div>
</template>
<style lang="scss" scoped>
.dd-picker-input {
	position: relative;
	display: inline-flex;
	align-items: center;
	width: 100%;
	&[disabled='true'] {
		input {
			color: var(--dd-time-picker-disabled-color);
			background: transparent;
			border-color: #d9d9d9;
			box-shadow: none;
			cursor: not-allowed;
			opacity: 1;
		}
	}
	&:not(disabled) {
		&:hover {
			.dd-picker-clear {
				opacity: 1;
			}
		}
	}
	> input {
		position: relative;
		display: inline-block;
		width: 100%;
		min-width: 1px;
		padding: 0;
		color: var(--dd-time-picker-color);
		font-size: var(--dd-size);
		background-color: #ffffff;
		background-image: none;
		transition: all 0.2s;
		flex: auto;
		height: auto;
		background: transparent;
		border: none;
		border-radius: 0;
		outline: none;
		line-height: 1.5714285714285714;
		&:placeholder-shown {
			text-overflow: ellipsis;
		}
	}
	.dd-picker-suffix {
		display: flex;
		flex: none;
		align-self: center;
		margin-inline-start: 4px;
		color: var(--dd-time-picker-icon-color);
		line-height: 1;
		pointer-events: none;
		height: 14px;
	}
	.dd-picker-clear {
		position: absolute;
		top: 50%;
		inset-inline-end: 0;
		color: var(--dd-time-picker-icon-color);
		line-height: 1;
		background: var(--dd-time-picker-clear-background-color);
		transform: translateY(-50%);
		cursor: pointer;
		opacity: 0;
		transition: opacity 0.2s, color 0.2s;
		height: 14px;
		&:hover {
			color: var(--dd-time-picker-icon-active-color);
		}
	}
}

.large input {
	font-size: var(--dd-large);
	line-height: 1.5;
}
</style>
