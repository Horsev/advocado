import { byKey } from "../js/utils";

export { mapper };

const SP_PER_ENGINEER = 16;

const AVATARS = {
  "Eugene Motovilov": "i/e.png",
  "Aleksandr Novoselskiy": "i/a.png",
  "Daria D": "i/d.png",
  "Vsevolod Vietluzhskykh": "i/v.png",
};

const legend = [
  {
    icon: "🏆",
    title: "Champion",
    description: "For the 1st place by closed storypoints for last 30 days",
  },
  {
    icon: "⚡️",
    title: "High Performer",
    description: `Storypoints > ${SP_PER_ENGINEER} for last 30 days`,
  },
  {
    icon: "🌟",
    title: "Star Player",
    description: "Change > 20% from 30 to 30 days",
  },
  {
    title: "Team performance",
    description:
      "Completed storypoints closed by engineers divided by planned storypoints. Danger < 80%, warning < 90%, normal < 100%, success > 100%",
  },
];

const getArchivments = (last30SP, result, idx) =>
  (!idx ? "🏆" : "") +
  (last30SP > SP_PER_ENGINEER ? "⚡️" : "") +
  (result > 20 ? "🌟" : "");

const totalSP = (data) => data.reduce(sumByKey("last30SP"), 0);

const sumByKey = (key) => (acc, val) => acc + val[key];

const getPerformance = (data) =>
  (totalSP(data) / (SP_PER_ENGINEER * data.length)) * 100;

const parser = ({ result, name, last30SP, prev30SP }, idx) => [
  {
    type: "avatar",
    name,
  },
  {
    type: "name",
    name,
    archivments: getArchivments(last30SP, result, idx),
  },
  last30SP,
  prev30SP,
  {
    type: "percent",
    value: result,
  },
];

const th = ["", "Name", { sorted: true, name: "Last" }, "Previous", "Change"];

const mapper = (data) => ({
  th,
  rows: data.sort(byKey("last30SP")).map(parser),
  persent: getPerformance(data),
  avatars: AVATARS,
  legend,
});
