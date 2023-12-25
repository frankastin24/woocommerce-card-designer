<template>
  <div
    v-for="(view, index) in cardStore.views"
    :style="{
      width: appState.viewWidth + 'px',
      height: appState.viewHeight + 'px',
    }"
    class="view-container"
  >
    <View
      @click="updateActiveView(index)"
      :view="view"
      :viewIndex="index"
      :card="cardStore"
    />
  </div>
</template>
<script setup>
import View from "@/components/View.vue";
import updateActiveView from "@/composables/mutations/updateActiveView";
import { useCardStore } from "@/stores/cardStore";
import { useAppState } from "@/stores/appState";
const cardStore = useCardStore();
const appState = useAppState();
</script>
<style scoped>
.view-container {
  margin-right: 100px;
  margin-top: 15px;
  height: 100vh;
}
.view-container h3 {
  margin-top: 20px;
  text-align: center;
}
@media screen and (max-height: 960px) {
  .view-container {
    height: calc(100vh - 60px) !important;
  }
}
</style>
