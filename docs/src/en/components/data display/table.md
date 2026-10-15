# Table

## Basic usage

:::demo

```vue
<template>
    <div class="box">
        <ddTable
            row-id="key"
            :columns="columns"
            :tableData="data"
            stripe
            round
            @row-dragend="rowDrop"
            ref="tableRef">
            <template #action>
                <dd-button type="primary" link>action</dd-button>
            </template>
            <template #expand> 1111 </template>
        </ddTable>
    </div>
</template>

<script lang="ts" setup>
import { useTemplateRef } from "vue";
const columns = [
    {
        type: "seq",
        align: "center",
    },
    {
        type: "expand",
        align: "center",
    },
    {
        type: "radio",
        align: "center",
    },
    {
        type: "selection",
        align: "center",
    },
    {
        title: "Name",
        dataIndex: "name",
        align: "center",
    },
    {
        title: "Age",
        sortable: true,
        dataIndex: "age",
        align: "center",
    },
    {
        title: "action",
        fixed: "right",
        align: "center",
        slots: { customRender: "action" },
    },
];

const data = [
    {
        key: "1",
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        tags: ["nice", "developer"],
    },
    {
        key: "2",
        name: "Jim Green",
        age: 42,
        address: "London No. 1 Lake Park",
        tags: ["loser"],
    },
    {
        key: "3",
        name: "Joe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park",
        tags: ["cool", "teacher"],
    },
    {
        key: "4",
        name: "Joe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park",
        tags: ["cool", "teacher"],
    },
    {
        key: "5",
        name: "Joe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park",
        tags: ["cool", "teacher"],
    },
    {
        key: "6",
        name: "Joe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park",
        tags: ["cool", "teacher"],
    },
    {
        key: "7",
        name: "Joe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park",
        tags: ["cool", "teacher"],
    },
];

const tableRef = useTemplateRef("tableRef");
const rowDrop = () => {
    const sortList = tableRef.value.xTable?.getFullData();
};
</script>
<style>
.box {
    width: 100%;
    height: 300px;
    display: flex;
}
</style>
```

:::

## Table API

### Table Attributes

| Name      | Description                               | Type       | Default | Version |
| --------- | ----------------------------------------- | ---------- | ------- | ------- |
| columns   | Columns of table [config](#table-columns) | `object[]` | —       |         |
| tableData | Data record array to be displayed         | `object[]` | —       |         |

### Table columns

| Name      | Description                                                                                                  | Type                      | Default      | Version |
| --------- | ------------------------------------------------------------------------------------------------------------ | ------------------------- | ------------ | ------- |
| rowId     | The field name for the unique primary key of custom row data (primarily used in conjunction with checkboxes) | `string`                  | `_X_ROW_KEY` |         |
| type      | `seq \| selection \| radio \| expand`                                                                        | `string`                  | —            |         |
| align     | specify how content is aligned                                                                               | `left \| center \| right` | `center`     |         |
| dataIndex | Display field of the data record, support nest path by string array                                          | `string`                  | —            |         |
| fixed     | Set column to be fixed，`true`(same as `left`) `left` `right`                                                | `boolean \| string`       | `false`      |         |
| slots     | Custom slots `customRender`(Custom slots name) `editRender`(Slot name in edit mode)                          | `object`                  | —            |         |

More about pagination, please check[`Vxe Table`](https://vxetable.cn/#/table/api)
