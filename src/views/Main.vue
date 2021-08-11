<template>
  <div class="main">
    <h1 class="label">Minimalist</h1>
    <p class="label"><span>📝</span>a minimal list for minimalists</p>
    <input
      class="input-box"
      type="text"
      v-bind:placeholder="
        state.showError ? 'please enter your name !' : 'your name'
      "
      @keyup.enter="onSubmit()"
      @change="onChange"
      v-model="state.userName"
    />
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { defineComponent, reactive } from "vue";
export default defineComponent({
  name: "Main",
  setup() {
    const state = reactive({
      userName: "",
      showError: false,
    });
    const onSubmit = () => {
      if (state.userName && state.userName.length > 1) {
        router.push("/home");
      } else state.showError = true;
    };
    return { onSubmit, state };
  },
});
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;
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

.label {
  width: 20rem;
  text-align: start;
  padding: 0;
  margin: 0;
}
.input-box {
  margin-top: 2rem;
  font-size: 1rem;
  border: none;
  width: 20rem;
  border-bottom: 0.1rem solid rgba(0, 0, 0, 0.616);
  padding: 0.1rem;
  outline: none;
  padding: 0.5rem;
  transition: 0.5s;
}

.input-box::placeholder {
  color: rgba(0, 0, 0, 0.616);
}

@media (max-width: 428px) {
  .input-box {
    margin-top: 2rem;
    font-size: 1rem;
    border: none;
    width: calc(100% - 4rem);
    border-bottom: 0.1rem solid rgba(0, 0, 0, 0.616);
    padding: 0.1rem;
    outline: none;
    padding: 0.5rem;
    transition: 0.5s;
  }
}
</style>
