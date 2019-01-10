<template>
  <div>
    <div class="row">
      <metrics-graph v-bind:type="chartType.cpu.key"></metrics-graph>
      <metrics-graph v-bind:type="chartType.ram.key"></metrics-graph>
    </div>
    <!-- Only for admin -->
    <div class="row" v-if="isAdmin">
      <metrics-graph v-bind:type="chartType.users.key"></metrics-graph>
      <metrics-graph v-bind:type="chartType.shiny.key"></metrics-graph>
    </div>
  </div>
</template>

<script>
import MetricsGraph from '@/components/MetricsGraph';
import consts from '@/common/metrics';
import { mapGetters } from 'vuex';

export default {
  name: "Metrics",
  components: {
    MetricsGraph,
  },
  computed: {
    ...mapGetters({
        userRole: 'user/getRole',
    }),
    isAdmin() {
      return this.userRole === 'administrator';
    }
  },
  data () {
    return {
      chartType: consts.chartType,
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.row {
  display: flex;  
}
</style>
