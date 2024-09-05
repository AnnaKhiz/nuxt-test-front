<template>
  <div class="flex items-center gap-2 bg-blue-100 text-center py-4 px-10 font-mono">
    <MyButton label="Create post" is-rounded @click="openModalDialog"/>
    <h2 class="font-bold text-xl " style="width: 100%">Posts list</h2>
  </div>
  <MyModalDialog v-if="isDisplayDialog" @close-modal="isDisplayDialog = $event" />
</template>

<script setup lang="ts">
import MyButton from "~/src/components/UI/MyButton.vue";
import MyModalDialog from "~/src/components/MyModalDialog.vue";

let isDisplayDialog = ref(false)

function openModalDialog() {
  console.log('open modal')
  isDisplayDialog.value = true
}
</script>

<style scoped>
</style>
