import measureText from "@/composables/measureText";
const calculateFontSize = (layer, text) => {
  const lineDimensions = measureText(layer.fontSize, layer.fontFamily, [text]);

  if (lineDimensions.width > layer.width) {
    layer.fontSize = layer.fontSize - 1;
    calculateFontSize(layer, text);
  }
  if (lineDimensions.width < layer.width - 40) {
    if (layer.fontSize + 1 > 110) return;
    layer.fontSize = layer.fontSize + 1;
    calculateFontSize(layer, text);
  }
};

export default calculateFontSize;
