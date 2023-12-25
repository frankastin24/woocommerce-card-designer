import { useCardStore } from "@/stores/cardStore";
import { useAppState } from "@/stores/appState";
import uploadImageFromDataURL from "@/composables/uploadImageFromDataURL";
export default async () => {
  const cardStore = useCardStore();
  const appState = useAppState();
  let imageURLs = [];
  for (const [viewIndex, view] of cardStore.views.entries()) {
    const res = await uploadImageFromDataURL(view.canvasRender);
    imageURLs.push(res.data.url);
  }
  appState.previewURLs = JSON.stringify(imageURLs);
  console.log(appState.previewURLs);
  setTimeout(() => {
    $("form").submit();
  }, 500);
};
