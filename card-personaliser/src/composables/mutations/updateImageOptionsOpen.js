import { useAppState } from "@/stores/appState";
import updateImageLibraryOpen from "@/composables/mutations/updateImageLibraryOpen";
import updateImageAjustmentsOpen from "@/composables/mutations/updateImageAjustmentsOpen";
import updateActiveLayer from "@/composables/mutations/updateActiveLayer";
export default (value, nullActiveLayer) => {
  const appState = useAppState();
  appState.isImageOptions = value;
  updateImageLibraryOpen(false);
  updateImageAjustmentsOpen(false);
  if (nullActiveLayer) {
    updateActiveLayer(null);
  }
};
