<template>
  <div class="empty-state">
    <img src="../assets/empty-state.svg" alt="Empty State" />
    <h4>{{ label }}</h4>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "EmptyState",
  props: {
    label: String,
  },
});
</script>

<style scoped>
.empty-state {
  margin-top: 40%;
  transform: translateY(-50%);
}

@media (max-width: 428px) {
  .empty-state {
    transform: none;
    margin-top: 4rem;
  }
}
</style>
