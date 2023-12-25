import { useAppState } from "@/stores/appState";

export default (layer, viewIndex, view) => {
  const appState = useAppState();
  return appState.activeView == viewIndex &&
    view.activeLayer == layer.index &&
    (layer.uploadedImageIndex == null || view.activeLayer != layer.index)
    ? "active"
    : "";
};
