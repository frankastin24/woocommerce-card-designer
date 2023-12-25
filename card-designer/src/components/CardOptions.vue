<template>
  <div class="card-options">
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">Card Width :</span>
      <input
        type="text"
        class="form-control"
        aria-label="Card Width"
        aria-describedby="basic-addon1"
        v-model="appStore.card.width"
      />
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">Card Height :</span>
      <input
        type="text"
        class="form-control"
        aria-label="Card Height"
        aria-describedby="basic-addon1"
        v-model="appStore.card.height"
      />
    </div>
  </div>
</template>
<script setup>
import useAppStore from "@/store/AppStore";
const appStore = useAppStore();
</script>
<style scoped>
.card-options {
  width: 90%;
  display: flex;
}
.input-group.mb-3 {
  width: 47%;
}
</style>
