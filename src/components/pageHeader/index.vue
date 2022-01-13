<template>
  <div class="page-header">
    {{ title }}
    <slot v-if="!title" name="title"></slot>
    {{ separate }}
    <slot v-if="!separate" name="separate"></slot>
    {{ subTitle }}
    <slot v-if="!subTitle" name="subTitle"></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
  subTitle?: string;
  separate?: string;
}>();
</script>

<style scoped lang="scss">
.page-header {
  padding: 10px 125px;
  font-family: Roboto-BoldCondensedItalic;
  font-size: 48px;
  color: #ffffff;
  letter-spacing: 0;
  line-height: 56px;
  opacity: 0.7;
  background: #49557c;
  border-radius: 0 0 100px 100px;
  background-color: #49557c;
  text-align: start;
}
</style>
