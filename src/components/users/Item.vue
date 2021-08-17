<template>
    <nuxt-link :to="`/u/${user.username}`" class="flex flex-col items-center p-3 rounded-lg bg-white hover:shadow-xl">
        <el-avatar :src="user.avatar" :size="70" icon="el-icon-user-solid" />
        <div class="truncate my-1">
            {{ user.name }}
        </div>
        <div class="text-sm text-gray-400">
            {{ user.city }}
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
