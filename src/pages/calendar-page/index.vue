<template>
  <PageHeader sub-title="Design department" separate="-">
    <template #title>Working hours</template>
  </PageHeader>
  <div class="container">
    <Header :data="headerData" @change="handleChange" />
    <Calendar :events="eventArr" />
  </div>
</template>

<script setup lang="ts">
import { ref, unref, watchEffect, computed } from 'vue';
import PageHeader from '@/components/pageHeader/index.vue';
import Calendar from '@/components/calendar/index.vue';
import Header from './header/index.vue';
import { headerData, eventData } from './data';

const selectedMember = ref<Array<string>>([]);
const events = ref<any>([]);

const eventArr = computed(() => events.value.slice(0, 5));

const handleChange = (val: { name: string; checked: boolean }) => {
  const { name, checked } = val;
  if (checked && !unref(selectedMember)?.includes(name)) {
    selectedMember.value = [...selectedMember.value, name];
  } else if (!checked && unref(selectedMember)?.includes(name)) {
    const i = unref(selectedMember).indexOf(name);
    unref(selectedMember).splice(i, 1);
  }
};

watchEffect(() => {
  events.value = eventData.filter(event => {
    return selectedMember.value.includes(event?.name);
  });
});
</script>

<style scoped lang="scss">
.container {
  width: 90%;
  margin: 0 auto;
}
</style>
