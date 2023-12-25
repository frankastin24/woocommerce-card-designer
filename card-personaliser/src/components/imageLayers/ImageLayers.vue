<template>
  <div
    v-for="(layer, index) in editableImageLayers"
    :style="imageLayerStyles(layer, view)"
    class="image-overlay"
    :class="[
      isImageLayerHoverBorder(layer, viewIndex, view),
      isImageLayerActive(layer, viewIndex, view),
      isImageLayerMoveableClass(layer, view),
    ]"
    @click="updateActiveLayer(layer, viewIndex)"
    @mousemove="imageLayerOnMouseMove(layer, $event, view, viewIndex)"
    @mousedown="imageLayerOnMouseDown(layer, $event, view, viewIndex)"
  >
    <div v-if="layer.uploadedImageIndex == null" class="image-upload-container">
      <img :src="assetsURL + '/imageUpload.png'" />
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const { viewIndex } = defineProps(["viewIndex"]);
import imageLayerStyles from "@/composables/imageLayers/imageLayerStyles";
import isImageLayerActive from "@/composables/imageLayers/isImageLayerActive";
import isImageLayerHoverBorder from "@/composables/imageLayers/isImageLayerHoverBorder";
import isImageLayerMoveableClass from "@/composables/imageLayers/isImageLayerMoveableClass";
import imageLayerOnMouseDown from "@/composables/imageLayers/imageLayerOnMouseDown";
import imageLayerOnMouseMove from "@/composables/imageLayers/imageLayerOnMouseMove";
import updateActiveLayer from "@/composables/mutations/updateActiveLayer";
const assetsURL = ref(FACardDesigner.assetsURL);
import { useCardStore } from "@/stores/cardStore";
const cardStore = useCardStore();
const view = cardStore.views[viewIndex];
const editableImageLayers = cardStore.views[viewIndex].layers.filter(
  (layer) => layer.type == "image" && layer.canUserUpload
);
</script>
<style scoped>
canvas {
  width: 100%;
}
.image-overlay {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.hover-border:hover {
  border: 3px solid #000;
}
.image-upload-container {
  width: 50px;
  height: 50px;
  border-radius: 50px;
  border: 3px solid #000;
  background: #fff;
}
.image-upload-container img {
  width: 80%;
  margin: auto;
  display: block;
  margin-top: 5px;
}
div.active {
  border: 3px solid #000;
}
.is-movable {
  cursor: grab;
}
</style>
