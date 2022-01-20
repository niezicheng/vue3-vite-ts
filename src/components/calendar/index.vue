<template>
  <div class="month">
    <Header v-model:date="currentDate" />
    <Month :default-date="currentDate" :events="events"></Month>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable vue/require-default-prop */
import { withDefaults, ref } from 'vue';
import dayjs, { Dayjs, ConfigType } from 'dayjs';
import Header from './header.vue';
import Month from './month/index.vue';
import { EventItemProps } from './interface';

interface Props {
  // 默认日期
  defaultDate?: Dayjs | ConfigType;
  // 事件数组
  events: Array<EventItemProps>;
  // 事件展示排序
  sortEventKey?: keyof EventItemProps;
}

const props = withDefaults(defineProps<Props>(), {
  sortEventKey: 'id'
});

// 当前显示日期
const currentDate = ref<Dayjs | ConfigType>(props.defaultDate || dayjs());
</script>
