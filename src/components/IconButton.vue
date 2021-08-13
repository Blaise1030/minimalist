<template>
  <span class="material-icons icon-button" @click="onClick">
    {{ icon }}
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "IconButton",
  props: {
    icon: String,
    color: String,
    onClick: Function,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
.icon-button {
  margin: 0.2rem;
  padding: 0.5rem;
  border-radius: 50%;
  transition: 0.5s;
  cursor: pointer;
  user-select: none;
}

.icon-button:hover {
  transition: 0.5s;
  background-color: #dcdcdc;
}

.icon-button:active {
  transition: 0.5s;
  background-color: white;
}
</style>
