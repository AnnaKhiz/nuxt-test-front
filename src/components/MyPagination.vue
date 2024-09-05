<template>
  <div>
    <button
      class="bg-blue-200 w-8 h-8 mb-4 mr-2"
      :class="{ 'bg-blue-400' : page === item }"
      v-for="item in pagesQuantity"
      :key="item"
      @click="changePage(item)"
    >
      {{ item }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { PaginationProps } from '@/src/interfaces';

const props = defineProps<PaginationProps>();

const emit = defineEmits<{
    (event: 'updateLoading', payload: boolean): void;
    (event: 'updatePageValue', payload: number): void;
  }>()

const pagesQuantity = computed(() => (Math.ceil(props.posts.length / props.limit)));

function changePage(item: number): number {
  emit('updateLoading', true);
  emit('updatePageValue', item);
  setTimeout(() => {
    emit('updateLoading', false);
  }, 200)
  return props.page;
}

</script>

<style scoped>

</style>
