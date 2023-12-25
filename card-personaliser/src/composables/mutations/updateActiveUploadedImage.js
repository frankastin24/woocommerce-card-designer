import { useAppState } from "@/stores/appState";
import { useCardStore } from "@/stores/cardStore";
import renderCanvas from "@/composables/renderCanvas";
import updateLocalStorage from "@/composables/updateLocalStorage";
export default (index, event) => {
  if (
    event &&
    (event.target.classList.contains("bin") ||
      event.target.classList.contains("delete"))
  ) {
    return;
  }
  const appState = useAppState();
  const cardStore = useCardStore();
  cardStore.views[appState.activeView].layers[
    cardStore.views[appState.activeView].activeLayer
  ].uploadedImageIndex = index;
  renderCanvas();
  updateLocalStorage();
};
