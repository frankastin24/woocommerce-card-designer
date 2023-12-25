import { useAppState } from "@/stores/appState";
import { useCardStore } from "@/stores/cardStore";
import renderCanvas from "@/composables/renderCanvas";
export default () => {
  const appState = useAppState();
  const cardStore = useCardStore();
  if (
    cardStore.views[appState.activeView].activeLayer != null &&
    cardStore.views[appState.activeView].layers[
      cardStore.views[appState.activeView].activeLayer
    ].type === "image"
  ) {
    appState.isMouseDown = false;

    const doRenderCanvase = appState.isEditing;

    appState.isEditing = false;

    if (doRenderCanvase) renderCanvas();
  }
};
