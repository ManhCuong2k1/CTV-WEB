import { getInfoGeo } from '~/api/system';

export default {
    async asyncData() {
        if (!localStorage.infoGeo) {
            const { data: infoGeo } = await getInfoGeo();
            localStorage.infoGeo = infoGeo;
        }

        return {
            infoGeo: localStorage.infoGeo,
        };
    },

    methods: {
        async getInfoGeo() {
            if (!localStorage.infoGeo) {
                const { data: infoGeo } = await getInfoGeo();
                localStorage.infoGeo = JSON.stringify(infoGeo);

                return infoGeo;
            }

            return JSON.parse(localStorage.infoGeo);
        },
    },
};
