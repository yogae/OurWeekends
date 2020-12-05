<template>
  <div>
    <FixedMap />
    <Background />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import FixedMap from "../components/FixedMap.vue";
import Background from "../components/Background.vue";
import { WindowManager } from "../lib/windowManager";

const windowManager = new WindowManager();

@Component({
  components: {
    FixedMap,
    Background
  },
})
export default class ListingPage extends Vue {
  beforeMount() {
    windowManager.scrollEvent();
  }
  beforeDestroy() {
    windowManager.removeScrollEvent();
  }  
}
</script>

<style>
#map-container {
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -250px; /* Negative half of height. */
  margin-left: -250px; /* Negative half of width. */  
}
</style>
