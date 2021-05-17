<template>
  <MainComponent />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MainComponent from "./components/MainComponent.vue";
import {Main} from "@/scripts/main";

export default defineComponent({
  name: "App",
  components: {
    MainComponent,
  },
  mounted() {
    const main = new Main();
    main.ready();
  }
});
</script>

<style lang="scss">
</style>
