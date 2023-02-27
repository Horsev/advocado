export { getColor, byKey, toUKCurrency };

const getColor = (grades, colors) => (percent) => {
  const defaultColor = colors[0];

  return grades.reduce(
    (acc, grade, idx) => (percent > grade ? colors[idx + 1] : acc),
    defaultColor
  );
};

const byKey = (key) => (a, b) => a[key] > b[key] ? -1 : 1;

const toUKCurrency = (amount) => {
  return amount.toLocaleString("uk", {
    style: "currency",
    currency: "UAH",
    maximumFractionDigits: 0,
  });
};
