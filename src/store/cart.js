import _find from 'lodash/find';
import _findIndex from 'lodash/findIndex';
import _sumBy from 'lodash/sumBy';

const state = () => ({
    cartList: [],
});

const actions = {
    addToCart({ commit }, item) {
        commit('addToCart', item);
    },

    updateAmount({ commit }, item) {
        commit('updateAmount', item);
    },

    removeFromCart({ commit }, productId) {
        commit('removeFromCart', productId);
    },

    clearCart({ commit }) {
        commit('clearCart');
    },
};

const getters = {
    totalAmount: (state) => _sumBy(state.cartList, (item) => item.amount),
};

const mutations = {
    addToCart(state, { productId, amount }) {
        const _product = _find(state.cartList, (item) => item.id === productId);
        if (_product) {
            _product.amount += amount;
        } else {
            state.cartList.push({
                id: productId,
                amount,
            });
        }
    },

    updateAmount(state, { productId, amount }) {
        const _product = _find(state.cartList, (item) => item.id === productId);
        if (_product) {
            _product.amount = amount;
        }
    },

    removeFromCart(state, productId) {
        const index = _findIndex(state.cartList, { id: productId });
        state.cartList.splice(index, 1);
    },

    clearCart(state) {
        state.cartList = [];
    },
};

export {
    state,
    getters,
    actions,
    mutations,
};
