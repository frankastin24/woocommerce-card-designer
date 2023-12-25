<template>
  <div @mouseup="appOnMouseUp" id="app-container">
    <Header />
    <div id="views-container" :style="{ left: appState.viewContainerLeft }">
      <Views />
    </div>
    <ImageLayerOptions />
    <TextLayerOptions />

    <Navigation />
    <SavedCardDialog v-if="appState.isSavedCardDialog" />
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import loadData from "@/composables/loadData";
import appOnMouseUp from "@/composables/appOnMouseUp";
import calculateTransforms from "@/composables/calculateTransforms";
import { useAppState } from "@/stores/appState";
import Header from "@/components/Header.vue";
import Navigation from "@/components/Navigation.vue";
import Views from "@/components/Views.vue";
import ImageLayerOptions from "@/components//imageLayers/ImageLayerOptions.vue";
import TextLayerOptions from "@/components/textLayers/TextLayerOptions.vue";
import SavedCardDialog from "@/components/SavedCardDialog.vue";

const appState = useAppState();
loadData();

onMounted(() => {
  calculateTransforms();
});

window.onresize = () => {
  setTimeout(() => {
    calculateTransforms();
  }, 500);
};
</script>
<style>
h1,
h2,
h3,
h4,
h5,
p,
a,
span,
.text-option div,
button,
input {
  font-family: Belanosima;
  color: #3b3b3b;
}

#views-container {
  display: flex;
  position: absolute;
  transition: left 0.5s;
}

#app-container {
  width: 100%;
  height: 100vh;
  background: #f8f8f9;
  overflow: hidden;
  position: absolute;
}
</style>
