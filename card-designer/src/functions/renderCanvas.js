import useAppStore from "@/store/AppStore";
import measureText from "@/functions/measureText";
import { nextTick } from "vue";
const renderCanvas = (view, canvasContext, canvasElement, index) => {
  nextTick(() => {
    const appStore = useAppStore();
    canvasContext.clearRect(0, 0, appStore.card.width, appStore.card.height);
    if (!view || !view.layers) return;
    view.layers.forEach((layer, layerIndex) => {
      if (layer.type == "image") {
        if (layer.imageObject)
          canvasContext.drawImage(layer.imageObject, layer.x, layer.y);
      } else {
        canvasContext.font = `${layer.fontWeight} ${layer.fontSize}px ${layer.fontFamily}`;
        canvasContext.fillStyle = layer.color;
        canvasContext.textAlign = layer.horizontalTextAlign;

        const lines = layer.text.split("\n");

        const fullTextDimensions = measureText(
          layer.fontSize,
          layer.fontFamily,
          layer.text
        );
        fullTextDimensions.singleLineHeight =
          fullTextDimensions.singleLineHeight * 0.7;

        let newX = layer.x;
        let newY = layer.y;

        if (layer.horizontalTextAlign === "center") {
          newX = layer.x + layer.width / 2;
        }
        if (layer.horizontalTextAlign === "right") {
          newX = layer.x + layer.width;
        }
        if (layer.verticalTextAlign === "center") {
          newY = layer.y + layer.height / 2 - fullTextDimensions.height / 2;
        }
        if (layer.verticalTextAlign === "bottom") {
          newY = layer.y + layer.height - fullTextDimensions.height;
        }
        lines.forEach((line, lineIndex) => {
          canvasContext.fillText(
            line,
            newX,
            newY +
              fullTextDimensions.singleLineHeight +
              lineIndex * (layer.lineHeight + layer.fontSize)
          );
        });
      }
    });
    appStore.viewRenders[view.name] =
      canvasElement.value.toDataURL("image/png");

    if (appStore.appState.activeLayer != null) {
      const activeLayer =
        appStore.card.views[index].layers[appStore.appState.activeLayer];
      canvasContext.beginPath();
      canvasContext.rect(
        activeLayer.x,
        activeLayer.y,
        activeLayer.width,
        activeLayer.height
      );
      canvasContext.stroke();
    }
  });
};
export default renderCanvas;
