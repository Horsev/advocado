import { getLegend, getPerformance, getRows } from "../gamification";

const id = "Quasar";

const SP_PER_ENGINEER = 20;

const AVATARS = {
  "a.hohol@joinposter.com": "i/ah2.jpg",
  "s.saveliev@joinposter.com": "i/serg.jpeg",
  "m.babarov@joinposter.com": "i/max3.jpg",
  "a.yeremeev@joinposter.com": "i/ay.jpg",
  "k.velichko@joinposter.com": "i/kate2.jpg",
};

const NAMES = {
  "a.hohol@joinposter.com": "Oleksandr Hohol",
  "s.saveliev@joinposter.com": "Serhii Saveliev",
  "m.babarov@joinposter.com": "Maksym Babarov",
  "a.yeremeev@joinposter.com": "Andrii Yeremeev",
  "k.velichko@joinposter.com": "Kateryna Velichko",
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
