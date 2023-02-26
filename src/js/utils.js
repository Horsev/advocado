export { getColor };

const getColor = (grades, colors) => (percent) => {
  const defaultColor = colors[0];

  return grades.reduce(
    (acc, grade, idx) => (percent > grade ? colors[idx + 1] : acc),
    defaultColor
  );
};
