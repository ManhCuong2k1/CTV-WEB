<template>
    <el-row :gutter="10" class="flex items-center">
        <el-col :xs="24" :sm="10" class="flex items-center">
            <nuxt-link :to="`/agencies/${agency.id}`" class="mr-4">
                <el-avatar :src="agency.avatar" :size="70" icon="el-icon-user-solid" />
            </nuxt-link>
            <div>
                <div class="truncate my-1">
                    {{ agency.name }}
                </div>
                <div class="text-sm text-gray-400">
                    <i class="fas fa-map-marker-alt mr-1" />{{ agency.location }}
                </div>
            </div>
        </el-col>
        <el-col :xs="24" :sm="14">
            <el-descriptions :column="2">
                <el-descriptions-item label="Danh mục">
                    <span class="font-bold">{{ agency.categories_count | formatNumber }}</span>
                </el-descriptions-item>
                <el-descriptions-item label="Ngày tham gia">
                    <span class="font-bold">{{ agency.created_at | formatDate }}</span>
                </el-descriptions-item>
                <el-descriptions-item label="Sản phẩm">
                    <span class="font-bold">{{ agency.products_count | formatNumber }}</span>
                </el-descriptions-item>
            </el-descriptions>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        props: {
            agency: {
                type: Object,
                required: true,
            },
        },
    };
</script>
