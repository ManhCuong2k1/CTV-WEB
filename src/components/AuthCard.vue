<template>
    <el-card shadow="always" class="auth-card flex items-center p-0 w-10/12 2xl:w-8/12" style="max-height: 650px">
        <div class="flex items-center justify-between">
            <div v-if="showImage" class="hidden lg:block w-full h-full">
                <slot name="image" />
            </div>
            <div class="w-full py-24 border-l border-gray-300" :class="{'px-6 lg:w-6/12': showImage, 'px-8': !showImage}">
                <slot name="form" />
            </div>
        </div>
    </el-card>
</template>

<script>
    export default {
        props: {
            showImage: {
                type: Boolean,
                default: true,
            },
        },
    };
</script>

<style lang="scss">
    .auth-card {
        .el-card__body {
            padding: 0 !important;
        }
    }
</style>
