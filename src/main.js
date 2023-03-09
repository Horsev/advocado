import { createApp } from "vue";
import App from "./App.vue";

import "./scss/styles.sass";

const autoTheme = true;

const darkScheme = window.matchMedia("(prefers-color-scheme: dark)");

autoTheme &&
  (function setTheme() {
    const currentTheme = darkScheme.matches ? "dark" : "light";

    document.documentElement.setAttribute("data-bs-theme", currentTheme);
  })();

createApp(App).mount("#app");
