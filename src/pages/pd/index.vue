<template>
  <PageHeader sub-title="Design department" separate="-">
    <template #title>Working hours</template>
  </PageHeader>
  <div style="padding: 12px">
    <Header v-model:dateValue="range" total-time="180"></Header>
    <NSpace vertical :size="32">
      <Card
        v-for="(card, index) in cardData?.data"
        :key="index"
        :data="card"
        :ranking="index + 1"
        :total-time="cardData?.totalTime"
      ></Card>
    </NSpace>
  </div>
</template>

<script setup lang="ts">
import { ref, unref, watchEffect } from 'vue';
import { NSpace } from 'naive-ui';
import Card from '@/components/card/index.vue';
import Header from '@/components/header/index.vue';
import PageHeader from '@/components/pageHeader/index.vue';
import { cardData } from './data';

const range = ref();

watchEffect(() => {
  console.log('range', unref(range));
});
</script>
