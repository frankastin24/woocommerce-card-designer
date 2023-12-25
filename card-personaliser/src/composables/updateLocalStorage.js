import { useAppState } from "@/stores/appState";
import { useCardStore } from "@/stores/cardStore";
export default () => {
  const cardStore = useCardStore();
  const appState = useAppState();
  localStorage.setItem(
    "uploadedImages",
    JSON.stringify(appState.uploadedImages)
  );

  const cardName = window.location.href.split("/").splice(-2, 1);

  appState.localData[cardName] = cardStore;

  localStorage.setItem(
    "faCardDesignerData",
    JSON.stringify(appState.localData)
  );
};
