const measureText = (fontSize, fontFamily, text) => {
  return text.reduce(
    (acc, current) => {
      const d = document.createElement("div");
      d.style.position = "absolute";
      d.style.width = "1000px";
      const s = document.createElement("span");
      s.style.position = "absolute";
      s.style.top = "0px";
      s.style.fontSize = fontSize + "px";
      s.style.fontFamily = fontFamily;
      s.textContent = current;
      document.body.appendChild(d);
      d.appendChild(s);
      acc.height = s.offsetHeight + acc.height;
      acc.singleLineHeight = s.offsetHeight;
      acc.width = s.offsetWidth > acc.width ? s.offsetWidth : acc.width;
      document.body.removeChild(d);
      return acc;
    },
    { height: 0, width: 0, singleLineHeight: 0 }
  );
};
export default measureText;
