<template>
    <nuxt-link :to="`/u/${user.username}`" class="flex flex-col items-center p-3 rounded-lg bg-white hover:shadow-xl">
        <el-avatar :src="'https://cdn.cotavi.vn/upload/reseller/logo/202108/ef0634ba-c9d0-4779-a460-8293a00d18ca500x500.Jpeg'" :size="90" icon="el-icon-user-solid" />
        <div class="truncate mt-3 text-base">
            Đỗ Loan
        </div>
        <div class="text-sm mt-3 text-gray-400">
            Hà Nội
        </div>
        <div class="text-xs mt-3 mb-4 border rounded-md px-2 py-1">
            Thành viên xuất sắc
        </div>
    </nuxt-link>
</template>

<script>
    export default {
        props: {
            user: {
                type: Object,
                required: true,
            },
        },
    };
</script>
