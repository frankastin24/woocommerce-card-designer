import { useAppState } from "@/stores/appState";
import updateActiveUploadedImage from "@/composables/mutations/updateActiveUploadedImage";
export default (images) => {
  const appState = useAppState();
  images.forEach((image) => {
    appState.uploadedImages.push(image);
  });
  updateActiveUploadedImage(appState.uploadedImages.length - 1);
};
