import { useAppState } from "@/stores/appState";
import { useCardStore } from "@/stores/cardStore";
import measureText from "@/composables/measureText";
const renderCanvas = () => {
  const appState = useAppState();
  const cardStore = useCardStore();

  cardStore.views.forEach((view, viewIndex) => {
    if (!appState.isFirstRender && appState.activeView !== viewIndex) return;
    const canvasContext = appState.canvasContexts[view.name];

    const uploadedImages = appState.uploadedImages;

    if (!canvasContext) return;

    canvasContext.clearRect(0, 0, cardStore.width, cardStore.height);

    view.layers.forEach((layer) => {
      if (layer.type == "image") {
        if (
          layer.uploadedImageIndex != null ||
          layer.uploadedImageIndex != undefined
        ) {
          const uploadedImage = uploadedImages[layer.uploadedImageIndex].object;
          const hRatio = (layer.width / uploadedImage.width) * layer.imageScale;
          const vRatio =
            (layer.height / uploadedImage.height) * layer.imageScale;

          const ratio = Math.max(hRatio, vRatio);

          canvasContext.save();
          canvasContext.beginPath();
          canvasContext.moveTo(layer.x, layer.y);
          canvasContext.lineTo(layer.x + layer.width, layer.y);
          canvasContext.lineTo(layer.x + layer.width, layer.y + layer.height);
          canvasContext.lineTo(layer.x, layer.y + layer.height);
          canvasContext.lineTo(layer.x, layer.y);
          canvasContext.closePath();
          canvasContext.clip();

          canvasContext.translate(
            layer.x + layer.imageX + layer.width / 2,
            layer.y + layer.imageY + layer.height / 2
          );
          canvasContext.rotate((layer.imageRotation * Math.PI) / 180);

          canvasContext.drawImage(
            uploadedImage,
            -(uploadedImage.width * ratio) / 2,
            -(uploadedImage.height * ratio) / 2,
            uploadedImage.width * ratio,
            uploadedImage.height * ratio
          );
          canvasContext.restore();
        } else {
          canvasContext.drawImage(
            layer.imageObject,
            layer.x,
            layer.y,
            layer.imageObject.width,
            layer.imageObject.height
          );
        }
      } else {
        if (
          appState.activeView == viewIndex &&
          layer.index == cardStore.views[appState.activeView].activeLayer &&
          appState.isEditing
        )
          return;

        canvasContext.font = `${layer.fontWeight} ${layer.fontSize}px ${layer.fontFamily}`;
        canvasContext.fillStyle = layer.color;
        canvasContext.textAlign = layer.horizontalTextAlign;

        const lines = layer.text.split("\n");

        if (layer.hasChanged || appState.isFirstRender) {
          layer.finalLines = [];

          lines.forEach((line) => {
            const words = line.split(" ");
            words.reduce((acc, word, wordIndex) => {
              const testLine =
                words.length - 1 == wordIndex ? acc + word : acc + word + " ";

              const lineDimensions = measureText(
                layer.fontSize,
                layer.fontFamily,
                [testLine]
              );

              if (lineDimensions.width > layer.width) {
                layer.finalLines.push(acc);
                if (words.length - 1 == wordIndex) {
                  layer.finalLines.push(word);
                }
                return word + " ";
              }

              if (words.length - 1 == wordIndex) {
                layer.finalLines.push(acc + word);
              }

              return acc + word + " ";
            }, "");
          });

          layer.fullTextDimensions = measureText(
            layer.fontSize,
            layer.fontFamily,
            layer.finalLines
          );
          if (!layer.isMultiLine) {
            layer.fullTextDimensions.height =
              layer.fullTextDimensions.height * 0.7;
            layer.fullTextDimensions.singleLineHeight =
              layer.fullTextDimensions.singleLineHeight * 0.7;
          }
          layer.hasChanged = false;
        }

        let newX = layer.x;
        let newY = layer.y;

        if (layer.horizontalTextAlign === "center") {
          newX = layer.x + layer.width / 2;
        }
        if (layer.horizontalTextAlign === "right") {
          newX = layer.x + layer.width;
        }

        if (layer.verticalTextAlign === "center" || !layer.isMultiLine) {
          newY = layer.y + (layer.height - layer.fullTextDimensions.height) / 2;
        }
        if (layer.verticalTextAlign === "bottom") {
          newY = layer.y + layer.height - layer.fullTextDimensions.height;
        }

        layer.finalLines.forEach((line, lineIndex) => {
          canvasContext.fillText(
            line,
            newX,
            newY +
              layer.fullTextDimensions.singleLineHeight +
              lineIndex * (layer.lineHeight + layer.fontSize)
          );
        });
      }

      if (appState.canvas[view.name] && !appState.isEditing) {
        view.canvasRender = appState.canvas[view.name].toDataURL("image/png");
      }
    });
  });
};

export default renderCanvas;
