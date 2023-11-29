<script lang="tsx">
import { createName } from '../../utils/index';
import { radioGroupProps } from './types';
import { h, Comment, Fragment, type VNode, computed } from 'vue';
import DdRadio from '../radio';
import DdRadioButton from '../radio-button';

export default {
	name: createName('radio-group'),
	props: radioGroupProps,
	setup(props, { slots, emit }) {
		const slot = computed(() => {
			let arr = [];
			const children = slots.default().filter((i) => i.type !== Comment);
			children.forEach((vnode) => {
				if (vnode.type === Fragment || vnode.type === 'template') {
					arr.push(...(vnode.children as VNode[]));
				} else {
					arr.push(vnode);
				}
			});
			return arr.filter((v) => v.type.name === 'DdRadio' || v.type.name === 'DdRadioButton');
		});

		return () =>
			h(
				'div',
				{
					class: [
						'dd-radio-group',
						props.size,
						{ 'dd-radio-group-solid': props.buttonStyle === 'solid' },
					],
				},
				slot.value.map((item) => {
					return h(
						item.type.name == 'DdRadio' ? DdRadio : DdRadioButton,
						{
							value: item.props?.value,
							checked: props.value === item.props?.value,
							disabled: !!(props.disabled ? props.disabled : item.props?.disabled),
							buttonStyle: props.buttonStyle,
							onClick() {
								if (item.props.disabled || props.disabled) return;
								if (props.value !== item.props?.value) {
									emit('change', item.props?.value, props.value);
								}
								emit('update:value', item.props?.value);
							},
						},
						() => item.children?.default() ?? item.props?.value
					);
				})
			);
	},
};
</script>

<style scoped>
@import './style/radio-group.less';
</style>
