<template>
  <div class="wrapper" @mouseleave="state.isHover = false">
    <span class="material-icons" v-if="!state.checked" :onClick="checkTask"
      >check_box_outline_blank</span
    >
    <span class="material-icons" v-if="state.checked" :onClick="checkTask"
      >check_box</span
    >
    <p
      class="message"
      v-bind:class="{ checked: state.checked, includePadding: state.isHover }"
      @click="onWrapperClick()"
    >
      {{ item.message }}
    </p>

    <div class="trailing" v-if="state.isHover">
      <IconButton icon="delete_outline" :onClick="cacheTask" />
    </div>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import { defineComponent, reactive } from "vue";
import IconButton from "./IconButton.vue";

export default defineComponent({
  name: "ListComponent",
  components: { IconButton },
  props: {
    item: Object,
    checked: Boolean,
    isHoverOn: Boolean,
    canEdit: Boolean,
  },
  setup(props) {
    const state = reactive({
      checked: props.item?.isDone,
      isHover: false,
    });

    const ISMOBILE = window.innerWidth < 428;

    const cacheTask = () => {
      if (props.canEdit) {
        store.dispatch("userCacheTask", {
          taskId: (props.item || { id: "" }).id,
          userId: store.getters.getUser().uid,
        });
      }
    };

    const checkTask = () => {
      if (props.canEdit) {
        state.checked = !state.checked;
        store.dispatch("userTaskCheckOrUncheck", {
          isCheck: state.checked,
          taskId: (props.item || { id: "" }).id,
        });
      }
    };

    const onWrapperClick = () => {
      if (props.canEdit) {
        state.isHover = !state.isHover;
      }
    };

    return {
      checkTask,
      state,
      onWrapperClick,
      cacheTask,
      ISMOBILE,
    };
  },
});
</script>

<style>
.wrapper {
  user-select: none;
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
  padding: 0 0.8rem;
  transition: 0.5s;
  text-align: justify;
  width: 100%;
}

.checked {
  transition: 0.5s;
  text-decoration: line-through;
}

.includePadding {
  margin-right: 0.8rem;
}
@media (max-width: 428px) {
  .includePadding {
    margin: 0rem 0.8rem;
  }
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
