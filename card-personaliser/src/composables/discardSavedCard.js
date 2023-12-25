import { useAppState } from "@/stores/appState";
import { useCardStore } from "@/stores/cardStore";
import updateSavedCardDialogOpen from "@/composables/mutations/updateSavedCardDialogOpen";
import updateLocalStorage from "@/composables/updateLocalStorage";
import loadLayers from "@/composables/loadLayers";

export default () => {
  const cardStore = useCardStore();
  const appState = useAppState();
  console.log(appState.cardData.views);
  cardStore.views = appState.cardData.views;

  loadLayers();

  updateSavedCardDialogOpen(false);
  updateLocalStorage();
};
