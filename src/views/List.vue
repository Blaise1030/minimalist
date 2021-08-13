<template>
  <nav class="topbar" v-bind:class="{ 'show-bottom-bar': state.showBottomBar }">
    <h4>{{ new Date().toISOString().slice(0, 10).replace(/-/g, " ") }}</h4>
    <div>
      <IconButton v-if="state.showStats" icon="logout" :onClick="logout" />
      <IconButton
        :icon="state.showStats ? 'checklist' : 'pie_chart'"
        :onClick="() => (state.showStats = !state.showStats)"
      />
    </div>
  </nav>
  <div class="main" v-if="!state.showStats">
    <input
      class="input-box"
      type="text"
      v-model="state.newTask"
      @keyup.enter="onSubmit"
      :placeholder="
        state.undoneTask.length <= 0 && state.doneTask.length <= 0
          ? 'add your first task'
          : 'add a new task'
      "
    />
    <EmptyState
      v-if="state.undoneTask.length <= 0 && state.doneTask.length <= 0"
      label="Add something to your list :)"
    />
    <div
      class="list"
      v-if="state.undoneTask.length > 0 || state.doneTask.length > 0"
    >
      <ListItem
        v-for="item in state.undoneTask"
        v-bind:key="item.id"
        :canEdit="true"
        :item="item"
      />
      <ListItem
        v-for="item in state.doneTask"
        v-bind:key="item.id"
        :canEdit="true"
        :item="item"
      />
    </div>
  </div>

  <div class="main" v-if="state.showStats">
    <span class="counter">
      <p>{{ state.percentDone }}</p>
      Task Done
    </span>
    <div class="counter-group">
      <span class="counter"
        ><p>{{ state.undoneTask.length }}</p>
        pending tasks</span
      >
      <span class="counter"
        ><p>{{ state.doneTask.length }}</p>
        completed tasks</span
      >
    </div>
    <div>
      <h4>Your Previous Tasks</h4>
    </div>

    <EmptyState
      v-if="state.cachedTask.length <= 0 && state.cachedTask.length <= 0"
      label="No deleted tasks"
    />

    <div
      class="list"
      v-if="state.cachedTask.length > 0 || state.cachedTask.length > 0"
    >
      <ListItem
        v-for="item in state.cachedTask"
        v-bind:key="item.id"
        :canEdit="false"
        :item="item"
      />
    </div>
  </div>
</template>

<script lang="ts">
import ListItem from "@/components/ListItem.vue";
import { defineComponent, onMounted, reactive } from "vue";
import { Task } from "@/models";
import IconButton from "@/components/IconButton.vue";
import EmptyState from "@/components/EmptyState.vue";
import { ISMOBILE } from "@/constants";
import store from "@/store";

export default defineComponent({
  components: { ListItem, IconButton, EmptyState },
  name: "List",
  setup() {
    const state = reactive<{
      newTask: string;
      showBottomBar: boolean;
      title: string;
      showStats: boolean;
      percentDone: string;
      undoneTask: any[];
      doneTask: any[];
      cachedTask: any[];
    }>({
      newTask: "",
      showBottomBar: false,
      title: "This is the title",
      showStats: false,
      percentDone: "0%",
      undoneTask: [],
      doneTask: [],
      cachedTask: [],
    });

    onMounted(() => {
      store.dispatch("userToDoListeners");
      store.subscribe((_, store) => {
        state.doneTask = store.checkedTodos;
        state.cachedTask = store.cachedTodos;
        state.undoneTask = store.todos;
        state.percentDone = `${(state.doneTask.length +
          state.undoneTask.length ===
        0
          ? 0
          : (state.doneTask.length * 100) /
            (state.doneTask.length + state.undoneTask.length)
        ).toFixed()}%`;
      });
      window.addEventListener(
        "scroll",
        () => (state.showBottomBar = window.scrollY > 110)
      );
    });

    const onSubmit = async () => {
      if (state.newTask.trim().length > 0) {
        const message = state.newTask;
        state.newTask = "";
        await store.dispatch("userCreatesTask", {
          userTask: {
            listId: "0",
            id: Date.now(),
            message,
            userId: store.getters.getUser().uid,
            isDone: false,
            isDeleted: false,
          } as Task,
        });
      }
      state.newTask = "";
    };

    const logout = () => store.dispatch("signUserOut");

    return {
      onSubmit,
      state,
      ISMOBILE,
      logout,
    };
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
  padding-top: 1rem;
  width: 100%;
  margin-bottom: 2rem;
}

.topbar {
  padding: 0.5rem 1rem;
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

.header {
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.show-bottom-bar {
  border-bottom: 1px solid #bbbbbb;
}

.counter-group {
  display: flex;
  flex-direction: row;
  align-content: space-between;
}

.counter {
  margin: 1rem;
  padding: 0;
}

.counter > p {
  margin: 0;
  font-size: 1.5rem;
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

  .topbar {
    padding: 0.5rem 1rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    text-align: start;
    z-index: 2;
    background-color: white;
  }
}
</style>
