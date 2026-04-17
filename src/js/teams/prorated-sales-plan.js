const RATIO_TO_PERCENT = 100;

const getCountOfDaysInMonth = (calendarYear, zeroBasedMonthIndex) =>
  new Date(calendarYear, zeroBasedMonthIndex + 1, 0).getDate();

/**
 * Revenue target for one seller from month start through referenceDate,
 * linearly prorated by calendar days in the month.
 */
export const getProratedPersonalPlanTarget = ({ salesPlanPerSeller, referenceDate }) => {
  const calendarYear = referenceDate.getFullYear();
  const zeroBasedMonthIndex = referenceDate.getMonth();
  const dayOfMonth = referenceDate.getDate();
  const daysInMonth = getCountOfDaysInMonth(calendarYear, zeroBasedMonthIndex);

  if (daysInMonth === 0) {
    return 0;
  }

  return (salesPlanPerSeller / daysInMonth) * dayOfMonth;
};

export const getPersonalPlanCompletionPercent = ({
  amountSuccessDeals,
  salesPlanPerSeller,
  referenceDate,
}) => {
  const proratedPersonalTarget = getProratedPersonalPlanTarget({
    salesPlanPerSeller,
    referenceDate,
  });

  if (proratedPersonalTarget === 0) {
    return 0;
  }

  const revenue =
    amountSuccessDeals === undefined || amountSuccessDeals === null ? 0 : amountSuccessDeals;

  return (revenue / proratedPersonalTarget) * RATIO_TO_PERCENT;
};
