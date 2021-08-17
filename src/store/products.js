import { getAll } from '~/api/products';

const state = () => ({
    products: [],
});

const actions = {
    async getProducts({ commit }) {
        const products = await getAll();

        commit('setProducts', products);
    },
};

const mutations = {
    setProducts(state, products) {
        state.products = products;
    },
};

export {
    state,
    actions,
    mutations,
};
