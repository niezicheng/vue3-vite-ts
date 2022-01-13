<template>
  <div class="header">
    <div class="header-left">
      <NDatePicker
        type="daterange"
        clearable
        :value="dateValue"
        :on-update:value="updateDateValue"
        style="width: 273px"
      />
      <slot name="headerLeft"></slot>
    </div>
    <div class="header-right">
      <span v-if="!!!slots.rightLabel" class="header-right-label">{{
        `所选时间段${type}工时总数:`
      }}</span>
      <slot name="rightLabel"></slot>
      <span v-if="!!!slots.rightValue" class="header-right-value">{{
        totalTime
      }}</span>
      <slot name="rightValue"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs, withDefaults, useSlots } from 'vue';
import { NDatePicker } from 'naive-ui';

type Props = {
  dateValue: [number, number];
  totalTime?: number | string;
  type?: string;
};

const props = withDefaults(defineProps<Props>(), {
  totalTime: 100,
  type: '部门'
});

const emits = defineEmits(['update:dateValue']);

const slots = useSlots();

const { dateValue } = toRefs(props);

const updateDateValue = (val: [number, number]) => {
  emits('update:dateValue', val);
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;

  &-left {
    margin-left: 25px;
    display: flex;
    flex-direction: row;
    justify-content: start;
  }

  &-right {
    display: flex;
    align-items: center;

    &-label {
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #515559;
      letter-spacing: 0;
      text-align: right;
      line-height: 24px;
    }
    &-value {
      font-family: Roboto-BoldCondensedItalic;
      font-size: 32px;
      color: #cd3812;
      letter-spacing: 0;
      text-align: right;
      font-weight: 700;
      margin-left: 40px;
    }
  }
}
</style>
