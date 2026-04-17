export const log = (data) => {
  // Check if we are in development mode
  if (process.env.NODE_ENV !== 'development') return;
  // eslint-disable-next-line no-console
  console.log('🥑 Advocado:', data);
};

const isNonEmptyWord = (word) => word.length > 0;

const capitalizeWordForTitleCase = (word) => {
  if (word.length === 0) return '';
  const [firstCharacter, ...remainingCharacters] = word;
  return `${firstCharacter.toUpperCase()}${remainingCharacters.join('').toLowerCase()}`;
};

export const toTitleCase = (phrase) => {
  const words = phrase.split(' ').filter(isNonEmptyWord);
  return words.map(capitalizeWordForTitleCase).join(' ');
};

export const getColor = (grades, colors) => (percent) => {
  const defaultColor = colors[0];

  return grades.reduce(
    (acc, grade, idx) => (percent > grade ? colors[idx + 1] : acc),
    defaultColor,
  );
};

const COMPARE_SORT_LESS = -1;
const COMPARE_SORT_GREATER = 1;

export const sortByKey = (key) => (a, b) => {
  if (a[key] === b[key]) return 0;
  return a[key] > b[key] ? COMPARE_SORT_LESS : COMPARE_SORT_GREATER;
};

export const sumByKey = (key) => (acc, val) => acc + val[key];

const RANDOMIZER_CENTER = 0.5;

export const randomizer = () => Math.random() - RANDOMIZER_CENTER;

export const toUKCurrency = (amount) =>
  amount.toLocaleString('uk', {
    style: 'currency',
    currency: 'UAH',
    maximumFractionDigits: 0,
  });

export const keysEmojiToString = (obj) =>
  Object.keys(obj)
    .filter((key) => obj[key])
    .join('');

export default {
  getColor,
  sortByKey,
  sumByKey,
  toUKCurrency,
  keysEmojiToString,
  randomizer,
  toTitleCase,
  log,
};
