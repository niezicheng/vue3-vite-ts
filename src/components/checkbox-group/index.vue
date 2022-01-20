<template>
  <div class="checkbox-group">
    <Checkbox
      v-for="(option, index) in options"
      :key="index"
      :avatar="(option as Option)?.avatar"
      :checked="isChecked(option)"
      :label="labelOrValue(option, 'label') as string"
      :disabled="disabled || isDisabled(option)"
      @update:checked="
        checked => updateChecked({ checked, val: labelOrValue(option) })
      "
    ></Checkbox>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable vue/require-default-prop */
import { withDefaults, ref, unref, watchEffect, computed } from 'vue';
import Checkbox from '../checkbox/index.vue';

type Option = {
  label: string;
  value?: string | number;
  avatar?: string;
};

type OptionItem = Option | number | string;

type Props = {
  // 默认值
  defaultValue?: Array<string | number>;
  // 选中值
  value?: Array<string | number>;
  // 展示的选项
  options: Array<OptionItem>;
  // 是否禁用
  disabled?: boolean;
  // 最大选数量
  max?: number;
};

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  max: 12
});

const emits = defineEmits(['update:value']);

const value = ref<Array<string | number>>([]);

watchEffect(() => {
  value.value = props?.value || props?.defaultValue || [];
});

// 选中数量
const checkedCount = computed(() => value.value?.length);

// label 和 value
const labelOrValue = (
  option: OptionItem,
  type: 'value' | 'label' = 'value'
) => {
  const defaultType = type === 'value' ? 'label' : 'value';
  if (typeof option === 'string' || typeof option === 'number') return option;
  return option?.[type] || option?.[defaultType];
};

// 是否选中
const isChecked = (option: OptionItem) => {
  if (typeof option === 'string' || typeof option === 'number')
    return value.value?.includes(option);
  return value.value?.includes(option?.value || option?.label);
};

// 是否禁用
const isDisabled = (option: OptionItem) =>
  checkedCount.value >= props.max && !isChecked(option);

// 更新选择
const updateChecked = ({
  checked,
  val
}: {
  checked: boolean;
  val: string | number | undefined;
}) => {
  let valueArr = [];
  if (val && checked && !value.value?.includes(val)) {
    valueArr = [...value.value, val];
    value.value = [...valueArr];
  } else {
    valueArr = unref(value)?.filter((v: string | number) => v !== val);
    value.value = [...valueArr];
  }
  emits('update:value', valueArr);
};
</script>

<style scoped lang="scss">
.checkbox-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
</style>
