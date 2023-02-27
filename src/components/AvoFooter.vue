<template lang="pug">
.container-md.p-3
  p Legend
  ul.list-unstyled
    li.mb-3(v-for="achievement in legend")
      span.me-2(v-if="achievement.icon") {{achievement.icon}}
      .p-2(v-else)
      | {{achievement.title}}
      .small {{achievement.description}}
</template>

<script>

export default {
  props: {
    legend: {
      type: Array
    }
  }
}

</script>
