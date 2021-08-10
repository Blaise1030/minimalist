<template>
  <div class="wrapper">
    <div class="leading">
      <IconButton icon="arrow_upward" />
      <IconButton icon="arrow_downward" />
    </div>
    <p
      class="message"
      v-bind:class="{ checked: state.checked }"
      @dblclick="checkTask"
    >
      This is the list item This is the list item This is the list item This is
      the list item This is the list item This is the list item This is the list
      item
    </p>

    <div class="trailing">
      <IconButton v-if="!state.checked" icon="check" :onClick="checkTask" />
      <IconButton v-if="state.checked" icon="clear" :onClick="checkTask" />
      <IconButton icon="delete_outline" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import IconButton from "./IconButton.vue";

export default defineComponent({
  name: "ListComponent",
  components: { IconButton },
  setup() {
    const state = reactive({
      checked: false,
    });

    const checkTask = () => (state.checked = !state.checked);

    return {
      checkTask,
      state,
    };
  },
});
</script>

<style>
.wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0.1rem;
  user-select: none;
  cursor: pointer;
  transition: 0.5s;
}

.leading {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.trailing {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.message {
  padding: 0 1rem;
  text-align: justify;
}

.checked {
  transition: 0.5s;
  text-decoration: line-through;
}
@media (max-width: 428px) {
  .leading {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .trailing {
    display: flex;
    align-items: center;
    flex-direction: column-reverse;
  }
}
</style>
