# Carousel 走马灯

## 基础用法

:::demo

```vue
<template>
	<dd-carousel :dots="false">
		<div>1</div>
		<div>2</div>
		<div>3</div>
		<div>4</div>
	</dd-carousel>
</template>
<style lang="scss" scoped>
:deep(.slick-slide) {
	text-align: center;
	height: 160px;
	line-height: 160px;
	background: #364d79;
	overflow: hidden;
}
</style>
```

:::

## 指示器

:::demo

```vue
<template>
	<dd-carousel>
		<div>1</div>
		<div>2</div>
		<div>3</div>
		<div>4</div>
	</dd-carousel>
</template>
<style lang="scss" scoped>
:deep(.slick-slide) {
	text-align: center;
	height: 160px;
	line-height: 160px;
	background: #364d79;
	overflow: hidden;
}
</style>
```

:::

## 自定义指示器

:::demo

```vue
<template>
	<dd-carousel>
		<div>1</div>
		<div>2</div>
		<div>3</div>
		<div>4</div>
		<template #customPaging="{ index }">
			{{ index }}
		</template>
	</dd-carousel>
</template>
<style lang="scss" scoped>
:deep(.slick-slide) {
	text-align: center;
	height: 160px;
	line-height: 160px;
	background: #364d79;
	overflow: hidden;
}
</style>
```

:::

## 自定义切换箭头

:::demo

```vue
<template>
	<dd-carousel>
		<div>1</div>
		<div>2</div>
		<div>3</div>
		<div>4</div>
		<template #prevArrow>
			<div class="custom-slick-arrow">
				<svg
					focusable="false"
					data-icon="left-circle"
					width="1em"
					height="1em"
					fill="currentColor"
					aria-hidden="true"
					viewBox="64 64 896 896"
				>
					<path
						d="M603.3 327.5l-246 178a7.95 7.95 0 000 12.9l246 178c5.3 3.8 12.7 0 12.7-6.5V643c0-10.2-4.9-19.9-13.2-25.9L457.4 512l145.4-105.2c8.3-6 13.2-15.6 13.2-25.9V334c0-6.5-7.4-10.3-12.7-6.5z"
					></path>
					<path
						d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
					></path>
				</svg>
			</div>
		</template>
		<template #nextArrow>
			<div class="custom-slick-arrow">
				<svg
					focusable="false"
					data-icon="right-circle"
					width="1em"
					height="1em"
					fill="currentColor"
					aria-hidden="true"
					viewBox="64 64 896 896"
				>
					<path
						d="M666.7 505.5l-246-178A8 8 0 00408 334v46.9c0 10.2 4.9 19.9 13.2 25.9L566.6 512 421.2 617.2c-8.3 6-13.2 15.6-13.2 25.9V690c0 6.5 7.4 10.3 12.7 6.5l246-178c4.4-3.2 4.4-9.8 0-13z"
					></path>
					<path
						d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
					></path>
				</svg>
			</div>
		</template>
	</dd-carousel>
</template>
<style lang="scss" scoped>
:deep(.slick-slide) {
	text-align: center;
	height: 160px;
	line-height: 160px;
	background: #364d79;
	overflow: hidden;
}
.custom-slick-arrow {
	width: 25px;
	height: 25px;
	font-size: 25px;
	color: #fff;
	background-color: #1f2d3d1c;
	transition: ease all 0.3s;
	opacity: 0.3;
	z-index: 1;
	&:hover {
		opacity: 0.5;
	}
}
</style>
```

:::

## API

### Carousel Attributes

| Name     | Description                    | Type      | Default | Version |
| -------- | ------------------------------ | --------- | ------- | ------- |
| autoplay | 是否自动切换                   | `boolean` | `false` |
| interval | 自动切换的时间间隔，单位为毫秒 | `number`  | `3000`  |
| dots     | 是否显示面板指示点             | `boolean` | `true`  |

### Carousel Events

| Name      | Description        | Type                      |
| --------- | ------------------ | ------------------------- |
| change    | 幻灯片切换时触发   | `(index: number) => void` |
| next      | 切换至下一张幻灯片 | `(index: number) => void` |
| prev      | 切换至上一张幻灯片 | `(index: number) => void` |
| dot-click | 指示器点击时触发   | `(index: number) => void` |

### Carousel Slots

| Name         | Description          |
| ------------ | -------------------- |
| default      | 幻灯片内容           |
| prevArrow    | 自定义箭头（上一张） |
| nextArrow    | 自定义箭头（下一张） |
| customPaging | 自定义指示器         |

### Carousel Exposes

| Name | Description        | Type                      |
| ---- | ------------------ | ------------------------- |
| next | 切换至下一张幻灯片 | `(index: number) => void` |
| prev | 切换至上一张幻灯片 | `(index: number) => void` |
