import { getLegend, getPerformance, getRows } from "../gamification";

const id = "James Webb";

const SP_PER_ENGINEER = 20;

const AVATARS = {};

const NAMES = {
  "b.rubanov@joinposter.com": "Boris Rubanov",
  "d.bevz@joinposter.com": "Dmitriy Bevz",
  "d.rusinov@joinposter.com": "Dmitriy Rusinov",
  "s.kurbatov@joinposter.com": "Serhii Kurbatov",
  // "a.vadkovskiy@joinposter.com": "Oleksii Vadkovskiy",
};

const th = ["", "Name", { sorted: true, name: "Last" }, "Previous", "Change"];

export const mapper = (data) => ({
  id,
  th,
  rows: getRows(data, NAMES, SP_PER_ENGINEER),
  percent: getPerformance(data, NAMES, SP_PER_ENGINEER),
  avatars: AVATARS,
  legend: getLegend(SP_PER_ENGINEER),
});

export default mapper;
