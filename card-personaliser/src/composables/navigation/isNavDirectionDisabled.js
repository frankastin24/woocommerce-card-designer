import { useAppState } from "@/stores/appState";
import { useCardStore } from "@/stores/cardStore";
export default (dir) => {
  const appState = useAppState();
  const cardStore = useCardStore();
  if (dir == "prev") {
    return appState.activeView - 1 != -1 ? "" : "disabled";
  }
  if (dir == "next") {
    return appState.activeView + 1 != cardStore.views.length ? "" : "disabled";
  }
};
