import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";


import "./assets/scss/main.scss";

import "bootstrap-icons/font/bootstrap-icons.css";

import { fadeGroup } from "./directives/fadeGroup";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.directive("fade-group", fadeGroup);

app.mount("#app");
