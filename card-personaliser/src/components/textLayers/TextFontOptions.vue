<template>
  <div>
    <h4>Text Font</h4>
    <h5 class="close" @click="updateTextFontOpen(false)"><Cross /></h5>
    <ul class="font-familys">
      <li
        v-for="font in fonts"
        @click="updateLayerOption('fontFamily', font[1])"
        :class="checkIfSelected('fontFamily', font[1]) ? 'selected' : ''"
        class="font-family"
      >
        <div class="radio"><div></div></div>
        <span :style="{ fontFamily: font[1] }">{{ font[1] }}</span>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref } from "vue";
import Cross from "@/components/svg/Cross.vue";
import updateLayerOption from "@/composables/mutations/updateLayerOption";
import updateTextFontOpen from "@/composables/mutations/updateTextFontOpen";
import checkIfSelected from "@/composables/checkIfSelected";

const fonts = ref(FACardDesigner.fonts);
</script>
<style scoped>
.font-familys {
  margin-top: 16px;
  display: flex;
}
.font-family {
  width: 100%;
  height: 44px;
  border: 2px solid rgb(163, 163, 163);
  border-radius: 8px;
  color: rgb(49, 49, 49);
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  cursor: pointer;
}
.text-size span {
  font-size: 20px;
  margin-top: -4px;
}
li:hover {
  border: 2px solid rgb(206, 51, 86);
  background: rgb(247 224 229);
}
li.selected {
  background-color: rgb(204, 221, 244);
  border: 2px solid rgb(0, 84, 200);
}
.radio {
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 100%;
  margin: 0px 16px;
}
li.selected .radio {
  border: none;
  background: rgb(0, 84, 200);
}
li.selected .radio > div {
  border: none;
  background: #fff;
  width: 60%;
  height: 60%;
  border-radius: 100%;
}
</style>
