<template>
    <div>
        <div>
            <div class="font-bold text-xl">
                <i class="el-icon-user" />
                Thông tin tài khoản
            </div>
            <div>Quản lý thông tin hồ sơ để bảo vệ tài khoản</div>
        </div>
        <el-divider />
        <Form :loading="loading" @save="onUpdate" />
    </div>
</template>

<script>
    import { update, getCurrent } from '~/api/auth';
    import Form from '~/components/me/Form.vue';

    export default {
        components: {
            Form,
        },

        data: () => ({
            loading: false,
        }),

        methods: {
            async onUpdate(data) {
                try {
                    this.loading = true;
                    await update(data);
                    const authUser = await getCurrent();
                    await this.$auth.setUser(authUser);
                    this.$message.success('Cập nhật thông tin thành công');
                } catch (error) {
                    this.$message.error('Có lỗi xảy ra vui lòng thử lại sau');
                } finally {
                    this.loading = false;
                }
            },
        },

        head() {
            return {
                title: 'Thông tin tài khoản | Battay',
            };
        },
    };
</script>
