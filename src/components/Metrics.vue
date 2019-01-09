<template>
  <div>
    <h1>Metrics</h1>
    <div class="row">
      <metrics-graph v-bind:type='"cpu"'></metrics-graph>
      <metrics-graph v-bind:type='"ram"'></metrics-graph>
    </div>
    <div class="row">
      <metrics-graph v-bind:type='"users"'></metrics-graph>
      <metrics-graph v-bind:type='"shiny"'></metrics-graph>
    </div>
  </div>
</template>

<script>
import MetricsGraph from '@/components/MetricsGraph';

export default {
  name: "Metrics",
  components: {
    MetricsGraph,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.row {
  display: flex;  
}
</style>
