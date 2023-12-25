import { useAppState } from "@/stores/appState";
import updateImageAjustmentsOpen from "@/composables/mutations/updateImageAjustmentsOpen";
export default (value) => {
  const appState = useAppState();
  appState.isImageLibrary = value;
  if (value == true) updateImageAjustmentsOpen(false);
};
