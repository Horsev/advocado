import { getLegend, getPerformance, getRows } from "../gamification";

const id = "Alkor";

const SP_PER_ENGINEER = 20;

const AVATARS = {};

const NAMES = {
  "v.lialichev@joinposter.com": "Vlad Lialichev",
  "e.shin@joinposter.com": "Olena Shin",
  "r.dzhemilev@joinposter.com": "Roman Dzhemilev",
  // "a.vadkovskiy@joinposter.com": "Oleksii Vadkovskiy",
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
