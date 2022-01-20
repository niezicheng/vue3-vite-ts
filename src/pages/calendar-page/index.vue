<template>
  <PageHeader sub-title="Design department" separate="-">
    <template #title>Working hours</template>
  </PageHeader>
  <div class="calendar-container">
    <CheckboxGroup
      :options="headerData"
      :max="5"
      style="padding: 12px 0"
      @update:value="handleUpdateValue"
    ></CheckboxGroup>
    <Calendar :events="eventArr" />
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, computed } from 'vue';
import PageHeader from '@/components/pageHeader/index.vue';
import Calendar from '@/components/calendar/index.vue';
import CheckboxGroup from '@/components/checkbox-group/index.vue';

import { headerData, eventData } from './data';

const selectedMember = ref<Array<string>>([]);
const events = ref<any>([]);

const eventArr = computed(() => events.value.slice(0, 5));

const handleUpdateValue = (val: Array<string>) => {
  selectedMember.value = [...val];
};

watchEffect(() => {
  events.value = eventData.filter(event => {
    return selectedMember.value.includes(event?.name);
  });
});
</script>

<style scoped lang="scss">
.calendar-container {
  width: 90%;
  margin: 0 auto;
}
</style>
