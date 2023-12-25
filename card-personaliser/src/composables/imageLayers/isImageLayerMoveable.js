import { useAppState } from "@/stores/appState";
export default (layer, view, viewIndex) => {
  const appState = useAppState();
  return (
    appState.activeView === viewIndex &&
    layer.uploadedImageIndex != null &&
    view.activeLayer === layer.index
  );
};
