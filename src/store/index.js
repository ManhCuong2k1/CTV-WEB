// store/index.js
import { getInfo } from '~/api/system';

const state = () => ({
    info: null,
});

const actions = {
    // https://nuxtjs.org/guide/vuex-store/#the-nuxtserverinit-action
    // automatically refresh the access token on the initial request to the server, if possible
    async nuxtServerInit({ dispatch, state, commit }) {
        const { accessToken, refreshToken } = state.auth;
        const info = await getInfo();
        commit('setInfo', info);

        if (accessToken && refreshToken) {
            try {
                // refresh the access token
                await dispatch('auth/refresh');
            } catch (e) {
                // catch any errors and automatically logout the user
                await dispatch('auth/logout');
            }
        }
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
