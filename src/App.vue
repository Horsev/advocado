<template lang="pug">
  #app.container-md.px-0.d-flex
    .my-auto.w-100
      template(v-if='isEndpointDashboardVisible(currentEndpoint, addNewEndpoint)')
        .p-2(v-if='tableData.percent')
          AvoProgress(
            :completion-percent='tableData.percent',
            :name='getProgressDisplayName(tableData.id)'
          )

        transition(name='fade' mode='out-in')
          AvoTable(
            :table-data='tableData'
            v-if='hasTableRows(tableData.rows)',
            :key='tableData.id'
          )

        .text-center
          a.btn.btn-link.text-secondary(
            href='#',
            :class='getEndpointTabClass(endpoint, currentEndpoint, isLoading)'
            @click='currentEndpoint = endpoint'
            v-for='endpoint in endpoints'
            v-if='hasMultipleEndpoints(endpoints)'
          ) ●
          a.btn.btn-link.text-secondary(href='#' @click='addNewEndpoint = true') +

      template(v-else)
        .form-floating.m-3(:class='{ shake: isEndpointError }')
          input#currentEndpoint.form-control(
            type='text'
            placeholder='currentEndpoint'
            v-model='currentEndpoint'
          )
          label(for='currentEndpoint') Enter currentEndpoint

  AvoFooter(:legend='tableData.legend' v-if='tableData.legend')
</template>

<script>
import { getLocalStorage, setLocalStorage } from './js/localstorage';
import normalizeTableDataPayload from './js/normalize-table-data-payload';
import AvoFooter from './components/AvoFooter.vue';
import AvoTable from './components/AvoTable.vue';
import AvoProgress from './components/AvoProgress.vue';

import { MAPPERS } from './js/teams';

import { reUrl } from './js/regexp';
import runPercentThresholdAnimations from './js/run-percent-threshold-animations';

const ENDPOINT_NOT_IN_LIST_INDEX = -1;
const ENDPOINT_ERROR_SHAKE_RESET_MS = 500;

export default {
  components: {
    AvoFooter,
    AvoTable,
    AvoProgress,
  },
  data: () => ({
    tableData: normalizeTableDataPayload(null),
    currentEndpoint: '',
    endpoints: [],
    isEndpointError: false,
    addNewEndpoint: false,
    isLoading: false,
  }),
  watch: {
    currentEndpoint(nextEndpoint) {
      if (reUrl.test(nextEndpoint)) {
        this.addNewEndpoint = false;
        this.updateData();
      } else if (nextEndpoint) {
        this.isEndpointError = true;
        const clearEndpointErrorShake = () => {
          this.isEndpointError = false;
        };
        setTimeout(clearEndpointErrorShake, ENDPOINT_ERROR_SHAKE_RESET_MS);
        this.currentEndpoint = '';
      }
    },
    'tableData.percent': {
      handler: 'onTableDataPercentChanged',
    },
  },
  async beforeMount() {
    this.tableData = normalizeTableDataPayload(await getLocalStorage('tableData'));
    this.endpoints = (await getLocalStorage('endpoints')) || [];
    this.currentEndpoint = (await getLocalStorage('currentEndpoint')) || '';
  },
  async mounted() {
    runPercentThresholdAnimations(this.tableData.percent);
    if (this.currentEndpoint) {
      this.updateData();
    }
  },
  methods: {
    isEndpointDashboardVisible(activeEndpoint, isAddEndpointFormOpen) {
      return Boolean(activeEndpoint) && !isAddEndpointFormOpen;
    },
    getProgressDisplayName(teamKey) {
      return teamKey || 'Team Performance';
    },
    hasTableRows(rows) {
      return Boolean(rows);
    },
    hasMultipleEndpoints(persistedEndpoints) {
      return persistedEndpoints.length > 1;
    },
    getEndpointTabClass(tabEndpoint, activeEndpoint, isFetching) {
      return {
        disabled: tabEndpoint === activeEndpoint,
        loading: isFetching && tabEndpoint === activeEndpoint,
      };
    },
    onTableDataPercentChanged(percent) {
      runPercentThresholdAnimations(percent);
    },
    async loadTeamMapper(endpoint) {
      const { mapper } = await import(`./js/teams/${MAPPERS[endpoint]}.js`);
      return mapper;
    },
    async fetchEndpointPayloadJson(endpointUrl) {
      const response = await fetch(endpointUrl);
      return response.json();
    },
    persistSnapshotAfterUpdate(nextCurrentEndpoint) {
      setLocalStorage('tableData', this.tableData);
      setLocalStorage('currentEndpoint', nextCurrentEndpoint);
    },
    async mergePersistedEndpoints(nextCurrentEndpoint) {
      this.endpoints = (await getLocalStorage('endpoints')) || [];
      const existingIndex = this.endpoints.indexOf(nextCurrentEndpoint);
      if (existingIndex === ENDPOINT_NOT_IN_LIST_INDEX) {
        this.endpoints.push(nextCurrentEndpoint);
      }
      setLocalStorage('endpoints', this.endpoints);
    },
    async updateData() {
      const nextCurrentEndpoint = this.currentEndpoint;
      this.isLoading = true;
      try {
        const mapTeamPayload = await this.loadTeamMapper(nextCurrentEndpoint);
        const rawEndpointPayload = await this.fetchEndpointPayloadJson(nextCurrentEndpoint);
        this.tableData = normalizeTableDataPayload(mapTeamPayload(rawEndpointPayload));
        this.persistSnapshotAfterUpdate(nextCurrentEndpoint);
        await this.mergePersistedEndpoints(nextCurrentEndpoint);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped lang="sass">
#app
  min-height: 100vh
  position: relative
  z-index: 1

#magicCanvas
  position: fixed
  inset: 0
  width: 100vw
  height: 100vh
  z-index: 1001
  pointer-events: none
  background: transparent

.container-md
  max-width: 768px

:deep(.fade-enter-from),
:deep(.fade-leave-to)
  opacity: 0

:deep(.fade-enter-active),
:deep(.fade-leave-active)
  transition: opacity 0.25s ease

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
