<template>
    <el-dropdown trigger="click">
        <img src="/images/icons/iconNoti.svg" alt="">
        <el-dropdown-menu slot="dropdown" class="noti-list">
            <el-dropdown-item class="noti-list-item">
                <nuxt-link :to="'/u/profile'">
                    <i class="el-icon-user-solid mr-1" /> @longvt vừa thích một bài viết của bạn
                </nuxt-link>
            </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
    import { image as toImage } from '~/utils/url';

    export default {
        computed: {
        },
        methods: {
            toImage,
        },
    };
</script>

<style lang="sass" scoped>
.noti-list
    padding: 0px
    .noti-list-item
        font-size: 15px
        padding: 5px 18px
    .noti-list-item.sign-out
            border-top: 1px solid #dcdcdc
</style>
