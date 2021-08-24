import { getAll, getProduct } from '~/api/products';
import { getAgency } from '~/api/agencies';

const state = () => ({
    products: [],
    pagination: null,
    product: null,
});

const actions = {
    async getProducts({ commit }) {
        const res = await getAll();

        commit('setPagination', {
            page: res.page,
            pageSize: res.pageSize,
            total: res.total,
        });
        commit('setProducts', res.data);
    },

    async getProduct({ commit }, id) {
        const { data: product } = await getProduct(id);
        const { data: agency } = await getAgency(product.AdminId);
        product.agency = agency;

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

    setPagination(state, pagination) {
        state.pagination = pagination;
    },
};

export {
    state,
    actions,
    mutations,
};
