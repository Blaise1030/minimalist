<template>
  <div class="main">
    <div class="center">
      <h1 class="label">Minimalist</h1>
      <p class="label"><span>📝</span>a minimal list for minimalists</p>
      <Button label="Get Started" :onClick="onSubmit" />
    </div>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { defineComponent, reactive } from "vue";
import Button from "@/components/Button.vue";
export default defineComponent({
  name: "Main",
  components: { Button },
  setup() {
    const state = reactive({
      userName: "",
      showError: false,
    });
    const onSubmit = () => {
      router.push("/home");
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

.center {
  width: 40%;
  text-align: start;
}

.label {
  text-align: start;
  padding: 0;
  margin: 0;
}

@media (max-width: 428px) {
  .center {
    width: 90%;
    text-align: start;
  }
}
</style>
