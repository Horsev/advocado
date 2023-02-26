export { getLocalStorage, setLocalStorage };

async function getLocalStorage(key) {
  let data;
  try {
    data = JSON.parse(localStorage[key]);
  } catch (e) {}
  return data;
}

const setLocalStorage = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));
