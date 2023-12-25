<template>
  <canvas
    :width="appStore.card.width"
    :height="appStore.card.height"
    ref="canvasElement"
    id="card_stage"
  ></canvas>
</template>
<script setup>
import useAppStore from "@/store/AppStore";
import renderCanvas from "@/functions/renderCanvas";
import eventBus from "@/eventBus/eventBus";
import { ref, onMounted } from "vue";
const appStore = useAppStore();
const canvasElement = ref(null);
let canvasContext;
onMounted(() => {
  canvasContext = canvasElement.value.getContext("2d");
});
let isFirstLoad = true;
eventBus.on("renderCanvas", () => {
  if (appStore.appState.imagesLoading) return;
  if (canvasContext) {
    if (isFirstLoad) {
      appStore.card.views.forEach((view, index) => {
        renderCanvas(view, canvasContext, canvasElement, index);
      });

      appStore.appState.activeView = appStore.card.views.length > 0 ? 0 : null;
      isFirstLoad = false;
    }
    renderCanvas(
      appStore.card.views[appStore.appState.activeView],
      canvasContext,
      canvasElement,
      appStore.appState.activeView
    );
  }
});
</script>
<style scoped>
canvas {
  border: 1px solid #ccc;
  width: 90%;
}
</style>
