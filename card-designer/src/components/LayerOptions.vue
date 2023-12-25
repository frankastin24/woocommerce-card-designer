<template>
  <div class="layer-options">
    <h1>Layer Options</h1>
    <div class="input-group">
      <span>X :</span>
      <input
        type="number"
        class=""
        placeholder=""
        v-model="
          appStore.card.views[appStore.appState.activeView].layers[
            appStore.appState.activeLayer
          ].x
        "
      />
    </div>
    <div class="input-group">
      <span>Y :</span>
      <input
        type="number"
        class=""
        placeholder=""
        v-model="
          appStore.card.views[appStore.appState.activeView].layers[
            appStore.appState.activeLayer
          ].y
        "
      />
    </div>
    <div class="input-group">
      <span>Width :</span>
      <input
        type="number"
        class=""
        placeholder=""
        v-model="
          appStore.card.views[appStore.appState.activeView].layers[
            appStore.appState.activeLayer
          ].width
        "
      />
    </div>
    <div class="input-group">
      <span>Height :</span>
      <input
        type="number"
        class=""
        placeholder=""
        v-model="
          appStore.card.views[appStore.appState.activeView].layers[
            appStore.appState.activeLayer
          ].height
        "
      />
    </div>
    <div
      v-if="
        appStore.card.views[appStore.appState.activeView].layers[
          appStore.appState.activeLayer
        ].type == 'text'
      "
      class="input-group"
    >
      <span>Font Size :</span>
      <input
        type="number"
        class=""
        placeholder=""
        v-model="
          appStore.card.views[appStore.appState.activeView].layers[
            appStore.appState.activeLayer
          ].fontSize
        "
      />
    </div>
    <div
      v-if="
        appStore.card.views[appStore.appState.activeView].layers[
          appStore.appState.activeLayer
        ].type == 'text'
      "
      class="input-group"
    >
      <span>Line Height :</span>
      <input
        type="number"
        class=""
        placeholder=""
        v-model="
          appStore.card.views[appStore.appState.activeView].layers[
            appStore.appState.activeLayer
          ].lineHeight
        "
      />
    </div>
    <div
      v-if="
        appStore.card.views[appStore.appState.activeView].layers[
          appStore.appState.activeLayer
        ].type == 'text'
      "
      class="input-group"
    >
      <span>Font Color :</span>
      <input
        type="color"
        v-model="
          appStore.card.views[appStore.appState.activeView].layers[
            appStore.appState.activeLayer
          ].color
        "
      />
    </div>
    <div
      v-if="
        appStore.card.views[appStore.appState.activeView].layers[
          appStore.appState.activeLayer
        ].type == 'text'
      "
      class="input-group"
    >
      <span>Font Weight :</span>
      <input
        type="text"
        v-model="
          appStore.card.views[appStore.appState.activeView].layers[
            appStore.appState.activeLayer
          ].fontWeight
        "
      />
    </div>
    <div
      v-if="
        appStore.card.views[appStore.appState.activeView].layers[
          appStore.appState.activeLayer
        ].type == 'text'
      "
      class="input-group"
    >
      <span>Font Family :</span>

      <select
        selected
        v-model="
          appStore.card.views[appStore.appState.activeView].layers[
            appStore.appState.activeLayer
          ].fontFamily
        "
        class="form-select"
        aria-label="Default select example"
      >
        <option v-for="font in fonts" :value="font[1]">{{ font[1] }}</option>
        <option value="sans-serif">Sans Serif</option>
      </select>
    </div>
    <div
      v-if="
        appStore.card.views[appStore.appState.activeView].layers[
          appStore.appState.activeLayer
        ].type == 'text'
      "
      class="input-group"
    >
      <span>Horizontal Text Align :</span>
      <select
        selected
        v-model="
          appStore.card.views[appStore.appState.activeView].layers[
            appStore.appState.activeLayer
          ].horizontalTextAlign
        "
        class="form-select"
        aria-label="Default select example"
      >
        <option value="left">Left</option>
        <option value="center">Center</option>
        <option value="right">Right</option>
      </select>
    </div>
    <div
      v-if="
        appStore.card.views[appStore.appState.activeView].layers[
          appStore.appState.activeLayer
        ].type == 'text'
      "
      class="input-group"
    >
      <span>Vertical Text Align :</span>
      <select
        selected
        v-model="
          appStore.card.views[appStore.appState.activeView].layers[
            appStore.appState.activeLayer
          ].verticalTextAlign
        "
        class="form-select"
        aria-label="Default select example"
      >
        <option value="top">Top</option>
        <option value="center">Center</option>
        <option value="bottom">Bottom</option>
      </select>
    </div>
    <div
      v-if="
        appStore.card.views[appStore.appState.activeView].layers[
          appStore.appState.activeLayer
        ].type == 'text'
      "
      class="input-group"
    >
      <span>Show Text Options :</span>
      <input
        type="checkbox"
        v-model="
          appStore.card.views[appStore.appState.activeView].layers[
            appStore.appState.activeLayer
          ].showTextOptions
        "
      />
    </div>
    <div
      v-if="
        appStore.card.views[appStore.appState.activeView].layers[
          appStore.appState.activeLayer
        ].type == 'text'
      "
      class="input-group"
    >
      <span>Is Multi Line :</span>
      <input
        type="checkbox"
        v-model="
          appStore.card.views[appStore.appState.activeView].layers[
            appStore.appState.activeLayer
          ].isMultiLine
        "
      />
    </div>
    <div
      v-if="
        appStore.card.views[appStore.appState.activeView].layers[
          appStore.appState.activeLayer
        ].type == 'text'
      "
      class="input-group"
    >
      <span>Text :</span>
      <input
        v-if="
          !appStore.card.views[appStore.appState.activeView].layers[
            appStore.appState.activeLayer
          ].isMultiLine
        "
        v-model="
          appStore.card.views[appStore.appState.activeView].layers[
            appStore.appState.activeLayer
          ].text
        "
      />
      <textarea
        v-if="
          appStore.card.views[appStore.appState.activeView].layers[
            appStore.appState.activeLayer
          ].isMultiLine
        "
        v-model="
          appStore.card.views[appStore.appState.activeView].layers[
            appStore.appState.activeLayer
          ].text
        "
      ></textarea>
    </div>
    <div
      v-if="
        appStore.card.views[appStore.appState.activeView].layers[
          appStore.appState.activeLayer
        ].type == 'image'
      "
      class="input-group"
    >
      <span class="image-span">Image :</span>
      <label for="uploadImage" class="button button-primary button-large">
        <i class="fa-solid fa-upload"></i> Upload Image
      </label>
      <input
        type="file"
        id="uploadImage"
        v-show="false"
        @change="uploadImage"
      />
    </div>
    <div
      v-if="
        appStore.card.views[appStore.appState.activeView].layers[
          appStore.appState.activeLayer
        ].type == 'image'
      "
      class="input-group"
    >
      <span>Can User Upload Image :</span>
      <input
        type="checkbox"
        v-model="
          appStore.card.views[appStore.appState.activeView].layers[
            appStore.appState.activeLayer
          ].canUserUpload
        "
      />
    </div>
  </div>
