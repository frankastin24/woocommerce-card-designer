import { useAppState } from "@/stores/appState";
import { useCardStore } from "@/stores/cardStore";
export default (view, viewIndex) => {
  const appState = useAppState();
  const cardStore = useCardStore();
  if (
    appState.activeView == viewIndex &&
    view.activeLayer &&
    view.layers[view.activeLayer].type == "text"
  ) {
    appState.isEditing = true;
    if (view.layers[view.activeLayer].isMultiLine) {
      jQuery(".active input").focus();
    } else {
      jQuery(".active > .multiLineText").focus();
    }
  }
};
