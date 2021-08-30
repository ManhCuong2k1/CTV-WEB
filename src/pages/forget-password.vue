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
                <div class="font-bold uppercase text-center text-2xl mb-5">
                    Quên mật khẩu
                </div>
                <div class="mb-5">
                    <el-alert
                        v-if="errorSubmit"
                        title="Sai thông tin đăng nhập"
                        type="error"
                    />
                </div>
                <div v-if="!isOtpSent">
                    <el-form
                        ref="phoneForm"
                        v-loading="loading"
                        :model="form"
                        :rules="rules"
                    >
                        <el-form-item prop="phone">
                            <el-input v-model="form.phone" placeholder="Vui lòng nhập số điện thoại" />
                        </el-form-item>
                    </el-form>
                    <div class="w-full">
                        <el-button class="w-full" type="primary" @click="sendOtp">
                            Tiếp theo
                        </el-button>
                    </div>
                </div>
                <div v-else>
                    <div class="text-center mb-4">
                        <div class="text-sm">
                            Mã xác minh của bạn sẽ được gửi bằng tin nhắn đến
                        </div>
                        <div class="text-lg font-bold">
                            {{ form.phone | formatPhone }}
                        </div>
                    </div>
                    <el-form
                        ref="otpForm"
                        v-loading="loading"
                        :model="form"
                        :rules="rules"
                    >
                        <el-form-item prop="otp">
                            <el-input v-model="form.otp" placeholder="Vui lòng nhập mã xác minh" />
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
                    </el-form>
                    <el-button type="primary" class="w-full uppercase" @click="resetPassword">
                        Xác nhận
                    </el-button>
                </div>
            </template>
        </AuthCard>
    </div>
</template>

<script>
    import _pick from 'lodash/pick';
    import { validPhone, validPositiveNumbers } from '~/utils/form';
    import { forgotPassword, resetPassword } from '~/api/auth';
    import AuthCard from '~/components/AuthCard.vue';

    export default {
        components: {
            AuthCard,
        },

        data() {
            const validatePassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Vui lòng nhập lại mật khẩu'));
                } else if (value !== this.form.password) {
                    callback(new Error('Xác nhận mật khẩu không giống với mật khẩu'));
                } else {
                    callback();
                }
            };

            return {
                errorSubmit: false,
                isOtpSent: false,
                loading: false,
                form: {
                    phone: '',
                    otp: '',
                    password: '',
                    repassword: '',
                },
                rules: {
                    phone: [
                        { required: true, message: 'Vui lòng nhập số điện thoại', trigger: 'blur' },
                        { validator: validPhone, message: 'Vui lòng nhập số điện thoại hợp lệ', trigger: 'blur' },
                    ],
                    otp: [
                        { required: true, message: 'Vui lòng nhập mã xác minh', trigger: 'blur' },
                        { validator: validPositiveNumbers, trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: 'Vui lòng nhập mật khẩu', trigger: 'blur' },
                    ],
                    repassword: [
                        { validator: validatePassword, trigger: 'blur' },
                    ],
                },
            };
        },

        computed: {
            backToIndex() {
                return `/admin/${this.username}`;
            },
        },

        inject: ['setTitle'],

        created() {
            // this.setTitle('Quên mật khẩu');
        },

        methods: {
            async sendOtp() {
                try {
                    this.$refs.phoneForm.validate(async (valid) => {
                        if (valid) {
                            this.loading = true;
                            await forgotPassword({ phone: this.form.phone });
                            this.isOtpSent = true;
                        }
                    });
                } catch (error) {
                    this.errorSubmit = error.response?.data?.error || 'Có lõi xảy ra vui lòng thử lại sau';
                } finally {
                    this.loading = false;
                }
            },

            async resetPassword() {
                try {
                    this.$refs.otpForm.validate(async (valid) => {
                        if (valid) {
                            this.loading = true;
                            await resetPassword(_pick(this.form, ['phone', 'password', 'otp']));
                            this.$message.success('Mật khẩu đã được đổi thành công');
                            this.$router.push('/login');
                        }
                    });
                } catch (error) {
                    this.errorSubmit = error.response?.data?.error || 'Có lõi xảy ra vui lòng thử lại sau';
                } finally {
                    this.loading = false;
                }
            },
        },

        layout: 'guest',

        head: () => ({
            title: 'Quên mật khẩu | Battay',
        }),
    };
</script>

<style lang="sass">
    .el-card__body
        width: 100%
</style>
