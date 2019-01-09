

const initialState = {
    cpuData: [],
};

const getters = {
    getCpuData: state => state.cpuData,
};

const actions = {
    setCpuData({ commit }, arg) {
        commit('SET_CUP_DATA', arg)
    },
};

const mutations = {
    ['SET_CUP_DATA'](state, cpuData) {
        state.cpuData = cpuData || [];
    }
};

export default {
    state: initialState,
    getters,
    actions,
    mutations,
};
