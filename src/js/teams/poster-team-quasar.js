import { getLegend, getPerformance, getRows } from "../gamification";

const config = {
  id: "Quasar",
  sp: 20,
  names: {
    "a.hohol@joinposter.com": "Alexander Hohol",
  },
  avatars: {
    "a.hohol@joinposter.com": "i/ah.jpg",
  },
  th: ["", "Name", { sorted: true, name: "Last" }, "Previous", "Change"],
};

const { id, sp, names, avatars, th } = config;

export const mapper = (data) => ({
  id,
  th,
  rows: getRows(data, names, sp),
  percent: getPerformance(data, sp),
  avatars,
  legend: getLegend(sp),
});

export default mapper;
