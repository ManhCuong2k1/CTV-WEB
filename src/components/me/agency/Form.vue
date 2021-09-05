<template>
    <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-position="left"
        label-width="220px"
    >
        <div v-if="isPhoneVerified">
            <div class="mb-5">
                <el-alert
                    v-if="serverError"
                    :title="serverError"
                    type="error"
                    center
                />
            </div>
            <el-form-item label="Tên nhà cung cấp" prop="name">
                <el-input v-model="form.name" placeholder="Nhập tên nhà cung cấp" />
            </el-form-item>
            <el-form-item label="Số điện thoại hỗ trợ KH" prop="hotline">
                <el-input v-model="form.hotline" placeholder="Nhập số điện thoại hỗ trợ khách hàng" />
            </el-form-item>
            <el-form-item label="Mật khẩu" prop="password">
                <div class="flex justify-between items-center">
                    <el-input
                        v-model="form.password"
                        type="password"
                        placeholder="Nhập mật khẩu"
                        :show-password="true"
                    />
                </div>
            </el-form-item>
            <el-form-item label="Xác nhận mật khẩu" prop="rePassword">
                <el-input
                    v-model="form.rePassword"
                    type="password"
                    placeholder="Nhập lại mật khẩu"
                    :show-password="true"
                />
            </el-form-item>
            <el-divider />
            <el-form-item label="Số điện thoại liên hệ" prop="phone">
                <el-input v-model="form.phone" placeholder="Nhập số điện thoại liên hệ" />
            </el-form-item>
            <el-form-item label="Email liên hệ" prop="email">
                <el-input v-model="form.email" placeholder="Nhập email liên hệ" />
            </el-form-item>
            <el-form-item label="Tỉnh/Thành" prop="CityId">
                <el-select
                    v-model="form.CityId"
                    placeholder="Thành phố"
                    @change="updateSelectCity"
                >
                    <el-option
                        v-for="city in infoGeo"
                        :key="city.id"
                        :label="city.name"
                        :value="city.id"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="Quận/Huyện" prop="DistrictId">
                <el-select
                    v-model="form.DistrictId"
                    placeholder="Quận huyện"
                    no-data-text="Chọn Tỉnh/Thành phố trước"
                >
                    <el-option
                        v-for="district in districts"
                        :key="district.id"
                        :label="district.name"
                        :value="district.id"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="Địa chỉ liên hệ (số nhà, đường...)">
                <el-input v-model="form.address" placeholder="Nhập địa chỉ" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="registerAction('form')">
                    Đăng ký NCC
                </el-button>
            </el-form-item>
        </div>
        <div v-else>
            <div v-if="registration">
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
            <div v-else>
                <div class="text-center text-3xl mb-4">
                    <h1>CHÚC MỪNG ĐĂNG KÝ THÀNH CÔNG !</h1>
                </div>
                <nuxt-link to="/" class="text-center rounded-full mx-auto w-32 shadow-xl py-2.5">
                    Về trang chủ
                </nuxt-link>
            </div>
        </div>
    </el-form>
</template>

<script>
    import _find from 'lodash/find';
    import systemMixin from '~/mixins/system';

    export default {
        mixins: [systemMixin],
        data() {
            const form = {
                name: '',
                hotline: '',
                phone: '',
                email: '',
                CityId: '',
                DistrictId: '',
                address: '',
                otpCode: '',
                rePassword: '',
                password: '',
            };

            const validatePhoneNumber = (rule, value, callback) => {
                const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

                if (value && !phoneRegex.test(value)) {
                    callback(new Error('Số điện thoại không hợp lệ'));
                } else {
                    callback();
                }
            };

            const validateRePassword = (rule, value, callback) => {
                if (this.form.password !== value) {
                    callback(new Error('Nhập lại mật khẩu không đúng'));
                } else {
                    callback();
                }
            };

            const rules = {
                name: [
                    { required: true, message: 'Vui lòng nhập tên nhà cung cấp', trigger: 'blur' },
                ],
                hotline: [
                    { required: true, message: 'Vui lòng nhập số điện thoại', trigger: 'blur' },
                ],
                phone: [
                    { required: true, message: 'Vui lòng nhập số điện thoại', trigger: 'blur' },
                    { required: true, validator: validatePhoneNumber, trigger: 'blur' },
                ],
                email: [
                    { required: true, message: 'Vui lòng nhập email', trigger: 'blur' },
                    { type: 'email', message: 'Vui lòng nhập đúng email', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: 'Vui lòng nhập nhập mật khẩu', trigger: 'blur' },
                ],
                rePassword: [
                    { required: true, message: 'Vui lòng nhập lại mật khẩu', trigger: 'blur' },
                    { required: true, validator: validateRePassword, trigger: 'blur' },
                ],
            };

            return {
                form,
                rules,
                isChangePassword: false,
                infoGeo: null,
                isPhoneVerified: true,
                districts: [],
                serverError: false,
                registration: true,
            };
        },
        async mounted() {
            if (!this.infoGeo) {
                this.infoGeo = await this.getInfoGeo();
            }
        },

        methods: {
            updateSelectCity(cityId) {
                this.districts = _find(this.infoGeo, (city) => city.id === cityId)?.Districts;
            },
            registerAction(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        const res = await this.$axios.post('/auth-admin/checkphone', this.form);
                        if (res.data.description === 'Tài khoản đã tồn tại') {
                            this.serverError = res.data.description;
                            setTimeout(() => {
                                this.serverError = false;
                            }, 5000);
                        } else {
                            this.isPhoneVerified = false;
                        }
                    } else {
                        return false;
                    }
                });
            },
            async checkPhone() {
                try {
                    this.loading = true;
                    const phone = this.form.phone;
                    const res = await this.$axios.post('/auth-admin/checkphone', { phone });
                    if (res.description === 'Tài khoản đã tồn tại') {
                        this.serverError = res.description;
                        setTimeout(() => {
                            this.serverError = false;
                        }, 5000);
                    } else {
                        this.isPhoneVerified = true;
                    }
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
                            const otp = this.form.otpCode;
                            const phone = this.form.phone;
                            await this.$axios.post('/auth-admin/otp/verify', { phone, otp });
                            this.isOtpVerified = true;
                            this.registration = false;
                        } catch (error) {
                            this.serverError = error.response?.data?.error || 'Có lõi xảy ra vui lòng thử lại sau';
                        } finally {
                            this.loading = false;
                        }
                    }
                });
            },
        },
    };
</script>
