<script setup lang="ts">
import { createName } from '../../utils/index';
import { selectTreeProps } from './types';
import { TreeNodeType } from './tree/types';
import { createPinia } from 'pinia';

import { ref, watch, nextTick, computed, onMounted, getCurrentInstance, useTemplateRef } from 'vue';

import Popover from '../components/popover/popover.vue';
import Arrow from './icon/arrow.vue';
import Search from './icon/search.vue';
import Close from './icon/close.vue';
import Close2 from './icon/close2.vue';
import SelectDropdown from './select-dropdown.vue';
import { useStore } from './tree/store';

defineOptions({
	name: createName('tree-select'),
});
const props = defineProps(selectTreeProps);
const emit = defineEmits([
	'update:value',
	'change',
	'select',
	'input',
	'search',
	'deselect',
	'remove-tag',
	'clear',
	'dropdown-visible-change',
	'focus',
	'blur',
]);
const slots = defineSlots<{
	dropdownRender: HTMLElement;
	suffixIcon: HTMLElement;
}>();

const instance = getCurrentInstance();
if (!instance.appContext.config.globalProperties.$pinia) {
	const pinia = createPinia();
	instance.appContext.app.use(pinia);
}
const modelValue = defineModel<string[]>('value', {
	get() {
		if (props.multiple) {
			return props.value;
		} else {
			Array.isArray(props.value) ? props.value[0] : props.value;
		}
	},
});

const checkedKeys = computed(() => store.checkedKeys);

const selectRef = useTemplateRef('select');
const selectInputRef = useTemplateRef('selectInput');
const selectDropdownRef = useTemplateRef('selectDropdown');
const selectDropdownShow = ref(false);

const label = ref();
const index = ref();
const searchValue = ref();
const select = ref<{ label: string; value: string | number; disabled: boolean }[]>([]);
const filterOption = ref(props.options);

const count = computed(() => {
	if (props.maxTagCount == 0) {
		return props.value.length;
	} else {
		return props.maxTagCount
			? props.value.length - ((props.maxTagCount ?? 0) <= 0 ? 0 : props.maxTagCount)
			: false;
	}
});
const maxCountSelect = computed(() =>
	select.value.slice(0, (props.maxTagCount ?? 0) >= 0 ? props.maxTagCount : undefined)
);
const selectItemClick = (item, { node }) => {
	searchValue.value = null;
	if (props.multiple) {
		select.value = node.map((v) => ({ label: v.title, value: v.key, disabled: false }));
		emit('update:value', item);
	} else {
		selectDropdownShow.value = false;
		emit('update:value', item[0]);
	}

	// emit('select', item.value, item);
	// if (props.multiple) {
	// 	const index = select.value.findIndex((v) => v.value === item.value);
	// 	if (index === -1) select.value.push({ label: item.label, value: item.value });
	// 	else {
	// 		select.value.splice(index, 1);
	// 		emit('deselect', item.value, item);
	// 	}
	// 	const arr = select.value.map((item) => item.value);
	// 	emit('update:value', arr);
	// } else {
	// 	label.value = item.label ?? item.value;
	// 	selectDropdownShow.value = false;
	// 	if (props.value === item.value) return;
	// 	emit('update:value', item.value);
	// }
};
const store = useStore();
const treeData = ref<TreeNodeType[]>();

