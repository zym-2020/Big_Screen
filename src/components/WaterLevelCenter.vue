<template>
  <div class="water-level-center">
    <div class="content"></div>
    <div class="border1"></div>
    <div class="border2"></div>
    <div class="border3"></div>
    <div class="border4"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "@/css/border.css";
export default defineComponent({
  setup() {},
});
</script>

<style lang="scss" scoped>
.water-level-center {
  z-index: 99;
  position: absolute;
  width: 28vw;
  height: 20vh;
  border: 1px solid #3486da;
}
</style>