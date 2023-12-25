import { useCardStore } from "@/stores/cardStore";
import { useAppState } from "@/stores/appState";

const calculateOffsets = () => {
  const appState = useAppState();
  appState.viewContainerLeft =
    (window.innerWidth - appState.viewWidth) / 2 -
    (appState.viewWidth + 100) * appState.activeView +
    "px";

  appState.layerOptionsLeft = (window.innerWidth - appState.viewWidth) / 2;
};

const calculateViewsContainerDimensions = () => {
  const cardStore = useCardStore();
  const appState = useAppState();
  const headerHeight = $("header").height();
  const navHeight = $("nav").height();

  const hRatio = window.innerWidth / cardStore.width;
  const vRatio =
    (window.innerHeight - (headerHeight + navHeight + 40)) / cardStore.height;

  const ratio = Math.min(hRatio, vRatio);
  appState.viewWidth = cardStore.width * ratio;
  appState.viewHeight = cardStore.height * ratio;
  appState.cardScale = ratio;
};
export default () => {
  calculateViewsContainerDimensions();
  calculateOffsets();
};
