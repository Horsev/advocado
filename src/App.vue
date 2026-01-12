<template lang="pug">
#app.container-md.px-0.d-flex
  .my-auto.w-100
    template(v-if="currentEndpoint && !addNewEndpoint")
      .p-2(v-if="tableData?.percent")
        AvoProgress(:percents="this.tableData.percent", :name="this.tableData.id || 'Team Performance'")

      AvoTable(:table-data="tableData", v-if="tableData?.rows" :key="tableData.id")

      .text-center 
        a.btn.btn-link.text-secondary(href="#" 
        :class="{'disabled': endpoint === currentEndpoint, 'loading': isLoading && endpoint === currentEndpoint }"
        @click="currentEndpoint = endpoint", v-for="endpoint in endpoints" v-if="endpoints.length > 1") ●
        a.btn.btn-link.text-secondary(href="#" @click="addNewEndpoint = true") +

    template(v-else)
      .form-floating.m-3(:class="{'shake': isEndpointError}")
        input#currentEndpoint.form-control(type='text' placeholder='currentEndpoint' v-model="currentEndpoint")
        label(for='currentEndpoint') Enter currentEndpoint

AvoFooter(:legend="tableData.legend", v-if="tableData?.legend")
</template>

<script>
import { getLocalStorage, setLocalStorage } from "./js/localstorage";
import AvoFooter from "./components/AvoFooter.vue";
import AvoTable from "./components/AvoTable.vue";
import AvoProgress from "./components/AvoProgress.vue";

import { MAPPERS } from "./js/teams";

import { reUrl } from "./js/regexp";

export default {
  data: () => ({
    tableData: {},
    currentEndpoint: "",
    endpoints: [],
    isEndpointError: false,
    addNewEndpoint: false,
    isLoading: false,
  }),
  methods: {
    async updateData() {
      const { currentEndpoint } = this;

      this.isLoading = true;

      // Define a mapper function that dynamically imports a module based on the current endpoint
      const importMapper = async (endpoint) => {
        const { mapper } = await import(`./js/teams/${MAPPERS[endpoint]}.js`);
        return mapper;
      };

      // Fetch data from the current endpoint
      const response = await fetch(currentEndpoint);
      const data = await response.json();

      // Map the data using the imported mapper function
      const mapper = await importMapper(currentEndpoint);
      this.tableData = mapper(data);

      // Save the updated data to local storage
      setLocalStorage("tableData", this.tableData);

      // Save the current endpoint to local storage
      setLocalStorage("currentEndpoint", currentEndpoint);

      // Update the list of endpoints in local storage
      this.endpoints = (await getLocalStorage("endpoints")) || [];

      const index = this.endpoints.indexOf(currentEndpoint);

      index === -1 && this.endpoints.push(currentEndpoint);

      setLocalStorage("endpoints", this.endpoints);

      this.isLoading = false;
    },
  },
  async beforeMount() {
    this.tableData = await getLocalStorage("tableData");
    this.endpoints = (await getLocalStorage("endpoints")) || [];
    this.currentEndpoint = (await getLocalStorage("currentEndpoint")) || "";
  },
  async mounted() {
    !!this.currentEndpoint && this.updateData();
  },
  watch: {
    currentEndpoint(to) {
      if (reUrl.test(to)) {
        this.addNewEndpoint = false;
        this.updateData();
      } else if (to) {
        this.isEndpointError = true;
        setTimeout(() => {
          this.isEndpointError = false;
        }, 500);
        this.currentEndpoint = "";
      }
    },
  },
  components: {
    AvoFooter,
    AvoTable,
    AvoProgress,
  },
};
</script>

<style scoped lang="sass">
#app
  min-height: 100vh

.container-md
  max-width: 768px

a.disabled
  --bs-btn-disabled-opacity: 0.5
  transform: scale(0.8)


.loading
  animation: blink 1s cubic-bezier(.36,.07,.19,.97) infinite

@keyframes blink
  0%
    opacity: 0.25
  50%
    opacity: 1
  100%
    opacity: 0.25
.shake
  animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both
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
