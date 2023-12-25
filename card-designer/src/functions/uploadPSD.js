import { readPsd } from "ag-psd";
import useAppStore from "@/store/AppStore";
import newImage from "@/functions/newImage";
import uploadImageURI from "@/functions/uploadImageURI";
import measureText from "@/functions/measureText";

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
const uploadPSD = async (event) => {
  const file = event.target.files[0];

  const result = await file.arrayBuffer();
  const psd = readPsd(result);
  const appStore = useAppStore();
  let newLayers = [];
  for (const layer of psd.children) {
    let newLayer;
    if (layer.text) {
      const textDimensions = measureText(
        layer.text.style.fontSize,
        "sans-serif",
        layer.text.text
      );
      newLayer = {
        name: layer.name,
        type: "text",
        x: layer.left,
        y: layer.top,
        width: textDimensions.width,
        height: textDimensions.height,
        text: layer.text.text,
        lineHeight: Math.round(layer.text.style.fontSize * 0.85),
        fontSize: layer.text.style.fontSize,
        fontWeight: layer.text.style.fauxBold ? "bold" : "normal",
        fontFamily: "sans-serif",
        color: rgbToHex(
          layer.text.style.fillColor.r,
          layer.text.style.fillColor.g,
          layer.text.style.fillColor.b
        ),
        isMultiLine: false,
        horizontalTextAlign: layer.text.paragraphStyle.justification,
        verticalTextAlign: "top",
      };
    } else {
      //Upload Image
      const dataURI = layer.canvas.toDataURL("image/png");
      const res = await uploadImageURI(dataURI, false, layer.name);
      const imageObject = await newImage(res.data.url);

      newLayer = {
        name: layer.name,
        type: "image",
        x: layer.left,
        y: layer.top,
        width: imageObject.width,
        height: imageObject.height,
        constrain: true,
        imageURL: res.data.url,
        filter: null,
        imageX: 0,
        imageY: 0,
        imageScale: 1,
        imageRotation: 0,
        aspectW: 1,
        aspectH: 1,
        imageObject: imageObject,
        canUserUpload: false,
      };
    }

    newLayers.push(newLayer);
  }
  newLayers.forEach((newLayer) => {
    appStore.addLayer(newLayer);
  });
  appStore.card.width = psd.width;
  appStore.card.height = psd.height;
  appStore.appState.activeLayer = 0;
};

export default uploadPSD;
