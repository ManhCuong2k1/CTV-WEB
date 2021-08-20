import { getAll, getProduct } from '~/api/products';

const state = () => ({
    products: [],
    product: null,
});

const actions = {
    async getProducts({ commit }) {
        const products = await getAll();

        commit('setProducts', products);
    },

    async getProduct({ commit }, id) {
        const product = await getProduct(id);

        commit('setProduct', product);
    },
};

const mutations = {
    setProducts(state, products) {
        state.products = products;
    },

    setProduct(state, product) {
        state.product = product;
    },
};

export {
    state,
    actions,
    mutations,
};
