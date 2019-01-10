import { mapActions } from 'vuex';
import api from '@/api/metrics';

export default {
    methods: {
        ...mapActions({
            setUser: 'user/setUser',
        }),

        loadCurrentUser() {
            api.getMe()
                .then(this.setUser);
        },
    }
};