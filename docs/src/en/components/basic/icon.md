<script setup>
import IconList from './icon/icon.vue'
</script>

# Icon

## Basic usage

:::demo

```vue
<template>
	<div style="display: flex; align-items: center">
		<dd-icon icon="map" />
		<dd-icon icon="prompt" />
		<dd-icon icon="shangchuan" />
		<dd-button type="primary" icon="search">Search</dd-button>
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

## Icon List

<IconList />
