<template>
  <div class="card">
    <div class="img-container">
      <img
        v-if="
          appStore.viewRenders[view.name] &&
          appStore.viewRenders[view.name] != ''
        "
        :src="appStore.viewRenders[view.name]"
        alt=""
      />
    </div>
    <input @keypress.prevent.enter="" v-model="view.name" class="card-title" />

    <img @click="deleteView" width="15" class="delete-view" :src="binIconURL" />
  </div>
</template>
<script setup>
import { ref } from "vue";
import useAppStore from "@/store/AppStore";

const { view, index } = defineProps(["view", "index"]);
const binIconURL = ref(FACardDesigner.assetsURL + "/img/bin.png");
const appStore = useAppStore();
const deleteView = () => {
  if (index == appStore.appState.activeView) {
    appStore.appState.activeView = appStore.card.views.length - 2;
  }

  if (appStore.card.views.length == 1) {
    appStore.appState.activeView = null;
  }
  appStore.deleteView(index);
};
</script>

<style scoped>
.card {
  padding: 0;
  margin-right: 10px;
  margin-top: 0px;
  margin-bottom: 10px;
  cursor: pointer;
  width: 100px;
  min-width: 100px !important;
  height: 100px;
}
.card.activeView {
  background: #ccc;
}
.img-container {
  width: calc(100% - 10px);
  overflow: hidden;
  margin-top: 4px;
  margin-left: 5px;
  margin-right: 15px;
  height: 73px;
  opacity: 0.8;
}
.img-container img {
  width: 100%;
}
.card-title {
  text-align: left;
  font-size: 15px;
  margin-top: 2px;
  background: transparent;
  border: 0;
  font-weight: 500;
  width: 100%;
  text-align: center;
}

.card-body {
  padding: 0;
}
.delete-view {
  position: absolute;
  top: 12px;
  right: 9px;
  font-size: 18px;
  cursor: pointer;
  font-style: normal;
}

.delete-view:hover {
  opacity: 0.5;
}
</style>
