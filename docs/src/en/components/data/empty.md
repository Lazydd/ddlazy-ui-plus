# Empty

## Basic usage

Placeholder hints for empty states.

:::demo

```vue
<template>
	<dd-empty description="No Data" />
</template>
```

:::

## Customize

Customize image, description and extra content.

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

## No description

Simplest Usage with no description.

:::demo

```vue
<template>
	<dd-empty :description="null" />
</template>
```

:::

## API

### Empty Attributes

| Name        | Description                                                   | Type            | Default    | Version |
| ----------- | ------------------------------------------------------------- | --------------- | ---------- | ------- |
| description | customize description                                         | `string`        | `暂无数据` |
| image       | customize image. Will tread as image url when string provided | `string`        | —          |
| imageStyle  | style of image                                                | `CSSProperties` | 3000       |

### Empty Slots

| Name        | Description               |
| ----------- | ------------------------- |
| default     | content as bottom content |
| description | content as description    |
