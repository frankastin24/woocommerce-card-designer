import { useAppState } from "@/stores/appState";
import isInputVisible from "@/composables/textLayers/isInputVisible";
export default (layer, viewIndex, view) => {
  const appState = useAppState();
  return {
    width: Math.floor(layer.width * appState.cardScale) + "px",
    fontSize: Math.floor(layer.fontSize * appState.cardScale) + "px",
    fontFamily: layer.fontFamily + " !important",
    textAlign: layer.horizontalTextAlign,
    color: layer.color,
    opacity: isInputVisible(layer, viewIndex, view),
    outline: "none",
  };
};
