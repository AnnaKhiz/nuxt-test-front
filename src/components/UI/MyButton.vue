<template>
  <button
    class="border-solid border-2 py-2 px-4 bg-amber-50 min-w-fit
      hover:bg-blue-50
      transition duration-700 ease-in-out"
    :class="{'rounded-lg' : props.isRounded }"
  >
    {{ props.label }}
  </button>
</template>

<script setup lang="ts">
import type { ButtonProps } from "@/src/interfaces";

const props = defineProps<ButtonProps>();
</script>

