import { byKey } from "../utils";

export { mapper };

const AVATARS = {
  "Иван Поставной": "i/f81.png",
  "Максим Ковалевский": "i/f97.png",
};

const legend = [
  {
    icon: "🏆",
    title: "High Fiver",
    description:
      "For the 1st place by Success deals storypoints for last 30 days",
  },
  {
    icon: "🐄",
    title: "Cash Cow",
    description: `Average deals amount for last 30 days`,
  },
  {
    icon: "🌱",
    title: "Growth Hacker",
    description:
      "Deals to success convertion",
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

const getArchivments = (
  idx,
  managers
) => {
  const highFiver =
    managers.sort(
      byKey("successDeals")
    )[0].name === managers[idx].name;

  const cashCow =
    managers.sort(
      byKey("averageAmountSuccessDeals")
    )[0].name === managers[idx].name;

  const growthHacker =
    managers
      .map(
        ({
          name,
          successDeals,
          deals,
        }) => ({
          name,
          growth: successDeals / deals,
        })
      )
      .sort(byKey("growth"))[0].name ===
    managers[idx].name;

  const emojiString = (obj) =>
    Object.entries(obj)
      .filter(
        ([_, value]) => value === true
      )
      .map(([key, _]) => key)
      .join("");

  return emojiString({
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
    archivments: getArchivments(
      idx,
      managers
    ),
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

const mapper = ({ managers }) => ({
  th,
  rows: managers
    .sort(byKey("successDeals"))
    .map(parser),
  avatars: AVATARS,
  legend,
});
