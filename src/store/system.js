import { getInfo, getInfoGeo } from '~/api/system';

const state = () => ({
    infoGeo: null,
    info: null,
});

const actions = {
    async getInfo({ commit }) {
        const info = await getInfo();

        commit('setInfo', info);
    },

    async getInfoGeo({ commit }) {
        const { data: infoGeo } = await getInfoGeo();

        commit('setInfoGeo', infoGeo);
    },
};

const mutations = {
    setInfo(state, info) {
        state.info = info;
    },

    setInfoGeo(state, infoGeo) {
        state.infoGeo = infoGeo;
    },
};

export {
    state,
    actions,
    mutations,
};
