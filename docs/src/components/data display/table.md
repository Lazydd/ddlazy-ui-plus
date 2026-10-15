# Table 表格

## 基础用法

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
        title: "操作",
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
| columns   | 表格列的配置描述,具体项见[下表](#table-columns) | `object[]` | —       |         |
| tableData | 数据数组                                  | `object[]` | —       |         |

### Table columns

| Name      | Description                                                                | Type                      | Default      | Version |
| --------- | -------------------------------------------------------------------------- | ------------------------- | ------------ | ------- |
| rowId     | 自定义行数据唯一主键的字段名(主要配合复选框使用)                           | `string`                  | `_X_ROW_KEY` |         |
| type      | `seq \| selection \| radio \| expand`                                      | `string`                  | —            |         |
| align     | 设置列的对齐方式                                                           | `left \| center \| right` | `center`     |         |
| dataIndex | 列数据在数据项中对应的路径，支持通过数组查询嵌套路径                       | `string`                  | —            |         |
| fixed     | 列是否固定，可选 `false`(等效于 `left`) `left` `right`                     | `boolean \| string`       | `false`      |         |
| slots     | 自定义插槽 `customRender`(自定义插槽名称) `editRender`(编辑模式下插槽名称) | `object`                  | —            |         |

更多属性请参考[`Vxe Table`](https://vxetable.cn/#/table/api)
