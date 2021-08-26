<template>
    <div class="flex flex-col items-center p-3 rounded-lg bg-white hover:shadow-xl cursor-pointer">
        <el-avatar :src="user.avatar" :size="90" icon="el-icon-user-solid" />
        <div class="truncate mt-3 text-base">
            {{ user.name }}
        </div>
        <div class="text-xs mt-3 mb-4 border rounded-md px-2 py-1">
            Thành viên xuất sắc
        </div>
    </div>
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
