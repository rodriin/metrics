import { mapActions } from 'vuex';
import api from '@/api/metrics';

export default {
    methods: {
        ...mapActions({
            setUser: 'user/setUser',
            setCpuData: 'setCpuData',
        }),

        loadCurrentUser() {
            api.getMe()
                .then(this.setUser)
                .then(() => this.setCpuData([1,2,3,4,5]));
        },
    }
};