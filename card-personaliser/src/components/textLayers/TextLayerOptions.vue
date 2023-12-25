<template>
  <LayerOptionsContainer v-if="appState.isTextSizeOptions">
    <TextSizeOptions />
  </LayerOptionsContainer>
  <LayerOptionsContainer v-if="appState.isTextColorOptions">
    <TextColorOptions />
  </LayerOptionsContainer>
  <LayerOptionsContainer v-if="appState.isTextAlignOptions">
    <TextAlignOptions />
  </LayerOptionsContainer>
  <LayerOptionsContainer v-if="appState.isTextFontOptions">
    <TextFontOptions />
  </LayerOptionsContainer>
  <TextOptions v-if="appState.isTextOptions" />
</template>
<script setup>
import { useAppState } from "@/stores/appState";
const appState = useAppState();
import TextSizeOptions from "@/components/textLayers/TextSizeOptions.vue";
import TextFontOptions from "@/components/textLayers/TextFontOptions.vue";
import TextColorOptions from "@/components/textLayers/TextColorOptions.vue";
import TextAlignOptions from "@/components/textLayers/TextAlignOptions.vue";
import TextOptions from "@/components/textLayers/TextOptions.vue";
import LayerOptionsContainer from "@/components/LayerOptionsContainer.vue";
</script>
