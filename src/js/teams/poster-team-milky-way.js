import { getLegend, getPerformance, getRows } from "../gamification";

const id = "Milky Way";

const SP_PER_ENGINEER = 20;

const AVATARS = {};

const NAMES = {
  "y.gandzjur@joinposter.com": "Yaroslav Gandzjur",
  "a.paramzin@joinposter.com": "Artem Paramzin",
  "a.novitskiy@joinposter.com": "Oleksiy Novitskiy",
  "a.naumenko@joinposter.com": "Anton Naumenko",
  "a.zabora@joinposter.com": "Andrii Zabora",
  "s.prysiazhnyi@joinposter.com": "Sergii Prysiazhnyi",
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
