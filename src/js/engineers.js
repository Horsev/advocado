export { getArchivments, byLast30SP, getPerformance };
import { SP_PER_ENGINEER } from "../js/constants";

const sumByKey = (key) => (acc, val) => acc + val[key];

const totalSP = (data) => data.reduce(sumByKey("last30SP"), 0);

const getArchivments = (engineer, idx) => ({
  ...engineer,
  archivments:
    (!idx ? "🏆" : "") +
    (engineer.last30SP > SP_PER_ENGINEER ? "⚡️" : "") +
    (engineer.result > 20 ? "🌟" : ""),
});

const byLast30SP = (a, b) => (a.last30SP > b.last30SP ? -1 : 1);

const getPerformance = (data) =>
  (totalSP(data) / (SP_PER_ENGINEER * data.length)) * 100;
