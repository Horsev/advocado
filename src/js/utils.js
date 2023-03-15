export const log = (data) => {
  // Check if we are in development mode
  if (process.env.NODE_ENV !== "development") return;
  // eslint-disable-next-line no-console
  console.log("🥑 Advocado:", data);
};

export const toTitleCase = (string) =>
  string
    .split(" ")
    .map(
      ([first, ...rest]) =>
        `${first.toUpperCase()}${rest.join("").toLowerCase()}`
    )
    .join(" ");

export const getColor = (grades, colors) => (percent) => {
  const defaultColor = colors[0];

  return grades.reduce(
    (acc, grade, idx) => (percent > grade ? colors[idx + 1] : acc),
    defaultColor
  );
};

export const byKey = (key) => (a, b) => a[key] > b[key] ? -1 : 1;

export const randomizer = () => Math.random() - 0.5;

export const toUKCurrency = (amount) =>
  amount.toLocaleString("uk", {
    style: "currency",
    currency: "UAH",
    maximumFractionDigits: 0,
  });

export const keysEmojiToString = (obj) =>
  Object.keys(obj)
    .filter((key) => obj[key])
    .join("");

export default {
  getColor,
  byKey,
  toUKCurrency,
  keysEmojiToString,
  randomizer,
  toTitleCase,
  log,
};
