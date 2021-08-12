<template>
  <button class="button" @click="onClick">Get Started</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Button",
  props: {
    label: String,
    isLoading: Boolean,
    onClick: Function,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
.button {
  border: none;
  outline: none;
  margin: 1rem 0;
  padding: 0.8rem 1.2rem;
  border-radius: 0.2rem;
  cursor: pointer;
  background-color: black;
  color: white;
}
</style>
