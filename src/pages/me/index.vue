<template>
    <div>
        <div>
            <div class="font-bold text-lg">Thông tin tài khoản</div>
            <div>Quản lý thông tin hồ sơ để bảo vệ tài khoản</div>
        </div>
        <el-divider />
        <Form />
    </div>
</template>

<script>
    import Form from '~/components/me/Form.vue';

    export default {
        components: {
            Form,
        },
    };
</script>
