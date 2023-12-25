import calculateFontSize from "@/composables/textLayers/calculateFontSize";
import updateLayerOption from "@/composables/mutations/updateLayerOption";
export default (layer, event) => {
  if (layer.isMultiLine) {
    const textEl = event.target;
    let text = textEl.innerHTML;
    if (text.length > 0 && text.indexOf("<div>") > 0) {
      let splitTextDiv = text.split("<div>");
      splitTextDiv[0] = splitTextDiv[0] + "\n";
      text = splitTextDiv.join("");
    }

    text = text.replace(/<div><\/div>/gi, "");
    text = text.replace(/<div[^>]*>/gi, "");
    text = text.replace(/<br>/gi, "");
    text = text.replace(/<div><\/div>/gi, "");
    text = text.replace(/<span[^>]*>/gi, "");
    text = text.replace(/<\/span>/gi, "");

    let splitText = text.split("</div>");
    text = "";
    splitText = splitText.filter((textSection) => {
      return textSection != "";
    });
    splitText.forEach((textSection, splitTextIndex) => {
      if (splitTextIndex != splitText.length - 1) {
        text += textSection + "\n";
      } else {
        text += textSection;
      }
    });

    updateLayerOption("text", text);
  } else {
    calculateFontSize(layer, event.target.value);
    updateLayerOption("text", event.target.value);
  }
};
