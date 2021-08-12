<template>
  <nav class="topbar" v-bind:class="{ 'show-bottom-bar': state.showBottomBar }">
    <ListHeader :title="state.title" />
    <IconButton icon="settings" />
  </nav>
  <div class="home">
    <input
      class="input-box"
      type="text"
      v-model="state.newTask"
      @keyup.enter="onSubmit"
      placeholder="add a new task"
    />

    <div
      class="empty-state"
      v-if="state.undoneTask.length <= 0 && state.doneTask.length <= 0"
    >
      <img src="../assets/empty-state.svg" alt="Empty State" />
      <h4>Add something to your list :)</h4>
    </div>
    <div
      class="list"
      v-if="state.undoneTask.length > 0 || state.doneTask.length > 0"
    >
      <ListItem
        v-for="item in state.undoneTask"
        v-bind:key="item.id"
        :item="item"
      />
      <ListItem
        v-for="item in state.doneTask"
        v-bind:key="item.id"
        :item="item"
      />
    </div>
  </div>
</template>

<script lang="ts">
import ListItem from "@/components/ListItem.vue";
import ListHeader from "@/components/ListHeader.vue";
import { defineComponent, onMounted, reactive } from "vue";
import Task from "@/Task";
import IconButton from "@/components/IconButton.vue";
import "../assets/empty-state.svg";

export default defineComponent({
  components: { ListItem, IconButton, ListHeader },
  name: "Home",
  setup() {
    const state = reactive<{
      newTask: string;
      showBottomBar: boolean;
      doneTask: Task[];
      undoneTask: Task[];
      title: string;
    }>({
      newTask: "",
      showBottomBar: false,
      doneTask: [],
      undoneTask: [],
      title: "This is the title",
    });

    onMounted(() => {
      window.addEventListener(
        "scroll",
        () => (state.showBottomBar = window.scrollY > 110)
      );
    });

    const ISMOBILE = window.innerWidth < 428;

    const onSubmit = () => {
      if (state.newTask.trim().length > 0) {
        state.undoneTask.push({
          id: Date.now(),
          message: state.newTask,
          isDone: false,
          priority: 0,
        } as Task);
        state.undoneTask = sortTasks(state.undoneTask);
        console.log(state.undoneTask);
        state.newTask = "";
      }
    };

    const sortTasks = (taskArray: Task[]): Task[] => {
      return taskArray.sort((a: Task, b: Task) => {
        let aScore = 0;
        let bScore = 0;
        a.priority >= b.priority ? (aScore += 2) : (bScore += 2);
        a.id >= b.id ? (aScore += 1) : (bScore += 1);
        return aScore < bScore ? 1 : -1;
      });
    };

    return {
      onSubmit,
      state,
      ISMOBILE,
    };
  },
});
</script>

<style scoped>
.home {
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

.empty-state {
  margin-top: 50%;
  transform: translateY(-50%);
}

.show-bottom-bar {
  border-bottom: 1px solid #bbbbbb;
}

@media (max-width: 428px) {
  .home {
    width: 100%;
    height: 100%;
    margin: auto;
    padding: 1rem;
    padding-top: 4rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    box-sizing: border-box;
  }

  .empty-state {
    margin: auto;
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
