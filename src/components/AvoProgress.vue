<template lang="pug">
.d-flex.mb-2
  div Team Performance, {{ percents }}%
  .ms-auto.me-1 {{ name }}
.progress(
  role='progressbar' 
  aria-label='Success example' 
  :aria-valuenow="`${percents}`" 
  :title="`${percents >> 0}%`" 
  style="height: 0.5rem"
  aria-valuemin='0' 
  :aria-valuemax='percents' 
  ) 
  .progress-bar(:style='`width: ${percents}%`' :class="getBgColor(percents)")
</template>

<script>
import { getColor } from "../js/utils";

export default {
  props: {
    name: {
      type: String,
      default: "Performance",
    },
    percents: {
      type: Number,
      default: 0,
    },
    grades: {
      type: Array,
      default: [80, 90, 100],
    },
    colors: {
      type: Array,
      default: ["danger", "warning", "primary", "success"],
    },
  },
  methods: {
    getBgColor(percents) {
      const { grades, colors } = this;
      return `bg-${getColor(grades, colors)(percents)}`;
    },
  },
};
</script>
