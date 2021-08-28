import { getInfoGeo } from '~/api/system';

export default {
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
