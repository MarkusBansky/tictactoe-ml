import Vue from "vue";
import MainContent from "./views/main-content.vue";
import { Main } from "./scripts/main";

let MainComponent = Vue.extend(MainContent);
new MainComponent().$mount("#body");

let main = new Main();
main.ready();