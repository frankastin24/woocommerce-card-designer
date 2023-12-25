import { useAppState } from "@/stores/appState";
import closeTextOptions from "@/composables/mutations/closeTextOptions";
export default (value) => {
  const appState = useAppState();
  appState.isTextSizeOptions = value;
  if (value == true) closeTextOptions("isTextSizeOptions");
};
