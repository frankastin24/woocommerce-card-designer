<template>
  <div :id="`${slug}-metabox`" class="postbox">
    <div class="postbox-header">
      <h2 class="hndle ui-sortable-handle">{{ props.title }}</h2>
      <div class="handle-actions hide-if-no-js">
        <button
          type="button"
          class="handle-order-higher"
          aria-disabled="false"
          :aria-describedby="`${slug}-metabox-handle-order-higher-description`"
        >
          <span class="screen-reader-text">Move up</span
          ><span
            class="order-higher-indicator"
            aria-hidden="true"
          ></span></button
        ><span
          class="hidden"
          id="{{slug}}-metabox-handle-order-higher-description"
          >Move Card Designer box up</span
        ><button
          type="button"
          class="handle-order-lower"
          aria-disabled="false"
          aria-describedby="{{slug}}-metabox-handle-order-lower-description"
        >
          <span class="screen-reader-text">Move down</span
          ><span
            class="order-lower-indicator"
            aria-hidden="true"
          ></span></button
        ><span
          class="hidden"
          id="{{slug}}-metabox-handle-order-lower-description"
          >Move Card Designer box down</span
        ><button type="button" class="handlediv" aria-expanded="true">
          <span class="screen-reader-text">Toggle panel: Card Designer</span
          ><span class="toggle-indicator" aria-hidden="true"></span>
        </button>
      </div>
    </div>
    <div class="inside">
      <slot></slot>
    </div>
  </div>
</template>
<script setup>
const props = defineProps(["title"]);
const slug = slugify(props.title);

function slugify(str) {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaeeeeiiiioooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return str;
}
</script>
