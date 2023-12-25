export default (layer, view) => {
  return layer.uploadedImageIndex != null && view.activeLayer == layer.index
    ? "is-movable"
    : "";
};
