<script setup lang="ts">
import { ref } from 'vue';
import { UseVirtualList } from '@vueuse/components';

import Check from './icon/check.vue';
import type { SelectOptionsType } from './types';
const props = withDefaults(
	defineProps<{
		options: SelectOptionsType[];
		value: any;
		multiple?: boolean;
	}>(),
	{
		multiple: false,
	}
);

defineEmits(['select-item-click']);

const virtualListRef = ref<HTMLElement | null>(null);

const virtualListOptions = ref({
	itemHeight: 32,
	overscan: 10,
});

const scrollTo = (index) => {
	virtualListRef.value.scrollTo(index);
};
const setActive = (info) => props.value.some((item) => item.value === info);

defineExpose({
	scrollTo,
});
</script>

<template>
	<div class="dd-select-dropdown" style="max-height: 256px">
		<UseVirtualList
			:list="options"
			:options="virtualListOptions"
			:height="options.length <= 8 ? '100%' : '256px'"
			ref="virtualListRef"
		>
			<template #="{ data }">
				<div
					:class="[
						'dd-select-item',
						{
							'dd-select-item-option-selected': multiple
								? setActive(data.value)
								: data.value === value,
						},
						{ 'dd-select-item-option-disabled': data.disabled },
					]"
					:title="data.title ?? data.label ?? data.value"
					@click="!data.disabled ? $emit('select-item-click', data) : ''"
				>
					<div class="dd-select-item-option-content">{{ data.label ?? data.value }}</div>
					<template v-if="multiple">
						<span class="dd-select-item-option-state" v-if="setActive(data.value)">
							<Check />
						</span>
					</template>
				</div>
			</template>
		</UseVirtualList>
	</div>
</template>

<style scoped lang="scss">
.dd-select-dropdown {
	.dd-select-item {
		display: flex;
		align-items: center;
		position: relative;
		min-height: 32px;
		padding: 5px 12px;
		color: var(--dd-select-color);
		font-weight: normal;
		font-size: 14px;
		cursor: pointer;
		transition: background 0.3s ease;
		border-radius: 4px;
		user-select: none;
		&-option-content {
			flex: auto;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		&-option-state {
			flex: none;
			display: flex;
			align-items: center;
			user-select: none;
		}
		&-option-state {
			color: var(--dd-select-active-color);
		}
		&:hover:not(.dd-select-item-option-disabled):not(&-option-selected) {
			background-color: var(--dd-select-hover-background-color);
		}
		&-option-selected {
			color: var(--dd-select-color);
			font-weight: 600;
			&.dd-select-item-option-disabled {
				.dd-select-item-option-state {
					color: var(--dd-disabled-color);
				}
			}
		}
		&-option-selected:not(.dd-select-item-option-disabled) {
			background-color: var(--dd-select-active-background-color);
		}
		&-option-disabled {
			color: var(--dd-disabled-color);
			cursor: not-allowed;
			background-color: var(--dd-select-disabled-background-color);
		}
	}

	::-webkit-scrollbar {
		width: 8px;
	}

	::-webkit-scrollbar:horizontal {
		height: 6px;
	}

	::-webkit-scrollbar-track {
		border-radius: 10px;
	}

	::-webkit-scrollbar-thumb {
		background-color: rgba(0, 0, 0, 0.5);
		border-radius: 10px;
	}

	::-webkit-scrollbar-thumb:hover {
		cursor: pointer;
		background-color: rgba(0, 0, 0, 0.3);
	}
}
</style>
