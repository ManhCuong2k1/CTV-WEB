<template>
    <div>
        <div class="content-section bg-white flex justify-between items-center p-4">
            <div class="font-bold">
                Chọn phương thức
            </div>
            <div>
                <el-radio v-model="type" label="retail">
                    Bán lẻ
                </el-radio>
                <el-radio v-model="type" label="wholesale">
                    Bán buôn
                </el-radio>
            </div>
        </div>
        <div class="content-section bg-white grid grid-cols-12 p-4 mt-4">
            <div class="text-center">
                <el-checkbox v-model="selectAll" />
            </div>
            <div class="col-span-5">
                Sản phẩm
            </div>
            <div class="text-right">
                Đơn giá
            </div>
            <div class="text-right">
                Lợi nhuận
            </div>
            <div class="col-span-2 text-center">
                Số lượng
            </div>
            <div class="text-right">
                Số tiền
            </div>
            <div class="text-center">
                Thao tác
            </div>
        </div>
        <div class="content-section bg-white mt-2">
            <div class="flex items-center border-b px-4 py-2">
                <div>
                    <div class="truncate my-1">
                        Cửa hàng đá quý
                    </div>
                    <div class="text-sm text-gray-400">
                        <i class="fas fa-map-marker-alt mr-1" />Đông Anh - Hà Nội
                    </div>
                </div>
            </div>
            <div class="items-center grid grid-cols-12 px-4 py-2">
                <div class="text-center">
                    <el-checkbox v-model="selectAll" />
                </div>
                <div class="col-span-5 flex items-center">
                    <el-image
                        src=""
                        fit="fill"
                        style="aspect-ratio: 1/1; width: 70px"
                        class="rounded-md"
                    >
                        <div slot="error" class="h-full flex justify-center items-center bg-gray-300">
                            <i class="el-icon-picture-outline text-lg" />
                        </div>
                    </el-image>
                    <div class="ml-4">
                        Bộ keycap Cyan Rainbow
                    </div>
                </div>
                <div class="text-right">
                    {{ 500000 | formatNumber }}₫
                </div>
                <div class="text-right">
                    {{ 500000 | formatNumber }}₫
                </div>
                <div class="col-span-2 text-center">
                    <el-input-number v-model="num" size="small" />
                </div>
                <div class="text-right">
                    {{ 2500000 | formatNumber }}₫
                </div>
                <div class="text-center">
                    <el-button type="danger" icon="el-icon-delete" size="small" />
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
                    <el-input v-model="form.name" />
                </el-form-item>
                <el-form-item label="Di động">
                    <el-input v-model="form.name" />
                </el-form-item>
                <el-form-item label="Địa chỉ">
                    <el-input v-model="form.name" />
                </el-form-item>
                <el-form-item label="Tổng tiền">
                    <span>30.000.000d</span>
                    <span class="text-xs text-gray-400">(Chưa bao gồm phí giao hàng)</span>
                </el-form-item>
                <div class="flex justify-center items-center">
                    <el-button>
                        Hủy
                    </el-button>
                    <el-button type="primary">
                        Đặt hàng
                    </el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapState } from 'vuex';
    import cartMixins from '~/mixins/cart';

    export default {
        mixins: [cartMixins],

        data() {
            return {
                form: {},
                rules: {},
                loading: false,
                type: 'retail',
                selectAll: false,
                num: 5,
                cartByAgency: [],
            };
        },

        computed: {
            ...mapState('cart', ['cartList']),
            ...mapGetters('cart', ['totalAmount']),
        },

        async mounted() {
            this.cartByAgency = await this.getCartByAgency();
        },
    };
</script>
