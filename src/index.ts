import Vue from "vue";
import MainContent from "./views/main-content.vue";
import "./scripts/main";

let MainComponent = Vue.extend(MainContent);
new MainComponent().$mount("#body");