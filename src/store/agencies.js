import { getAgency, getAll } from '~/api/agencies';

const state = () => ({
    agency: null,
    agencies: [],
});

const actions = {
    async getAgency({ commit }, id) {
        const agency = await getAgency(id);

        commit('setAgency', agency);
    },

    async getAgencies({ commit }) {
        const agencies = await getAll();

        commit('setAgencies', agencies);
    },
};

const mutations = {
    setAgency(state, agency) {
        state.agency = agency;
    },

    setAgencies(state, agencies) {
        state.agencies = agencies;
    },
};

export {
    state,
    actions,
    mutations,
};
