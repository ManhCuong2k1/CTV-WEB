<template>
    <div class="h-full flex justify-center items-center">
        <AuthCard>
            <template slot="image">
                <el-image
                    style="width: 100%; height: 100%"
                    src="https://i.im.ge/2021/08/23/Wdpgx.png"
                    fit="fill"
                />
            </template>
            <template slot="form">
                <div class="font-bold uppercase text-center text-2xl mb-8">
                    Đăng ký tài khoản
                </div>
                <div class="mb-5">
                    <el-alert
                        v-if="serverError"
                        :title="serverError"
                        type="error"
                        center
                    />
                </div>
                <div v-if="!isPhoneVerified">
                    <el-form
                        v-loading="loading"
                        :model="form"
                        :rules="rules"
                    >
                        <el-form-item prop="phone">
                            <el-input v-model="form.phone" placeholder="Nhập số điện thoại" @keyup.native.enter.prevent="checkPhone" />
                        </el-form-item>
                    </el-form>
                    <el-button class="w-full uppercase" type="primary" @click="checkPhone">
                        Tiếp theo
                    </el-button>
                    <el-divider />
                    <div class="flex justify-center items-center mt-2">
                        <span>Đã có tài khoản? </span>
                        <el-link type="primary">
                            <nuxt-link to="/login" class="text-sm ml-2">
                                Đăng nhập
                            </nuxt-link>
                        </el-link>
                    </div>
                </div>
                <el-steps
                    v-else
                    :active="step"
                    class="w-full"
                    align-center
                    finish-status="success"
                >
                    <el-step title="Xác minh SĐT" />
                    <el-step title="Cập nhật thông tin" />
                </el-steps>
                <div v-if="step === 0">
                    <div class="text-center text-sm mt-6">
                        Mã xác minh của bạn sẽ được gửi bằng tin nhắn đến
                    </div>
                    <div class="text-center text-lg mb-4 font-bold">
                        {{ form.phone | formatPhone }}
                    </div>
                    <el-form
                        ref="otpForm"
                        v-loading="loading"
                        :model="form"
                        :rules="rules"
                    >
                        <el-form-item prop="otpCode">
                            <el-input v-model="form.otpCode" placeholder="Nhập mã xác minh" />
                        </el-form-item>
                    </el-form>
                    <el-button type="primary" class="w-full uppercase" @click="verifyOtp">
                        Xác minh
                    </el-button>
                    <el-divider />
                    <div class="flex justify-center items-center">
                        Bạn không nhận được mã?
                        <el-link type="primary" class="ml-2" @click="checkPhone">
                            Gửi lại
                        </el-link>
                    </div>
                </div>
                <div v-if="step === 1">
                    <div class="text-center mt-6 mb-4">
                        Vui lòng điền đầy đủ thông tin dưới đây
                    </div>
                    <el-form
                        ref="infoForm"
                        :model="form"
                        :rules="rules"
                    >
                        <el-form-item prop="fullname">
                            <el-input v-model="form.fullname" placeholder="Tên hiển thị" />
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input
                                v-model="form.password"
                                placeholder="Mật khẩu"
                                show-password
                            />
                        </el-form-item>
                        <el-form-item prop="repassword">
                            <el-input
                                v-model="form.repassword"
                                placeholder="Nhập lại mật khẩu"
                                show-password
                            />
                        </el-form-item>
                        <el-row :gutter="10">
                            <el-col :xs="24" :sm="12">
                                <el-form-item prop="CityId">
                                    <el-select v-model="form.CityId" placeholder="Tính/Thành phố" @change="setDistrictData">
                                        <el-option
                                            v-for="city in infoGeo"
                                            :key="city.id"
                                            :value="city.id"
                                            :label="city.name"
                                        />
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="12">
                                <el-form-item prop="CityId">
                                    <el-select v-model="form.DistrictId" placeholder="Quận/Huyện" no-data-text="Chọn Tỉnh/Thành phố trước">
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
                        <el-form-item prop="address">
                            <el-input
                                v-model="form.address"
                                placeholder="Địa chỉ chi tiết"
                            />
                        </el-form-item>
                    </el-form>
                    <el-button type="primary" class="w-full uppercase" @click="updateInfo">
                        Hoàn tất
                    </el-button>
                </div>
            </template>
        </AuthCard>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import _find from 'lodash/find';
    import _pick from 'lodash/pick';
    import { validPhone, validPositiveNumbers } from '~/utils/form';
    import {
        checkPhone,
        verifyOtp,
        update as updateUser,
    } from '~/api/auth';
    import { getCurrentUser } from '~/api/users';
    import AuthCard from '~/components/AuthCard.vue';

    export default {
        components: {
            AuthCard,
        },

        data() {
            const form = {
                phone: '',
                otpCode: '',
                CityId: '',
                DistrictId: '',
                address: '',
                fullname: '',
                password: '',
                repassword: '',
                auth: null,
            };

            const validatePassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Vui lòng nhập lại mật khẩu'));
                } else if (value !== this.form.password) {
                    callback(new Error('Xác nhận mật khẩu không giống với mật khẩu'));
                } else {
                    callback();
                }
            };

            const rules = {
                phone: [
                    { required: true, message: 'Vui lòng nhập số điện thoại', trigger: 'blur' },
                    { validator: validPhone, message: 'Vui lòng nhập số điện thoại hợp lệ', trigger: 'blur' },
                ],
                otpCode: [
                    { required: true, message: 'Vui lòng nhập mã xác minh', trigger: 'blur' },
                    { validator: validPositiveNumbers, trigger: 'blur' },
                ],
                email: [
                    { type: 'email', message: 'Vui lòng nhập đúng email', trigger: 'blur' },
                ],
                fullname: [
                    { required: true, message: 'Vui lòng nhập tên hiển thị', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: 'Vui lòng nhập mật khẩu', trigger: 'blur' },
                ],
                repassword: [
                    { validator: validatePassword, trigger: 'blur' },
                ],
            };

            return {
                form,
                rules,
                isPhoneVerified: false,
                isOtpVerified: false,
                districts: [],
                loading: false,
                serverError: false,
            };
        },

        computed: {
            ...mapState('system', ['infoGeo']),
            step() {
                if (this.isPhoneVerified && !this.isOtpVerified) {
                    return 0;
                }

                if (this.isPhoneVerified && this.isOtpVerified) {
                    return 1;
                }

                return -1;
            },
        },

        inject: ['setTitle'],

        created() {
            this.setTitle('Đăng ký');
        },

        async mounted() {
            if (!this.infoGeo) {
                await this.$store.dispatch('system/getInfoGeo');
            }
        },

        methods: {
            sendError(mes) {
                this.$message({
                    message: mes,
                    type: 'error',
                });
            },

            setDistrictData(cityId) {
                this.districts = _find(this.infoGeo, (city) => city.id === cityId)?.Districts;
            },

            async checkPhone() {
                try {
                    this.loading = true;
                    await checkPhone(this.form.phone);
                    this.isPhoneVerified = true;
                } catch (error) {
                    this.$message.error('Có lõi xảy ra vui lòng thử lại sau');
                } finally {
                    this.loading = false;
                }
            },

            async verifyOtp() {
                this.$refs.otpForm.validate(async (valid) => {
                    if (valid) {
                        try {
                            this.loading = true;
                            const { user, token } = await verifyOtp(this.form.phone, this.form.otpCode);
                            await this.$auth.setUser(user);
                            await this.$auth.setUserToken(token);
                            this.isOtpVerified = true;
                        } catch (error) {
                            this.serverError = error.response?.data?.error || 'Có lõi xảy ra vui lòng thử lại sau';
                        } finally {
                            this.loading = false;
                        }
                    }
                });
            },

            async updateInfo() {
                this.$refs.infoForm.validate(async (valid) => {
                    if (valid) {
                        try {
                            this.loading = true;
                            await updateUser(_pick(this.form, ['fullname', 'password', 'CityId', 'DistrictId', 'address']));
                            const user = await getCurrentUser();
                            await this.$auth.setUser(user);
                            this.$router.push('/');
                        } catch (error) {
                            this.serverError = error.response?.data?.error || 'Có lõi xảy ra vui lòng thử lại sau';
                        } finally {
                            this.loading = false;
                        }
                    }
                });
            },
        },

        layout: 'guest',

        head: () => ({
            title: 'Đăng ký | CTVpro',
        }),
    };
</script>

<style lang="scss">
    .el-card__body {
        width: 100%
    }
</style>
