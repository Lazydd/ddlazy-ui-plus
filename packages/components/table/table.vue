<script setup lang="ts">
import { useTemplateRef } from 'vue';
import { createName } from '../../utils/index';
import { tableProps } from './types';
import type { VxeTableEvents, VxeTablePropTypes, VxeTableDefines } from 'vxe-table';

import { Column, Table } from 'vxe-table';
import loading from './loading.vue'
import 'vxe-table/es/style.css'

defineOptions({
	name: createName('table'),
});
const { tableData, columns, rowId } = defineProps(tableProps);

const emit = defineEmits<{
	onRadioChange: [row: VxeTablePropTypes.Row];
	onChange: [rowKeys: any[], records: any[]];
	selected: [CheckboxChangeEventParams: VxeTableDefines.CheckboxChangeEventParams<VxeTablePropTypes.Row>];
	selectedAll: [CheckboxChangeEventParams: VxeTableDefines.CheckboxChangeEventParams<VxeTablePropTypes.Row>];
	'current-change': [row: VxeTablePropTypes.Row, rowIndex: number]
	'edit-closed': [row: VxeTablePropTypes.Row, rowIndex: number]
}>();


const xTable = useTemplateRef('xTable')

const radioChangeEvent: VxeTableEvents.RadioChange = ({ row }) => {
	emit('onRadioChange', row);
};
const getRowKey = () => {
	return xTable.value.$props.rowConfig.keyField || 'id';
};
const selectAllChangeEvent: VxeTableEvents.CheckboxAll = (CheckboxChangeEventParams) => {
	const id = getRowKey();
	const records = xTable.value.getCheckboxRecords();
	const rowKeys = records.map((arr) => arr[id]);
	emit('onChange', rowKeys, records);
	emit('selectedAll', CheckboxChangeEventParams);
};
const selectChangeEvent: VxeTableEvents.CheckboxChange = (CheckboxChangeEventParams) => {
	const id = getRowKey();
	const records = xTable.value.getCheckboxRecords();
	const rowKeys = records.map((arr) => arr[id]);
	emit('onChange', rowKeys, records);
	emit('selected', CheckboxChangeEventParams);
};
const getCurrentChange = ({ row, rowIndex }) => {
	emit('current-change', row, rowIndex);
}
const editClosed = ({ row, rowIndex }) => {
	emit('edit-closed', row, rowIndex);
}
defineExpose({
	xTable
})
</script>

<template>
	<div class="dd-table">
		<Table ref="xTable" class="sortable-row" auto-resize width="100%" height="100%" show-overflow="title"
			:column-config="{ resizable: true }" :row-config="{
				keyField: rowId, drag: true, isHover: true, isCurrent: true
			}" :row-drag-config="{
				trigger: 'row',
				showGuidesStatus: true,
			}" :virtual-y-config="{ enabled: true, gt: 0 }" :data="tableData" v-bind="$attrs" @checkbox-change="selectChangeEvent"
			@checkbox-all="selectAllChangeEvent" @radio-change="radioChangeEvent" @current-row-change="getCurrentChange"
			@edit-closed="editClosed">
			<template v-for="col of columns" :key="col.key || col.dataIndex">
				<template v-if="col.type">
					<Column v-if="col.type === 'seq'" align="center" v-bind="col" type="seq" width="50"
						:title="col.title" />
					<Column v-if="col.type === 'selection'" align="center" v-bind="col" type="checkbox"
						field="selection" width="50" />
					<Column v-if="col.type === 'radio'" align="center" v-bind="col" type="radio" field="radioFixed"
						width="50" />
					<Column v-else-if="col.type === 'expand'" v-bind="col" field="expandFixed" type="expand">
						<template #content="{ row }">
							<slot name="expand" :row="row" />
						</template>
					</Column>
				</template>
				<Column v-else-if="col.edit === true" v-bind="col" :field="col.dataIndex || col.key" :edit-render="{}">
					<template v-if="col.slots" #default="{ row, rowIndex }">
						<slot :name="col.slots.customRender" :row="row" :text="row[col.dataIndex]"
							:rowIndex="rowIndex" />
					</template>
					<template v-if="col.slots" #edit="{ row, rowIndex }">
						<slot :name="col.slots.editRender" :row="row" :text="row[col.dataIndex]" :rowIndex="rowIndex" />
					</template>
				</Column>
				<Column v-else v-bind="col" :field="col.dataIndex || col.key">
					<template v-if="col.slots" #default="{ row, rowIndex }">
						<slot :name="col.slots.customRender" :row="row" :text="row[col.dataIndex]"
							:rowIndex="rowIndex" />
					</template>
				</Column>
			</template>
			<template #loading>
				<slot name="loading">
					<loading />
				</slot>
			</template>
		</Table>
	</div>
</template>

<style scoped>
@import './style/table.scss';
</style>
