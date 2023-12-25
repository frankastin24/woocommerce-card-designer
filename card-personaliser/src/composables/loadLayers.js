import renderCanvas from "@/composables/renderCanvas";
import newImage from "@/composables/newImage";
import { useAppState } from "@/stores/appState";
import { useCardStore } from "@/stores/cardStore";
export default async () => {
  //load images
  const appState = useAppState();
  const cardStore = useCardStore();

  for (const [viewIndex, view] of cardStore.views.entries()) {
    view.activeLayer = null;

    for (const [layerIndex, layer] of view.layers.entries()) {
      layer.index = layerIndex;

      if (layer.type === "image") {
        const imageObject = await newImage(layer.imageURL);

        layer.imageObject = imageObject;
      }

      layer.multiLineHTML = "";
      if (layer.type === "text" && layer.isMultiLine) {
        const lines = layer.text.split("\n");
        lines.forEach((line) => {
          layer.multiLineHTML += "<div>" + line + "</div>";
        });
      }
    }

    appState.isFirstRender = true;
    renderCanvas();
    appState.isFirstRender = false;
  }
};
