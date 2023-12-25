<template>
  <nav>
    <div
      @click="changeActiveView('prev')"
      class="nav-icon nav-prev"
      :class="isNavDirectionDisabled('prev')"
    >
      <ArrowPrev />
    </div>
    <div
      v-for="(view, index) in cardStore.views"
      @click="updateActiveView(index)"
      class="nav-view"
      :class="isNavViewActive(index)"
      :style="{
        width: cardStore.width * 0.12 * appState.cardScale + 'px',
        height: cardStore.height * 0.12 * appState.cardScale + 'px',
        backgroundImage: `url('${view.canvasRender}')`,
      }"
    ></div>
    <div
      @click="changeActiveView('next')"
      class="nav-icon nav-next"
      :class="isNavDirectionDisabled('next')"
    >
      <ArrowNext />
    </div>
  </nav>
</template>
<script setup>
import ArrowPrev from "@/components/svg/ArrowPrev.vue";
import ArrowNext from "@/components/svg/ArrowNext.vue";
import { useAppState } from "@/stores/appState";
import { useCardStore } from "@/stores/cardStore";
import updateActiveView from "@/composables/mutations/updateActiveView";
import changeActiveView from "@/composables/navigation/changeActiveView";
import isNavViewActive from "@/composables/navigation/isNavViewActive";
import isNavDirectionDisabled from "@/composables/navigation/isNavDirectionDisabled";
const appState = useAppState();
const cardStore = useCardStore();
</script>
<style>
nav {
  height: 120px;
  background: #fff;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  box-shadow: rgba(0, 32, 77, 0.15) 0px 1px 4px 0px;
}
.nav-view {
  background-size: 100% auto;
  background-color: #fff;
  margin-right: 10px;
  cursor: pointer;
  outline: rgb(137, 145, 157) solid 1px;
}
div.activeNavView {
  outline: rgb(206, 51, 86) solid 2px;
  z-index: 1;
}
.nav-icon {
  cursor: pointer;
}
.nav-icon:hover path {
  fill: rgb(206, 51, 86);
}
.nav-icon.disabled:hover path {
  fill: #000;
}
.nav-icon.disabled {
  opacity: 0.5;
  cursor: default;
}

.nav-prev {
  margin-right: 40px;
}
.nav-next {
  margin-left: 30px;
}
@media screen and (max-height: 800px) {
  nav {
    height: 90px;
  }
  .nav-icon svg {
    width: 21px;
    height: 21px;
  }
  .nav-prev {
    margin-right: 30px;
  }
  .nav-next {
    margin-left: 20px;
  }
}
</style>
