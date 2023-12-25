<template>
  <h4>Photo Library</h4>
  <h5 class="close" @click="updateImageLibraryOpen(false)"><Cross /></h5>
  <ul>
    <li>
      <label class="uploaded-image" for="upload-image"
        ><Add />
        <p>Add<br />Photos</p></label
      ><input
        id="upload-image"
        v-show="false"
        type="file"
        @change="uploadImages"
        multiple
      />
    </li>
    <li
      class="uploaded-image"
      v-for="(image, index) in appState.uploadedImages"
      :style="{ backgroundImage: image.url }"
      :class="isUploadedImageActive(index)"
      @click="updateActiveUploadedImage(index, $event)"
    >
      <div class="overlay"></div>
      <div @click="deleteUploadedImage(index)" class="delete">
        <Bin class="bin" />
      </div>
      <div class="tick"><Tick /></div>
    </li>
  </ul>
</template>
<script setup>
import uploadImages from "@/composables/imageLayers/uploadImages";
import Cross from "@/components/svg/Cross.vue";
import Add from "@/components/svg/Add.vue";
import Bin from "@/components/svg/Bin.vue";
import Tick from "@/components/svg/Tick.vue";
import { useAppState } from "@/stores/appState";

import updateImageLibraryOpen from "@/composables/mutations/updateImageLibraryOpen";
import updateActiveUploadedImage from "@/composables/mutations/updateActiveUploadedImage";
import deleteUploadedImage from "@/composables/mutations/deleteUploadedImage";
import isUploadedImageActive from "@/composables/imageLayers/isUploadedImageActive";
const appState = useAppState();
</script>
<style>
ul {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
li {
  margin-bottom: 30px;
}
label.uploaded-image {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 126px;
  height: 126px;
  border: 2px solid rgb(206, 51, 86);
  text-align: center;
  border-radius: 10px;
  cursor: pointer;
}
label.uploaded-image p {
  color: rgb(206, 51, 86);
}
label.uploaded-image svg {
  width: 25px;
  height: 25px;
  border: 2px solid rgb(206, 51, 86);
  border-radius: 100%;
  margin-bottom: 5px;
}
.uploaded-image {
  width: 126px;
  height: 126px;
  border-radius: 10px;
  background-size: cover;
  background-position: center;
  position: relative;
  cursor: pointer;
}
.uploaded-image .delete {
  position: absolute;
  bottom: -18px;
  left: 44px;
  background: #f9f9f9;
  border-radius: 100%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
li.active .overlay {
  border: 2px solid rgb(206, 51, 86);
  position: absolute;
  height: 100%;
  width: 100%;
  border-radius: 10px;
}
.uploaded-image .delete svg {
  width: 33px;
  height: 33px;
}
.uploaded-image .delete:hover svg {
  width: 33px;
  height: 33px;
  opacity: 0.7;
}

.uploaded-image .tick {
  position: absolute;
  right: 6px;
  bottom: 6px;
  width: 28px;
  height: 28px;
  border-radius: 100%;
  pointer-events: none;
  background-color: rgb(206, 51, 86);
  border: 2px solid #fff;
  align-items: center;
  justify-content: center;
  display: none;
}
li.active .tick {
  display: flex;
}
.uploaded-image .tick svg {
  width: 16px;
  height: 16px;
}
.uploaded-image .tick svg polyline {
  stroke: #fff;
  stroke-width: 3;
}
@media screen and (max-width: 1160px) {
  ul {
    justify-content: flex-start;
    height: 145px;
    overflow-x: scroll;
  }
  li {
    margin-right: 20px;
  }
}
</style>
