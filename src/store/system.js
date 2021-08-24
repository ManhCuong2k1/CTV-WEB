import { getInfo } from '~/api/system';

const state = () => ({
    info: null,
});

const actions = {
    async getInfo({ commit }) {
        const info = await getInfo();

        commit('setInfo', info);
    },
};

const mutations = {
    setInfo(state, info) {
        state.info = info;
    },
};

export {
    state,
    actions,
    mutations,
};
