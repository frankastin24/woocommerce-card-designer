import { useAppState } from "@/stores/appState";
export default (event) => {
  const appState = useAppState();
  appState.isEditing = true;
  event.preventDefault();
  appState.lastX = event.clientX;
  appState.isMouseDown = true;
};
