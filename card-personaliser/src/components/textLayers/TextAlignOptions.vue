<template>
  <div>
    <h4>Text Align</h4>
    <h5 class="close" @click="updateTextAlignOpen(false)"><Cross /></h5>
    <h5>Horizontal</h5>
    <div class="text-alignment-container">
      <div
        :class="
          checkIfSelected('horizontalTextAlign', 'left') ? 'selected' : ''
        "
        @click="updateLayerOption('horizontalTextAlign', 'left')"
        class="text-alignment"
      >
        <TextAlignHorizontalLeft />
      </div>
      <div
        :class="
          checkIfSelected('horizontalTextAlign', 'center') ? 'selected' : ''
        "
        @click="updateLayerOption('horizontalTextAlign', 'center')"
        class="text-alignment"
      >
        <TextAlignHorizontalCenter />
      </div>
      <div
        :class="
          checkIfSelected('horizontalTextAlign', 'right') ? 'selected' : ''
        "
        @click="updateLayerOption('horizontalTextAlign', 'right')"
        class="text-alignment"
      >
        <TextAlignHorizontalRight />
      </div>
    </div>
    <h5>Verical</h5>
    <div class="text-alignment-container">
      <div
        :class="checkIfSelected('verticalTextAlign', 'top') ? 'selected' : ''"
        @click="updateLayerOption('verticalTextAlign', 'top')"
        class="text-alignment"
      >
        <TextAlignVerticalTop />
      </div>
      <div
        :class="
          checkIfSelected('verticalTextAlign', 'center') ? 'selected' : ''
        "
        @click="updateLayerOption('verticalTextAlign', 'center')"
        class="text-alignment"
      >
        <TextAlignVerticalCenter />
      </div>
      <div
        :class="
          checkIfSelected('verticalTextAlign', 'bottom') ? 'selected' : ''
        "
        @click="updateLayerOption('verticalTextAlign', 'bottom')"
        class="text-alignment"
      >
        <TextAlignVerticalBottom />
      </div>
    </div>
  </div>
</template>
<script setup>
import Cross from "@/components/svg/Cross.vue";
import TextAlignHorizontalLeft from "@/components/svg/TextAlignHorizontalLeft.vue";
import TextAlignHorizontalCenter from "@/components/svg/TextAlignHorizontalCenter.vue";
import TextAlignHorizontalRight from "@/components/svg/TextAlignHorizontalRight.vue";
import TextAlignVerticalBottom from "@/components/svg/TextAlignVerticalBottom.vue";
import TextAlignVerticalCenter from "@/components/svg/TextAlignVerticalCenter.vue";
import TextAlignVerticalTop from "@/components/svg/TextAlignVerticalTop.vue";
import updateLayerOption from "@/composables/mutations/updateLayerOption";
import updateTextAlignOpen from "@/composables/mutations/updateTextAlignOpen";
import checkIfSelected from "@/composables/checkIfSelected";
</script>
<style scoped>
h4 {
  margin-bottom: 20px;
}
h5 {
  margin-bottom: 5px;
}
.text-alignment-container {
  display: flex;
  margin-bottom: 10px;
}
.text-alignment {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid rgb(163, 163, 163);
  width: 48px;
  height: 48px;
  margin-right: 10px;
  border-radius: 8px;
  cursor: pointer;
}

div.selected {
  background-color: rgb(204, 221, 244);
  border: 2px solid rgb(0, 84, 200);
}
</style>
