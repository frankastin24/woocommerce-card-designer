import { useAppState } from "@/stores/appState";
import translateVerticalTextALign from "@/composables/textLayers/translateVerticalTextALign";
export default (layer) => {
  const appState = useAppState();
  return {
    width: Math.floor(layer.width * appState.cardScale) + "px",
    height: Math.floor(layer.height * appState.cardScale) + "px",
    top: Math.floor(layer.y * appState.cardScale) + "px",
    left: Math.floor(layer.x * appState.cardScale) + "px",
    fontSize: Math.floor(layer.fontSize * appState.cardScale) + "px",
    fontFamily: layer.fontFamily,
    textAlign: layer.horizontalTextAlign,
    color: layer.color,
    alignItems: translateVerticalTextALign(layer.verticalTextAlign),
  };
};
