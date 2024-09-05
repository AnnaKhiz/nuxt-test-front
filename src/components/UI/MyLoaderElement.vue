<template>
  <div class="flex items-center justify-center flex-grow" style="height: 90%">
    <img :class="{ 'spinner' : loading }" src="../../assets/img/time.png" alt="loader icon" />
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from "~/store/useMainStore";
import { storeToRefs } from 'pinia';

const store = useMainStore();
const  { loading } = storeToRefs(store);
</script>

<style scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.spinner {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: spin 1s linear infinite;
}
</style>
