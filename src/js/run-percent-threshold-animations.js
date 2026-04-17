import showMagicImage from './magicImage';
import runSalute from './salute';

const PERCENT_THRESHOLDS = [
  {
    threshold: 105,
    run: showMagicImage,
    imageUrl: '/Man Of Steel Superman Sticker.gif',
    animation: 'magicImageReveal',
  },
  {
    threshold: 110,
    run: showMagicImage,
    imageUrl: '/Loop Win Sticker by Dice Dreams.gif',
    animation: 'loopWinReveal',
  },
  { threshold: 120, run: runSalute },
];

const sortThresholdEntriesDesc = (left, right) =>
  right.threshold - left.threshold;

const findThresholdEntryForPercent = (percent) => {
  const isAboveEntryThreshold = (thresholdEntry) =>
    percent > thresholdEntry.threshold;
  return [...PERCENT_THRESHOLDS]
    .sort(sortThresholdEntriesDesc)
    .find(isAboveEntryThreshold);
};

const runPercentThresholdAnimations = (percent) => {
  if (percent == null) return;
  const thresholdEntry = findThresholdEntryForPercent(percent);
  if (!thresholdEntry) return;
  if (thresholdEntry.imageUrl != null) {
    thresholdEntry.run(thresholdEntry.imageUrl, thresholdEntry.animation);
  } else {
    thresholdEntry.run();
  }
};

export default runPercentThresholdAnimations;
