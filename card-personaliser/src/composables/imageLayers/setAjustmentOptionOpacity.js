import { useAppState } from "@/stores/appState";
import { useCardStore } from "@/stores/cardStore";
export default () => {
  const appState = useAppState();
  const cardStore = useCardStore();
  return cardStore.views[appState.activeView].layers[
    cardStore.views[appState.activeView].activeLayer
  ].uploadedImageIndex != null
    ? 1
    : 0.5;
};
