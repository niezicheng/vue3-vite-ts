<template>
  <div>404 page</div>
  <button @click="onBack">返回</button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

// 返回上页
const onBack = () => {
  router.go(-1);
};
</script>
