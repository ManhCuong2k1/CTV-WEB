<template>
    <div class="h-full flex justify-center items-center">
        <el-card shadow="always" class="flex items-center p-3 w-full md:w-2/4 lg:w-4/12">
            <div class="font-bold text-center text-xl mb-5">
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
            <el-input
                v-model="email"
                placeholder="Username or email"
                class="mb-2"
                @keyup.enter.native="login"
            />
            <el-input
                v-model="password"
                placeholder="Password"
                show-password
                class="mb-2"
                @keyup.enter.native="login"
            />
            <div class="mb-2 flex justify-between">
                <nuxt-link to="/forget-password" class="text-blue-600 font-semibold text-sm hover:underline">
                    Quên mật khẩu
                </nuxt-link>
                <nuxt-link to="/register" class="text-blue-600 font-semibold text-sm hover:underline">
                    Đăng ký tài khoản
                </nuxt-link>
            </div>
            <el-button class="w-full" type="primary" @click="login">
                Đăng nhập
            </el-button>
        </el-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                email: '',
                password: '',
                errorLogin: false,
            };
        },
        methods: {
            async login() {
                try {
                    await this.$auth.loginWith('local', {
                        data: {
                            email: this.email,
                            password: this.password,
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
                }
            },
            regGoogle() {
                window.location.href = `${process.env.APP_URL}/api/auth/login/google`;
            },
        },
    };
</script>

<style lang="sass">
    .el-card__body
        width: 100%
</style>
