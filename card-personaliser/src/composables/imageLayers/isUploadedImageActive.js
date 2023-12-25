import { useAppState } from "@/stores/appState";
import { useCardStore } from "@/stores/cardStore";
export default (index) => {
  const appState = useAppState();
  const cardStore = useCardStore();
  return cardStore.views[appState.activeView].layers[
    cardStore.views[appState.activeView].activeLayer
  ] &&
    cardStore.views[appState.activeView].layers[
      cardStore.views[appState.activeView].activeLayer
    ].uploadedImageIndex === index
    ? "active"
    : "";
};
