import { computed } from 'vue';
import type { MaybeRefOrGetter } from '@vueuse/core';
import { toValue } from '@vueuse/core';
import type { CommitInfo } from '../../../scripts/types/changelog';
import { siteName } from '../meta';
export const useCommits = (allCommits: CommitInfo[], path: MaybeRefOrGetter<string>) => {
	return computed<CommitInfo[]>(() => {
		let currentPath = toValue(path);
		let name = 'packages/components/' + (path as string).split('/').pop();
		const commits = allCommits.filter((c) => {
			return (
				c.version ||
				c.path.find((p) => {
					return (
						p.includes(name) ||
						currentPath ===
							`/${siteName}/${p
								.toLocaleLowerCase()
								.replace(/(^docs\/src\/)|(\.md$)/g, '')}`
					);
				})
			);
		});
		return commits;
		// return commits.filter((i, idx) => {
		// 	if (i.version && (!commits[idx + 1] || commits[idx + 1]?.version)) return false;
		// 	return true;
		// });
	});
};
