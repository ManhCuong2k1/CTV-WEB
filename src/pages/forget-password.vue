<template>
    <div class="flex justify-center h-screen bg-gray-100">
        <el-card shadow="always" class="flex align-middle m-auto p-3 md:w-1/4 sm:w-full">
            <div class="font-bold text-center text-xl mb-5">
                Quên mật khẩu
            </div>
            <div class="mb-5">
                <el-alert
                    v-if="errorSubmit"
                    title="Sai thông tin đăng nhập"
                    type="error"
                />
            </div>
            <div class="mb-1">
                <el-input v-model="email" placeholder="Email" @keyup.enter.native="forgetAction" />
            </div>
            <div class="mb-5 flex justify-between">
                <nuxt-link to="/login" class="text-blue-600 font-semibold text-sm hover:underline">
                    Đăng nhập
                </nuxt-link>
            </div>
            <div class="w-full">
                <el-button class="w-full" type="success" @click="forgetAction">
                    Gửi yêu cầu
                </el-button>
            </div>
            <div class="flex align-items-center justify-content-between my-4">
                <hr class="flex-1 m-auto">
                <span class="mx-3">
                    Hoặc đăng nhập sử dụng
                </span>
                <hr class="flex-1 m-auto">
            </div>
            <div class="flex justify-center">
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
                email: '',
                errorSubmit: false,
            };
        },
        computed: {
            backToIndex() {
                return `/admin/${this.username}`;
            },
        },
        methods: {
            async forgetAction() {
                try {
                    this.$axios.$post('/');
                    this.$router.push('/');
                } catch (e) {
                    this.errorSubmit = true;
                    setTimeout(() => {
                        this.errorSubmit = false;
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
