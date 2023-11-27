import { getLegend, getPerformance, getRows } from "../gamification";

const id = "Milky Way";

const SP_PER_ENGINEER = 20;

const AVATARS = {
  "a.novitskiy@joinposter.com": "i/alexnov2.jpg",
  "y.gandzjur@joinposter.com": "i/yaroslav.jpeg",
  "a.zabora@joinposter.com": "i/zabora.jpg",
  "a.naumenko@joinposter.com": "i/antonn.jpg",
  "a.paramzin@joinposter.com": "i/paramzin.png",
};

const NAMES = {
  "y.gandzjur@joinposter.com": "Yaroslav Gandzjur",
  "a.novitskiy@joinposter.com": "Oleksiy Novitskiy",
  "a.naumenko@joinposter.com": "Anton Naumenko",
  "a.zabora@joinposter.com": "Andrii Zabora",
  "a.paramzin@joinposter.com": "Artem Paramzin",
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
