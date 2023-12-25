import { useAppState } from "@/stores/appState";
import { useCardStore } from "@/stores/cardStore";
import updateImageOptionsOpen from "@/composables/mutations/updateImageOptionsOpen";
import updateTextOptionsOpen from "@/composables/mutations/updateTextOptionsOpen";
import updateImageAjustmentsOpen from "@/composables/mutations/updateImageAjustmentsOpen";
import closeTextOptions from "@/composables/mutations/closeTextOptions";
import renderCanvas from "@/composables/renderCanvas";
import updateLocalStorage from "@/composables/updateLocalStorage";
export default (layer, viewIndex) => {
  const appState = useAppState();
  const cardStore = useCardStore();
  if (layer === null) {
    cardStore.views[appState.activeView].activeLayer = null;
    renderCanvas();
    return;
  }
  if (viewIndex != appState.activeView) return;

  if (cardStore.views[appState.activeView].activeLayer == layer.index) return;
  cardStore.views[appState.activeView].activeLayer = layer.index;

  if (layer.type == "image") {
    updateImageOptionsOpen(true);
    updateTextOptionsOpen(false);
    appState.isEditing = false;
  } else {
    appState.isEditing = true;
    layer.hasChanged = true;

    updateImageOptionsOpen(false);

    if (layer.showTextOptions) {
      updateTextOptionsOpen(true);
    }
  }
  renderCanvas();
  updateLocalStorage();

  updateImageAjustmentsOpen(false);
  closeTextOptions("");
};
