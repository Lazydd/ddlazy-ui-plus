<template>
	<div :class="['dd-loading', size, { 'dd-loading-nested-loading': tip }]">
		<div :class="{ 'dd-loading-load': $slots.default }" v-if="value">
			<slot name="indicator">
				<svg class="circular" viewBox="0 0 50 50" width="1em" height="1em">
					<circle
						class="path"
						cx="25"
						cy="25"
						r="20"
						fill="none"
						:style="{ stroke: color }"
					/>
				</svg>
			</slot>
			<div class="dd-loading-text" v-if="tip" :style="{ color }">
				{{ tip }}
			</div>
		</div>
		<div :class="{ 'dd-loading-blur': value }" v-if="$slots.default">
			<slot />
		</div>
	</div>
</template>

<script setup lang="ts">
import { createName } from '../../utils/index';
import { loadingProps } from './types';
defineOptions({
	name: createName('loading'),
});
defineProps(loadingProps);
</script>

<style scoped>
@import './style/loading.less';
</style>
