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
                    Đăng nhập
                </div>
                <div v-if="errorLogin" class="mb-5">
                    <el-alert
                        title="Sai thông tin đăng nhập"
                        type="error"
                        show-icon
                        center
                    />
                </div>
                <div v-if="!isLoginBySms">
                    <el-form
                        ref="form"
                        v-loading="loading"
                        :model="form"
                        :rules="rules"
                    >
                        <el-form-item prop="phone">
                            <el-input
                                v-model="form.phone"
                                placeholder="Số điện thoại"
                                @keyup.enter.native="login"
                            />
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input
                                v-model="form.password"
                                placeholder="Mật khẩu"
                                show-password
                                @keyup.enter.native="login"
                            />
                        </el-form-item>
                    </el-form>
                    <div class="mb-4 flex justify-between">
                        <el-link type="primary">
                            <nuxt-link to="/forget-password" class="text-sm">
                                Quên mật khẩu
                            </nuxt-link>
                        </el-link>
                        <el-link type="primary" @click="toggleLoginBySms">
                            Đăng nhập bằng SMS
                        </el-link>
                    </div>
                    <el-button class="w-full" type="primary" @click="login">
                        Đăng nhập
                    </el-button>
                </div>
                <div v-else>
                    <el-form
                        ref="smsForm"
                        v-loading="loading"
                        :model="form"
                        :rules="rules"
                    >
                        <el-form-item prop="phone">
                            <el-input
                                v-model="form.phone"
                                placeholder="Số điện thoại"
                                @keyup.enter.native="loginBySms"
                            />
                        </el-form-item>
                        <el-form-item v-if="isOtpSent" prop="otp">
                            <el-input
                                v-model="form.otp"
                                placeholder="Mã xác minh"
                                @keyup.enter.native="loginBySms"
                            />
                        </el-form-item>
                    </el-form>
                    <div class="flex justify-end">
                        <el-link type="primary" class="mb-4" @click="toggleLoginBySms">
                            Đăng nhập bằng mật khẩu
                        </el-link>
                    </div>
                    <el-button
                        v-if="!isOtpSent"
                        class="w-full"
                        type="primary"
                        @click="sendOtp"
                    >
                        Gửi mã xác minh
                    </el-button>
                    <el-button
                        v-else
                        class="w-full"
                        type="primary"
                        @click="loginBySms"
                    >
                        Đăng nhập
                    </el-button>
                </div>
                <el-divider />
                <div class="flex justify-center mt-4">
                    Bạn chưa có tài khoản?
                    <el-link type="primary" class="ml-2">
                        <nuxt-link to="/register">
                            Đăng ký
                        </nuxt-link>
                    </el-link>
                </div>
            </template>
        </AuthCard>
    </div>
</template>

<script>
    import { validPhone, validPositiveNumbers } from '~/utils/form';
    import { checkPhone, verifyOtp } from '~/api/auth';
    import AuthCard from '~/components/AuthCard.vue';

    export default {
        components: {
            AuthCard,
        },

        data() {
            const rules = {
                phone: [
                    { required: true, message: 'Vui lòng nhập số điện thoại', trigger: 'blur' },
                    { validator: validPhone, message: 'Vui lòng nhập số điện thoại hợp lệ', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: 'Vui lòng nhập mật khẩu', trigger: 'blur' },
                ],
                otp: [
                    { required: true, message: 'Vui lòng nhập mã xác minh', trigger: 'blur' },
                    { validator: validPositiveNumbers, trigger: 'blur' },
                ],
            };

            return {
                isLoginBySms: false,
                isOtpSent: false,
                errorLogin: false,
                loading: false,
                rules,
                form: {
                    phone: '',
                    password: '',
                    otp: '',
                },
            };
        },

        inject: ['setTitle'],

        created() {
            this.setTitle('Đăng nhập');
        },

        methods: {
            async login() {
                this.$refs.form.validate(async (valid) => {
                    if (valid) {
                        try {
                            this.loading = true;
                            await this.$auth.loginWith('local', {
                                data: {
                                    phone: this.form.phone,
                                    password: this.form.password,
                                    user: 'user',
                                },
                            });
                            this.$router.push('/');
                            this.$message({
                                message: 'Đăng nhập thành công!',
                                type: 'success',
                            });
                        } catch (e) {
                            this.errorLogin = true;
                            setTimeout(() => {
                                this.errorLogin = false;
                            }, 5000);
                        } finally {
                            this.loading = false;
                        }
                    }
                });
            },

            async sendOtp() {
                try {
                    this.loading = true;
                    await checkPhone(this.form.phone);
                    this.$message.success('Mã OTP đã được gửi');
                    this.isOtpSent = true;
                } catch (error) {
                    this.errorLogin = true;
                    setTimeout(() => {
                        this.errorLogin = false;
                    }, 5000);
                } finally {
                    this.loading = false;
                }
            },

            async loginBySms() {
                try {
                    this.loading = true;
                    const { user, token } = await verifyOtp(this.form.phone, this.form.otp);
                    await this.$auth.setUser(user);
                    await this.$auth.setUserToken(token);
                    this.$message.success('Đăng nhập thành công');
                    this.$router.push('/');
                } catch (error) {
                    this.errorLogin = true;
                    setTimeout(() => {
                        this.errorLogin = false;
                    }, 5000);
                } finally {
                    this.loading = false;
                }
            },

            toggleLoginBySms() {
                this.isLoginBySms = !this.isLoginBySms;
            },
        },

        layout: 'guest',
    };
</script>

<style lang="sass">
    .el-card__body
        width: 100%
</style>
