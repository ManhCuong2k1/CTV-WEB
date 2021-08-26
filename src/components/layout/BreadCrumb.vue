<template>
    <div class="content-section w-full my-1">
        <el-breadcrumb v-if="breadcrumb.length" separator-class="el-icon-arrow-right">
            <transition-group name="breadcrumb">
                <el-breadcrumb-item
                    v-for="item in breadcrumb"
                    :key="item.link"
                    :to="item.link"
                >
                    {{ item.title }}
                </el-breadcrumb-item>
            </transition-group>
        </el-breadcrumb>
    </div>
</template>

<script>
    export default {
        props: {
            breadcrumb: Array,
        },
    };
</script>