const treeMap = computed<Map<string | number, TreeNodeType>>(() => {
	const map = new Map<string | number, TreeNodeType>();
	const dfs = (data: TreeNodeType[]) => {
		data?.forEach((item) => {
			map.set(item.value, item);
			dfs(item.children);
		});
	};
	dfs(treeData.value);
	store.setTreeMap(map);
	return map;
});
const fieldNames = ref(props.fieldNames);
let treeIndex = 0;
const formatTreeData = (data: TreeNodeType[], parent: TreeNodeType | undefined) => {
	return data.map((item, i) => {
		treeIndex++;
		const children = item[fieldNames.value.children ?? 'children'] || [];
		const isLine = i === data.length - 1;
		const treeNode = {
			value: item[fieldNames.value.value ?? 'value'],
			label: item[fieldNames.value.label ?? 'label'],
			children: [],
			disableCheckbox: item.disableCheckbox ?? false,
			disabled: item.disabled ?? false,
			level: parent ? parent.level + 1 : 0,
			parentKey: parent ? parent.value : null,
			isLeaf: item.isLeaf ?? !item[fieldNames.value.children ?? 'children'],
			isChecked: item.isChecked ?? store.checkedKeys.has(item.value),
			isHalfChecked: item.isHalfChecked ?? false,
			line: parent?.line ? [...parent.line, isLine] : [isLine],
			rawNode: item,
			index: treeIndex,
		};
		if (children.length) {
			treeNode.children = formatTreeData(children, treeNode);
		}
		return treeNode;
	});
};
const init = () => {
	if (!props.value) {
		label.value = null;
		return;
	}
	if (Array.isArray(props.value)) {
		select.value = props.value.map((v) => {
			const info = treeMap.value.get(v);
			return { label: info?.label, value: info?.value, disabled: info?.disabled ?? false };
		});
	} else {
		const selecteOption = filterOption.value.find((item) => item.value === props.value);
		if (!selecteOption) return;
		label.value = selecteOption.title ?? selecteOption.label ?? selecteOption.value;
	}
};
onMounted(() => {
	init();
});

const scrollTo = () => {
	if (!selectDropdownShow.value || !filterOption.value.length) return;
	const value = props.multiple ? props.value[0] : props.value;
	index.value = filterOption.value.findIndex((item) => item.value === value);
	selectDropdownRef.value.scrollTo(index.value);
};
const selectClick = async () => {
	if (props.disabled) return;
	selectDropdownShow.value = !selectDropdownShow.value;
	selectInputRef.value.focus();
	await nextTick();
	scrollTo();
};
const closeSelection = (index) => {
	if (props.disabled) return;
	emit('remove-tag', select.value[index].value, select.value[index]);
	store.checkedKeys.delete(select.value[index].value);
	selectDropdownRef.value.setCheckeys(select.value[index].value);
	select.value.splice(index, 1);
	const arr = select.value.map((item) => item.value);
	emit('update:value', arr);
};

const initValue = (newValue) => {
	console.log(4444, store.treeData);
	console.log(newValue);
};

watch(
	() => props.value,
	() => {
		init();
	}
);
watch(
	() => props.value,
	(newValue) => {
		store.setCheckedKeys(new Set(newValue));
	},
	{
		immediate: true,
	}
);
watch(
	() => props.options,
	() => {
		filterOption.value = props.options;
	}
);
watch(
	() => selectDropdownShow.value,
	() => {
		if (selectDropdownShow.value) {
			filterOption.value = props.options;
		} else {
			searchValue.value = null;
		}
		emit('dropdown-visible-change', selectDropdownShow.value);
	}
);
let time;
const handleInput = async (e) => {
	emit('input', e.target.value);
	if (time) clearTimeout(time);
	time = setTimeout(() => {
		selectDropdownRef.value.filterTree(e.target.value);
	}, 300);

	// if (!props.filterOption) {
	// 	return;
	// }
	// filterOption.value = props.options.filter((item) => {
	// 	return props?.filterOption(e.target.value, item);
	// });
	// if (filterOption.value.length == 0) return;
	// await nextTick();
	// selectDropdownRef.value.scrollTo(0);
};

const clear = () => {
	if (props.disabled) return;
	select.value = [];
	selectDropdownRef.value?.clearCheckeys();
	store.checkedKeys.clear();
	emit('update:value', props.multiple ? [] : '');
	emit('clear');
};

const showPlaceholder = computed(() =>
	selectDropdownShow.value && searchValue.value ? 'hidden' : 'visible'
);
const showPlaceholder2 = computed(() =>
	!props.multiple ? !(label.value || props.value) : !select.value.length
);
const passwordIcon = computed(() =>
	selectDropdownShow.value ? Search : slots.suffixIcon ?? Arrow
);

