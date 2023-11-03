export const algoliaSearchOptions = {
	appId: 'M5BITRZCC5',
	apiKey: '119ddd33c0c2f9b8bf02ca0c22aa2fee',
	indexName: 'ddlazy-ui-plus',
	locales: {
		root: {
			placeholder: '搜索文档',
			translations: {
				button: {
					buttonText: '搜索文档',
					buttonAriaLabel: '搜索文档',
				},
				modal: {
					searchBox: {
						resetButtonTitle: '清除查询条件',
						resetButtonAriaLabel: '清除查询条件',
						cancelButtonText: '取消',
						cancelButtonAriaLabel: '取消',
					},
					startScreen: {
						recentSearchesTitle: '搜索历史',
						noRecentSearchesText: '没有搜索历史',
						saveRecentSearchButtonTitle: '保存至搜索历史',
						removeRecentSearchButtonTitle: '从搜索历史中移除',
						favoriteSearchesTitle: '收藏',
						removeFavoriteSearchButtonTitle: '从收藏中移除',
					},
					errorScreen: {
						titleText: '无法获取结果',
						helpText: '你可能需要检查你的网络连接',
					},
					footer: {
						selectText: '选择',
						navigateText: '切换',
						closeText: '关闭',
						searchByText: '搜索提供者',
					},
					noResultsScreen: {
						noResultsText: '无法找到相关结果',
						suggestedQueryText: '你可以尝试查询',
						reportMissingResultsText: '你认为该查询应该有结果？',
						reportMissingResultsLinkText: '点击反馈',
					},
				},
			},
		},
		en: {
			placeholder: 'Search',
			translations: {
				button: {
					buttonText: 'Search',
					buttonAriaLabel: 'Search',
				},
				modal: {
					searchBox: {
						resetButtonTitle: 'Reset search',
						resetButtonAriaLabel: 'Reset search',
						cancelButtonText: 'Cancel',
						cancelButtonAriaLabel: 'Cancel',
					},
					startScreen: {
						recentSearchesTitle: 'Recent searches',
						noRecentSearchesText: 'No recent searches',
						saveRecentSearchButtonTitle: 'Save recent search',
						removeRecentSearchButtonTitle: 'Remove recent search',
						favoriteSearchesTitle: 'Favorite',
						removeFavoriteSearchButtonTitle: 'Remove favorite search',
					},
					errorScreen: {
						titleText: 'Unable to obtain results',
						helpText: 'Help',
					},
					footer: {
						selectText: 'to select',
						navigateText: 'to navigate',
						closeText: 'to close',
						searchByText: 'Search by',
					},
					noResultsScreen: {
						noResultsText: 'No results for',
						suggestedQueryText: 'Suggested query',
						reportMissingResultsText: 'Report missing results',
						reportMissingResultsLinkText: 'Feedback',
					},
				},
			},
		},
	},
};

export default algoliaSearchOptions;
