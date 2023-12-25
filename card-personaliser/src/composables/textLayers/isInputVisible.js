import { useAppState } from "@/stores/appState";
export default (layer, viewIndex, view) => {
  const appState = useAppState();
  return appState.activeView == viewIndex &&
    view.activeLayer == layer.index &&
    appState.isEditing
    ? 1
    : 0;
};
