<script setup lang="ts">
import ddIcon from '@/packages/components/icon';
import message from '@/docs/.vitepress/src/message';
import { useClipboard } from '@vueuse/core';
import iconList from './icon.json';
const { copy } = useClipboard();

const copyClick = async (code: string) => {
	copy(`<ddIcon icon="${code}" />`);
	message('复制成功', { type: 'success' });
};
</script>

<template>
	<div class="icon-list">
		<div v-for="item in iconList.iconList" :key="item" @click="copyClick(item)">
			<ddIcon :icon="item" />
			<div>
				<span>{{ item }}</span>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.icon-list {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(7rem, 1fr));
	grid-auto-flow: row dense;
	border: 1px solid var(--vp-c-divider);
	border-radius: 4px;
	> div {
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
		text-align: center;
		height: 120px;
		cursor: pointer;
		color: #666;
		border-right: 1px solid var(--vp-c-divider);
		border-bottom: 1px solid var(--vp-c-divider);
		margin-bottom: -1px;
		margin-right: -1px;
		transition: all 0.5s;
		.dd-icon {
			color: var(--vp-c-text-2);
			margin: 0 20px;
			font-size: 2.5em;
			vertical-align: middle;
			transform: scale(1);
			transition: all 0.5s;
		}
		> div {
			span {
				font-size: 13px;
				word-break: break-word;
			}
		}
		&:hover {
			color: #5cb6ff;
			.dd-icon {
				transform: scale(1.4);
				color: #5cb6ff;
			}
		}
	}
}
</style>
