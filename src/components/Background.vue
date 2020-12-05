<template>
  <div id="container">
    <div id="bg-1"/>
    <div id="bg-2"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Figure } from "../lib/obj/figureObject";
import { ImageObject } from "../lib/obj/imageObject";
import { EventBus } from '../lib/eventBus';
import { ScrollStatus } from '../constant/status';
import { WindowManager } from '../lib/windowManager';

const windowManager = new WindowManager();
const incheonImageMap = new Map();
incheonImageMap.set(ScrollStatus.PART_1, require('@/assets/incheon1.jpg'));
incheonImageMap.set(ScrollStatus.PART_2, require('@/assets/incheon2.jpg'));

@Component
export default class Background extends Vue {
  private figures: Figure[]
  private imageObjects: ImageObject[]
  constructor() {
    super();
    this.figures = [
      new Figure({ w:500, h: 400 }, { offsetX: 100, offsetY: 600}, 0.8),
      new Figure({ w:50, h: 50 }, { offsetX: 1300, offsetY: 100}, 0.01),
      new Figure({ w:200, h: 150 }, { offsetX: 1500, offsetY: 300}, 0.1),
      new Figure({ w:500, h: 400 }, { offsetX: 1000, offsetY: 1000}, 0.1),
    ];

    this.imageObjects = [
      new ImageObject(
        { w:250, h: 200 }, 
        { offsetX: 300, offsetY: 200},
        0.1,
        incheonImageMap
      )
    ]
  }

  mounted() {
    const container = document.getElementById('container') as HTMLDivElement;
    this.figures.forEach((figure) => {
      figure.addTo(container);
    });
    this.imageObjects.forEach((figure) => {
      figure.addTo(container);
    });


    const figures = this.figures;
    const images = this.imageObjects;
    EventBus.$on('scroll', (sx: number, sy: number) => {
      windowManager.startAnimation(sx, sy, figures.concat(images as any));
    });
    
    this.$store.watch(
      function(state, getters) {
        return state.scrollStatus
      }, function (value, oldValue) {
        figures.forEach((figure) => {
          if (value === ScrollStatus.PART_1) figure.changeColor('red');
          else if(value === ScrollStatus.PART_2) figure.changeColor('blue');
        });
        images.forEach((img) => {
          img.changeImage(value);
        })
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#container {
  background-color: #FFF;
  width: auto;
  height: 4000px;
  margin: 0px;
  padding: 0px;
  position: static; /* fixed or static */
}

#bg-1 {
  background-color: #347;
  width: auto;
  height: 2000px;
  margin: 0px;
  padding: 0px;
  border: none;
}
#bg-2 {
  background-color: #703;
  width: auto;
  height: 2000px;
  margin: 0px;
  padding: 0px;
  border: none;
}
</style>
