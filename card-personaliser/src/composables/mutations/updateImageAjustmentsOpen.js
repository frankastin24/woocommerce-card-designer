import { useAppState } from "@/stores/appState";
import { useCardStore } from "@/stores/cardStore";
import updateImageLibraryOpen from "@/composables/mutations/updateImageLibraryOpen";
export default (value) => {
  const appState = useAppState();
  const cardStore = useCardStore();
  if (
    cardStore.views[appState.activeView].activeLayer === null ||
    cardStore.views[appState.activeView].layers[
      cardStore.views[appState.activeView].activeLayer
    ].uploadedImageIndex == null
  )
    return;

  appState.isImageAjustments = value;
  if (value == true) updateImageLibraryOpen(false);
};
