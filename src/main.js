import { createApp } from "vue";
import App from "./App.vue";

import "./scss/styles.sass";

(function setTheme() {
  const currentTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  document.documentElement.setAttribute("data-bs-theme", currentTheme);
})();

createApp(App).mount("#app");
