import { useAppState } from "@/stores/appState";
import closeTextOptions from "@/composables/mutations/closeTextOptions";
export default (value) => {
  const appState = useAppState();
  appState.isTextAlignOptions = value;
  if (value == true) closeTextOptions("isTextAlignOptions");
};
