<template>
    <div class="flex items-center py-2">
        <nuxt-link to="/">
            <el-image style="width: 45px; height: 45px" fit="contain" src="/images/stroke-logo.svg" />
        </nuxt-link>
        <div class="text-white text-xl border-l-2 ml-4 pl-4">
            {{ title }}
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            title: String,
        },
    };
</script>
