<template>
    <div class="graph">
        <line-chart v-bind:chart-data="datacollection" v-bind:options="options"></line-chart>
    </div>
</template>

<script>
import LineChart from './chart/LineChart.js';
import MetricsMixin from '@/mixins/metrics';
import MetricsApi from '@/api/metrics';

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
      transformers: {
          cpu: this.cpuTransformer,
          ram: this.ramTransformer,
          users: this.usersTransformer,
          shiny: this.usersTransformer,
      },
      urls: {
        cpu: 'apiCall/__metrics__/rrd_export_flot?data%5B%5D=DEF,sys,system-CPU,sys,AVERAGE&data%5B%5D=DEF,user,system-CPU,user,AVERAGE&data%5B%5D=DEF,idle,system-CPU,idle,AVERAGE&end=-2min&preserveNan=1&start=-86520sec&xport%5B%5D=sys,sys&xport%5B%5D=user,user&xport%5B%5D=idle,idle',
        ram: 'apiCall/__metrics__/rrd_export_flot?data%5B%5D=DEF,actualused,system-RAM,actualused,AVERAGE&data%5B%5D=DEF,used,system-RAM,used,AVERAGE&end=-2min&preserveNan=1&start=-86520sec&xport%5B%5D=actualused,actualused&xport%5B%5D=used,used',
        users: 'apiCall/__metrics__/rrd_export_flot?data%5B%5D=DEF,active1day,license-users,active1day,AVERAGE&data%5B%5D=DEF,active30day,license-users,active30day,AVERAGE&data%5B%5D=DEF,active365day,license-users,active365day,AVERAGE&end=-2min&preserveNan=1&start=-86520sec&xport%5B%5D=active1day,active1day&xport%5B%5D=active30day,active30day&xport%5B%5D=active365day,active365day',
        shiny: 'apiCall/__metrics__/rrd_export_flot?data%5B%5D=DEF,shinyusers,license-users,shinyusers,AVERAGE&end=-2min&preserveNan=1&start=-86520sec&xport%5B%5D=shinyusers,shinyusers',
      },
      datacollection: null,
      options: {
          responsive: true,
          legend: {
            labels: { boxWidth: 10 }
          },
          tooltips: {
            mode: 'index',
            intersect: false,
            callbacks: {
              afterTitle: function() {
                window.total = 0;
              },
              label: function(tooltipItem, data) {
                let label = data.datasets[tooltipItem.datasetIndex].label || '';
                const value = tooltipItem.yLabel;
                window.total += value;

                if (label) {
                    label += ': ';
                }
                label += `${Math.round(value * 100) / 100}%`;
                return label;
              },
              footer: function() {
                return `TOTAL: ${Math.round(window.total * 100) / 100}%`;
              },
            },
          },
          scales: {
            xAxes: [{
              type: 'time',
            }],
            yAxes: [{
              stacked: ['cpu', 'ram'].includes(this.type),
              ticks: {
            //     max: 1.2, //100,
                min: 0,
            //     // stepSize: 25,
            //     // callback: (value, index, values) => `${Math.floor(value / 1 /* TODO: will be CPUs on docker instance */ )}%`,
              }
            }],
          }
      },
    };
  },
  mounted () {
      MetricsApi.getData(this.urls[this.type])
        .then(this.transformers[this.type])
        .then(res => {
            this.datacollection = { datasets: res };
        });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.graph {
    width: 50%;
    padding: 20px;
}
</style>
