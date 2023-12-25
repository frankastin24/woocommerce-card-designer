import { defineStore } from "pinia";
const useAppStore = defineStore("appStore", {
  state: () => ({
    card: {
      height: 740,
      width: 540,
      views: [],
    },
    appState: {
      isModalOpen: false,
      activeLayer: null,
      activeView: null,
      JSONDataInputElement: false,
      new: {
        name: "",
        type: "",
      },
      imagesLoading: true,
    },
    viewRenders: {},
  }),
  actions: {
    addView(view) {
      this.card.views.push(view);
    },
    deleteView(index) {
      this.card.views.splice(index, 1);
      this.viewRenders.splice(index, 1);
    },
    addLayer(layer) {
      this.card.views[this.appState.activeView].layers.push(layer);
    },
    deleteLayer(index) {
      this.card.views[this.appState.activeView].layers.splice(index, 1);
    },
  },
});

export default useAppStore;
