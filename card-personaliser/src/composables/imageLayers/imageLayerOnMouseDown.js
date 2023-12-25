import { useAppState } from "@/stores/appState";
import isImageLayerMoveable from "@/composables/imageLayers/isImageLayerMoveable";
export default (layer, event, view, viewIndex) => {
  const appState = useAppState();
  if (!isImageLayerMoveable(layer, view, viewIndex)) return;
  appState.isEditing = true;
  appState.isMouseDown = true;
  appState.lastCoords = [event.clientX, event.clientY];
};
