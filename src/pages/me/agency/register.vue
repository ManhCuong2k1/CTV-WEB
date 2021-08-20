<template>
    <div>
        <div>
            <div class="font-bold text-lg">Đăng ký nhà cung cấp</div>
            <div>Vui lòng cung cấp thông tin chính xác</div>
        </div>
        <el-divider />
        <Form />
    </div>
</template>

<script>
    import Form from '~/components/me/agency/Form.vue';

    export default {
        components: {
            Form,
        },
    };
</script>
