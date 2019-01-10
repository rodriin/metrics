<template>
  <div class="profile">
    <div>User Name: {{user.firstName}} {{user.lastName}}</div>
    <div>Role: {{user.role}}</div>
    <div>Username: {{user.username}}</div>
  </div>
</template>

<script>
import MetricsApi from '@/api/metrics';
import { mapGetters } from 'vuex';

export default {
  name: "User",
  computed: {
    ...mapGetters({
        user: 'user/getUser',
    }),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.profile {
  margin-top: 20px;
}
</style>
