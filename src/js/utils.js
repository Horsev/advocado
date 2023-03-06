export {
  getColor,
  byKey,
  toUKCurrency,
  keysEmojiToString,
  randomizer,
};

const getColor =
  (grades, colors) => (percent) => {
    const defaultColor = colors[0];

    return grades.reduce(
      (acc, grade, idx) =>
        percent > grade
          ? colors[idx + 1]
          : acc,
      defaultColor
    );
  };

const byKey = (key) => (a, b) =>
  a[key] > b[key] ? -1 : 1;

const randomizer = () =>
  Math.random() - 0.5;

const toUKCurrency = (amount) =>
  amount.toLocaleString("uk", {
    style: "currency",
    currency: "UAH",
    maximumFractionDigits: 0,
  });

const keysEmojiToString = (obj) =>
  Object.keys(obj)
    .filter((key) => obj[key])
    .join("");
