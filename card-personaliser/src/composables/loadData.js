import { useAppState } from "@/stores/appState";
import { useCardStore } from "@/stores/cardStore";

import newImage from "@/composables/newImage";
import updateLocalStorage from "@/composables/updateLocalStorage";

import loadLayers from "@/composables/loadLayers";
import updateSavedCardDialogOpen from "@/composables/mutations/updateSavedCardDialogOpen";

const loadUploadedImages = async () => {
  const appState = useAppState();
  const cardStore = useCardStore();
  appState.uploadedImages = localStorage.getItem("uploadedImages")
    ? JSON.parse(localStorage.getItem("uploadedImages"))
    : [];

  for (const [index, uploadedImage] of appState.uploadedImages.entries()) {
    try {
      const imageObject = await newImage(
        uploadedImage.url.match(/(http?:\/\/[^ ]*)"\)/)[1]
      );
      uploadedImage.object = imageObject;
    } catch (e) {
      console.error(e);

      appState.uploadedImages.splice(index, 1);

      cardStore.views.forEach((view) => {
        view.layers.forEach((layer) => {
          if (layer.uploadedImageIndex == index)
            layer.uploadedImageIndex = null;
        });
      });

      updateLocalStorage();
    }
  }
};
const loadCardData = () => {
  const cardStore = useCardStore();
  const appState = useAppState();
  const cardName = window.location.href.split("/").splice(-2, 1);

  appState.localData = localStorage.getItem("faCardDesignerData")
    ? JSON.parse(localStorage.getItem("faCardDesignerData"))
    : {};

  const cardJSON = appState.localData[cardName]
    ? appState.localData[cardName]
    : JSON.parse(FACardDesigner.JSONData);

  if (appState.localData[cardName]) {
    appState.cardData = JSON.parse(FACardDesigner.JSONData);

    updateSavedCardDialogOpen(true);
  }

  cardStore.views = cardJSON.views;
  cardStore.width = cardJSON.width;
  cardStore.height = cardJSON.height;
};

export default () => {
  loadCardData();
  loadLayers();
  loadUploadedImages();
};
