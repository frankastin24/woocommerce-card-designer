import axios from "axios";
import newImage from "@/functions/newImage";
import useAppStore from "@/store/AppStore";
const uploadImage = async (event) => {
  const appStore = useAppStore();
  const fileName = event.target.value;
  const file = event.target.files[0];
  const fileSize = file.size;
  const extension = fileName.substr(fileName.lastIndexOf(".") + 1);
  const validExtensions = ["jpg", "jpeg", "png", "gif", "PNG", "JPG", "JPEG"];
  if (!validExtensions.includes(extension)) {
    return alert("File is not an image.");
  }
  const form = new FormData();
  form.append("image", file);
  form.append("nonce", FACardDesigner.nonce);
  form.append("action", "upload_card_image");
  let res;
  try {
    res = await axios.post(FACardDesigner.ajaxurl, form);
  } catch (error) {
    // Handle errors
    console.log(error);
  }
  const imageObject = await newImage(res.data.url);
  appStore.card.views[appStore.appState.activeView].layers[
    appStore.appState.activeLayer
  ].imageObject = imageObject;
  appStore.card.views[appStore.appState.activeView].layers[
    appStore.appState.activeLayer
  ].width = imageObject.width;
  appStore.card.views[appStore.appState.activeView].layers[
    appStore.appState.activeLayer
  ].height = imageObject.height;
  appStore.card.views[appStore.appState.activeView].layers[
    appStore.appState.activeLayer
  ].imageURL = imageObject.src;
};

export default uploadImage;
