# Empty 空状态

## 基础用法

空状态时的占位提示。

:::demo

```vue
<template>
	<dd-empty />
</template>
```

:::

## 自定义

自定义图片、描述、附属内容。

:::demo

```vue
<template>
	<dd-empty
		image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
		:image-style="{
			height: '60px',
		}"
	>
		<template #description>
			<span>
				Customize
				<a href="#api">Description</a>
			</span>
		</template>
		<dd-button type="primary">Create Now</dd-button>
	</dd-empty>
</template>
```

:::

## 无描述

无描述展示。

:::demo

```vue
<template>
	<dd-empty :description="null" />
</template>
```

:::

## API

### Empty Attributes

| Name        | Description                                  | Type            | Default    | Version |
| ----------- | -------------------------------------------- | --------------- | ---------- | ------- |
| description | 自定义描述内容                               | `string`        | `暂无数据` |
| image       | 设置显示图片，为 string 时表示自定义图片地址 | `string`        | —          |
| imageStyle  | 图片样式                                     | `CSSProperties` | `3000`     |

### Empty Slots

| Name        | Description        |
| ----------- | ------------------ |
| default     | 作为底部内容的内容 |
| description | 作为描述的内容     |
