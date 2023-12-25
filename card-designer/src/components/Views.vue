<template>
  <button class="button" @click.prevent="displayModal">Add View</button>
  <draggable
    id="views"
    v-if="appStore.card.views.length > 0"
    v-model="appStore.card.views"
    group="views"
    item-key="index"
    @start="drag = true"
    @end="drag = false"
  >
    <template #item="{ element, index }">
      <ViewsItem
        @mouseup="changeActiveView(index, $event)"
        :class="activeView === index ? 'activeView' : ''"
        :view="element"
        :index="index"
      >
      </ViewsItem>
    </template>
  </draggable>
</template>
<script setup>
import useAppStore from "@/store/AppStore";
import ViewsItem from "./ViewsItem.vue";
import Draggable from "vuedraggable";

import { computed } from "vue";
const appStore = useAppStore();

const displayModal = () => {
  appStore.appState.new.type = "view";
  appStore.appState.isModalOpen = true;
};
const activeView = computed(() => appStore.appState.activeView);
const changeActiveView = (index, event) => {
  if (event.target.classList.contains("delete-view")) return;
  appStore.appState.activeView = index;

  if (appStore.card.views[appStore.appState.activeView].layers.length == 0) {
    appStore.appState.activeLayer = null;
  } else {
    appStore.appState.activeLayer = 0;
  }
};
</script>
<style scoped>
#views {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  overflow-x: scroll;
}
</style>
