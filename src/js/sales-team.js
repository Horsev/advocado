import { byKey } from "../js/utils";

export { mapper };

const AVATARS = {
  "Иван Поставной": "i/f81.png",
  "Максим Ковалевский": "i/f97.png",
};

const getArchivments = (idx) => (!idx ? "🏆" : "");

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
  idx
) => [
  {
    type: "avatar",
    name,
  },
  {
    type: "name",
    name,
    archivments: getArchivments(idx),
  },
  leads,
  deals,
  demo,
  successDeals,
  { type: "currency", value: amountSuccessDeals },
  { type: "currency", value: averageAmountSuccessDeals },
  { type: "currency", value: ARR },
];

const th = [
  "",
  "Name",
  { sorted: true, name: "Leads" },
  "Deals",
  "Demo",
  "Success",
  "Total",
  "Average",
  "ARR",
];

const mapper = ({ managers }) => ({
  th,
  rows: managers.sort(byKey("leads")).map(parser),
  avatars: AVATARS,
});
