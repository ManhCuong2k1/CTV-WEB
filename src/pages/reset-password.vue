<template>
    <div class="flex justify-center h-screen bg-gray-100">
        <el-card shadow="always" class="flex align-middle m-auto p-3 md:w-1/4 sm:w-full">
            <div class="font-bold text-center text-xl mb-5">
                Đăng ký
            </div>
            <div class="mb-5">
                <el-alert
                    v-if="errorLogin"
                    title="Wrong username/email or password"
                    type="error"
                />
            </div>
            <div class="mb-2">
                <el-input v-model="username" placeholder="Tên đăng nhập" />
            </div>
            <div class="mb-2">
                <el-input v-model="fullname" placeholder="Tên hiển thị" />
            </div>
            <div class="mb-2">
                <el-input v-model="email" placeholder="Email" />
            </div>
            <div class="mb-2">
                <el-input
                    v-model="password"
                    placeholder="Mật khẩu"
                    show-password
                />
            </div>
            <div class="mb-1">
                <el-input
                    v-model="repassword"
                    placeholder="Nhập lại mật khẩu"
                    show-password
                />
            </div>
            <div class="w-full mt-3">
                <el-button class="w-full" type="success" @click="regAction">
                    Đăng ký
                </el-button>
            </div>
            <div class="flex align-items-center justify-content-between my-4">
                <hr class="flex-1 m-auto">
                <span class="mx-3">
                    Hoặc sử dụng
                </span>
                <hr class="flex-1 m-auto">
            </div>
            <div class="flex justify-center">
                <!-- <el-button>
                    <i class="text-blue-600 mr-2 fab fa-facebook-f" />Facebook
                </el-button> -->
                <el-button @click="regGoogle">
                    <i class="text-red-600 mr-2 fab fa-google" />Google
                </el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                username: '',
                email: '',
                fullname: '',
                password: '',
                repassword: '',
                errorLogin: false,
            };
        },

        methods: {
            async regAction() {
                try {
                    await this.$axios.post('/auth/register', {
                        username: this.username,
                        email: this.email,
                        fullname: this.fullname,
                        password: this.password,
                    });

                    this.$router.push('/');
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
