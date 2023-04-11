import { createApp } from "vue";
import App from "./App.vue";

import "./scss/styles.sass";

const autoTheme = true;

autoTheme &&
  (function setTheme() {
    const darkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const currentTheme = darkScheme.matches ? "dark" : "light";
    const HTML = document.documentElement;

    HTML.setAttribute("data-bs-theme", currentTheme);
  })();

createApp(App).mount("#app");
