<template>
  <NAvatar
    v-if="avatar"
    class="avatar"
    round
    :src="avatar"
    :size="56"
    :color="'transparent'"
    :style="checked && checkedStyle"
    v-bind="avatarProps"
    @click="handleChange"
  >
  </NAvatar>
  <NAvatar
    v-else
    class="avatar"
    round
    :size="56"
    :color="checked ? '#FFFFFF' : '#8EBDF6'"
    :style="[checked ? checkedStyle : { borderColor: '#8EBDF6' }]"
    v-bind="avatarProps"
    @click="handleChange"
  >
    <slot name="avatar" v-bind="props">{{
      checked ? '✔' : name?.slice(0, 1)
    }}</slot>
  </NAvatar>
  <div :style="checked ? { color: '#0073FF' } : {}">{{ name }}</div>
</template>

<script setup lang="ts">
/* eslint-disable vue/require-default-prop */
import { withDefaults, toRefs, ref } from 'vue';
import { NAvatar, AvatarProps } from 'naive-ui';

type Props = {
  name: string; // 名称
  avatar?: string; // 头像链接
  checked?: boolean; // 是否选中
  disabled?: boolean; // 是否禁用
  avatarProps?: AvatarProps; // 内部头像组件参数
};

const props = withDefaults(defineProps<Props>(), {
  checked: false,
  disabled: false
});
const emits = defineEmits(['change']);

const { name, avatar, avatarProps } = toRefs(props);

const checked = ref<boolean>(props?.checked);

// 选中样式颜色
const checkedStyle = {
  color: '#0073FF',
  borderColor: '#0073FF'
};

const handleChange = () => {
  if (props?.disabled) return;
  checked.value = !checked.value;
  emits('change', { name: props?.name, checked: checked.value });
};
</script>
