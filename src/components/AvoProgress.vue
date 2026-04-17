<template lang="pug">
  .d-flex.mb-2
    div Team Performance, {{ completionPercent }}%
    .ms-auto.me-1 {{ name }}
  .progress(
    role='progressbar'
    :aria-label='getProgressBarAriaLabel(name, completionPercent)'
    :aria-valuenow='getProgressBarAriaValueNow(completionPercent)'
    :title='getProgressBarTitle(completionPercent)'
    style='height: 0.5rem'
    aria-valuemin='0'
    aria-valuemax='100'
  )
    .progress-bar(
      :style='getProgressBarWidthStyle(completionPercent)'
      :class='getProgressBarClassName(completionPercent, grades, colors)'
    )
</template>

<script>
import { getColor } from '../js/utils';

export default {
  props: {
    name: {
      type: String,
      default: 'Performance',
    },
    completionPercent: {
      type: Number,
      default: 0,
    },
    grades: {
      type: Array,
      default: () => [80, 90, 100],
    },
    colors: {
      type: Array,
      default: () => ['danger', 'warning', 'primary', 'success'],
    },
  },
  methods: {
    getProgressBarAriaLabel(teamDisplayName, completionPercent) {
      return `Team performance, ${Math.trunc(completionPercent)} percent. ${teamDisplayName}.`;
    },
    getProgressBarAriaValueNow(completionPercent) {
      return Math.trunc(completionPercent);
    },
    getProgressBarClassName(completionPercent, gradeThresholds, colorNames) {
      return `bg-${getColor(gradeThresholds, colorNames)(completionPercent)}`;
    },
    getProgressBarTitle(completionPercent) {
      return `${Math.trunc(completionPercent)}%`;
    },
    getProgressBarWidthStyle(completionPercent) {
      return { width: `${completionPercent}%` };
    },
  },
};
</script>
