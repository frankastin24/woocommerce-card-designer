<template>
  <div class="" id="buttons">
    <button class="preview button" @click.prevent="displayModal('image')">
      Add Image
    </button>
    <button class="preview button" @click.prevent="displayModal('text')">
      Add Text
    </button>
    <label for="uploadPSD" class="upload_psd button button-primary button-large"
      >Upload PSD</label
    >
    <input id="uploadPSD" v-show="false" type="file" @change="uploadPSD" />
  </div>

  <draggable
    id="layers"
    v-if="
      appStore.appState.activeView != null &&
      appStore.card.views[appStore.appState.activeView].layers.length > 0
    "
    v-model="appStore.card.views[appStore.appState.activeView].layers"
    group="layers"
    item-key="index"
    @start="drag = true"
    @end="drag = false"
  >
    <template #item="{ element, index }">
      <LayersItem
        @click="changeActiveLayer(index, $event)"
        :class="activeLayer === index ? 'activeLayer' : ''"
        :layer="element"
        :index="index"
      >
      </LayersItem>
    </template>
  </draggable>
</template>
<script setup>
import useAppStore from "@/store/AppStore";
import uploadPSD from "@/functions/uploadPSD";
import { computed } from "vue";
import LayersItem from "./LayersItem.vue";
import Draggable from "vuedraggable";
const appStore = useAppStore();
const displayModal = (type) => {
  appStore.appState.new.type = type;
  appStore.appState.isModalOpen = true;
};

const changeActiveLayer = (index, event) => {
  if (event.target.classList.contains("delete-layer")) return;
  appStore.appState.activeLayer = index;
};

const activeLayer = computed(() => appStore.appState.activeLayer);
</script>
<style scoped>
#layers {
  border: 1px solid #ccc;
  padding: 6px 5px;
  overflow-x: hidden;
  overflow-y: scroll;
  height: calc(100% - 60px);
}

.modal {
  display: block;
}
#buttons {
  margin-bottom: 5px;
  padding: 0;
  display: flex;
}

button.button:last-of-type {
  margin-right: 0;
}
button.button {
  margin-right: 10px !important;
  padding: 1px 7px !important;
}
#layer_items {
  height: 154px;
  overflow-x: scroll;
  overflow-y: clip;
}
</style>
