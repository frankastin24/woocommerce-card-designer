import { useAppState } from "@/stores/appState";
import { useCardStore } from "@/stores/cardStore";
import updateActiveView from "@/composables/mutations/updateActiveView";
export default (dir) => {
  const appState = useAppState();
  const cardStore = useCardStore();
  if (dir == "prev") {
    if (appState.activeView - 1 == -1) return;
    updateActiveView(appState.activeView - 1);
  }
  if (dir == "next") {
    if (appState.activeView + 1 == cardStore.views.length) return;
    updateActiveView(appState.activeView + 1);
  }
};
