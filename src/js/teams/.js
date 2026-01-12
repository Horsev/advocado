import { sortByKey, keysEmojiToString } from "../utils";

// in red, beige and black, fascism, 3 Reich, halftone, comix, world war 2

const config = {
  id: "Sales plan",
  avatars: {
    "Іван Поставной": "i/f81.png",
    "Maksym Pshenichnyi": "i/m.jpg",
    "Vitalii Bykovsky": "i/bv.png",
  },
  legend: [
    {
      icon: "🏆",
      title: "High Fiver",
      description: "The 1st place by Success deals for the last 30 days",
    },
    {
      icon: "🐄",
      title: "Cash Cow",
      description: `Maximum average deals amount for the last 30 days`,
    },
    {
      icon: "🌱",
      title: "Growth Hacker",
      description: "Deals to success convertion",
    },
  ],
  th: [
    "",
    "Name",
    "Leads",
    "Deals",
    "Demo",
    "Success",
    "Average",
    { sorted: true, name: "Total" },
    // { sorted: true, name: "ARR" },
  ],
};

const { id, avatars, legend, th } = config;

const getArchivments = (idx, managers) => {
  const highFiver =
    [...managers].sort(sortByKey("successDeals"))[0].name ===
    managers[idx].name;

  const cashCow =
    [...managers].sort(sortByKey("averageAmountSuccessDeals"))[0].name ===
    managers[idx].name;

  const growthHacker =
    managers
      .map(({ name, successDeals, deals }) => ({
        name,
        growth: successDeals / deals,
      }))
      .sort(sortByKey("growth"))[0].name === managers[idx].name;

  return keysEmojiToString({
    "🏆": highFiver,
    "🐄": cashCow,
    "🌱": growthHacker,
  });
};

const parser = (
  {
    name,
    leads,
    deals,
    demo,
    successDeals,
    amountSuccessDeals,
    averageAmountSuccessDeals,
    // ARR,
  },
  idx,
  managers,
) => [
  {
    type: "avatar",
    name,
  },
  {
    type: "name",
    name,
    archivments: getArchivments(idx, managers),
  },
  leads,
  deals,
  demo,
  successDeals,
  {
    type: "currency",
    value: averageAmountSuccessDeals,
  },
  {
    type: "currency",
    value: amountSuccessDeals,
  },

  // { type: "currency", value: ARR },
];

const getPerformance = (managers) => {
  const salesPlan = 200000;

  const numberOfSellers = managers.length;

  const dateNow = new Date();
  const dayOfTheMounth = dateNow.getDate();

  const teamSalesRevenuePlan = salesPlan * numberOfSellers;

  const numDays = (yearNow, monthNow) =>
    new Date(yearNow, monthNow, 0).getDate();

  const [yearNow, monthNow] = [dateNow.getYear(), dateNow.getMonth()];

  const numOfDaysInCurrentMounth = numDays(yearNow, monthNow);

  const currentRevenuePlan =
    (teamSalesRevenuePlan / numOfDaysInCurrentMounth) * dayOfTheMounth;

  const revenueBySuccessDeals = managers.reduce(
    (acc, { amountSuccessDeals }) => acc + amountSuccessDeals,
    0,
  );

  const teamPerformance = Math.round(
    (revenueBySuccessDeals / currentRevenuePlan) * 100,
  );

  return teamPerformance;
};

export const mapper = ({ managers }) => ({
  id,
  th,
  rows: managers.sort(sortByKey("amountSuccessDeals")).map(parser),
  avatars,
  percent: getPerformance(managers),
  legend,
});

export default mapper;
