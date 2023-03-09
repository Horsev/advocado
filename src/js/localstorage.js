import { log } from "./utils";

async function getLocalStorage(key) {
  let data;
  try {
    data = JSON.parse(localStorage[key]);
  } catch (e) {
    log("Error parsing local storage\n", e);
  }
  return data;
}

const setLocalStorage = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));

export { getLocalStorage, setLocalStorage };