</template>
<script setup>
import useAppStore from "@/store/AppStore";
import uploadImage from "@/functions/uploadImage";
import { ref } from "vue";
const fonts = ref(FACardDesigner.fonts);
const appStore = useAppStore();
</script>
<style scoped>
.layer-options {
  border: 1px solid #ccc;
  width: 34%;
  position: absolute;
  right: 7px;
  padding: 0;
  background: #fff;

  z-index: 10;
}
div.fixed {
  position: fixed;
  top: 92px;
  width: 18%;
  right: 326px;
  background: #fff;
}
.input-group {
  margin-bottom: 5px;
  display: flex;
  align-items: center;
}
.input-group span {
  padding-left: 10px;
  margin-right: 10px;
}
input[type="color"] {
  position: relative;
  height: 32px;
}

input[type="number"],
input[type="text"] {
  width: 87%;
}
.image-span {
  margin-top: 6px;
  display: inline-block;
}
h1 {
  font-size: 14px;
  padding: 8px 12px;
  margin: 0;
  line-height: 1.4;
  font-weight: bold;
}
.input-group span {
  width: 76px;
  display: inline-block;
}
@media (max-width: 1250px) {
  span,
  input[type="number"],
  input[type="text"],
  select {
    font-size: 10px;
    width: 80%;
  }
}
</style>
