<template>
  <table class=" border-collapse mb-3" style="width: 100%">
    <thead class="bg-amber-50">
    <tr class="border-b-2 ">
      <th v-for="header in tableHeaders" :key="header" style="padding: 5px 10px">
        <div class="flex items-center justify-center gap-2" @click.prevent="sortPostsById">
          <span>{{ header }}</span>
          <img v-if="header === 'ID'" src="@/src/assets/img/arrow-down-24.png" alt="arrow dowm icon" class="w-4 cursor-pointer" :class="{ 'rotate-180' : isAscend}" >
        </div>
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="post in postsPerPage" :key="post.id" class="border-b hover:bg-blue-50 transition duration-500 ease-in-out">
      <td  style="padding: 5px 10px">{{ post.id }}</td>
      <td class="py-2 px-4">{{ post.title }}</td>
      <td class="py-2">{{ post.body }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { ref} from 'vue';
import type { Post } from "@/src/interfaces"
import {useMainStore} from "~/store/useMainStore";

const store = useMainStore();
const tableHeaders: [string, string, string] = ['ID', 'Title', 'Description'];
let isAscend = ref(true);

const postsPerPage = computed(() => {
  const start: number = (store.page - 1) * store.limit;
  const end: number = start + store.limit;
  return sortedPostsById.value.slice(start, end);
})

const sortedPostsById = computed(() => {
  return store.posts.sort((a, b) => {

    if (!isAscend.value) {
      return b.id - a.id
    } else {
      return a.id - b.id
    }
  })
})

function sortPostsById() {
  isAscend.value = !isAscend.value
}

</script>