watch(
	() => props.treeData,
	(newValue) => {
		treeIndex = 0;
		treeData.value = formatTreeData(newValue, null);
		store.setTreeData(treeData.value);
		initValue(props.value);
	},
	{
		immediate: true,
	}
);
</script>

<template>
	<div
		:class="[
			'dd-select',
			size,
			{
				'dd-select-disabled': disabled,
				'dd-select-multiple': multiple,
				'dd-select-borderless': !bordered,
			},
		]"
		ref="select"
		:clearable
		@click="selectClick"
	>
		<div :class="['dd-select-selector', { pl11: !select.length }]" :title="label ?? value">
			<span
				class="dd-select-selection-placeholder dd-select-selection-search"
				v-if="showPlaceholder2"
				:style="{
					visibility: showPlaceholder,
				}"
			>
				{{ placeholder }}
			</span>
			<template v-if="!multiple">
				<span class="dd-select-selection-search">
					<input
						ref="selectInput"
						type="text"
						v-model="searchValue"
						v-bind="$attrs"
						class="dd-select-selection-search-input"
						:style="{ width: multiple ? '4px' : '100%' }"
						:readonly="!selectDropdownShow"
						@input="handleInput"
						@focus="(e) => emit('focus', e)"
						@blur="(e) => emit('blur', e)"
					/>
					<!-- @blur="selectDropdownShow = false" -->
				</span>
				<span
					:class="['dd-select-selection-item', { 'dd-select-open': selectDropdownShow }]"
					:style="{
						visibility: searchValue && selectDropdownShow ? 'hidden' : 'visible',
					}"
					v-if="label || value"
				>
					{{ label ?? value }}
				</span>
			</template>
			<div class="dd-select-selection-overflow" v-else>
				<template v-if="select.length">
					<div
						class="dd-select-selection-overflow-item"
						v-for="(item, index) in maxCountSelect"
						:key="item.value"
					>
						<div class="dd-select-selection-item">
							<span class="dd-select-selection-item-content">{{ item.label }}</span>
							<span
								class="dd-select-selection-item-remove"
								v-if="!item.disabled"
								@click.stop="closeSelection(index)"
							>
								<Close />
							</span>
						</div>
					</div>
				</template>
				<template v-if="count && count >= 0">
					<div class="dd-select-selection-overflow-item">
						<div class="dd-select-selection-item">
							<span class="dd-select-selection-item-content">+ {{ count }} ...</span>
						</div>
					</div>
				</template>
				<div class="dd-select-selection-overflow-item dd-select-selection-overflow-input">
					<span
						class="dd-select-selection-search dd-select-selection-overflow-item-suffix"
					>
						<input
							ref="selectInput"
							type="text"
							v-model="searchValue"
							v-bind="$attrs"
							class="dd-select-selection-search-input"
							style="width: 100%"
							:readonly="!selectDropdownShow"
							@input="handleInput"
							@focus="(e) => emit('focus', e)"
							@blur="(e) => emit('blur', e)"
						/>
					</span>
				</div>
			</div>
		</div>
		<div class="dd-select-arrow">
			<component class="dd-select-icon" :is="passwordIcon" />
			<Close2
				class="dd-select-clear"
				@click.stop="clear"
				v-if="clearable && ((value && value?.length) || select.length > 0)"
			/>
		</div>
		<Teleport to="body">
			<Popover
				v-if="selectRef"
				v-model:visible="selectDropdownShow"
				:instance="selectRef"
				:arrow="false"
				:autoWidth="false"
				:padding="4"
				:generate
				class="dd-select-popover"
			>
				<slot name="dropdownRender">
					<SelectDropdown
						v-model:value="modelValue"
						:options="filterOption"
						:multiple
						:height
						:checkable
						@selectItemClick="selectItemClick"
						ref="selectDropdown"
					/>
					<!-- <dd-empty v-else /> -->
				</slot>
			</Popover>
		</Teleport>
	</div>
</template>

<style scoped>
@import './style/select.scss';
</style>
