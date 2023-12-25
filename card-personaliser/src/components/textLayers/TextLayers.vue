<template>
  <div
    v-for="(layer, index) in editableTextLayers"
    :style="textLayerStyles(layer)"
    class="text-overlay"
    :class="[isLayerActive(layer.index, viewIndex, view) ? 'active' : '']"
    @click="updateActiveLayer(layer, viewIndex)"
  >
    <div v-if="!layer.isMultiLine" class="text-icon">
      <TextIcon />
    </div>

    <div
      @input="updateTextLayer(layer, $event)"
      class="multiLineText"
      contentEditable="true"
      :style="inputStyles(layer, viewIndex, view)"
      v-if="layer.isMultiLine"
      v-html="getMultiLineHTML(layer)"
    ></div>

    <input
      :style="inputStyles(layer, viewIndex, view)"
      :class="
        isLayerActive(layer.index, viewIndex, view) ? '' : 'cursor-pointer'
      "
      @input="updateTextLayer(layer, $event)"
      v-if="!layer.isMultiLine"
      :value="layer.text"
    />
  </div>
</template>
<script setup>
import TextIcon from "@/components/svg/TextIcon.vue";
import updateTextLayer from "@/composables/textLayers/updateTextLayer";
import focusInput from "@/composables/textLayers/focusInput";
import isLayerActive from "@/composables/isLayerActive";
import textLayerStyles from "@/composables/textLayers/textLayerStyles";
import inputStyles from "@/composables/textLayers/inputStyles";
import updateActiveLayer from "@/composables/mutations/updateActiveLayer";
import getMultiLineHTML from "@/composables/textLayers/getMultiLineHTML";
import { onMounted } from "vue";

const { view, viewIndex } = defineProps(["view", "viewIndex"]);

const editableTextLayers = view.layers.filter((layer) => layer.type == "text");

onMounted(() => {
  focusInput(view, viewIndex);
});
</script>
<style>
.text-overlay {
  border: 2px dashed #000;
  position: absolute;
  z-index: 10;
  display: flex;
  cursor: pointer;
  align-items: center;
}
div.active {
  border: 3px solid #000 !important;
}
.multiLineText div {
  min-height: 10px;
}
.text-overlay > input {
  left: 0;
  background: transparent;
  outline: none;
  border: none;
}
.text-icon {
  width: 50px;
  height: 50px;
  border-radius: 50px;
  border: 3px solid #000;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -25px;
  left: -25px;
  position: absolute;
}
.text-icon svg {
  width: 35px;
  height: 35px;
}
.cursor-pointer {
  cursor: pointer;
  pointer-events: none;
}
</style>
