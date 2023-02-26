<script>
import { getLocalStorage, setLocalStorage } from "./js/localstorage";
import AvoFooter from './components/AvoFooter.vue';
import AvoTable from './components/AvoTable.vue';
import AvoProgress from './components/AvoProgress.vue';

import { AVATARS } from "./js/constants";

import { reUrl } from "./js/regexp"

import { byLast30SP, getPerformance, getArchivments } from "./js/engineers";

export default {
  data: () => ({
    engineers: [],
    percents: 0,
    endpoint: "",
    isEndpointError: false,
    AVATARS
  }),
  methods: {
    updateData() {
      fetch(this.endpoint)
        .then((response) => response.json())
        .then((data) => {
          this.engineers = data.sort(byLast30SP).map(getArchivments);
          this.percents = getPerformance(data)
          setLocalStorage("percents", this.percents);
          setLocalStorage("engineers", this.engineers);
          setLocalStorage("endpoint", this.endpoint);
        });
    }
  },
  async beforeMount() {
    this.percents = await getLocalStorage("percents");
    this.engineers = await getLocalStorage("engineers");
  },
  async mounted() {
    this.endpoint = await getLocalStorage("endpoint");
    !!this.endpoint && this.updateData();
  },
  watch: {
    endpoint(to) {
      if (reUrl.test(to)) {
        this.updateData()
      } else if (to) {
        this.isEndpointError = true;
        setTimeout(() => {
          this.isEndpointError = false;
        }, 500)
        this.endpoint = ""
      }
    },
  },
  components: {
    AvoFooter, AvoTable, AvoProgress
  }
}

</script>

<template lang="pug">
#app.container-md.px-0.d-flex
  .my-auto.w-100
    template(v-if="endpoint && engineers?.length")
      .p-2
        AvoProgress(:percents="percents", name="Team Performance")
      .p-1
      AvoTable(:rows="engineers" :avatars="AVATARS")
    template(v-else)
      .form-floating.m-3(:class="{'shake': isEndpointError}")
        input#endpoint.form-control(type='text' placeholder='Endpoint' v-model="endpoint")
        label(for='endpoint') Enter endpoint

AvoFooter
</template>

<style scoped lang="sass">
#app
	min-height: 100vh

.container-md
	max-width: 720px

.shake
	animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both
	transform: translate3d(0, 0, 0)
	backface-visibility: hidden
	perspective: 1000px

@keyframes shake
	10%, 90%
		transform: translate3d(-1px, 0, 0)
  
	20%, 80%
		transform: translate3d(2px, 0, 0)

	30%, 50%, 70%
		transform: translate3d(-4px, 0, 0)

	40%, 60%
		transform: translate3d(4px, 0, 0)
</style>
