<template>
  <div class="saved-card-dialog-background">
    <div class="saved-card-dialog">
      <div>
        <Information />
      </div>
      <div>
        <h3>Continue your creation</h3>
        <p>We have retrieved your personalised design.</p>
        <div>
          <button @click="updateSavedCardDialogOpen(false)">Continue</button>
          <button @click="discardSavedCard()">Discard Changes</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Information from "@/components/svg/Information.vue";
import updateSavedCardDialogOpen from "@/composables/mutations/updateSavedCardDialogOpen";
import discardSavedCard from "@/composables/discardSavedCard";
</script>
<style>
.saved-card-dialog-background {
  position: absolute;
  z-index: 9999;
  top: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.saved-card-dialog {
  padding: 40px;
  background: #fff;
  border-radius: 8px;
  border: 2px solid rgb(206, 51, 86);
  display: flex;
}
.saved-card-dialog div:last-of-type {
  padding-left: 5px;
}
.saved-card-dialog h3 {
  color: rgb(206, 51, 86);
  font-size: 24px;
  margin-bottom: 3px;
}
.saved-card-dialog p {
  color: rgb(206, 51, 86);
  font-size: 18px;
  margin-bottom: 8px;
}
.saved-card-dialog button {
  padding: 7px 13px;
  border-radius: 6px;
  font-size: 22px;
  cursor: pointer;
  border: 2px solid rgb(206, 51, 86);
}
.saved-card-dialog button:first-of-type {
  margin-right: 11px;

  background-color: rgb(206, 51, 86);

  color: #fff;
}
.saved-card-dialog button:last-of-type {
  color: rgb(206, 51, 86);
  background: #fff;
}
</style>
