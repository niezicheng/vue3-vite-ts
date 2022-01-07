<template>
  <div>home page</div>
  <HelloWorld msg="Hello Vue!!!"></HelloWorld>
</template>

<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue';
import { TestApi, MockGet, MockPost } from '@/api/test';

(async () => {
  const res1 = await TestApi();
  console.log('TestApi:', res1);

  const res2 = await MockGet();
  console.log('MockGet:', res2);

  const res3 = await MockPost();
  console.log('MockPost:', res3);
})()

</script>