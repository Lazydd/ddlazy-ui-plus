<script setup lang="ts">
import { ref } from 'vue';
function dig(path = '0', level = 4) {
	const list: any['treeData'] = [];
	for (let i = 0; i < 8; i += 1) {
		const value = `${path}-${i}`;
		const treeNode: any['treeData'][number] = {
			label: value,
			value,
		};

		if (level > 0) {
			treeNode.children = dig(value, level - 1);
		}

		list.push(treeNode);
	}
	return list;
}
const t = ref(dig());

const bbb = ref(['0-0-0-0-0']);
</script>

<template>
	<div class="page">
		<dd-tree-select
			v-model:value="bbb"
			style="width: 400px"
			multiple
			:height="256"
			:treeData="t"
			ref="abc"
			clearable
			checkable
		></dd-tree-select>
	</div>
</template>

<style lang="scss">
body {
	overflow: auto;
}
.page {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	.aaa {
		width: 200px;
		height: 300px;
		overflow: auto;
	}
}
</style>
