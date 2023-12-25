import { useAppState } from "@/stores/appState";
import closeTextOptions from "@/composables/mutations/closeTextOptions";
export default (value) => {
  const appState = useAppState();
  appState.isTextFontOptions = value;
  if (value == true) closeTextOptions("isTextFontOptions");
};
