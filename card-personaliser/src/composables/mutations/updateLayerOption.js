import { useAppState } from "@/stores/appState";
import { useCardStore } from "@/stores/cardStore";
import renderCanvas from "@/composables/renderCanvas";
import updateLocalStorage from "@/composables/updateLocalStorage";
export default (key, value) => {
  const appState = useAppState();
  const cardStore = useCardStore();

  cardStore.views[appState.activeView].layers[
    cardStore.views[appState.activeView].activeLayer
  ][key] = value;

  updateLocalStorage();

  renderCanvas();
};
