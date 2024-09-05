<template>
  <div class="h-svh font-mono">
    <MyLoaderElement v-if="loading" />

    <div v-else class="container mx-auto px-4 py-10 flex flex-col" style="height: 90%">
      <div v-if="posts.length">
        <MyTablePosts />

        <MyPagination />
      </div>

      <div v-else >
        <h2>No posts available yet. You can create one right now.</h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from "~/store/useMainStore";
import { storeToRefs } from 'pinia';
import MyPagination from "~/src/components/MyPagination.vue";
import MyLoaderElement from "~/src/components/UI/MyLoaderElement.vue";
import MyTablePosts from "~/src/components/MyTablePosts.vue";

const store = useMainStore();
const  { loading, posts } = storeToRefs(store);

onMounted(() => {
  store.uploadAllPosts();
})

</script>

