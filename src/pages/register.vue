<template>
    <div class="flex justify-center h-full">
        <el-card shadow="always" class="flex items-center m-auto p-3 w-full md:w-2/4 lg:w-4/12">
            <div class="font-bold text-center text-xl mb-5">
                Đăng ký tài khoản
            </div>
            <div class="mb-5">
                <el-alert
                    v-if="errorLogin"
                    title="Tên đăng nhập hoặc email đã được sử dụng."
                    type="error"
                />
            </div>
            <el-form
                ref="form"
                :model="form"
                :rules="rules"
                class="register-form"
            >
                <el-form-item prop="username">
                    <el-input v-model="form.username" placeholder="Tên đăng nhập" />
                </el-form-item>
                <el-form-item prop="fullname">
                    <el-input v-model="form.fullname" placeholder="Tên hiển thị" />
                </el-form-item>
                <el-form-item prop="email">
                    <el-input v-model="form.email" placeholder="Email" />
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
            <div class="mb-2 flex justify-between">
                <nuxt-link to="/forget-password" class="text-blue-600 font-semibold text-sm hover:underline">
                    Quên mật khẩu
                </nuxt-link>
                <nuxt-link to="/login" class="text-blue-600 font-semibold text-sm hover:underline">
                    Đăng nhập
                </nuxt-link>
            </div>
            <div class="w-full mt-3">
                <el-button class="w-full" type="primary" @click="regAction">
                    Đăng ký
                </el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        data() {
            const form = {
                username: '',
                email: '',
                fullname: '',
                password: '',
                repassword: '',
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
                username: [
                    { required: true, message: 'Vui lòng nhập username', trigger: 'blur' },
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
                errorLogin: false,
            };
        },
        methods: {
            sendError(mes) {
                this.$message({
                    message: mes,
                    type: 'error',
                });
            },
            regAction() {
                try {
                    this.$refs.form.validate(async (valid) => {
                        if (valid) {
                            await this.$axios.post('admin/auth/register', this.form);
                            this.$message({
                                message: 'Đăng ký tài khỏan thành công!',
                                type: 'success',
                            });
                            this.$router.push('/login');
                        }
                    });
                } catch (e) {
                    this.errorLogin = true;
                    setTimeout(() => {
                        this.errorLogin = false;
                    }, 5000);
                }
            },
        },
    };
</script>

<style lang="scss">
    .el-card__body {
        width: 100%
    }
    .register-form {
        .el-form-item {
            // margin-bottom: 17px;
        }
    }
</style>
