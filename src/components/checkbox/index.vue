<template>
  <div class="checkbox">
    <NAvatar
      v-if="avatar"
      class="avatar"
      round
      :src="avatar"
      :size="size"
      :color="'transparent'"
      :style="checked && checkedStyle"
      v-bind="avatarProps"
      @click="handleClick"
    >
    </NAvatar>
    <NAvatar
      v-else
      class="avatar"
      round
      :size="size"
      :color="checked ? '#FFFFFF' : unCheckedColor"
      :style="[checked ? checkedStyle : { borderColor: unCheckedColor }]"
      v-bind="avatarProps"
      @click="handleClick"
    >
      <slot name="avatar" :checked="checked" :label="labelMerge">{{
        checked ? '✔' : `${labelMerge}`?.slice(0, 1)
      }}</slot>
    </NAvatar>
    <div class="label" :style="checked ? { color: checkedColor } : {}">
      {{ labelMerge }}
    </div>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable vue/require-default-prop */
import { withDefaults, toRefs, ref, unref, watchEffect, computed } from 'vue';
import { NAvatar, AvatarProps } from 'naive-ui';

type Props = {
  // 默认值
  defaultChecked?: boolean;
  // 是否选中
  checked?: boolean;
  // 是否禁用
  disabled?: boolean;
  // 头像地址
  avatar?: string;
  // label 字段
  label?: string;
  // 名称，label 存在时无效
  name?: string;
  // 选中颜色
  checkedColor?: string;
  // 未选中颜色
  unCheckedColor?: string;
  // 尺寸大小
  size?: number;
  // 内部 NAvatar 组件属性对象
  avatarProps?: AvatarProps;
};

const props = withDefaults(defineProps<Props>(), {
  defaultChecked: false,
  checked: false,
  disabled: false,
  label: 'Checkbox',
  name: 'Checkbox',
  checkedColor: '#0073FF',
  unCheckedColor: '#8EBDF6',
  size: 56
});

const emits = defineEmits(['update:checked']);

const { disabled, checkedColor } = toRefs(props);

const checked = ref<boolean>();

const labelMerge = computed(() => props?.label || props?.name);

watchEffect(() => {
  checked.value = props?.checked || props?.defaultChecked;
});

// 选中样式颜色
const checkedStyle = {
  color: unref(checkedColor),
  borderColor: unref(checkedColor)
};

const handleClick = () => {
  if (unref(disabled)) return;
  checked.value = !checked.value;
  emits('update:checked', checked.value);
};
</script>

<style scoped lang="scss">
.checkbox {
  .avatar {
    border-style: solid;
    border-width: 1px;
    border-color: transparent;
  }

  .label {
    text-align: center;
  }
}
</style>
