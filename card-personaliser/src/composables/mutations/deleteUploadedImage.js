import { useAppState } from "@/stores/appState";
import { useCardStore } from "@/stores/cardStore";
import renderCanvas from "@/composables/renderCanvas";
import updateLocalStorage from "@/composables/updateLocalStorage";
import axios from "axios";
export default (index) => {
  const appState = useAppState();
  const cardStore = useCardStore();
  cardStore.views.forEach((view) => {
    view.layers.forEach((layer, layerIndex) => {
      if (layer.uploadedImageIndex == index) layer.uploadedImageIndex = null;
    });
  });

  const form = new FormData();
  form.append(
    "image_url",
    appState.uploadedImages[index].url.match(/(http?:\/\/[^ ]*)"\)/)[1]
  );
  form.append("nonce", FACardDesigner.nonce);
  form.append("action", "delete_image");

  axios.post(FACardDesigner.ajaxurl, form);

  appState.uploadedImages.splice(index, 1);
  renderCanvas();
  updateLocalStorage();
};
