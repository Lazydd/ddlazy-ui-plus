<script setup lang="ts">
import { createName } from '../../utils/index';
import { selectProps } from './types';

import { ref, watch, nextTick, computed, onMounted } from 'vue';

import Popover from '../components/popover/popover.vue';
import Arrow from './icon/arrow.vue';
import Search from './icon/search.vue';
import Close from './icon/close.vue';
import Close2 from './icon/close2.vue';
import SelectDropdown from './select-dropdown.vue';

defineOptions({
	name: createName('select'),
});
const props = defineProps(selectProps);
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

const selectRef = ref<HTMLElement | null>(null);
const selectInputRef = ref<HTMLInputElement | null>(null);
const selectDropdownRef = ref(null);
const selectDropdownShow = ref(false);

const label = ref();
const index = ref();
const searchValue = ref();
const select = ref([]);
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

const selectItemClick = (item) => {
	emit('select', item.value, item);
	if (props.multiple) {
		const index = select.value.findIndex((v) => v.value === item.value);
		if (index === -1) select.value.push({ label: item.label, value: item.value });
		else {
			select.value.splice(index, 1);
			emit('deselect', item.value, item);
		}
		const arr = select.value.map((item) => item.value);
		emit('update:value', arr);
	} else {
		label.value = item.label ?? item.value;
		selectDropdownShow.value = false;
		if (props.value === item.value) return;
		emit('update:value', item.value);
	}
};

const init = () => {
	if (!props.value) {
		label.value = null;
		return;
	}
	if (Array.isArray(props.value)) {
		let temp = new Set(props.value);
		const indexMap = {};
		props.value.forEach((value, index) => {
			indexMap[value] = index;
		});
		select.value = props.options
			.filter((item) => temp.has(item.value))
			.sort((a, b) => indexMap[a.value] - indexMap[b.value]);
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
	index.value = filterOption.value.findIndex((item) => item.value === value) - 3;
	selectDropdownRef.value.scrollTo(index.value);
};
const selectClick = async () => {
	if (props.disabled) return;
	selectDropdownShow.value = !selectDropdownShow.value;
	if (props.showSearch) selectInputRef.value.focus();
	await nextTick();
	scrollTo();
};
const closeSelection = (index) => {
	if (props.disabled) return;
	emit('remove-tag', select.value[index].value, select.value[index]);
	select.value.splice(index, 1);
	const arr = select.value.map((item) => item.value);
	emit('update:value', arr);
};

watch(
	() => props.value,
	() => {
		init();
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

const handleInput = async (e) => {
	emit('input', e.target.value);
	if (props.showSearch) {
		emit('search', e.target.value);
	}
	if (!props.filterOption) {
		return;
	}
	filterOption.value = props.options.filter((item) => {
		return props?.filterOption(e.target.value, item);
	});
	if (filterOption.value.length == 0) return;
	await nextTick();
	selectDropdownRef.value.scrollTo(0);
};

const clear = () => {
	if (props.disabled) return;
	emit('update:value', props.multiple ? [] : '');
	emit('clear');
};

const showPlaceholder = computed(() =>
	props.showSearch && selectDropdownShow.value && searchValue.value ? 'hidden' : 'visible'
);
const showPlaceholder2 = computed(() =>
	!props.multiple ? !(label.value || props.value) : !select.value.length
);
const passwordIcon = computed(() =>
	props.showSearch && selectDropdownShow.value
		? Search
		: slots.suffixIcon
		? slots.suffixIcon
		: Arrow
);
</script>

<template>
	<div
		:class="[
			'dd-select',
			size,
			{ 'dd-select-disabled': disabled, 'dd-select-multiple': multiple },
			bordered ? '' : 'dd-select-borderless',
		]"
		ref="selectRef"
		:showSearch="showSearch"
		:clearable="clearable"
		@click="selectClick"
	>
		<div class="dd-select-selector" :title="label ?? value">
			<span
				class="dd-select-selection-placeholder"
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
						ref="selectInputRef"
						type="text"
						v-model="searchValue"
						v-bind="$attrs"
						class="dd-select-selection-search-input"
						:style="{ width: multiple ? '4px' : '100%' }"
						:readonly="!(showSearch && selectDropdownShow)"
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
							ref="selectInputRef"
							type="text"
							v-model="searchValue"
							v-bind="$attrs"
							class="dd-select-selection-search-input"
							style="width: 100%"
							:readonly="!(showSearch && selectDropdownShow)"
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
			<Close2 class="dd-select-clear" @click.stop="clear" v-if="clearable" />
		</div>
		<Teleport to="body">
			<Popover
				v-if="selectRef"
				v-model:visible="selectDropdownShow"
				:instance="selectRef"
				:arrow="false"
				:autoWidth="false"
				class="dd-select-popover"
			>
				<template v-if="!$slots.dropdownRender">
					<SelectDropdown
						v-if="filterOption.length"
						:options="filterOption"
						:value="multiple ? select : value"
						:multiple="multiple"
						@selectItemClick="selectItemClick"
						ref="selectDropdownRef"
					/>
					<dd-empty v-else />
				</template>
				<slot name="dropdownRender" v-else />
			</Popover>
		</Teleport>
	</div>
</template>

<style scoped>
@import './style/select.less';
</style>
