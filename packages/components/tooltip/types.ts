import type { ExtractPropTypes, PropType } from 'vue';

export type PlacementType =
	| 'top-left'
	| 'top'
	| 'top-right'
	| 'left'
	| 'right'
	| 'bottom-left'
	| 'bottom'
	| 'bottom-right';

export const tooltipProps = {
	placement: {
		type: String as PropType<PlacementType>,
		default: 'top',
	},
	content: {
		type: String,
		default: '',
	},
	space: {
		type: Number,
		default: 8,
	},
	maxWidth: {
		type: Number,
		default: 500,
	},
} as const;

export type TooltipProps = ExtractPropTypes<typeof tooltipProps>;
