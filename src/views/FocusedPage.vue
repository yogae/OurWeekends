<template>
  <div id="container">

  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { store } from "../store";
import { SingleImageObject } from "../lib/obj/singleImageObject";

let clickedImageSrc: string;
store.watch(
  function(state, getters) {
    return state.clickedImage;
  }, function (value, oldValue) {
    clickedImageSrc = value as string;
  }
);


@Component
export default class FocusedPage extends Vue {
  private imageObjects: SingleImageObject[]
  constructor() {
    super();
    this.imageObjects = [
      new SingleImageObject(
        { w:500, h: 400 }, 
        { offsetX: 100, offsetY: 100},
        clickedImageSrc
      )
    ]
  }

  mounted() {
    const container = document.getElementById('container') as HTMLDivElement;
    this.imageObjects.forEach((figure) => {
      figure.addTo(container);
    });
    this.imageObjects.forEach((figure) => {
      figure.addTo(container);
    });

  }
}
</script>

<style scoped>
  #container {
    background-color: #347;
    width: 100%;
    height: 100%;
    margin: 0px;
    padding: 0px;
    position: relative; /* fixed or static */
  }
</style>