<template>
  <div
    class="flex items-center justify-center fixed inset-0 z-10 overscroll-none font-mono"
    style="background-color: rgba(156,163,175,0.45);"
  >
    <div
      class="bg-blue-50 rounded-lg max-h-fit p-8 text-right relative"
      style=" width: 500px"
    >
      <slot name="content" ></slot>
      <img
        src="@/src/assets/img/close-24.png"
        alt="close icon"
        @click="emit('closeModal', false)"
        class="absolute top-4 right-4 cursor-pointer"
      >
    </div>
  </div>
</template>

<script setup lang="ts">

const emit = defineEmits<{
  (event: 'closeModal', payload: boolean): void;
}>()

</script>

