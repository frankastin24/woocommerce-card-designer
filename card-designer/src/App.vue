<template>
  <div
    id="normal-sortables"
    class="card-designer meta-box-sortables ui-sortable"
  >
    <PostboxContainer title="Card Views">
      <Views />
    </PostboxContainer>
    <PostboxContainer
      v-if="appStore.appState.activeView != null"
      ref="layersElement"
      title="View Layers"
    >
      <Layers />
    </PostboxContainer>
    <PostboxContainer title="Card Options">
      <CardOptions></CardOptions>
    </PostboxContainer>
    <PostboxContainer title="Card Stage">
      <div class="stage-container">
        <CardStage></CardStage>
      </div>

      <LayerOptions
        v-if="
          appStore.appState.activeView != null &&
          appStore.appState.activeLayer != null
        "
        ref="layerOptionElement"
      />
    </PostboxContainer>
    <Modal v-show="appStore.appState.isModalOpen" />
    <input
      name="JSON_data"
      id="JSON_data"
      ref="JSONDataInput"
      type="hidden"
      value="[]"
    />
    <input
      name="featuredImageURL"
      id="featuredImageURL"
      ref="featuredImageURLElement"
      type="hidden"
      value=""
    />
  </div>
</template>
<script setup>
import PostboxContainer from "@/Components/PostboxContainer.vue";
import Views from "@/Components/Views.vue";
import Layers from "@/Components/Layers.vue";
import LayerOptions from "@/Components/LayerOptions.vue";
import CardOptions from "@/Components/CardOptions.vue";
import CardStage from "@/Components/CardStage.vue";
import Modal from "@/Components/Modal.vue";
import eventBus from "@/eventBus/eventBus";
import newImage from "@/functions/newImage";
import uploadImageURI from "@/functions/uploadImageURI";
import useAppStore from "@/store/AppStore";
import { watch, ref, onMounted, nextTick } from "vue";
const appStore = useAppStore();
const JSONDataInput = ref(null);
const layerOptionElement = ref(null);
const layersElement = ref(null);
const featuredImageURLElement = ref(null);
appStore.appState.JSONDataInput = JSONDataInput;

const handleScroll = () => {
  jQuery(".layer-options").css({
    width: jQuery(window).width() * 0.18 + "px",
  });
  const stageTop = jQuery("#card-stage-metabox").offset().top;
  const stageBottom =
    stageTop +
    jQuery("#card-stage-metabox").height() -
    (jQuery(".layer-options").height() + 92);
  if (window.scrollY > stageTop && window.scrollY < stageBottom) {
    jQuery(".layer-options").addClass("fixed");
  } else {
    jQuery(".layer-options").removeClass("fixed");
  }
};
window.addEventListener("scroll", handleScroll);
const importJSON = async () => {
  setTimeout(async () => {
    const JSONData = JSON.parse(FACardDesigner.jsonData);
    appStore.card.width = JSONData.width;
    appStore.card.height = JSONData.height;
    appStore.card.views = JSONData.views;
    for (const [viewIndex, view] of appStore.card.views.entries()) {
      if (view.layers.length > 0 && viewIndex == 0) {
        appStore.appState.activeLayer = 0;
      }
      for (const [layerIndex, layer] of view.layers.entries()) {
        if (layer.type === "image") {
          const imageObject = await newImage(layer.imageURL);
          layer.imageObject = imageObject;
        }
      }
    }
    appStore.appState.imagesLoading = false;

    if (appStore.card.views.length > 0) {
      appStore.appState.activeView = 0;
      if (appStore.card.views[appStore.appState.activeView].layers.length > 0) {
        appStore.appState.activeLayer = 0;
      }
    }
  }, 1000);
};
if (FACardDesigner.jsonData != "") {
  importJSON();
} else {
  appStore.appState.imagesLoading = false;
}

watch(
  appStore.card,
  (card) => {
    if (appStore.appState.JSONDataInput) {
      const mappedCard = JSON.parse(JSON.stringify(card));

      mappedCard.views.forEach((view, index) => {
        mappedCard.views[index].layers = view.layers.map((layer) => {
          layer.imageObject = null;
          return layer;
        });
      });
      appStore.appState.JSONDataInput.value = JSON.stringify(mappedCard);
    }
    eventBus.emit("renderCanvas");
    nextTick(() => {
      jQuery("#view-layers-metabox .inside").css(
        "height",
        jQuery("#card-stage-metabox .inside").height() + "px"
      );
      jQuery("#product_catdiv").css(
        "margin-top",
        jQuery("#card-stage-metabox .inside").height() + 98 + "px"
      );
    });
  },
  { deep: true }
);
watch(appStore.appState, () => {
  eventBus.emit("renderCanvas");
});

setTimeout(() => {
  eventBus.emit("renderCanvas");
}, 3000);

jQuery("#post").on("submit", async (e) => {
  const count = Object.keys(appStore.viewRenders).length;
  if (count > 0) {
    if (featuredImageURLElement.value.value == "") {
      e.preventDefault();
      const res = await uploadImageURI(
        appStore.viewRenders[appStore.card.views[0].name],
        true,
        jQuery("#title").val()
      );
      featuredImageURLElement.value.value = res.data.url;
      jQuery("#post").submit();
    }
  }

  return true;
});
onMounted(() => {
  appStore.appState.JSONDataInput.value = JSON.stringify(appStore.card);
  setTimeout(() => {
    jQuery(".layer-options").css({
      width: jQuery(window).width() * 0.18 + "px",
    });
  }, 2000);
});
</script>
<style>
#view-layers-metabox {
  position: absolute;
  width: 280px;
  z-index: 10;
  right: -302px;
  top: 236px;
}
#view-layers-metabox .inside {
  height: 620px;
}
.input-group-text {
  font-size: 14px;
  padding: 5px 10px;
}
.stage-container {
  width: 70%;
}
#card-stage-metabox .inside {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
</style>
