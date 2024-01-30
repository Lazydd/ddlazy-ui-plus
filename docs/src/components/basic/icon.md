<script setup>
import IconList from './icon/icon.vue'
</script>

# Icon 图标

## 基础用法

:::demo

```vue
<template>
	<div style="display: flex; align-items: center">
		<dd-icon icon="map" />
		<dd-icon icon="prompt" />
		<dd-icon icon="shangchuan" />
		<dd-button type="primary" icon="search">搜索</dd-button>
	</div>
</template>

<style lang="scss" scoped>
.dd-icon {
	font-size: 30px !important;
	margin-right: 20px;
}
</style>
```

:::

## 图标集合

<IconList />
