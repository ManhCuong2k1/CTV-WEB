import { getAll } from '~/api/categories';

const state = () => ({
    categories: [],
});

const actions = {
    async getCategories({ commit }) {
        const categories = await getAll();

        commit('setCategories', categories.data);
    },
};

const mutations = {
    setCategories(state, categories) {
        state.categories = categories;
    },
};

export {
    state,
    actions,
    mutations,
};
