<template>
    <div>
        <div>
            <div class="font-bold text-lg">
                Đăng ký Cộng tác viên
            </div>
            <div>Vui lòng cung cấp thông tin chính xác</div>
        </div>
        <el-divider />
        <Form />
    </div>
</template>

<script>
    import Form from '~/components/me/partner/Form.vue';

    export default {
        components: {
            Form,
        },
    };
</script>
