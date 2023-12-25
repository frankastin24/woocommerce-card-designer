<template>
  <div
    id="image-options"
    :style="{
      left: appState.layerOptionsLeft - 95 + 'px',
    }"
  >
    <button
      :class="appState.isImageLibrary ? 'active' : ''"
      class="is-hover image-library"
      v-if="isPhotoOption()"
      @click="updateImageLibraryOpen(!appState.isImageLibrary)"
    >
      <div class="image-container">
        <Image />
      </div>
      <p>Photos</p>
    </button>
    <button
      v-if="isReplaceOption()"
      class="is-hover image-library"
      :class="appState.isImageLibrary ? 'active' : ''"
      @click="updateImageLibraryOpen(!appState.isImageLibrary)"
    >
      <div class="image-container replace">
        <Arrows />
      </div>
      <p>Replace</p>
    </button>
    <button
      :style="{
        opacity: setAjustmentOptionOpacity(),
      }"
      :class="setAjustmentOptionClasses()"
      @click="updateImageAjustmentsOpen(!appState.isImageAjustments)"
    >
      <div class="image-container">
        <Move />
      </div>
      <p>Ajust</p>
    </button>
    <button class="done" @click="updateImageOptionsOpen(false, true)">
      <div>
        <Tick />
      </div>
      <p>Done</p>
    </button>
  </div>
</template>
<script setup>
import Image from "@/components/svg/Image.vue";
import Move from "@/components/svg/Move.vue";
import Tick from "@/components/svg/Tick.vue";
import Arrows from "@/components/svg/Arrows.vue";
import isPhotoOption from "@/composables/imageLayers/isPhotoOption";
import isReplaceOption from "@/composables/imageLayers/isReplaceOption";
import setAjustmentOptionOpacity from "@/composables/imageLayers/setAjustmentOptionOpacity";
import updateImageOptionsOpen from "@/composables/mutations/updateImageOptionsOpen";
import updateImageAjustmentsOpen from "@/composables/mutations/updateImageAjustmentsOpen";
import updateImageLibraryOpen from "@/composables/mutations/updateImageLibraryOpen";
import setAjustmentOptionClasses from "@/composables/imageLayers/setAjustmentOptionClasses";
import { useAppState } from "@/stores/appState";
const appState = useAppState();
</script>
<style>
#image-options {
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
#image-options button {
  background: transparent;
  border: none;
  width: 58px;
  margin: auto;
  margin-bottom: 10px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
.is-hover,
.done {
  cursor: pointer;
}
#image-options p {
  width: 100%;
  margin-top: 5px;
}
#image-options .is-hover:hover > p,
#image-options button.active > p,
.done:hover > p {
  color: rgb(206, 51, 86);
}

#image-options .is-hover:hover path,
#image-options button.active path {
  fill: rgb(206, 51, 86) !important;
  stroke: rgb(206, 51, 86) !important;
}

#image-options svg {
  width: 30px;
  height: 30px;
}

#image-options .replace svg {
  width: 20px;
  height: 20px;
}
@media screen and (max-height: 800px) {
  #image-options {
    top: 68px;
  }
}
@media screen and (max-width: 1160px) {
  #image-options {
    top: 54px;
    height: 79px;
    flex-direction: row;
    width: 174px;
    align-items: center;
    left: calc(50% - 81px) !important;
    padding: 0px 7px;
  }
  #image-options .replace svg {
    width: 18px;
    height: 18px;
  }

  .done > div {
    width: 35px;
    height: 35px;
  }
  .done > div svg {
    width: 20px;
    height: 20px;
  }
}
</style>
