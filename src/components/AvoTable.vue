<template lang="pug">
  .table-responsive
    table.table(:key='tableData.id')
      thead
        tr
          th(v-for='header in tableData.th')
            span.sorted(v-if='header.sorted') {{ header.name }}
            template(v-else) {{ getTableHeaderLabel(header) }}

      tbody(tag='tbody' name='flip' is='vue:transition-group')
        tr(v-for='row in tableData.rows', :key='row[0].name')
          td(
            v-for='cell in row',
            :class='getNumericCellAlignmentClass(cell)',
            :style='getAvatarColumnStyle(cell)'
          )
            template(v-if='cell.type === "avatar"')
              img.avatar(
                :src='tableData.avatars[cell.name]',
                :alt='cell.name'
                v-if='tableData.avatars[cell.name]'
              )
              img.avatar-blank(src='/i/alien.svg' alt='Alien' v-else)
              .text-center
                span.badge.personal-plan-completion(
                  v-if='cell.personalPlanCompletionPercent',
                  :class='getPersonalPlanCompletionBadgeClass(cell.personalPlanCompletionPercent)'
                ) {{ formatPersonalPlanCompletionPercent(cell.personalPlanCompletionPercent) }}

            template(v-else-if='cell.type === "name"')
              span {{ cell.name }}
              .achievements {{ cell.achievements }}

            template(v-else-if='cell.type === "currency"') {{ formatCurrencyCellValue(cell.value) }}

            template(v-else-if='cell.type === "percent"')
              span.badge(:class='getBgColor(cell.value)') {{ formatPercentCellValue(cell.value) }}

            template(v-else) {{ cell }}
</template>

<script>
import { toUKCurrency, getColor } from '../js/utils';

const TABLE_GRADE_RANGE_MIN = -19;
const TABLE_GRADE_RANGE_MAX = 19;
const DEFAULT_TABLE_GRADES = [TABLE_GRADE_RANGE_MIN, TABLE_GRADE_RANGE_MAX];
const DEFAULT_TABLE_COLOR_NAMES = ['danger', 'info', 'success'];
const PERSONAL_PLAN_COMPLETE_PERCENT = 100;

export default {
  props: {
    tableData: {
      type: Object,
      default: () => ({}),
    },
    grades: {
      type: Array,
      default: () => [...DEFAULT_TABLE_GRADES],
    },
    colors: {
      type: Array,
      default: () => [...DEFAULT_TABLE_COLOR_NAMES],
    },
  },
  methods: {
    toUKCurrency,
    getTableHeaderLabel(header) {
      if (typeof header === 'string') return header;
      if (header && typeof header.name === 'string') return header.name;
      return '';
    },
    getNumericCellAlignmentClass(cell) {
      const isNumericAligned = cell.type === 'percent' || cell.type === 'currency';
      return { 'text-end': isNumericAligned };
    },
    getAvatarColumnStyle(cell) {
      return cell.type === 'avatar' ? 'width: 1%' : undefined;
    },
    getPersonalPlanCompletionBadgeClass(percent) {
      return percent < PERSONAL_PLAN_COMPLETE_PERCENT ? 'bg-danger' : 'bg-success';
    },
    formatCurrencyCellValue(amount) {
      if (amount == null || amount === '') return '';
      return this.toUKCurrency(amount);
    },
    formatPercentCellValue(percent) {
      if (percent == null || Number.isNaN(Number(percent))) return '';
      return `${Number(percent).toFixed(2)}%`;
    },
    formatPersonalPlanCompletionPercent(percent) {
      return `${Math.round(percent)}%`;
    },
    getBgColor(percent) {
      const { grades, colors } = this;
      return `text-bg-${getColor(grades, colors)(percent)}`;
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

.personal-plan-completion
  font-size: 0.5rem
  position: relative
  top: -1rem

.avatar
  width: 3rem
  height: 3rem
  border-radius: 100%

.avatar-blank
  width: 2rem
  height: 2rem
  margin: 0.5rem

.achievements
  letter-spacing: 1rem
  font-size: 1.5rem

.sorted
  &::before
    content: "⇅"
    margin-right: 0.25rem
</style>
