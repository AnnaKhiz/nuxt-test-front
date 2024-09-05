<template>
  <div>
    <button
      class="bg-blue-200 w-8 h-8 mb-4 mr-2"
      :class="{ 'bg-blue-400 text-amber-50' : page === item }"
      v-for="item in pagesQuantity"
      :key="item"
      @click="changePage(item)"
    >
      {{ item }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from "~/store/useMainStore";
import { storeToRefs } from "pinia";

const store = useMainStore();
const { page } = storeToRefs(store);
let timeoutId: ReturnType<typeof setTimeout>;

const pagesQuantity = computed(() => (Math.ceil(store.posts.length / store.limit )));

function changePage(item: number): void {
  store.changeLoadingStatus(true);
  store.setNewCheckedPage(item);

  timeoutId = setTimeout((): void => {
    store.changeLoadingStatus(false);
  }, 200);
}

onUnmounted(() => {
  !store.loading ? clearTimeout(timeoutId) : false;
})

</script>
