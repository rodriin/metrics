export default {
    methods: {
        // transforms metrics API responses to datasets appropriate for chart.js
        cpuTransformer(res) {
            const labels = {
                sys: 'System',
                user: 'User',
                idle: 'Misc',
            };
            const colors = {
                sys: '#d9534f',
                user: '#f2c144',
                idle: '#4da74d',
            };
            return res.map(ser => {
                const data = (ser.data || []);
                let cleaned;
                if (ser.label === 'idle') {
                    cleaned = data.map((pt,i) => {
                        const idle = pt[1]
                        const user = res[0].data[i][1];
                        const sys = res[1].data[i][1];
                        return {
                            x: pt[0],
                            y: Math.max(1 - idle - (user+sys), 0),
                        };
                    });
                } else {
                    cleaned = data.map(this.genericPointTransformer);
                }
                return {
                    label: labels[ser.label],
                    pointRadius: 0,
                    borderWidth: 0,
                    backgroundColor: colors[ser.label],
                    data: cleaned,
                };
            });
        },

        ramTransformer(res) {
            const labels = {
                used: 'Cached',
                actualused: 'Used',
            };
            const colors = {
                actualused: 'steelblue',
                used: 'lightblue',
            }
            return res.map(ser => {
                const data = (ser.data || []);
                let cleaned;
                if (ser.label === 'used') {
                    cleaned = data.map((pt,i) => {
                        const used = pt[1];
                        const actualused = res[0].data[i][1];
                        return {
                            x: pt[0],
                            y: used === 'NaN' ? NaN : used - actualused,
                        };
                    });
                } else {
                    cleaned = data.map(this.genericPointTransformer);
                }
                return {
                    label: labels[ser.label],
                    pointRadius: 0,
                    borderWidth: 0,
                    backgroundColor: colors[ser.label],
                    data: cleaned,
                };
            });
        },

        genericPointTransformer(pt) {
            return {x: pt[0], y: pt[1] === 'NaN' ? NaN : pt[1] };
        },
        usersTransformer(res) {
            // labels for both the licensed users and shiny users graphs
            const labels = {
                active1day: 'Past Day',
                active30day: 'Past Month',
                active365day: 'Past Year',
                shinyusers: 'Active Connections',
            };
            const colors = {
                active1day: 'rgb(31, 119, 180)',
                active30day: 'rgb(174, 199, 234)',
                active365day: 'rgb(255, 126, 0)',
                shinyusers: 'rgb(28, 119, 183)',
            };

            return res.map(ser => {
                const data = (ser.data || []);
                return {
                    label: labels[ser.label],
                    pointRadius: 0,
                    borderWidth: 0,
                    fill: false,
                    borderColor: colors[ser.label],
                    backgroundColor: colors[ser.label],
                    data: data.map(this.genericPointTransformer),
                };
            });
        },
    }
};
