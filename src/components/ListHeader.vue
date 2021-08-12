<template>
  <div class="header">
    <IconButton icon="arrow_back" :onClick="onBackClicked" />
    <span style="width: 1rem"></span>
    <h2>{{ title }}</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import IconButton from "@/components/IconButton.vue";
import router from "@/router";

export default defineComponent({
  name: "ListHeader",
  components: { IconButton },
  props: {
    title: String,
  },
  setup() {
    const onBackClicked = () => router.back();
    return { onBackClicked };
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
