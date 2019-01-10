import Vue from "vue";
import Vuex from "vuex";
import cpu from './modules/cpu';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    cpu,
    user,
  },
});
