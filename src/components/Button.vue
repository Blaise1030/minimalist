<template>
  <button v-if="!isLoading" class="button" @click="onClick">{{ label }}</button>
  <div v-if="isLoading" class="lds-hourglass"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Button",
  props: {
    label: String,
    isLoading: Boolean,
    onClick: Function,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
.button {
  border: none;
  outline: none;
  margin: 1rem 0;
  padding: 0.8rem 1.2rem;
  border-radius: 0.2rem;
  cursor: pointer;
  background-color: black;
  color: white;
}

.lds-hourglass {
  display: inline-block;
  position: relative;
  width: 1rem;
  height: 1rem;
}
.lds-hourglass:after {
  content: " ";
  display: block;
  border-radius: 50%;
  width: 0;
  height: 0;
  margin-top: 1rem;
  box-sizing: border-box;
  border: 1rem solid black;
  border-color: black transparent black transparent;
  animation: lds-hourglass 1.2s infinite;
}
@keyframes lds-hourglass {
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  100% {
    transform: rotate(1800deg);
  }
}
</style>
