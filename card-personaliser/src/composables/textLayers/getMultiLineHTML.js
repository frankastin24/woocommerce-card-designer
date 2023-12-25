export default (layer) => {
  return layer.multiLineHTML == "" ? "<div></div>" : layer.multiLineHTML;
};
