import { useAppState } from "@/stores/appState";
import { useCardStore } from "@/stores/cardStore";
import updateLayerOption from "@/composables/mutations/updateLayerOption";
export default (event) => {
  const appState = useAppState();
  const cardStore = useCardStore();
  event.preventDefault();
  if (appState.isMouseDown) {
    const direction = event.clientX > appState.lastX;
    const newScale =
      cardStore.views[appState.activeView].layers[
        cardStore.views[appState.activeView].activeLayer
      ].imageScale + (direction ? 0.05 : -0.05);
    if (newScale <= 0 || newScale >= 4) return;
    appState.dashesElements[1].value.setAttribute(
      "transform",
      "translate(" + newScale * 20 + " 0)"
    );

    updateLayerOption("imageScale", newScale);
    appState.lastX = event.clientX;
  }
};
