<template>
  <LayerOptionsContainer v-if="appState.isImageLibrary" id="image-library">
    <ImageLibrary />
  </LayerOptionsContainer>
  <LayerOptionsContainer v-if="appState.isImageAjustments">
    <ImageAjustments />
  </LayerOptionsContainer>
  <ImageOptions v-if="appState.isImageOptions" />
</template>
<script setup>
import { useAppState } from "@/stores/appState";
const appState = useAppState();
import ImageOptions from "@/components/imageLayers/ImageOptions.vue";
import LayerOptionsContainer from "@/components/LayerOptionsContainer.vue";
import ImageLibrary from "@/components/imageLayers/ImageLibrary.vue";
import ImageAjustments from "@/components/imageLayers/ImageAjustments.vue";
</script>
