import { useAppState } from "@/stores/appState";
import updateActiveLayer from "@/composables/mutations/updateActiveLayer";
import closeTextOptions from "@/composables/mutations/closeTextOptions";
export default (value, nullActiveLayer) => {
  const appState = useAppState();
  appState.isTextOptions = value;
  if (value == false) {
    closeTextOptions("");
    if (nullActiveLayer) updateActiveLayer(null);
  }
};
