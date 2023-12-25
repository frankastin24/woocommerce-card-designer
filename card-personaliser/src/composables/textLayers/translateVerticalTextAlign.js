export default (align) => {
  switch (align) {
    case "top":
      return "baseline";
      break;
    case "center":
      return "center";
      break;
    case "bottom":
      return "flex-end";
      break;
  }
};
