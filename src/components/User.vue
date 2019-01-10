<template>
  <div>
    Hello {{username}}
  </div>
</template>

<script>
import MetricsApi from '@/api/metrics';
import { mapGetters } from 'vuex';

export default {
  name: "User",
  computed: {
    ...mapGetters({
        username: 'user/getUsername',
    }),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
