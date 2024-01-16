import { getLegend, getPerformance, getRows } from "../gamification";

const config = {
  id: "PHP",
  sp: 40,
  names: {},
  avatars: {
    "Aleksandr Novoselskiy": "i/a.png",
    "Sergey Nikolaev": "i/s.png",
    "Sergey Kulinenko": "i/k.png",
    "Radevych Vladyslav": "i/vr.png",
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
