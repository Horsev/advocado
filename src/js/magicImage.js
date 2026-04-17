const ANIMATION_CLASS_PREFIX = 'magicImage--';
const MAGIC_IMAGE_STORAGE_KEY = 'magicImageLastShown';
const DEFAULT_ANIMATION = 'magicImageReveal';

const getTodayKey = () => new Date().toLocaleDateString('en-CA');

let shown = false;

const setImageSrc = (el, imageUrl) => {
  const img = el.querySelector('img');
  if (img && imageUrl) img.src = imageUrl;
};

export default function showMagicImage(imageUrl, animationName = DEFAULT_ANIMATION) {
  const today = getTodayKey();
  if (localStorage.getItem(MAGIC_IMAGE_STORAGE_KEY) === today) return;
  if (shown) return;

  const el = document.getElementById('magicImage');
  if (!el) return;

  setImageSrc(el, imageUrl);
  localStorage.setItem(MAGIC_IMAGE_STORAGE_KEY, today);
  shown = true;
  el.style.display = 'block';
  el.classList.add(`${ANIMATION_CLASS_PREFIX}${animationName}`);
}
