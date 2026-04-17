import { sortByKey, keysEmojiToString } from '../utils';
import {
  getPersonalPlanCompletionPercent,
  getProratedPersonalPlanTarget,
} from './prorated-sales-plan';

const REVENUE_PLAN_TO_PERCENT = 100;

const SALES_PLAN_PER_SELLER = 180000;

const config = {
  id: 'Sales plan API',
  avatars: {
    'Oleksandra Zahrebelna': 'i/zo.jpg',
    'Yuliia Buryak': 'i/by.jpg',
  },
  legend: [
    {
      icon: '🏆',
      title: 'High Fiver',
      description: 'The 1st place by Success deals for the last 30 days',
    },
    {
      icon: '🐄',
      title: 'Cash Cow',
      description: 'Maximum average deals amount for the last 30 days',
    },
    {
      icon: '🌱',
      title: 'Growth Hacker',
      description: 'Deals to success convertion',
    },
  ],
  th: [
    '',
    'Name',
    'Leads',
    'Deals',
    'Demo',
    'Success',
    'Average',
    { sorted: true, name: 'Total' },
    // { sorted: true, name: "ARR" },
  ],
};

const { id, avatars, legend, th } = config;

const isTopManagerBySortField = (managers, managerIndex, sortField) => {
  const rankedManagers = [...managers].sort(sortByKey(sortField));
  const topManagerName = rankedManagers[0].name;
  return topManagerName === managers[managerIndex].name;
};

const getSalesAchievementEmojis = (idx, managers) => {
  const highFiver = isTopManagerBySortField(managers, idx, 'successDeals');

  const cashCow = isTopManagerBySortField(
    managers,
    idx,
    'averageAmountSuccessDeals',
  );

  const growthHacker =
    managers
      .map(({ name, successDeals, deals }) => ({
        name,
        growth: successDeals / deals,
      }))
      .sort(sortByKey('growth'))[0].name === managers[idx].name;

  return keysEmojiToString({
    '🏆': highFiver,
    '🐄': cashCow,
    '🌱': growthHacker,
  });
};

const parser = (
  {
    name,
    leads,
    deals,
    demo,
    successDeals,
    amountSuccessDeals,
    averageAmountSuccessDeals,
    // ARR,
  },
  idx,
  managers,
  referenceDate,
) => [
  {
    type: 'avatar',
    name,
    personalPlanCompletionPercent: getPersonalPlanCompletionPercent({
      amountSuccessDeals,
      salesPlanPerSeller: SALES_PLAN_PER_SELLER,
      referenceDate,
    }),
  },
  {
    type: 'name',
    name,
    achievements: getSalesAchievementEmojis(idx, managers),
  },
  leads,
  deals,
  demo,
  successDeals,
  {
    type: 'currency',
    value: averageAmountSuccessDeals,
  },
  {
    type: 'currency',
    value: amountSuccessDeals,
  },

  // { type: "currency", value: ARR },
];

const getPerformance = (managers, referenceDate) => {
  const numberOfSellers = managers.length;

  const proratedPersonalTarget = getProratedPersonalPlanTarget({
    salesPlanPerSeller: SALES_PLAN_PER_SELLER,
    referenceDate,
  });

  const currentRevenuePlan = proratedPersonalTarget * numberOfSellers;

  const revenueBySuccessDeals = managers.reduce(
    (accumulator, { amountSuccessDeals }) => accumulator + amountSuccessDeals,
    0,
  );

  if (currentRevenuePlan === 0) {
    return 0;
  }

  return Math.round(
    (revenueBySuccessDeals / currentRevenuePlan) * REVENUE_PLAN_TO_PERCENT,
  );
};

export const mapper = ({ managers }) => {
  const referenceDate = new Date();

  const parseRow = (manager, idx) =>
    parser(manager, idx, managers, referenceDate);

  return {
    id,
    th,
    rows: managers.sort(sortByKey('amountSuccessDeals')).map(parseRow),
    avatars,
    percent: getPerformance(managers, referenceDate),
    legend,
  };
};

export default mapper;
