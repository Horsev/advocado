import { sortByKey, keysEmojiToString } from "../utils";

const id = "sales-team";

const AVATARS = {
  "Іван Поставной": "i/f81.png",
  "Максим Ковалевський": "i/f97.png",
};

const LEGEND = [
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
];

const th = [
  "",
  "Name",
  "Leads",
  "Deals",
  "Demo",
  "Success",
  "Total",
  "Average",
  { sorted: true, name: "ARR" },
];

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
    ARR,
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
    value: amountSuccessDeals,
  },
  {
    type: "currency",
    value: averageAmountSuccessDeals,
  },
  { type: "currency", value: ARR },
];

export const mapper = ({ managers }) => ({
  id,
  th,
  rows: managers.sort(sortByKey("successDeals")).map(parser),
  avatars: AVATARS,
  legend: LEGEND,
});

export default mapper;
