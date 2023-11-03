# Built-in Transition

You can use ddlazy-ui-plus built-in transitions directly.

## Fade

`dd-fade`.

:::demo

```vue
<template>
	<div>
		<dd-button @click="show = !show">Click Me</dd-button>
		<div style="display: flex; margin-top: 20px; height: 100px">
			<transition name="dd-fade">
				<div v-show="show" class="transition-box">.dd-fade</div>
			</transition>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const show = ref(true);
</script>

<style lang="less" scoped>
.transition-box {
	margin-bottom: 10px;
	width: 200px;
	height: 100px;
	border-radius: 4px;
	background-color: #409eff;
	text-align: center;
	color: #fff;
	padding: 40px 20px;
	box-sizing: border-box;
	margin-right: 20px;
}
</style>
```

:::

## Zoom

`dd-zoom-center`, `dd-zoom-left`, `dd-zoom-right`, `dd-zoom-centerVertical`, `dd-zoom-top` and `dd-zoom-bottom` are provided.

:::demo

```vue
<template>
	<div>
		<dd-button @click="show = !show">Click Me</dd-button>
		<div class="zoom">
			<transition name="dd-zoom-center">
				<div v-show="show" class="transition-box">.dd-zoom-center</div>
			</transition>
			<transition name="dd-zoom-left">
				<div v-show="show" class="transition-box">.dd-zoom-left</div>
			</transition>
			<transition name="dd-zoom-right">
				<div v-show="show" class="transition-box">.dd-zoom-right</div>
			</transition>
		</div>
		<div class="zoom">
			<transition name="dd-zoom-centerVertical">
				<div v-show="show" class="transition-box">.dd-zoom-centerVertical</div>
			</transition>
			<transition name="dd-zoom-top">
				<div v-show="show" class="transition-box">.dd-zoom-top</div>
			</transition>
			<transition name="dd-zoom-bottom">
				<div v-show="show" class="transition-box">.dd-zoom-bottom</div>
			</transition>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const show = ref(true);
</script>

<style lang="less" scoped>
.transition-box {
	margin-bottom: 10px;
	width: 200px;
	height: 100px;
	border-radius: 4px;
	background-color: #409eff;
	text-align: center;
	color: #fff;
	padding: 40px 20px;
	box-sizing: border-box;
	margin-right: 20px;
}
.zoom {
	display: flex;
	margin-top: 20px;
	height: 100px;
}
</style>
```

:::

## Collapse

For collapse effect, use the `dd-transition` component.

:::demo

```vue
<template>
	<div class="fold">
		<dd-button @click="show = !show">Click Me</dd-button>
		<div style="height: 320px; marginTop:20px">
			<dd-transition>
				<div v-show="show">
					<div class="transition-box">Collapse</div>
					<div class="transition-box">Collapse</div>
					<div class="transition-box">Collapse</div>
				</div>
			</dd-transition>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const show = ref(true);
</script>

<style lang="less" scoped>
.transition-box {
	margin-bottom: 10px;
	width: 200px;
	height: 100px;
	border-radius: 4px;
	background-color: #409eff;
	text-align: center;
	color: #fff;
	padding: 40px 20px;
	box-sizing: border-box;
	margin-right: 20px;
}
</style>
```

:::
