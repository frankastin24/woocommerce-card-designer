<template>
  <div class="card">
    <div class="img-container">
      <img
        v-if="(layer.imageURL != '' && layer.imageURL) || layer.type === 'text'"
        :src="
          layer.imageURL != '' && layer.imageURL ? layer.imageURL : textIconURL
        "
        alt=""
      />
    </div>
    <input @keypress.prevent.enter="" v-model="layer.name" class="card-title" />

    <img
      @click="deleteLayer"
      class="delete-layer"
      width="15"
      :src="binIconURL"
    />
  </div>
</template>
<script setup>
import { ref } from "vue";
import useAppStore from "@/store/AppStore";

const { layer, index } = defineProps(["layer", "index"]);
const textIconURL = ref(FACardDesigner.assetsURL + "/img/text.png");
const binIconURL = ref(FACardDesigner.assetsURL + "/img/bin.png");
const appStore = useAppStore();
const deleteLayer = () => {
  appStore.deleteLayer(index);
  if (index == appStore.appState.activeLayer) {
    if (appStore.card.views[appStore.appState.activeView].layers.length > 0) {
      appStore.appState.activeLayer = 0;
    } else {
      appStore.appState.activeLayer = null;
    }
  }
};
</script>

<style scoped>
.card {
  padding: 0;
  margin-right: 10px;
  margin-top: 0px;
  margin-bottom: 10px;
  cursor: pointer;
  min-width: 90% !important;
  display: flex;
  align-items: flex-start;
  height: 54px;
}
.card.activeLayer {
  background: #ccc;
}
.img-container {
  width: 20%;
  overflow: hidden;
  margin-top: 4px;
  margin-left: 5px;
  margin-right: 15px;
  height: 45px;
  display: flex;
  align-items: center;
}
.img-container img {
  width: 100%;
}
.card-title {
  text-align: left;
  font-size: 15px;
  margin-top: 16px;
  background: transparent;
  border: 0;
  font-weight: 500;
  width: 58%;
}

.card-body {
  padding: 0;
}
.delete-layer {
  position: absolute;
  top: 12px;
  right: 9px;
  font-size: 18px;
  cursor: pointer;
  font-style: normal;
}
.delete-layer:hover {
  opacity: 0.5;
}
</style>
