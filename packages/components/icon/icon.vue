<template>
	<i class="dd-icon">
		<svg xmlns="http://www.w3.org/2000/svg" :style="{ fill: color }">
			<use :xlink:href="`#icon-${icon}`" />
		</svg>
	</i>
</template>

<script setup lang="ts">
import { createName } from '../../utils/index';
import { iconProps } from './types';
defineOptions({
	name: createName('icon'),
});
defineProps(iconProps);
</script>

<style scoped>
@import './style/icon.scss';
</style>
