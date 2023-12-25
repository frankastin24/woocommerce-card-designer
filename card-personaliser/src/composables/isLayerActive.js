import { useAppState } from "@/stores/appState";
export default (layerIndex, viewIndex, view) => {
  const appState = useAppState();
  return appState.activeView == viewIndex && layerIndex == view.activeLayer;
};
