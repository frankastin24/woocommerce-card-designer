import { useAppState } from "@/stores/appState";
import { useCardStore } from "@/stores/cardStore";

export default (option) => {
  const appState = useAppState();
  const cardStore = useCardStore();
  return cardStore.views[appState.activeView].layers[
    cardStore.views[appState.activeView].activeLayer
  ][option];
};
