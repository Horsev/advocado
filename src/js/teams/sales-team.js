import { byKey, keysEmojiToString } from "../utils";

const AVATARS = {
  "Иван Поставной": "i/f81.png",
  "Максим Ковалевский": "i/f97.png",
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
  { sorted: true, name: "Success" },
  "Total",
  "Average",
  "ARR",
];

const getArchivments = (idx, managers) => {
  const highFiver =
    managers.sort(byKey("successDeals"))[0].name === managers[idx].name;

  const cashCow =
    managers.sort(byKey("averageAmountSuccessDeals"))[0].name ===
    managers[idx].name;

  const growthHacker =
    managers
      .map(({ name, successDeals, deals }) => ({
        name,
        growth: successDeals / deals,
      }))
      .sort(byKey("growth"))[0].name === managers[idx].name;

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
  managers
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
  th,
  rows: managers.sort(byKey("successDeals")).map(parser),
  avatars: AVATARS,
  legend: LEGEND,
  id: "sales-team",
});

export default mapper;
