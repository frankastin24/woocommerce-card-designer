import getLayerOption from "@/composables/getLayerOption";
export default (key, value) => {
  return value == getLayerOption(key);
};
