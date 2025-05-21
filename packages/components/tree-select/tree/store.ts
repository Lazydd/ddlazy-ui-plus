import { defineStore } from 'pinia';
import type { TreeNodeType } from './types';

export const useStore = defineStore('main', {
	state: () => {
		return {
			treeData: [] as TreeNodeType[],
			treeMap: new Map<string | number, TreeNodeType>(),
			flattenTree: [] as TreeNodeType[],
			checkedKeys: new Set<string | number>(),
			filterTreeMap: new Map<string | number, TreeNodeType>(),
			arr: new Set<string | number>(),
		};
	},
	actions: {
		setTreeData(arr: TreeNodeType[]) {
			this.treeData = arr;
		},
		setTreeMap(map: Map<string | number, TreeNodeType>) {
			this.treeMap = map;
		},
		setFlattenTree(arr: TreeNodeType[]) {
			this.flattenTree = arr;
		},
		setCheckedKeys(arr: Set<string | number>) {
			this.checkedKeys = arr;
		},
		setFilterTreeMap(map: Map<string | number, TreeNodeType>) {
			this.filterTreeMap = map;
		},
	},
});
