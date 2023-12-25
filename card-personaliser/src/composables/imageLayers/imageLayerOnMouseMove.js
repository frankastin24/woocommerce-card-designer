import { useAppState } from "@/stores/appState";
import isImageLayerMoveable from "@/composables/imageLayers/isImageLayerMoveable";
import updateLayerOption from "@/composables/mutations/updateLayerOption";
export default (layer, event, view, viewIndex) => {
  const appState = useAppState();
  if (!isImageLayerMoveable(layer, view, viewIndex)) return;

  if (appState.isMouseDown) {
    let newX = 0;
    let newY = 0;
    if (event.clientY > appState.lastCoords[1]) {
      newY = event.clientY - appState.lastCoords[1];
    }
    if (event.clientY < appState.lastCoords[1]) {
      newY = event.clientY - appState.lastCoords[1];
    }
    if (event.clientX > appState.lastCoords[0]) {
      newX = event.clientX - appState.lastCoords[0];
    }
    if (event.clientX < appState.lastCoords[0]) {
      newX = event.clientX - appState.lastCoords[0];
    }

    updateLayerOption("imageX", layer.imageX + newX);
    updateLayerOption("imageY", layer.imageY + newY);

    appState.lastCoords = [event.clientX, event.clientY];
  }
};
