<template>
  <h4>Ajust Image</h4>
  <h5 class="close" @click="updateImageAjustmentsOpen(false)"><Cross /></h5>
  <div
    class="ajustment-option"
    @mousedown="imageAjustmentOnMouseDown"
    @mousemove="rotateOnMouseMove"
  >
    <p>
      Rotation
      <b
        >{{
          cardStore.views[appState.activeView].layers[
            cardStore.views[appState.activeView].activeLayer
          ].imageRotation
        }}°</b
      >
    </p>
    <Dashes index="0" />
  </div>
  <div
    class="ajustment-option"
    @mousedown="imageAjustmentOnMouseDown"
    @mousemove="scaleOnMouseMove"
  >
    <p>
      Zoom
      <b
        >{{
          cardStore.views[appState.activeView].layers[
            cardStore.views[appState.activeView].activeLayer
          ].imageScale.toFixed(1)
        }}x</b
      >
    </p>
    <Dashes index="1" />
  </div>
</template>
<script setup>
import { useAppState } from "@/stores/appState";
import { useCardStore } from "@/stores/cardStore";
import Cross from "@/components/svg/Cross.vue";
import Dashes from "@/components/svg/Dashes.vue";
import updateImageAjustmentsOpen from "@/composables/mutations/updateImageAjustmentsOpen";
import imageAjustmentOnMouseDown from "@/composables/imageLayers/imageAjustmentOnMouseDown";
import scaleOnMouseMove from "@/composables/imageLayers/scaleOnMouseMove";
import rotateOnMouseMove from "@/composables/imageLayers/rotateOnMouseMove";
const appState = useAppState();
const cardStore = useCardStore();
</script>
<style>
.ajustment-option {
  margin-bottom: 15px;
}
.ajustment-option p {
  text-align: center;
  margin-bottom: 10px;
}
.ajustment-option:first-of-type p {
  margin-top: 40px;
}
svg {
  position: relative;
}
.middle-dash {
  x: calc(50% - 2px);
}
.fade-left {
  width: 20%;
}
.fade-right {
  width: 20%;
  x: calc(100% - 20%);
}
</style>
