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
const {
	value,
	size,
	options,
	disabled,
	placeholder,
	showSearch,
	filterOption,
	multiple,
	clearable,
	maxTagCount,
	bordered,
	generate,
} = defineProps(selectProps);
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
const _filterOption = ref(options);

const count = computed(() => {
	if (maxTagCount == 0) {
		return value.length;
	} else {
		return maxTagCount ? value.length - ((maxTagCount ?? 0) <= 0 ? 0 : maxTagCount) : false;
	}
});
const maxCountSelect = computed(() =>
	select.value.slice(0, (maxTagCount ?? 0) >= 0 ? maxTagCount : undefined),
);

const selectItemClick = (item) => {
	emit('select', item.value, item);
	if (multiple) {
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
		if (value === item.value) return;
		emit('update:value', item.value);
	}
};

const init = () => {
	if (!value) {
		label.value = null;
		return;
	}
	if (Array.isArray(value)) {
		let temp = new Set(value);
		const indexMap = {};
		value.forEach((value, index) => {
			indexMap[value] = index;
		});
		select.value = options
			.filter((item) => temp.has(item.value))
			.sort((a, b) => indexMap[a.value] - indexMap[b.value]);
	} else {
		const selecteOption = _filterOption.value.find((item) => item.value === value);
		if (!selecteOption) return;
		label.value = selecteOption.title ?? selecteOption.label ?? selecteOption.value;
	}
};
onMounted(() => {
	init();
});

const scrollTo = () => {
	if (!selectDropdownShow.value || !_filterOption.value.length) return;
	const newValue = multiple ? value[0] : value;
	index.value = _filterOption.value.findIndex((item) => item.value === newValue) - 3;
	selectDropdownRef.value.scrollTo(index.value);
};
const selectClick = async () => {
	if (disabled) return;
	selectDropdownShow.value = !selectDropdownShow.value;
	if (showSearch) selectInputRef.value.focus();
	await nextTick();
	scrollTo();
};
const closeSelection = (index) => {
	if (disabled) return;
	emit('remove-tag', select.value[index].value, select.value[index]);
	select.value.splice(index, 1);
	const arr = select.value.map((item) => item.value);
	emit('update:value', arr);
};

watch(
	() => value,
	() => {
		init();
	},
);
watch(
	() => options,
	() => {
		_filterOption.value = options;
	},
);
watch(
	() => selectDropdownShow.value,
	() => {
		if (selectDropdownShow.value) {
			_filterOption.value = options;
		} else {
			searchValue.value = null;
		}
		emit('dropdown-visible-change', selectDropdownShow.value);
	},
);

const handleInput = async (e) => {
	emit('input', e.target.value);
	if (showSearch) {
		emit('search', e.target.value);
	}
	if (!filterOption) {
		return;
	}
	_filterOption.value = options.filter((item) => {
		return filterOption(e.target.value, item);
	});
	if (_filterOption.value.length == 0) return;
	await nextTick();
	selectDropdownRef.value.scrollTo(0);
};

const clear = () => {
	if (disabled) return;
	emit('update:value', multiple ? [] : '');
	emit('clear');
};

const showPlaceholder = computed(() =>
	showSearch && selectDropdownShow.value && searchValue.value ? 'hidden' : 'visible',
);
const showPlaceholder2 = computed(() =>
	!multiple ? !(label.value || value) : !select.value.length,
);
const passwordIcon = computed(() =>
	showSearch && selectDropdownShow.value ? Search : slots.suffixIcon ? slots.suffixIcon : Arrow,
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
		ref="selectRef"
		:showSearch
		:clearable
		@click="selectClick"
	>
		<div :class="['dd-select-selector', { pl11: !select.length }]" :title="label ?? value">
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
			<Close2 class="dd-select-clear" @click.stop="clear" v-if="clearable && value" />
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
						v-if="_filterOption.length"
						:options="_filterOption"
						:value="multiple ? select : value"
						:multiple
						@selectItemClick="selectItemClick"
						ref="selectDropdownRef"
					/>
					<dd-empty v-else />
				</slot>
			</Popover>
		</Teleport>
	</div>
</template>

<style scoped>
@import './style/select.scss';
</style>
