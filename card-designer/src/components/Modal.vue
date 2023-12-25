<template>
  <div>
    <div class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Add
              {{ newType }}
            </h5>
            <button
              type="button"
              class="btn-close"
              @click="appStore.appState.isModalOpen = false"
              aria-label="Close"
            >
              ✖
            </button>
          </div>
          <div class="modal-body">
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1"
                >{{ newType }} Name :
              </span>
              <input
                @keypress.prevent.enter="addNew"
                v-model="appStore.appState.new.name"
                type="text"
                class="form-control"
                aria-label="layerNAme"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              @click="addNew"
              class="button button-primary button-large"
            >
              Add {{ appStore.appState.new.type }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop"></div>
  </div>
</template>
<script setup>
import useAppStore from "@/store/AppStore";
import addNewLayer from "@/functions/addNewLayer";

import { computed } from "vue";
const appStore = useAppStore();
const newType = computed(() => {
  return (
    appStore.appState.new.type.charAt(0).toUpperCase() +
    appStore.appState.new.type.slice(1)
  );
});
const addNew = () => {
  if (appStore.appState.new.name.trim() === "") {
    alert("Please add a name");
    return;
  }
  if (appStore.appState.new.type === "view") {
    appStore.addView(Object.assign({ layers: [] }, appStore.appState.new));
    appStore.appState.activeLayer = null;
    appStore.appState.new = {
      name: "",
      type: "",
    };
    appStore.appState.isModalOpen = false;
    appStore.appState.activeView = appStore.card.views.length - 1;
  } else {
    addNewLayer();
  }
};
</script>
<style scoped>
.modal.show {
  display: block;
}
.modal-backdrop {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0px;
  z-index: 9998;
}
.modal {
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0px;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-dialog {
  width: 600px;
  background: #fff;
  padding: 20px;
  position: relative;
}
button.btn-close {
  background: none;
  border: none;
  position: absolute;
  top: 10px;
  right: 20px;
  cursor: pointer;
}
button.btn-close:hover {
  opacity: 0.7;
}
.modal-title {
  font-size: 29px;
  margin: 0px 0px;
  margin-bottom: 24px;
}
.input-group-text {
  font-size: 14px;
  padding-left: 0px;
}
.button-primary {
  margin-top: 10px !important;
}
</style>
