import { getLegend, getPerformance, getRows } from "../gamification";

const id = "quasar";

const SP_PER_ENGINEER = 20;

const AVATARS = {
  "alexgoogole@gmail.com": "i/ah.jpg",
};

const NAMES = {
  "alexgoogole@gmail.com": "Alexander Hohol",
};

const LEGEND = getLegend(SP_PER_ENGINEER);

const th = ["", "Name", { sorted: true, name: "Last" }, "Previous", "Change"];

export const mapper = (data) => ({
  id,
  th,
  rows: getRows(data, NAMES, SP_PER_ENGINEER),
  persent: getPerformance(data, SP_PER_ENGINEER),
  avatars: AVATARS,
  legend: LEGEND,
});

export default mapper;
