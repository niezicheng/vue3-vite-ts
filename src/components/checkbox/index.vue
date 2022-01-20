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
      <slot name="avatar" :checked="checked" :label="label">{{
        checked ? '✔' : `${label}`?.slice(0, 1)
      }}</slot>
    </NAvatar>
    <div :style="checked ? { color: checkedColor } : {}">
      {{ label }}
    </div>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable vue/require-default-prop */
import { withDefaults, toRefs, ref, unref, watchEffect } from 'vue';
import { NAvatar, AvatarProps } from 'naive-ui';

type Props = {
  defaultChecked?: boolean;
  checked?: boolean;
  disabled?: boolean;
  avatar?: string;
  label?: string | number;
  checkedColor?: string;
  unCheckedColor?: string;
  size?: number;
  avatarProps?: AvatarProps;
};

const props = withDefaults(defineProps<Props>(), {
  // defaultChecked: false,
  // checked: false,
  disabled: false,
  label: 'Checkbox',
  checkedColor: '#0073FF',
  unCheckedColor: '#8EBDF6',
  size: 56
});

const emits = defineEmits(['update:checked']);

const { disabled, checkedColor } = toRefs(props);

const checked = ref<boolean>();

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
}
</style>
