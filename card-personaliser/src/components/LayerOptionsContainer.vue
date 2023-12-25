<template>
  <div
    class="layer-options-container"
    :style="{
      left: appState.layerOptionsLeft - 404 + 'px',
    }"
  >
    <slot></slot>
  </div>
</template>
<script setup>
import { useAppState } from "@/stores/appState";
const appState = useAppState();
</script>
<style>
.layer-options-container {
  width: 300px;
  min-height: 244px;
  position: absolute;
  background: #fff;
  border-radius: 10px;
  top: 78px;
  left: calc(50% - 669px);
  padding: 15px 20px;
  padding-bottom: 5px;
  box-shadow: rgba(0, 32, 77, 0.15) 0px 1px 4px 0px;
  z-index: 999;
}
.layer-options-container h4 {
  margin-top: 20px;
  font-size: 21px;
}
.layer-options-container .close {
  position: absolute;
  top: 32px;
  right: 14px;
  cursor: pointer;
}
.layer-options-container .close:hover {
  opacity: 0.6;
}
.layer-options-container .close svg {
  width: 28px;
  height: 28px;
}
@media screen and (max-height: 800px) {
  .layer-options-container {
    top: 68px;
  }
}
@media screen and (max-width: 1160px) {
  .layer-options-container {
    left: 0px !important;
    width: 100%;
    top: calc(100% - 244px);
  }
}
</style>
