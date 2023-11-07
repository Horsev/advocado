import { byKey, keysEmojiToString } from "../utils";

const ID = "poster-team";

const SP_PER_ENGINEER = 20;

const AVATARS = {
  "Sergey Kulinenko": "i/k.png",
};

const LEGEND = [
  {
    icon: "🏆",
    title: "Champion",
    description: "For the 1st place by closed storypoints for the last 30 days",
  },
  {
    icon: "⚡️",
    title: "High Performer",
    description: `Storypoints > ${SP_PER_ENGINEER} for the last 30 days`,
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

const getArchivments = (idx, managers) => {
  const сhampion =
    managers.sort(byKey("last30SP"))[0].name === managers[idx].name;

  const highPerformer = managers[idx].last30SP > SP_PER_ENGINEER;

  const starPlayer = managers[idx].result > 20;

  return keysEmojiToString({
    "🏆": сhampion,
    "⚡️": highPerformer,
    "🌟": starPlayer,
  });
};

const totalSP = (data) => data.reduce(sumByKey("last30SP"), 0);

const sumByKey = (key) => (acc, val) => acc + val[key];

const getPerformance = (data) =>
  (totalSP(data) / (SP_PER_ENGINEER * data.length)) * 100;

const parser = ({ result, name, last30SP, prev30SP }, idx, engineers) => [
  {
    type: "avatar",
    name,
  },
  {
    type: "name",
    name,
    archivments: getArchivments(idx, engineers),
  },
  last30SP,
  prev30SP,
  {
    type: "percent",
    value: result || 0,
  },
];

const th = ["", "Name", { sorted: true, name: "Last" }, "Previous", "Change"];

export const mapper = (data) => ({
  th,
  rows: data.sort(byKey("last30SP")).map(parser),
  persent: getPerformance(data),
  avatars: AVATARS,
  legend: LEGEND,
  id: ID,
});

export default mapper;
