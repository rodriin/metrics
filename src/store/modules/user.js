

const initialState = {
    user: {
        role: 'anonymous',
        firstName: 'anonymous',
        lastName: 'anonymous',
        username: 'anonymous',
    },
};

const getters = {
    getUser: state => state.user,
    getRole: state => state.user.role,
    getFirstName: state => state.user.firstName,
    getLastName: state => state.user.lastName,
    getUsername: state => state.user.username,
};

const actions = {
    setUser({ commit }, arg) {
        commit('SET_USER', arg);
    },
};

const mutations = {
    ['SET_USER'](state, data) {
        state.user = data || null;
    },
};

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations,
};
