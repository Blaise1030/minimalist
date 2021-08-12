<template>
  <nav class="topbar" v-bind:class="{ 'show-bottom-bar': state.showBottomBar }">
    <p>{{ currentDate }}</p>
    <IconButton icon="logout" />
  </nav>
  <div class="main">
    <input
      class="input-box"
      type="text"
      v-model="state.newList"
      @keyup.enter="onSubmit"
      :placeholder="
        state.lists.length <= 0 ? 'add your first list' : 'add a new list'
      "
    />

    <EmptyState v-if="state.lists.length <= 0" label="Create a list !" />

    <div class="list" v-if="state.lists.length > 0">
      <div
        class="list-tile"
        v-for="(element, index) in state.lists"
        v-bind:key="index"
      >
        <h4 @click="onClickListTile">{{ element }}</h4>
        <IconButton icon="clear" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import EmptyState from "@/components/EmptyState.vue";
import IconButton from "@/components/IconButton.vue";
import router from "@/router";
import { defineComponent, onMounted, reactive } from "vue";

export default defineComponent({
  components: { IconButton, EmptyState },
  name: "AllList",
  setup() {
    const currentDate = new Date()
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, "-");
    const state = reactive<{
      newList: string;
      lists: string[];
      showBottomBar: boolean;
    }>({
      newList: "",
      lists: [],
      showBottomBar: false,
    });

    onMounted(() => {
      window.addEventListener(
        "scroll",
        () => (state.showBottomBar = window.scrollY > 110)
      );
    });

    const onSubmit = () => {
      if (state.newList.trim().length > 0) {
        state.lists.push(state.newList);
      }
      state.newList = "";
    };

    const onClickListTile = () => {
      router.push("/list");
    };

    return { state, onSubmit, onClickListTile, currentDate };
  },
});
</script>

<style scoped>
.main {
  width: 40%;
  margin: auto;
  padding-top: 8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
}

.input-box {
  font-size: 1.5rem;
  border: none;
  width: 100%;
  border-bottom: 0.1rem solid black;
  outline: none;
  padding: 0.5rem;
  transition: 0.5s;
  margin-top: 2rem;
}

.input-box::placeholder {
  color: rgba(0, 0, 0, 0.616);
}

.list {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
}

.list-tile {
  display: flex;
  flex-direction: row;
  user-select: none;
  cursor: pointer;
  width: calc(100% - 1rem);
  border: 0.1rem solid black;
  border-radius: 0.4rem;
  margin-top: 1.5rem;
  padding-right: 1rem;
  transition: 0.1s;
  align-items: center;
  justify-content: space-between;
}

.list-tile > h4 {
  text-align: start;
  padding: 1rem;
  width: 100%;
  word-break: break-all;
}

.topbar {
  padding: 1rem 1.8rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  text-align: start;
  z-index: 2;
  width: 100%;
  left: 0;
  top: 0;
  background-color: white;
}

.show-bottom-bar {
  border-bottom: 1px solid #bbbbbb;
}

@media (max-width: 428px) {
  .main {
    width: 100%;
    height: 100%;
    padding: 0 1.5rem;
    padding-top: 8rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    box-sizing: border-box;
  }
}
</style>
