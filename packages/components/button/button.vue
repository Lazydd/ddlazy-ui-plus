<template>
	<button :class="['dd-button', type, size, { plain, round, circle, disabled, loading, link }]" :disabled="disabled">
		<dd-icon v-if="loading" icon="loading" class="loading" />
		<dd-icon v-if="icon" :icon="icon" />
		<span :class="{ ml5: icon || loading }" v-if="$slots.default">
			<slot />
		</span>
	</button>
</template>

<script setup lang="ts">
import { createName } from '../../utils/index';
import { buttonProps } from './types';
import ddIcon from '../icon';
defineOptions({
	name: createName('button'),
});
defineProps(buttonProps);
</script>

<style scoped>
@import './style/button.less';
</style>
