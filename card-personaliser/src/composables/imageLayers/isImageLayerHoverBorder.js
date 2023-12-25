import { useAppState } from "@/stores/appState";
export default (layer, viewIndex, view) => {
  const appState = useAppState();
  return view.activeLayer == layer.index || appState.activeView != viewIndex
    ? ""
    : "hover-border";
};
