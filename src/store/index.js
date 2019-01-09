import Vue from "vue";
import Vuex from "vuex";
import cpu from './modules/cpu';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    cpu,
  },
});
