import axios from "axios";
const uploadImageURI = (dataURI, isFeatured, fileName) => {
  return new Promise(async (resolve, reject) => {
    const blobData = dataURItoBlob(dataURI);
    const form = new FormData();
    form.append(
      "image",
      blobData,
      fileName.replace(/ /g, "_").toLowerCase() + ".png"
    );
    form.append("action", "upload_card_image");
    form.append("nonce", FACardDesigner.nonce);
    form.append("isFeatured", isFeatured);
    let res;
    try {
      res = await axios.post(FACardDesigner.ajaxurl, form);
      resolve(res);
    } catch (error) {
      // Handle errors
      console.log(error);
    }
  });
};
const dataURItoBlob = (dataURI) => {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataURI.split(",")[0].indexOf("base64") >= 0)
    byteString = atob(dataURI.split(",")[1]);
  else byteString = unescape(dataURI.split(",")[1]);

  // separate out the mime component
  var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
};
export default uploadImageURI;
