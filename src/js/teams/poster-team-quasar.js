import { getLegend, getPerformance, getRows } from "../gamification";

const id = "Quasar";

const SP_PER_ENGINEER = 20;

const AVATARS = {
  "a.hohol@joinposter.com": "i/ah.jpg",
};

const NAMES = {
  "a.hohol@joinposter.com": "Alexander Hohol",
};

const th = ["", "Name", { sorted: true, name: "Last" }, "Previous", "Change"];

export const mapper = (data) => ({
  id,
  th,
  rows: getRows(data, NAMES, SP_PER_ENGINEER),
  percent: getPerformance(data, SP_PER_ENGINEER),
  avatars: AVATARS,
  legend: getLegend(SP_PER_ENGINEER),
});

export default mapper;
