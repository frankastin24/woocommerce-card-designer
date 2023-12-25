<template>
  <div>
    <h4>Text Size</h4>
    <h5 class="close" @click="updateTextSizeOpen(false)"><Cross /></h5>
    <ul class="text-sizes">
      <li
        v-for="textSize in textSizes"
        @click="updateLayerOption('fontSize', textSize)"
        :class="checkIfSelected('fontSize', textSize) ? 'selected' : ''"
        class="text-size"
      >
        <span>{{ textSize }}</span>
      </li>
    </ul>
  </div>
</template>
<script setup>
import Cross from "@/components/svg/Cross.vue";
import updateLayerOption from "@/composables/mutations/updateLayerOption";
import updateTextSizeOpen from "@/composables/mutations/updateTextSizeOpen";
import checkIfSelected from "@/composables/checkIfSelected";
const textSizes = [12, 14, 18, 20, 25, 30, 35, 40, 45, 50, 60];
</script>
<style>
.text-sizes {
  margin-top: 16px;
  display: flex;
}
.text-size {
  width: 48px;
  height: 48px;
  border: 2px solid rgb(163, 163, 163);
  border-radius: 8px;
  color: rgb(49, 49, 49);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 6px;
  cursor: pointer;
}
.text-size span {
  font-size: 20px;
  margin-top: -4px;
}
li.selected {
  border: 2px solid rgb(206, 51, 86);
  background: rgb(247 224 229);
}
</style>
