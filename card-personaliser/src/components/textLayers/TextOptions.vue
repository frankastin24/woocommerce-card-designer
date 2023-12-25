<template>
  <div
    id="text-options"
    :style="{
      left: appState.layerOptionsLeft - 95 + 'px',
    }"
  >
    <div
      :class="appState.isTextSizeOptions ? 'active-option' : ''"
      class="text-option"
      @click="updateTextSizeOpen(true)"
    >
      <div class="grey-circle">
        <span>{{ getLayerOption("fontSize") }}</span>
      </div>
      <p>Size</p>
    </div>
    <div class="text-option" @click="updateTextFontOpen(true)">
      <div class="grey-circle">
        <span>AA</span>
      </div>
      <p>Font</p>
    </div>
    <div class="text-option" @click="updateTextColorOpen(true)">
      <div class="grey-circle">
        <div
          class="text-color"
          :style="{ backgroundColor: getLayerOption('color') }"
        ></div>
      </div>
      <p>Color</p>
    </div>
    <div class="text-option" @click="updateTextAlignOpen(true)">
      <div class="grey-circle">
        <TextAlignHorizontalCenter />
      </div>
      <p>Align</p>
    </div>
    <button
      class="done text-option"
      @click="updateTextOptionsOpen(false, true)"
    >
      <div class="image-container">
        <Tick />
      </div>
      <p>Done</p>
    </button>
  </div>
</template>
<script setup>
import TextAlignHorizontalCenter from "@/components/svg/TextAlignHorizontalCenter.vue";
import Tick from "@/components/svg/Tick.vue";
import { useAppState } from "@/stores/appState";
import updateTextOptionsOpen from "@/composables/mutations/updateTextOptionsOpen";
import getLayerOption from "@/composables/getLayerOption";
import updateTextSizeOpen from "@/composables/mutations/updateTextSizeOpen";
import updateTextColorOpen from "@/composables/mutations/updateTextColorOpen";
import updateTextAlignOpen from "@/composables/mutations/updateTextAlignOpen";
import updateTextFontOpen from "@/composables/mutations/updateTextFontOpen";
const appState = useAppState();
</script>
<style>
#text-options {
  position: absolute;
  width: 88px;
  background: #fff;
  border-radius: 10px;
  top: 78px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px 0px;
  padding-bottom: 5px;
  box-shadow: rgba(0, 32, 77, 0.15) 0px 1px 4px 0px;
}
.text-option {
  width: 60px;
  margin: auto;
  cursor: pointer;
  text-align: center;
  margin-bottom: 12px;
}
.grey-circle {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: rgb(248, 248, 249);
  margin: auto;
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.text-color {
  width: 80%;
  height: 80%;
  border-radius: 100%;
}
.text-option:hover p,
.text-option:hover span,
.text-option:hover path,
div.active-option p,
div.active-option span,
div.active-option path {
  color: rgb(206, 51, 86);
  fill: rgb(206, 51, 86);
}
button.done .image-container {
  border: 2px solid rgb(8, 120, 39);
}
.done {
  background: none;
  border: none;
  margin-top: 12px;
}
.done svg {
  width: 24px;
  height: 24px;
}
.done > div {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(248, 248, 249);
  border-radius: 100%;
  margin: auto;
}
@media screen and (max-height: 800px) {
  #text-options {
    top: 68px;
  }
}
@media screen and (max-width: 1160px) {
  #text-options {
    left: calc(50% - 140px) !important;
    z-index: 100;
    width: 280px;

    flex-direction: row;
    height: 83px;
  }
  .done {
    margin-top: 1px;
  }
}
</style>
