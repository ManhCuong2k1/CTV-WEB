<template>
    <div class="flex flex-col justify-center items-center border-t bg-white py-4">
        <div>
            <span>Giới thiệu</span>
            <el-divider direction="vertical" />
            <span>Liên hệ</span>
            <el-divider direction="vertical" />
            <span>Đăng ký thành viên</span>
            <el-divider direction="vertical" />
            <span>Đăng ký NCC</span>
        </div>
        <div class="flex items-center text-gray-500 my-2">
            <a href="tel:0123456789" class="mr-2">
                <i class="fas fa-phone-alt mr-1" />{{ hotline | formatPhone }}
            </a>
            <el-divider direction="vertical" />
            <a href="mailto:contact@ctvpro.vn" class="ml-2">
                <i class="far fa-envelope mr-1" />contact@ctvpro.vn
            </a>
        </div>
        <div>
            &copy; 2021 - Bản quyền của CÔNG TY TNHH CÔNG NGHỆ BATTAY
        </div>
        <div class="text-xs">
            Số 6 - Dương Đình Nghệ
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import _find from 'lodash/find';

    export default {
        computed: {
            ...mapState(['info']),

            hotline() {
                return _find(this.info.data, (item) => item.key === 'hotline').value;
            },
        },
    };
</script>
