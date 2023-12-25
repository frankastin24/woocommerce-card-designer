const measureText = (fontSize, fontFamily, text) => {
  const splitText = text.split("\n");

  return splitText.reduce(
    (acc, current) => {
      const d = document.createElement("span");
      d.style.fontSize = fontSize + "px";
      d.style.fontFamily = fontFamily;
      d.textContent = current;
      document.body.appendChild(d);
      acc.height = d.offsetHeight + acc.height;
      acc.singleLineHeight = d.offsetHeight;
      acc.width = d.offsetWidth > acc.width ? d.offsetWidth : acc.width;
      document.body.removeChild(d);
      return acc;
    },
    { height: 0, width: 0, singleLineHeight: 0 }
  );

  //document.body.removeChild(d);
};
export default measureText;
