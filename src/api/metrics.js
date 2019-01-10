import Vue from 'vue';
import consts from '../common/metrics';

export default {
    async getData(url) {
        let responseData = null;
        let errorData = null;

        await Vue.axios
            .get(url, { headers: { Authorization: consts.authKey }})
            .then((res) => {
                responseData = res.data;
            })
            .catch((error) => {
                console.log('Api Error', error);
                errorData = { error };
            });

        return errorData ? Promise.reject(errorData) : responseData;
    },

    async getMe() {
        return this.getData('apiCall/__api__/me')
        .then((user) => ({
            role: user.user_role,
            firstName: user.first_name,
            lastName: user.last_name,
            username: user.username,
        }));
    }
};
