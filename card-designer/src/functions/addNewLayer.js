import useAppStore from "@/store/AppStore";
const addNewLayer = () => {
  const appStore = useAppStore();

  if (appStore.appState.new.type === "image") {
    appStore.appState.new = Object.assign(appStore.appState.new, {
      constrain: true,
      imageURL: "",
      filter: null,
      imageX: 0,
      imageY: 0,
      imageScale: 1,
      imageRotation: 0,
      aspectW: 1,
      aspectH: 1,
      canUserUpload: false,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
    });
  } else {
    appStore.appState.new = Object.assign(appStore.appState.new, {
      text: "",
      fontSize: "16",
      fontWeight: "normal",
      fontFamily: "sans-serif",
      lineHeight: "12",
      color: "#000",
      horizontalTextAlign: "center",
      isMultiLine: false,
      verticalTextAlign: "center",
      width: 0,
      height: 0,
      x: 0,
      y: 0,
    });
  }

  appStore.addLayer(Object.assign({}, appStore.appState.new));

  appStore.appState.new = {
    name: "",
    type: "",
  };
  appStore.appState.isModalOpen = false;
  appStore.appState.activeLayer =
    appStore.card.views[appStore.appState.activeView].layers.length - 1;
};

export default addNewLayer;
