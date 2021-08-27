<template>
    <div v-if="visible">
        <div class="content-section bg-white p-4 flex justify-between items-center">
            <div class="font-bold text-xl">
                <i class="el-icon-shopping-cart-full mr-2" />Giỏ hàng
            </div>
            <el-radio-group v-model="form.priceType" @change="changeType">
                <el-radio-button label="retail">
                    Giá bán lẻ
                </el-radio-button>
                <el-radio-button label="member">
                    Giá thành viên
                </el-radio-button>
            </el-radio-group>
        </div>
        <div class="content-section bg-white grid grid-cols-12 p-4 mt-4">
            <div :class="[!isRetail ? 'col-span-6' : 'col-span-7']">
                Sản phẩm
            </div>
            <div class="text-right">
                {{ isRetail ? 'Giá bán lẻ' : 'Giá thành viên' }}
            </div>
            <div v-if="!isRetail" class="text-right">
                Lợi nhuận
            </div>
            <div class="col-span-2 text-center">
                Số lượng
            </div>
            <div class="text-right">
                Thành tiền
            </div>
            <div class="text-center">
                Thao tác
            </div>
        </div>
        <div v-for="agency in cartByAgency" :key="agency.id" class="content-section bg-white mt-4">
            <div class="flex items-center border-b px-6 py-2">
                <nuxt-link :to="`/agencies/${agency.id}`" class="mr-4">
                    <el-avatar :src="agency.avatar" :size="50" icon="el-icon-user-solid" />
                </nuxt-link>
                <div>
                    <div class="truncate my-1">
                        {{ agency.name }}
                    </div>
                    <div class="text-sm text-gray-400">
                        <i class="fas fa-map-marker-alt mr-1" />Đông Anh - Hà Nội
                    </div>
                </div>
            </div>
            <div>
                <div v-for="product in agency.products" :key="product.id" class="items-center grid grid-cols-12 px-4 py-2">
                    <div :class="[!isRetail ? 'col-span-6' : 'col-span-7']" class="flex items-center">
                        <el-image
                            :src="product.avatar"
                            fit="fill"
                            style="aspect-ratio: 1/1; width: 70px"
                            class="rounded-md"
                        >
                            <div slot="error" class="h-full flex justify-center items-center bg-gray-300">
                                <i class="el-icon-picture-outline text-lg" />
                            </div>
                        </el-image>
                        <div class="ml-4">
                            {{ product.name }}
                        </div>
                    </div>
                    <div class="text-right">
                        {{ product.price | formatNumber }}₫
                    </div>
                    <div v-if="!isRetail" class="text-right text-green-500">
                        {{ product.price - product.promotionPrice | formatNumber }}₫
                    </div>
                    <div class="col-span-2 text-center">
                        <el-input-number
                            v-model="product.amount"
                            :min="1"
                            size="small"
                            @change="updateCartAmount(product)"
                        />
                    </div>
                    <div class="text-right font-bold">
                        {{ getProductAmount(product) | formatNumber }}đ
                    </div>
                    <div class="text-center">
                        <el-button
                            type="danger"
                            icon="el-icon-delete"
                            size="small"
                            @click="removeFromCart(product)"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div class="content-section bg-white p-4 mt-4">
            <div class="font-bold text-lg">
                Thông tin giao hàng
            </div>
            <el-form
                ref="form"
                v-loading="loading"
                label-position="left"
                label-width="200px"
                size="medium"
                :model="form"
                :rules="rules"
            >
                <el-form-item label="Người nhận">
                    <el-input v-if="isRetail" v-model="form.customer.customerFullname" placeholder="Nhập tên người nhận" />
                    <el-input v-else v-model="authUser.name" disabled />
                </el-form-item>
                <el-form-item label="Di động">
                    <el-input
                        v-if="isRetail"
                        v-model="form.customer.customerPhone"
                        placeholder="Nhập số điện thoại"
                    />
                    <el-input v-else v-model="authUser.phone" disabled />
                </el-form-item>
                <el-form-item label="Địa chỉ">
                    <el-row :gutter="0">
                        <el-col :xs="24" :sm="12">
                            <el-form-item prop="CityId">
                                <el-select
                                    v-if="isRetail"
                                    v-model="form.customer.CityId"
                                    class="w-full"
                                    placeholder="Tính/Thành phố"
                                    @change="setDistrictData"
                                >
                                    <el-option
                                        v-for="city in infoGeo"
                                        :key="city.id"
                                        :value="city.id"
                                        :label="city.name"
                                    />
                                </el-select>
                                <el-select
                                    v-else
                                    v-model="authUser.CityId"
                                    class="w-full"
                                    disabled
                                    placeholder="Tính/Thành phố"
                                    @change="setDistrictData"
                                >
                                    <el-option
                                        v-for="city in infoGeo"
                                        :key="city.id"
                                        :value="city.id"
                                        :label="city.name"
                                    />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="12" class="mt-2 md:mt-0 md:pl-2">
                            <el-form-item prop="DistrictId">
                                <el-select
                                    v-if="isRetail"
                                    v-model="form.customer.DistrictId"
                                    class="w-full"
                                    placeholder="Quận/Huyện"
                                    no-data-text="Chọn Tỉnh/Thành phố trước"
                                >
                                    <el-option
                                        v-for="district in districts"
                                        :key="district.id"
                                        :value="district.id"
                                        :label="district.name"
                                    />
                                </el-select>
                                <el-select
                                    v-else
                                    v-model="authUser.DistrictId"
                                    class="w-full"
                                    disabled
                                    placeholder="Quận/Huyện"
                                    no-data-text="Chọn Tỉnh/Thành phố trước"
                                >
                                    <el-option
                                        v-for="district in districts"
                                        :key="district.id"
                                        :value="district.id"
                                        :label="district.name"
                                    />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-input
                        v-if="isRetail"
                        v-model="form.customer.customerAddress"
                        placeholder="Địa chỉ chi tiết"
                        class="mt-2"
                    />
                    <el-input
                        v-else
                        v-model="authUser.address"
                        disabled
                        placeholder="Địa chỉ chi tiết"
                        class="mt-2"
                    />
                </el-form-item>
                <el-form-item label="Ghi chú">
                    <el-input
                        v-model="form.customer.customerNote"
                        type="textarea"
                        :rows="2"
                        placeholder="Nhập ghi chú"
                    />
                </el-form-item>
                <el-form-item label="Tổng tiền">
                    <span class="font-bold">{{ totalPrice | formatNumber }}đ</span>
                    <span class="text-xs text-gray-400">(Chưa bao gồm phí giao hàng)</span>
                    <span> - </span>
                    <span>{{ totalAmount | formatNumber }}</span> sản phẩm
                </el-form-item>
                <div class="flex justify-center items-center">
                    <el-button>
                        Hủy
                    </el-button>
                    <el-button type="primary" @click="submit">
                        Đặt hàng
                    </el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapState } from 'vuex';
    import _find from 'lodash/find';
    import _remove from 'lodash/remove';
    import _sumBy from 'lodash/sumBy';
    import { getInfoGeo } from '~/api/system';
    import { create } from '~/api/orders';
    import cartMixins from '~/mixins/cart';

    export default {
        mixins: [cartMixins],

        data() {
            const form = {
                priceType: 'retail',
                customer: {
                    customerAddress: '',
                    customerPhone: '',
                    customerFullname: '',
                    customerNote: '',
                    CityId: null,
                    DistrictId: null,
                },
                products: [],
            };

            return {
                form,
                rules: {},
                loading: false,
                selectAll: false,
                num: 5,
                cartByAgency: [],
                visible: true,
                infoGeo: null,
                districts: null,
            };
        },

        computed: {
            ...mapState('cart', ['cartList']),
            ...mapGetters('cart', ['totalAmount']),

            authUser() {
                return this.$auth.user;
            },

            isRetail() {
                return this.form.priceType === 'retail';
            },

            totalPrice() {
                return _sumBy(this.cartByAgency, (agency) => {
                    let sum = 0;
                    agency.products.forEach((product) => {
                        sum += this.getProductAmount(product);
                    });

                    return sum;
                });
            },
        },

        async mounted() {
            await this.fetData();
        },

        methods: {
            async fetData() {
                this.infoGeo = await this.getInfoGeo();
                this.cartByAgency = await this.getCartByAgency();
            },

            async getInfoGeo() {
                if (!localStorage.infoGeo) {
                    const { data: infoGeo } = await getInfoGeo();
                    localStorage.infoGeo = JSON.stringify(infoGeo);

                    return infoGeo;
                }

                return JSON.parse(localStorage.infoGeo);
            },

            getProductAmount(product) {
                return this.form.priceType === 'retail'
                    ? product.price * product.amount
                    : product.promotionPrice * product.amount;
            },

            updateCartAmount(product) {
                this.$store.commit('cart/updateAmount', {
                    productId: product.id,
                    amount: product.amount,
                });
            },

            removeFromCart(product) {
                const agency = _find(this.cartByAgency, (_agency) => _agency.id === product.AdminId);
                _remove(agency.products, (_product) => _product.id === product.id);
                if (agency.products.length === 0) {
                    _remove(this.cartByAgency, (_agency) => _agency.id === agency.id);
                }
                this.$store.commit('cart/removeFromCart', product.id);
                this.forceRerender();
            },

            forceRerender() {
                this.visible = false;

                this.$nextTick(() => {
                    this.visible = true;
                });
            },

            changeType(type) {
                if (type === 'member') {
                    this.setDistrictData(this.authUser.CityId);
                }
            },

            setDistrictData(cityId) {
                this.districts = _find(this.infoGeo, (city) => city.id === cityId)?.Districts;
            },

            async submit() {
                try {
                    this.loading = true;
                    this.form.products = this.$store.state.cart.cartList;
                    await create(this.form);
                    await this.$store.dispatch('cart/clearCart');
                    this.$router.push('/');
                    this.$message.success('Đơn hàng đã được tạo thành công');
                } catch (error) {
                    this.$message.error('Có lỗi xảy ra vui lòng thử lại sau');
                } finally {
                    this.loading = false;
                }
            },
        },
    };
</script>
