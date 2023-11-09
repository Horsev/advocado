import { getLegend, getPerformance, getRows } from "../gamification";

const id = "Proxima";

const SP_PER_ENGINEER = 20;

const AVATARS = {};

const NAMES = {
  "v.shatalov@joinposter.com": "Viktor Shatalov",
  "a.postoyalkina@joinposter.com": "Anastasiia Postoyalkina",
  "a.babenko@joinposter.com": "Andrii Babenko",
  "e.bondarev@joinposter.com": "Evgenii Bondarev",
  // "s.prysiazhnyi@joinposter.com": "Sergii Prysiazhnyi",
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
