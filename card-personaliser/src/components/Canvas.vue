<template>
  <canvas
    ref="canvasElement"
    :width="card.width"
    :height="card.height"
  ></canvas>
</template>
<script setup>
import { ref, onMounted, inject } from "vue";
const { view, card } = defineProps(["view", "card"]);
const canvasElement = ref(null);
import { useAppState } from "@/stores/appState";
const appState = useAppState();
onMounted(() => {
  appState.canvasContexts[view.name] = canvasElement.value.getContext("2d");
  appState.canvas[view.name] = canvasElement;
});
</script>
<style>
canvas {
  position: absolute;
  top: 0;
  width: 100%;
}
</style>
