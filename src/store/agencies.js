import { getAgency } from '~/api/agencies';

const state = () => ({
    agency: null,
});

const actions = {
    async getAgency({ commit }, id) {
        const agency = await getAgency(id);

        commit('setAgency', agency);
    },
};

const mutations = {
    setAgency(state, agency) {
        state.agency = agency;
    },
};

export {
    state,
    actions,
    mutations,
};
