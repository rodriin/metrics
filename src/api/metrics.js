import Vue from 'vue';

export default {
    async getData(url) {
        let responseData = null;
        let errorData = null;

        await Vue.axios
            .get(url, { headers: { Authorization: 'Key I2tel9ogyUgKDvevZA7zhSEkRc3gShpe' }})
            .then((res) => {
                responseData = res.data;
            })
            .catch((error) => {
                console.log('Api Error', error);
                errorData = { error };
            });

        return errorData ? Promise.reject(errorData) : responseData;
    }
};
