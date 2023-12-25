<template>
  <svg
    aria-hidden="true"
    width="100%"
    height="40"
    shape-rendering="crispEdges"
    cursor="ew-resize"
    class="sc-doWzTn jKEbgH"
  >
    <defs>
      <linearGradient id="fade-left">
        <stop offset="0%" stop-color="rgba(255, 255, 255, 1)"></stop>
        <stop offset="100%" stop-color="rgba(255, 255, 255, 0)"></stop>
      </linearGradient>
      <linearGradient id="fade-right">
        <stop offset="0%" stop-color="rgba(255, 255, 255, 0)"></stop>
        <stop offset="100%" stop-color="rgba(255, 255, 255, 1)"></stop>
      </linearGradient>
    </defs>
    <g data-testid="dashes" ref="dashesElement" transform="translate(-100 0)">
      <rect
        :x="n * 9"
        y="8"
        width="2"
        v-for="n in 100"
        height="24"
        :fill="n % 8 == 0 ? '#6C7584' : '#E2E3E6'"
      ></rect>
    </g>
    <rect
      class="fade-left"
      x="0"
      y="0"
      width="120"
      height="40"
      fill="url(#fade-left)"
    ></rect>
    <rect
      class="fade-right"
      x="148"
      y="0"
      width="120"
      height="40"
      fill="url(#fade-right)"
    ></rect>
    <rect
      class="middle-dash"
      x="132"
      y="0"
      height="40"
      width="4"
      fill="#CE3356"
    ></rect>
  </svg>
</template>
<script setup>
import { ref } from "vue";
import { useAppState } from "@/stores/appState";
const appState = useAppState();
const props = defineProps(["index"]);
const dashesElement = ref(null);
appState.dashesElements[props.index] = dashesElement;
</script>
