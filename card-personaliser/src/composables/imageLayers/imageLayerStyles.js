import { useAppState } from "@/stores/appState";
const isOverlay = (layer, view) => {
  console.log(layer.uploadedImageIndex);
  return (
    (view.activeLayer != layer.index &&
      layer.uploadedImageIndex != null &&
      view.activeLayer != null) ||
    layer.uploadedImageIndex == null ||
    layer.uploadedImageIndex == undefined
  );
};
export default (layer, view) => {
  const appState = useAppState();
  return {
    width: Math.floor(layer.width * appState.cardScale) + "px",
    height: Math.floor(layer.height * appState.cardScale) + "px",
    top: Math.floor(layer.y * appState.cardScale) + "px",
    left: Math.floor(layer.x * appState.cardScale) + "px",
    background: isOverlay(layer, view)
      ? "rgba(255, 255, 255, 0.5)"
      : "transparent",
  };
};
