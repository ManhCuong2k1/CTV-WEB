<template>
    <div class="h-full">
        <BreadCrumb :breadcrumb="navbarLinks" class="py-2" />
        <div class="content-section bg-white p-4 flex justify-between items-center">
            <div class="flex items-center">
                <div class="font-bold text-xl">
                    <i class="el-icon-shopping-cart-full mr-2" />Thông tin Order
                </div>
                <div class="text-xs ml-2">
                    (Mã Order: {{ order.id }})
                </div>
            </div>

            <el-popconfirm
                v-if="canCancel"
                title="Xác nhận hủy đơn hàng?"
                confirm-button-text="Hủy"
                cancel-button-text="Bỏ qua"
                icon="el-icon-info"
                icon-color="red"
                @confirm="cancelOrder"
            >
                <el-button
                    slot="reference"
                    v-loading="loading"
                    type="danger"
                    icon="el-icon-delete"
                    size="medium"
                >
                    Hủy đơn hàng
                </el-button>
            </el-popconfirm>
        </div>

        <OrderItem class="content-section bg-white mt-4" :order="order" />

        <div class="content-section bg-white p-4 mt-4">
            <div class="font-bold text-lg">
                Thông tin giao hàng
            </div>
            <el-form
                ref="form"
                class="mt-2"
                label-position="left"
                label-width="200px"
                size="medium"
            >
                <el-form-item label="Người nhận">
                    <div class="font-bold">
                        {{ order.customerFullname }}
                    </div>
                </el-form-item>
                <el-form-item label="Di động">
                    <div class="font-bold">
                        {{ order.customerPhone | formatPhone }}
                    </div>
                </el-form-item>
                <el-form-item label="Địa chỉ">
                    <div>
                        {{ location }}
                    </div>
                    <div>
                        {{ order.customerAddress }}
                    </div>
                </el-form-item>
                <el-form-item label="Ghi chú">
                    <div>
                        {{ order.customerNote }}
                    </div>
                </el-form-item>
                <el-form-item label="Tổng tiền">
                    <span class="font-bold">{{ order.total | formatNumber }}đ</span>
                    <span class="text-xs text-gray-400">(Chưa bao gồm phí giao hàng)</span>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import _find from 'lodash/find';
    import { getInfoGeo } from '~/api/system';
    import { getOrder, cancelOrder } from '~/api/orders';
    import { options as statusOptions, CREATED } from '~/constants/order/status';
    import cartMixins from '~/mixins/cart';
    import BreadCrumb from '~/components/layout/BreadCrumb.vue';
    import OrderItem from '~/components/orders/Item.vue';

    export default {
        components: {
            BreadCrumb,
            OrderItem,
        },

        mixins: [cartMixins],

        async asyncData({ params }) {
            const { data: order } = await getOrder(params.id);

            return {
                order,
            };
        },

        data() {
            return {
                loading: false,
                infoGeo: null,
                location: '',
            };
        },

        computed: {
            navbarLinks() {
                return [
                    { title: 'Trang chủ', link: '/' },
                    { title: 'Thông tin tài khoản', link: '/me' },
                    { title: 'Đơn mua', link: '/me/orders' },
                    { title: 'Chi tiết đơn hàng', link: `/orders/${this.order.id}` },
                ];
            },

            authUser() {
                return this.$auth.user;
            },

            isRetail() {
                return this.order.priceType === 'retail';
            },

            canCancel() {
                return this.order.status === CREATED;
            },

            statusOption() {
                return _find(statusOptions, (_status) => _status.value === this.order.status);
            },
        },

        async mounted() {
            this.infoGeo = await this.getInfoGeo();
            const city = _find(this.infoGeo, (_city) => _city.id === this.order.CityId) || {};
            // eslint-disable-next-line no-extra-boolean-cast
            const district = !!city ? '' : _find(city.Districts, (_district) => _district.id === this.order.DistrictId);

            this.location = `${district.name} - ${city.name}`;
        },

        methods: {
            async getInfoGeo() {
                if (!localStorage.infoGeo) {
                    const { data: infoGeo } = await getInfoGeo();
                    localStorage.infoGeo = JSON.stringify(infoGeo);

                    return infoGeo;
                }

                return JSON.parse(localStorage.infoGeo);
            },

            async cancelOrder() {
                try {
                    this.loading = true;
                    await cancelOrder(this.order.id);
                    this.$message.success('Hủy đơn hàng thành công');
                    const { data } = await getOrder(this.order.id);
                    this.order = data;
                } catch (error) {
                    this.$message.error('Có lỗi xảy ra, vui lòng thử lại sau');
                } finally {
                    this.loading = false;
                }
            },
        },
    };
</script>
