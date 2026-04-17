import { keysEmojiToString, sortByKey, sumByKey } from './utils';

const STAR_PLAYER_RESULT_THRESHOLD_PERCENT = 20;
const PERFORMANCE_TO_PERCENT = 100;

const totalSP = (data) => data.reduce(sumByKey('last30SP'), 0);

export const getLegend = (sp) => [
  {
    icon: '🏆',
    title: 'Champion',
    description: 'For the 1st place by closed storypoints for the last 30 days',
  },
  {
    icon: '⚡️',
    title: 'High Performer',
    description: `Storypoints > ${sp} for the last 30 days`,
  },
  {
    icon: '🌟',
    title: 'Star Player',
    description: 'Change > 20% from 30 to 30 days',
  },
  {
    title: 'Team performance',
    description:
      'Completed storypoints closed by engineers divided by planned storypoints. Danger < 80%, warning < 90%, normal < 100%, success > 100%',
  },
];

export const getAchievements = (idx, managers, sp) => {
  const сhampion =
    managers.sort(sortByKey('last30SP'))[0].name === managers[idx].name;

  const highPerformer = managers[idx].last30SP > sp;

  const starPlayer =
    managers[idx].result > STAR_PLAYER_RESULT_THRESHOLD_PERCENT;

  return keysEmojiToString({
    '🏆': сhampion,
    '⚡️': highPerformer,
    '🌟': starPlayer,
  });
};

export const getPerformance = (data, sp) =>
  (totalSP(data) / (sp * data.length)) * PERFORMANCE_TO_PERCENT;

const parser =
  (names, sp) =>
  ({ result, name, last30SP, prev30SP }, idx, engineers) => [
    {
      type: 'avatar',
      name,
    },
    {
      type: 'name',
      name: names[name] || name,
      achievements: getAchievements(idx, engineers, sp),
    },
    last30SP,
    prev30SP,
    {
      type: 'percent',
      value: result || 0,
    },
  ];

export const getRows = (data, names, sp) =>
  data.sort(sortByKey('last30SP')).map(parser(names, sp));

export default { getLegend, getPerformance, getRows };
