<template>
	<div class="dd-empty dd-empty-normal">
		<div class="dd-empty-image"><component :is="EmptyImage" :style="imageStyle" /></div>
		<p class="dd-empty-description" v-if="$slots.description || description">
			<slot name="description" v-if="$slots.description" />
			<template v-if="!$slots.description && description">
				{{ description }}
			</template>
		</p>
		<div class="dd-empty-footer" v-if="$slots.default"><slot /></div>
	</div>
</template>

<script setup lang="ts">
import { createName } from '../../utils/index';
import { emptyProps } from './types';

import { computed, createElementVNode } from 'vue';

import EmptyIcon from './icon/empty.vue';

defineOptions({
	name: createName('empty'),
});

const props = defineProps(emptyProps);

const EmptyImage = computed(() =>
	props.image ? createElementVNode('img', { src: props.image }) : EmptyIcon
);
</script>

<style scoped>
@import './style/empty.less';
</style>
