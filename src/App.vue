<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Vuex from "vuex";

@Component
export default class App extends Vue { }
</script>

<style>
body {
  height: 100%;
  margin: 0px;
  -ms-overflow-style: none;
}
/* body::-webkit-scrollbar {
  display: none;
} */
html {
  scroll-behavior: smooth;
  height: 100%;
  margin: 0;
}

</style>
