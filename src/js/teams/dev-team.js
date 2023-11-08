import { getLegend, getPerformance, getRows } from "../gamification";

const id = "dev-team";

const SP_PER_ENGINEER = 40;

const NAMES = {};

const AVATARS = {
  "Aleksandr Novoselskiy": "i/a.png",
  "Sergey Nikolaev": "i/s.png",
  "Sergey Kulinenko": "i/k.png",
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
