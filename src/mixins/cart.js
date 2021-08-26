import _cloneDeep from 'lodash/cloneDeep';
import _forEach from 'lodash/forEach';
import _find from 'lodash/find';
import { mapState } from 'vuex';
import { getProduct } from '~/api/products';

export default {
    computed: {
        ...mapState('cart', ['cartList']),
    },

    methods: {
        getCartByAgency() {
            const agencies = [];
            _forEach(this.cartList, async (item) => {
                const { data: product } = await getProduct(item.id);
                let agency = _find(agencies, (_agency) => _agency.id === product.distributorInfo.id);
                if (!agency) {
                    agency = product.distributorInfo;
                    agency.products = [];
                    agencies.push(agency);
                }

                product.amount = item.amount;
                agency.products.push(product);
            });

            return agencies;
        },

        async getCartDetail() {
            const cartList = await _cloneDeep(Array.from(this.cartList));
            const products = [];
            await _forEach(cartList, async (item) => {
                const { data: product } = await getProduct(item.id);
                products.push(product);
            });

            return products;
        },
    },
};
