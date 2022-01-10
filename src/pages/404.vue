<template>
  <div>404 page</div>
  <NButton @click="onBack">返回</NButton>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

// 返回上页
const onBack = () => {
  router.go(-1);
};
</script>
