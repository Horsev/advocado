<template lang="pug">
.container-md.p-3
  p Legend
  ul.list-unstyled
    li.mb-3(v-for="achievement in achievements")
      span.me-2(v-if="achievement.icon") {{achievement.icon}}
      .p-2(v-else)
      | {{achievement.title}}
      .small {{achievement.description}}
</template>

<script>
import { SP_PER_ENGINEER } from "../js/constants";

const achievements = [
  {
    title: "Champion",
    icon: "🏆",
    description: "For the 1st place by closed storypoints for last 30 days",
  },
  {
    title: "High Performer",
    icon: "⚡️",
    description: `Storypoints  > ${SP_PER_ENGINEER} for last 30 days`,
  },
  {
    title: "Star Player",
    icon: "🌟",
    description: "Change > 20% from 30 to 30 days",
  },
  {
    title: "Team performance",
    description:
      "Completed storypoints closed by engineers divided by planned storypoints. Danger < 80%, warning < 90%, normal < 100%, success > 100%",
  },
];

export default {
  data() {
    return {
      achievements,
    }
  }
}

</script>
