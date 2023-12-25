<template>
  <header id="card-personliser-header">
    <a class="back-to-shop" :href="shopPageURL">&lt; Back To Shop</a>
    <form
      method="post"
      :action="previewURL"
      enctype="application/x-www-form-urlencoded"
    >
      <input type="hidden" name="previewURLs" :value="appState.previewURLs" />
      <input
        type="submit"
        value="Preview"
        @click.prevent="generatePreviewData"
        class="preview"
      />
    </form>
  </header>
</template>
<script setup>
import { ref } from "vue";
import { useAppState } from "@/stores/appState";
const appState = useAppState();
const shopPageURL = ref(FACardDesigner.shoppageurl);
const previewURL = ref(window.location.href + "?preview=true");
import generatePreviewData from "@/composables/generatePreviewData";
</script>
<style>
header {
  height: 64px;
  background: #fff;
  display: flex;
  align-items: center;
  box-shadow: rgba(0, 32, 77, 0.15) 0px 1px 4px 0px;
}
.back-to-shop {
  color: rgb(206, 51, 86);
  margin-left: 20px;
  font-size: 18px;
}
form {
  margin-left: auto;
}
.preview {
  color: rgb(255, 255, 255);
  background-color: rgb(206, 51, 86);
  padding: 12px 24px;
  box-shadow: rgba(0, 32, 77, 0.15) 0px 1px 4px 0px;
  border-radius: 8px !important;
  border: 2px solid rgb(206, 51, 86);
  transition: background-color 150ms linear 0s, box-shadow 150ms linear 0s;
  text-decoration: none;
  cursor: pointer;
  margin-right: 20px;
  font-size: 18px;
  border: none;
}
.preview:hover {
  border-color: rgb(211, 71, 103);
  color: rgb(255, 255, 255);
  background-color: rgb(211, 71, 103);
}
@media screen and (max-height: 800px) {
  header {
    height: 50px;
  }
  .back-to-shop {
    font-size: 14px;
  }
  .preview {
    font-size: 15px;
    padding: 10px 20px;
  }
}
</style>
