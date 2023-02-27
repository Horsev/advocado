<template lang="pug">
#app.container-md.px-0.d-flex
  .my-auto.w-100
    template(v-if="endpoint")
      .p-2(v-if="tableData?.persent")
        AvoProgress(:percents="this.tableData.persent", name="Team Performance")
      AvoTable(:table-data="tableData", v-if="tableData?.rows")
    template(v-else)
      .form-floating.m-3(:class="{'shake': isEndpointError}")
        input#endpoint.form-control(type='text' placeholder='Endpoint' v-model="endpoint")
        label(for='endpoint') Enter endpoint

AvoFooter(:legend="tableData.legend", v-if="tableData?.legend")
</template>

<script>
import { getLocalStorage, setLocalStorage } from "./js/localstorage";
import AvoFooter from './components/AvoFooter.vue';
import AvoTable from './components/AvoTable.vue';
import AvoProgress from './components/AvoProgress.vue';

import { MAPPERS } from "./js/constants";

import { reUrl } from "./js/regexp"

export default {
  data: () => ({
    tableData: {},
    endpoint: "",
    isEndpointError: false
  }),
  methods: {
    updateData() {
      fetch(this.endpoint)
        .then((response) => response.json())
        .then((data) => {

          import(`./js/${MAPPERS[this.endpoint]}.js`)
            .then(({ mapper }) => {
              this.tableData = mapper(data);
            })
            .catch((err) => {
              console.log(err);
            });

          setLocalStorage("tableData", this.tableData);
          setLocalStorage("endpoint", this.endpoint);
        });
    }
  },
  async beforeMount() {
    this.percents = await getLocalStorage("percents");
    this.tableData = await getLocalStorage("tableData");
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

<style scoped lang="sass">
#app
	min-height: 100vh

.container-md
	max-width: 768px

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
