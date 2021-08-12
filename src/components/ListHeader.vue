<template>
  <div class="header">
    <IconButton icon="arrow_back" />
    <span style="width: 1rem"></span>
    <h2>{{ title }}</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import IconButton from "@/components/IconButton.vue";

export default defineComponent({
  name: "ListHeader",
  components: { IconButton },
  props: {
    title: String,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
.header {
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
</style>
