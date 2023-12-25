<template>
  <div
    class="view"
    :style="{
      width: appState.viewWidth + 'px',
      height: appState.viewHeight + 'px',
    }"
  >
    <Canvas :view="view" :card="card" />
    <ImageLayers :view="view" :viewIndex="viewIndex" />
    <TextLayers :view="view" :viewIndex="viewIndex" />
  </div>
</template>
<script setup>
import { useAppState } from "@/stores/appState";
const appState = useAppState();

import Canvas from "@/components/Canvas.vue";
import ImageLayers from "@/components/imageLayers/ImageLayers.vue";
import TextLayers from "@/components/textLayers/TextLayers.vue";
const { view, viewIndex, card } = defineProps(["view", "viewIndex", "card"]);
</script>
<style scoped>
.view {
  border: 1px solid #ccc;
  background: #fff;
  position: relative;
}
</style>
