import { useAppState } from "@/stores/appState";
export default (index) => {
  const appState = useAppState();
  return appState.activeView == index ? "activeNavView" : "";
};
