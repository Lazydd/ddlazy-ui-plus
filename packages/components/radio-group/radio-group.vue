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

		return () => (
			<div
				class={[
					'dd-radio-group',
					props.size,
					{ 'dd-radio-group-solid': props.buttonStyle === 'solid' },
				]}
			>
				{slot.value.map((v) => {
					const component = v.type.name == 'DdRadio' ? DdRadio : DdRadioButton;
					return (
						<component
							is={component}
							value={v.props.value}
							checked={props.value === v.props?.value}
							disabled={!!(props.disabled ? props.disabled : v.props?.disabled)}
							buttonStyle={props.buttonStyle}
							onClick={() => {
								if (v.props.disabled || props.disabled) return;
								if (props.value !== v.props?.value) {
									emit('change', v.props?.value, props.value);
								}
								emit('update:value', v.props?.value);
							}}
						>
							{v.children?.default() ?? v.props.value}
						</component>
					);
				})}
			</div>
		);
	},
};
</script>

<style scoped>
@import './style/radio-group.less';
</style>
