import { createApp } from "vue";
import App from "./App.vue";

import "./scss/styles.sass";

const prefersScheme = window.matchMedia(
  "(prefers-color-scheme: dark)"
);

const autoTheme = true;

autoTheme &&
  (function setTheme() {
    const currentTheme =
      prefersScheme.matches
        ? "dark"
        : "light";

    document.documentElement.setAttribute(
      "data-bs-theme",
      currentTheme
    );
  })();

createApp(App).mount("#app");
