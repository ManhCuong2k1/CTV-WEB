<template>
    <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-position="left"
        label-width="220px"
    >
        <el-form-item label="Họ & tên" prop="name">
            <el-input v-model="form.name" placeholder="Nhập tên nhà cung cấp" />
        </el-form-item>
        <el-form-item label="Số điện thoại liên hệ" prop="phone">
            <el-input v-model="form.hotline" placeholder="Nhập số điện thoại liên hệ" />
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
        <el-divider />
        <el-form-item label="Tỉnh/Thành">
            <el-select v-model="city">
                <el-option
                    v-for="index in 10"
                    :key="index"
                    :label="index"
                    :value="index"
                />
            </el-select>
        </el-form-item>
        <el-form-item label="Quận/Huyện">
            <el-select v-model="city">
                <el-option
                    v-for="index in 10"
                    :key="index"
                    :label="index"
                    :value="index"
                />
            </el-select>
        </el-form-item>
        <el-form-item label="Phường/Xã">
            <el-select v-model="city">
                <el-option
                    v-for="index in 10"
                    :key="index"
                    :label="index"
                    :value="index"
                />
            </el-select>
        </el-form-item>
        <el-form-item label="Địa chỉ liên hệ (số nhà, đường...)">
            <el-input v-model="form.address" placeholder="Nhập địa chỉ" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary">
                Đăng ký Cộng tác viên
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import _cloneDeep from 'lodash/cloneDeep';

    export default {
        data() {
            const form = {
                name: '',
                phone: '',
                contact: {
                    name: '',
                    phone: '',
                    email: '',
                },
                city: '',
                district: '',
                subDistrict: '',
                address: '',
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
                isChangePassword: false,
            };
        },

        methods: {
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
        },
    };
</script>
