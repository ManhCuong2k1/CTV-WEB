<template>
    <el-form
        ref="form"
        v-loading="loading"
        :model="form"
        :rules="rules"
        label-position="left"
        label-width="150px"
    >
        <el-form-item label="Họ & tên">
            <el-input v-model="form.fullname" placeholder="Nhập họ và tên" />
        </el-form-item>
        <el-form-item label="Số điện thoại" prop="phone">
            <el-input v-model="form.phone" readonly placeholder="Nhập số điện thoại" />
        </el-form-item>
        <el-form-item label="Mật khẩu" prop="password">
            <el-button v-if="!isChangePassword" @click="setChangePassword">
                <i class="el-icon-edit mr-2" />Đổi mật khẩu
            </el-button>
            <div v-else class="flex justify-between items-center">
                <el-input
                    v-model="form.password"
                    type="password"
                    placeholder="Nhập mật khẩu"
                    class="mr-2"
                    :show-password="true"
                />
                <el-button v-if="isChangePassword" type="danger" @click="cancelChangePassword">
                    Hủy
                </el-button>
            </div>
        </el-form-item>
        <el-form-item v-if="isChangePassword" label="Xác nhận mật khẩu" prop="passwordConfirmation">
            <el-input
                v-model="form.passwordConfirmation"
                type="password"
                placeholder="Nhập mật khẩu"
                :show-password="true"
            />
        </el-form-item>
        <el-form-item label="Địa chỉ">
            <el-row :gutter="0">
                <el-col :xs="24" :sm="12">
                    <el-form-item prop="CityId">
                        <el-select
                            v-model="form.CityId"
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
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" class="mt-2 md:mt-0 md:pl-2">
                    <el-form-item prop="DistrictId">
                        <el-select
                            v-model="form.DistrictId"
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
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form-item>
        <el-form-item prop="address">
            <el-input
                v-model="form.address"
                placeholder="Địa chỉ chi tiết"
            />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit">
                Lưu
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import _find from 'lodash/find';
    import _cloneDeep from 'lodash/cloneDeep';
    import systemMixin from '~/mixins/system';

    export default {
        mixins: [systemMixin],

        props: {
            loading: {
                type: Boolean,
                default: false,
            },
        },

        data() {
            const authUser = this.$auth.user;

            const form = {
                fullname: authUser.name,
                phone: authUser.phone,
                address: authUser.address,
                CityId: authUser.CityId,
                DistrictId: authUser.DistrictId,
            };

            const validatePhoneNumber = (rule, value, callback) => {
                const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

                if (value && !phoneRegex.test(value)) {
                    callback(new Error('Số điện thoại không hợp lệ'));
                } else {
                    callback();
                }
            };

            const rules = {
                phone: [
                    { validator: validatePhoneNumber, trigger: 'blur' },
                ],
                email: [
                    { type: 'email', message: 'Vui lòng nhập đúng email', trigger: 'blur' },
                ],
            };

            return {
                form,
                rules,
                districts: [],
                infoGeo: null,
                isChangePassword: false,
            };
        },

        computed: {
            authUser() {
                return this.$auth.user;
            },
        },

        async mounted() {
            await this.fetData();
            this.setDistrictData(this.$auth.user.CityId);
        },

        methods: {
            async fetData() {
                this.infoGeo = await this.getInfoGeo();
            },

            setDistrictData(cityId) {
                this.districts = _find(this.infoGeo, (city) => city.id === cityId)?.Districts;
                this.form.DistrictId = _find(this.districts, (district) => district.id === this.authUser.DistrictId)
                    ? this.authUser.DistrictId
                    : null;
            },

            setChangePassword() {
                const validatePassword = (rule, value, callback) => {
                    if (value === '') {
                        callback(new Error('Vui lòng nhập lại mật khẩu'));
                    } else if (value !== this.form.password) {
                        callback(new Error('Xác nhận mật khẩu không giống với mật khẩu'));
                    } else {
                        callback();
                    }
                };

                this.isChangePassword = true;
                this.rules.password = [
                    { required: true, message: 'Vui lòng nhập mật khẩu', trigger: 'blur' },
                ];
                this.rules.passwordConfirmation = [
                    { validator: validatePassword, trigger: 'blur' },
                ];

                this.form = _cloneDeep({
                    ...this.form,
                    password: '',
                    passwordConfirmation: '',
                });
            },

            cancelChangePassword() {
                this.isChangePassword = false;
                this.rules.password = [];
                this.rules.passwordConfirmation = [];
                delete this.form.password;
                delete this.form.passwordConfirmation;
            },

            submit() {
                this.$refs.form.validate(async (valid) => {
                    if (valid) {
                        this.$emit('save', this.form);
                    }
                });
            },
        },
    };
</script>
