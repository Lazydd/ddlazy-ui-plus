# Tooltip

## Basic usage

Use attribute `content` to set the display content when `hover`. The attribute `placement` determines the position of the tooltip. Its value is [orientation] with four orientations top, left, right, bottom.

:::demo

```vue
<template>
	<div style="display: flex; flex-direction: column; gap: 20px;">
		<div style="display: flex; justify-content: space-between;">
			<dd-tooltip content="Top Left prompts info" placement="top-left">
				<dd-button>top-left</dd-button>
			</dd-tooltip>
			<dd-tooltip content="Top Center prompts info" placement="top">
				<dd-button>top</dd-button>
			</dd-tooltip>
			<dd-tooltip content="Top Right prompts info" placement="top-right">
				<dd-button>top-right</dd-button>
			</dd-tooltip>
		</div>
		<div style="display: flex; justify-content: space-between;">
			<dd-tooltip content="Left prompts info" placement="left">
				<dd-button>left</dd-button>
			</dd-tooltip>
			<dd-tooltip content="Right prompts info" placement="right">
				<dd-button>right</dd-button>
			</dd-tooltip>
		</div>
		<div style="display: flex; justify-content: space-between;">
			<dd-tooltip content="Bottom Left prompts info" placement="bottom-left">
				<dd-button>bottom-left</dd-button>
			</dd-tooltip>
			<dd-tooltip content="Bottom Center prompts info" placement="bottom">
				<dd-button>bottom</dd-button>
			</dd-tooltip>
			<dd-tooltip content="Bottom Right prompts info" placement="bottom-right">
				<dd-button>bottom-right</dd-button>
			</dd-tooltip>
		</div>
	</div>
</template>
```

:::

## More Content

Use attribute `maxWidth` to set the automatic line wrap width of the `Tooltip` .

:::demo

```vue
<template>
	<dd-tooltip
		content="Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content"
		placement="top-left"
	>
		<dd-button>top-left</dd-button>
	</dd-tooltip>
</template>
```

:::

## API

### Options

| Name      | Description                                                           | Type                                                                                     | Default | Version |
| --------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------- | ------- |
| content   | display content, can be overridden by `slot`                          | `string`                                                                                 |         |
| placement | position of `Tooltip`                                                 | `top-left \| top \| top-right \| left \| right \| bottom-left \| bottom \| bottom-right` | top     |
| maxWidth  | Maximum width, if content exceeds, wrap                               | `number`                                                                                 | `500`   |
| space     | `Tooltip` The distance between the component and the starting content | `number`                                                                                 | `8`     |
