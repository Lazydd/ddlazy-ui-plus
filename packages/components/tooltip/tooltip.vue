<script setup lang="ts">
import { createName } from '../../utils/index';
import { tooltipProps } from './types';

defineOptions({
	name: createName('tooltip'),
});
const { content, placement, maxWidth } = defineProps(tooltipProps);
</script>

<template>
	<div class="dd-tooltip">
		<slot v-if="$slots.default" />
		<div :class="['tooltip_box', placement]" :style="{ maxWidth: maxWidth + 'px' }">{{ content }}</div>
	</div>
</template>

<style>
@import './style/tooltip.scss';
</style>
