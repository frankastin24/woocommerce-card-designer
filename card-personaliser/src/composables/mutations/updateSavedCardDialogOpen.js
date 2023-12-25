import { useAppState } from "@/stores/appState";
export default (value) => {
  const appState = useAppState();
  appState.isSavedCardDialog = value;
};
