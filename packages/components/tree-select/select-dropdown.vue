<script setup lang="ts">
import Tree from './tree';
import type { SelectTreeOptionsType } from './types';

import { useTemplateRef } from 'vue';

const props = withDefaults(
	defineProps<{
		options: SelectTreeOptionsType[];
		value: string | string[];
		multiple?: boolean;
		height: number;
		checkable?: boolean;
	}>(),
	{
		multiple: false,
		checkable: false,
	}
);

defineEmits(['select-item-click']);
const modelValue = defineModel<string[]>('value');
const treeRef = useTemplateRef('tree');
const filterTree = (searchValue: string) => {
	treeRef.value.filterTree(searchValue);
};
const clearCheckeys = (searchValue: string) => {
	treeRef.value.clearCheckeys();
};
const setCheckeys = (value: any) => {
	treeRef.value.setCheckeys(value);
};
defineExpose({
	filterTree,
	clearCheckeys,
	setCheckeys,
});
</script>

<template>
	<div class="dd-select-dropdown" style="max-height: 256px">
		<Tree
			ref="tree"
			:height
			:multiple
			:checkable
			v-model:checkedKeys="modelValue"
			@select="(keys, node) => $emit('select-item-click', keys, node)"
		></Tree>
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

	::-webkit-scrollbar,
	&::-webkit-scrollbar {
		width: 8px;
	}

	::-webkit-scrollbar:horizontal,
	&::-webkit-scrollbar:horizontal {
		height: 6px;
	}

	::-webkit-scrollbar-track,
	&::-webkit-scrollbar-track {
		border-radius: 10px;
	}

	::-webkit-scrollbar-thumb,
	&::-webkit-scrollbar-thumb {
		background-color: rgba(0, 0, 0, 0.5);
		border-radius: 10px;
	}

	::-webkit-scrollbar-thumb:hover,
	&::-webkit-scrollbar-thumb:hover {
		cursor: pointer;
		background-color: rgba(0, 0, 0, 0.3);
	}
}
</style>
