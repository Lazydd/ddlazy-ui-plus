<script lang="ts" setup>
import { reactive, toRefs, watch, computed, nextTick, ref } from 'vue';
import { useData, useRoute } from 'vitepress';

defineOptions({ name: 'BlogComment' });

const route = useRoute();
const { isDark, frontmatter, theme, lang } = useData();
//https://github.com/apps/giscus
//https://giscus.app/zh-CN
const data = reactive({
	repo: frontmatter.value?.comment?.repo ?? theme.value?.commentConfig?.repo,
	repoId: frontmatter.value?.comment?.repoId ?? theme.value?.commentConfig?.repoId,
	category: frontmatter.value?.comment?.category ?? theme.value?.commentConfig?.category,
	categoryId: frontmatter.value?.comment?.categoryId ?? theme.value?.commentConfig?.categoryId,
	mapping: frontmatter.value?.comment?.mapping ?? theme.value?.commentConfig?.mapping,
	inputPosition:
		frontmatter.value?.comment?.inputPosition ?? theme.value?.commentConfig?.inputPosition,
	lang: frontmatter.value?.comment?.lang ?? theme.value?.commentConfig?.lang,
	loading: frontmatter.value?.comment?.loading ?? theme.value?.commentConfig?.loading,
});
const { repo, repoId, category, categoryId, mapping, inputPosition, loading } = toRefs(data);
const show = computed(() => {
	if (frontmatter.value.comment === false) {
		return frontmatter.value.comment;
	}
	return repo && repoId && category && categoryId;
});
const showComment = ref(true);
const updateComment = () => {
	showComment.value = false;
	nextTick(() => {
		showComment.value = true;
	});
};
const language = computed(() => {
	if (lang.value == 'Zh_CN') {
		return 'zh-CN';
	} else {
		return 'en';
	}
});
watch(
	() => route.path,
	() => {
		showComment.value = false;
		setTimeout(() => {
			showComment.value = true;
		}, 200);
	},
	{
		immediate: true,
	}
);
watch(isDark, updateComment);
watch(lang, () => {
	updateComment();
});
</script>

<template>
	<div class="comment" v-if="show">
		<component
			v-if="showComment"
			:is="'script'"
			src="https://giscus.app/client.js"
			:data-repo="repo"
			:data-repo-id="repoId"
			:data-category="category"
			:data-category-id="categoryId"
			:data-mapping="mapping || 'pathname'"
			data-reactions-enabled="1"
			data-emit-metadata="0"
			:data-input-position="inputPosition || 'top'"
			:data-theme="isDark ? 'dark' : 'light'"
			:data-lang="language || 'zh-CN'"
			crossorigin="anonymous"
			:data-loading="loading || 'eager'"
			async
		/>
	</div>
</template>

<style scoped lang="scss">
.comment {
	width: 100%;
	text-align: center;
	padding: 40px 0;
}
</style>
