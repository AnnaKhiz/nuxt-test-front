<script setup lang="ts">
  import { ref, computed } from 'vue';

  interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
  }

  const posts = ref<Array<Post>>([]);
  let page  = ref<number>(1);
  const limit = ref<number>(10);
  let loading = ref<boolean>(false)

  const params: string = new URLSearchParams({
    _page: page.value.toString(),
    _limit: limit.value.toString()
  }).toString();
  async function getAllPosts(): Promise<void> {
    loading.value = true

    try {
      const result: Response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
      const data: Array<Post> = await result.json();
      posts.value = data;
      loading.value = false
    } catch (error) {
      console.log(error)
    }
  }

  getAllPosts();

  const pagesQuantity = computed(() => (Math.ceil(posts.value.length / limit.value)))

  const postsPerPage = computed(() => {
    const start: number = (page.value - 1) * limit.value;
    const end: number = start + limit.value;
    return posts.value.slice(start, end);
  })

  function changePage(item: number): number {
    loading.value = true;
    page.value = item;
    setTimeout(() => {
      loading.value = false;
    }, 200)
    return page.value
  }

</script>

<template>
  <div class="h-svh">
    <h2 class="bg-blue-100 text-center py-4 font-bold text-xl" >Posts list</h2>

    <div class="container mx-auto px-4 py-10 flex flex-col" style="height: 90%">
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

      <div v-if="loading" class="flex items-center justify-center flex-grow">
        <img :class="{ 'spinner' : loading }" src="../assets/img/time.png" alt="loader icon" />
      </div>

      <table v-else class="table-auto border-collapse mb-3 " >
        <thead class="bg-amber-50">
        <tr class="border-b-2 ">
          <th class="py-2">ID</th>
          <th class="py-2">Title</th>
          <th class="py-2">Description</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="post in postsPerPage" :key="post.id" class="border-b">
          <td class="py-2 px-4">{{ post.id }}</td>
          <td class="py-2 px-4">{{ post.title }}</td>
          <td class="py-2">{{ post.body }}</td>
        </tr>
        </tbody>
      </table>

    </div>

  </div>

</template>

<style scoped>
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.spinner {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: spin 1s linear infinite;
}
</style>
