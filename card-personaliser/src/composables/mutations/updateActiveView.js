import { useAppState } from "@/stores/appState";
import { useCardStore } from "@/stores/cardStore";
import calculateTransforms from "@/composables/calculateTransforms";
import updateImageOptionsOpen from "@/composables/mutations/updateImageOptionsOpen";
import updateTextOptionsOpen from "@/composables/mutations/updateTextOptionsOpen";
import renderCanvas from "@/composables/renderCanvas";
export default (index) => {
  const appState = useAppState();
  const cardStore = useCardStore();
  if (appState.activeView == index) return;
  updateImageOptionsOpen(false, false);
  updateTextOptionsOpen(false);
  cardStore.views[appState.activeView].activeLayer = null;
  appState.isEditing = false;
  renderCanvas();
  appState.activeView = index;
  calculateTransforms();
};
