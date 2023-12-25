import { useAppState } from "@/stores/appState";
import updateLayerOption from "@/composables/mutations/updateLayerOption";
export default (event) => {
  const appState = useAppState();
  event.preventDefault();
  if (appState.isMouseDown) {
    const newX = event.clientX - appState.lastX;
    appState.dashesElements[0].value.setAttribute(
      "transform",
      "translate(" + newX + " 0)"
    );
    updateLayerOption("imageRotation", newX);
  }
};
