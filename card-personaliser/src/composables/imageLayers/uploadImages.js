import axios from "axios";
import newImage from "@/composables/newImage";
import addUploadedImages from "@/composables/mutations/addUploadedImages";
export default async (event) => {
  const images = await new Promise(async (resolve, reject) => {
    const files = event.target.files;
    const images = [];
    for (const file of files) {
      const fileSize = file.size;

      const extension = file.name.substr(file.name.lastIndexOf(".") + 1);
      const validExtensions = [
        "jpg",
        "jpeg",
        "png",
        "gif",
        "PNG",
        "JPG",
        "JPEG",
      ];
      if (!validExtensions.includes(extension)) {
        return alert("File is not an image.");
      }
      const form = new FormData();
      form.append("image", file);
      form.append("nonce", FACardDesigner.nonce);
      form.append("action", "upload_images");
      let res;
      try {
        res = await axios.post(FACardDesigner.ajaxurl, form);
      } catch (error) {
        // Handle errors
        console.log(error);
        reject();
      }
      const imageObject = await newImage(res.data.url);
      images.push({
        url: 'url("' + res.data.url + '")',
        object: imageObject,
      });
    }
    resolve(images);
  });

  addUploadedImages(images);
};
