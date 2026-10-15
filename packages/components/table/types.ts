import type { ExtractPropTypes, PropType } from 'vue';
export const tableProps = {
	columns: {
		type: Array as PropType<any[]>,
		default: () => [],
	},
	tableData: {
		type: Array as PropType<any[]>,
		default: () => [],
	},
	rowId: {
		type: String,
	},
} as const;

export type TablePropsProps = ExtractPropTypes<typeof tableProps>;
