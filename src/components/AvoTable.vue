<template lang="pug">
table.table
  thead
    tr
      th(style="width: 1%")
      th Name
      th.text-nowrap Last ↓
      th Previous
      th Change
  tbody
    tr(v-for="row in rows" :key="row.name")
      td
        img.avatar(:src="avatars[row.name]" :alt="row.name")
      td {{ row.name }}
        .archivments {{ row.archivments }}
      td {{ row.last30SP }}
      td {{ row.prev30SP }}
      td
        span.badge(
          :class="getBgColor(getPercents(row.last30SP, row.prev30SP))") {{ getPercents(row.last30SP, row.prev30SP).toFixed(2) }}%

</template>

<script>

import { getColor } from "../js/utils";

export default {
  props: {
    rows: Array,
    avatars: Object,
    grades: {
      type: Array,
      default: [-19, 19]
    },
    colors: {
      type: Array,
      default: ["danger", "info", "success"]
    },
  },
  methods: {
    getBgColor(percents) {
      const { grades, colors } = this;
      return `bg-${getColor(grades, colors)(percents)}`
    },
    getPercents: (last30SP, prev30SP) => ((last30SP / prev30SP - 1) * 100)
  }
}
</script>

<style scoped lang="sass">
table 
	&.table 
		th 
			font-size: 0.75rem 

.avatar 
	width: 3rem 
	height: 3rem 
	border-radius: 25% 

.archivments 
	letter-spacing: 0.5rem 
</style>