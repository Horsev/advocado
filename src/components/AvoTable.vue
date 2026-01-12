<template lang="pug">
.table-responsive
  table.table(:key="tableData.id")
    thead
      tr
        th(v-for="th in tableData.th")
          span.sorted(v-if="th.sorted") {{ th.name }} 
          template(v-else) {{ th }}

    tbody(tag="tbody", name="flip", is="vue:transition-group")
      tr(v-for="row in tableData.rows", :key="row[0].name")
        td(v-for="cell in row", :class="{ 'text-end': cell.type === 'percent' || cell.type === 'currency' }", :style="cell.type === 'avatar' &&  'width: 1%'")

          template(v-if="cell.type === 'avatar'")
            img.avatar(:src="tableData.avatars[cell.name]", :alt="cell.name", v-if="tableData.avatars[cell.name]")
            img.avatar-blank(src="/i/alien.svg", alt="Alien", v-else)

          template(v-else-if="cell.type === 'name'")
            span {{ cell.name }}
            .archivments {{ cell.archivments }}

          template(v-else-if="cell.type === 'currency'")  {{ cell.value && toUKCurrency(cell.value) }}

          template(v-else-if="cell.type === 'percent'") 
            span.badge(:class="getBgColor(cell.value)") {{ cell.value.toFixed(2) }}%

          template(v-else) {{ cell }}
</template>

<script>
import { toUKCurrency, getColor } from "../js/utils";

export default {
  props: {
    tableData: Object,
    avatars: Object,
    grades: {
      type: Array,
      default: [-19, 19],
    },
    colors: {
      type: Array,
      default: ["danger", "info", "success"],
    },
  },
  methods: {
    toUKCurrency,
    getBgColor(percents) {
      const { grades, colors } = this;
      return `text-bg-${getColor(grades, colors)(percents)}`;
    },
  },
};
</script>

<style scoped lang="sass">
.flip-move
	transition: transform 0.25s
	transition-timing-function: cubic-bezier(0.52, 0.1, 0.65, 0.93)

table
	&.table
		th
			font-size: 0.75rem

	tr
		&:last-child
			td
				border-bottom: 0

.avatar
	width: 3rem
	height: 3rem
	border-radius: 100%
.avatar-blank
	width: 2rem
	height: 2rem
	margin: 0.5rem
.archivments
	letter-spacing: 0.5rem
.sorted
	&::before
		content: "⇅"
		margin-right: 0.25rem
</style>
