<script setup lang="ts">
import { computed } from 'vue';
import dayjs from 'dayjs';
import type { DatePickerModeType } from './types';
const props = withDefaults(
	defineProps<{
		activeMode?: DatePickerModeType;
		year?: number;
		month?: number;
		hiddenPrev?: boolean;
		hiddenNext?: boolean;
	}>(),
	{
		activeMode: 'date',
		year: dayjs().year(),
		month: dayjs().month(),
		hiddenPrev: false,
		hiddenNext: false,
	}
);

const emit = defineEmits<{
	'year-change': [value: number];
	'month-change': [value: number];
	'active-mode-change': [value: string];
}>();

const startYear = computed(() => Math.floor((props.year ?? dayjs().year()) / 10) * 10);
const endYear = computed(() => startYear.value + 9);
const showMonth = computed(() => props.activeMode === 'date' || props.activeMode === 'week');
const dacadeStartYear = computed(() => Math.floor(startYear.value / 100) * 100);
const dacadeEndYear = computed(() => dacadeStartYear.value + 99);

const monthChange = (value: number) => emit('month-change', value);
const yearChange = (value: number) => emit('year-change', value);
const activeModeChange = (value: string) => emit('active-mode-change', value);
</script>

<template>
	<div class="dd-picker-header">
		<button
			type="button"
			@click="yearChange(activeMode === 'dacade' ? -100 : activeMode === 'year' ? -10 : -1)"
			:class="{ noVisible: hiddenPrev }"
		>
			<span class="dd-picker-super-prev-icon" />
		</button>
		<button
			type="button"
			@click="monthChange(-1)"
			v-if="showMonth"
			:class="{ noVisible: hiddenPrev }"
		>
			<span class="dd-picker-header-prev-btn" />
		</button>
		<div class="dd-picker-header-view">
			<template v-if="activeMode === 'dacade'">
				{{ dacadeStartYear }}-{{ dacadeEndYear }}
			</template>
			<button
				type="button"
				class="dd-picker-year-btn"
				v-if="activeMode === 'year'"
				@click="activeModeChange('dacade')"
			>
				{{ startYear }}-{{ endYear }}
			</button>
			<button
				type="button"
				class="dd-picker-year-btn"
				v-if="activeMode !== 'dacade' && activeMode !== 'year'"
				@click="activeModeChange('year')"
			>
				{{ year }}年
			</button>
			<button
				type="button"
				class="dd-picker-month-btn"
				v-if="showMonth"
				@click="activeModeChange('month')"
			>
				{{ month + 1 }}月
			</button>
		</div>
		<button
			type="button"
			@click="monthChange(1)"
			v-if="showMonth"
			:class="{ noVisible: hiddenNext }"
		>
			<span class="dd-picker-next-icon" />
		</button>
		<button
			type="button"
			@click="yearChange(activeMode === 'dacade' ? 100 : activeMode === 'year' ? 10 : 1)"
			:class="{ noVisible: hiddenNext }"
		>
			<span class="dd-picker-super-next-icon" />
		</button>
	</div>
</template>

<style scoped lang="less">
.dd-picker-header {
	display: flex;
	padding: 0 8px;
	color: var(--dd-date-picker-color);
	border-bottom: 1px solid rgba(5, 5, 5, 0.06);
	button {
		min-width: 1.6em;
		font-size: 14px;
		padding: 0;
		color: var(--dd-date-picker-control-button-color);
		line-height: 40px;
		background: transparent;
		border: 0;
		cursor: pointer;
		transition: color 0.2s;
		font-size: inherit;
		&:hover {
			color: var(--dd-date-picker-color);
		}
		.dd-picker-super-prev-icon,
		.dd-picker-header-prev-btn {
			transform: rotate(-45deg);
		}
		.dd-picker-next-icon,
		.dd-picker-super-next-icon {
			transform: rotate(135deg);
		}
		.dd-picker-super-prev-icon,
		.dd-picker-header-prev-btn,
		.dd-picker-next-icon,
		.dd-picker-super-next-icon {
			position: relative;
			display: inline-block;
			width: 7px;
			height: 7px;
			&::before {
				position: absolute;
				top: 0;
				inset-inline-start: 0;
				display: inline-block;
				width: 7px;
				height: 7px;
				border: 0 solid currentcolor;
				border-block-start-width: 1.5px;
				border-block-end-width: 0;
				border-inline-start-width: 1.5px;
				border-inline-end-width: 0;
				content: '';
			}
		}
		.dd-picker-super-prev-icon,
		.dd-picker-super-next-icon {
			&::after {
				position: absolute;
				top: 4px;
				inset-inline-start: 4px;
				display: inline-block;
				width: 7px;
				height: 7px;
				border: 0 solid currentcolor;
				border-block-start-width: 1.5px;
				border-block-end-width: 0;
				border-inline-start-width: 1.5px;
				border-inline-end-width: 0;
				content: '';
			}
		}
	}
	.dd-picker-header-view {
		flex: auto;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 600;
		line-height: 40px;
		gap: 8px;
		button {
			color: inherit;
			font-weight: inherit;
			vertical-align: top;
		}
		.dd-picker-year-btn,
		.dd-picker-month-btn {
			&:hover {
				color: var(--dd-primary);
			}
		}
	}
	.noVisible {
		visibility: hidden;
	}
}
</style>
