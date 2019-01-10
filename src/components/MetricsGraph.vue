<template>
  <div class="graph">
    <line-chart v-bind:chart-data="graphData" v-bind:options="options"></line-chart>
  </div>
</template>

<script>
import LineChart from './chart/LineChart.js';
import MetricsMixin from '@/mixins/metrics';
import MetricsApi from '@/api/metrics';
import consts from '@/common/metrics';

export default {
  name: "MetricsGraph",
  mixins: [MetricsMixin],
  props: {
      type: String,
  },
  components: {
    LineChart,
  },
  data () {
    return {
      transformer: this[consts.chartType[this.type].transformer],
      url: consts.chartType[this.type].url,
      graphData: null,
      options: consts.chartType[this.type].options,
    };
  },
  mounted () {
      MetricsApi.getData(this.url)
        .then(this.transformer)
        .then((res) => {
            this.graphData = { datasets: res };
        });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.graph {
  width: 50%;
  padding: 50px;
  max-height: 350px;
}
</style>
