import { useAppState } from "@/stores/appState";
export default (except) => {
  const appState = useAppState();
  const textOptions = [
    "isTextColorOptions",
    "isTextAlignOptions",
    "isTextFontOptions",
    "isTextSizeOptions",
  ];
  const filteredArray = textOptions.filter((option) => {
    return option != except;
  });
  filteredArray.forEach((option) => {
    appState[option] = false;
  });
};
