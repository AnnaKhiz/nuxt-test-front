<template>
  <div class="flex items-center justify-center fixed inset-0 z-10 overscroll-none font-mono" style="background-color: rgba(156,163,175,0.45); " >
    <div class=" bg-blue-50 rounded-lg" style="height: 500px; width: 500px">
      <div class="flex flex-col items-center justify-start p-8 min-w-full " style="height: 100%">
        <h2 class="text-center text-xl">Create new post</h2>
        <form action="#" class="mb-8 flex-grow min-w-full relative">
          <div class="mb-4">
            <label for="post-title" class="block mb-2">Title</label>
            <input
              type="text"
              id="post-title"
              placeholder="Enter title..."
              v-model="form.title"
              class="min-w-full py-2 px-3 rounded-xl focus:outline-none focus:bg-amber-50"
              :class="{ 'border border-red-600' : errorMessage && !form.title}"
            />
          </div>
          <div>
            <label for="post-description" class="block mb-2">Description</label>
            <textarea
              id="post-description"
              placeholder="Enter description..."
              v-model="form.body"
              rows="8"
              class="min-w-full py-2 px-3 rounded-xl resize-none focus:outline-none focus:bg-amber-50  "
              :class="{ 'border border-red-600' : errorMessage && !form.body}"
            />
          </div>
          <p class="absolute left-0 text-red-600 text-sm -bottom-6" >{{ errorMessage }}</p>
        </form>
        <div class="flex flex-row items-center justify-between min-w-full">
          <MyButton label="Save" @click.prevent="savePost" is-rounded/>
          <MyButton label="Close" @click.prevent="emit('closeModal', false)" is-rounded/>
        </div>
        {{form}}

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AddPostForm, Post } from "@/src/interfaces";
import { useMainStore } from "@/store/useMainStore";
import MyButton from "~/src/components/UI/MyButton.vue";

const store = useMainStore();

const emit = defineEmits<{
  (event: 'closeModal', payload: boolean): void;
}>()

let errorMessage = ref('')
const form = ref<AddPostForm>({ title: '', body: '', id: 1, userId: 1 })

const formValidate = computed( () => {
  const { title, body } = form.value;

  if (!title || !body || title.trim() === '' || body.trim() === '') {
    errorMessage.value = 'Fill empty fields';
    return false
  } else {
    return true
  }
})

async function addNewPostRequest() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts',{
      method: 'POST',
      body: JSON.stringify(form.value),
      headers: { 'Content-Type' : 'application/json' }
    })

    if (response.ok) {
      const result = await response.json()
      store.updatePosts(result);
      emit('closeModal', false)
    }

  } catch (error) {
    console.error(`Error in POST request: ${error}`)
  }
}
function savePost() {

  if (!formValidate.value) {
    return
  }

  if (store.posts.length) {
    const sortedPosts: Array<Post> = [...store.posts].sort((a, b) => a.id - b.id);
    const lastPost: Post = sortedPosts.at(-1) as Post;
    form.value.id = lastPost.id + 1;
  }

  addNewPostRequest()
}

watch(form.value, (newVal) => {
  if (newVal.title !== '' && newVal.body !== '') {
    errorMessage.value = ''
  }

}, {deep: true})


onMounted(() => {
  document.body.classList.add('no-scroll');
})

onBeforeUnmount(() => {
  document.body.classList.remove('no-scroll');
})
</script>



<style >
.no-scroll {
  overflow: hidden;
}
</style>
