<template>
  <div class="home">
    <nav
      class="header"
      v-bind:class="{ 'show-bottom-bar': state.showBottomBar }"
    >
      <p>Minimalist</p>
    </nav>
    <input
      class="input-box"
      type="text"
      v-model="state.newTask"
      @keyup.enter="onSubmit"
      placeholder="✏️ New task"
    />
    <div class="list">
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
    </div>
  </div>
</template>

<script lang="ts">
import ListItem from "@/components/ListItem.vue";
import { defineComponent, onMounted, reactive } from "vue";
export default defineComponent({
  components: { ListItem },
  name: "Home",
  setup() {
    const state = reactive<{ newTask: string; showBottomBar: boolean }>({
      newTask: "",
      showBottomBar: false,
    });

    onMounted(() => {
      window.addEventListener(
        "scroll",
        () => (state.showBottomBar = window.scrollY > 110)
      );
    });

    const onSubmit = () => {
      console.log(state.newTask);
      state.newTask = "";
    };

    return {
      onSubmit,
      state,
    };
  },
});
</script>

<style>
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
  padding: 0.1rem;
  outline: none;
  padding: 0.5rem;
  transition: 0.5s;
}

.input-box::placeholder {
  color: rgba(0, 0, 0, 0.616);
}

.list {
  padding-top: 1rem;
  width: 100%;
}
.header {
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
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
  .home {
    width: 100%;
    margin: auto;
    padding: 1rem;
    padding-top: 8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    box-sizing: border-box;
  }

  .header {
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
