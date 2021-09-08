<template>
    <div class="bg-gray-200 rounded-md p-3">
        <div class="flex items-center">
            <div class="w-full">
                <div class="flex justify-between items-center">
                    <div class="truncate mb-1">
                        {{ agency.name }}
                    </div>
                    <div class="text-xs">
                        {{ 1234 | formatNumber }} sản phẩm
                    </div>
                </div>
                <div class="text-sm text-gray-400">
                    <i class="fas fa-map-marker-alt mr-1" />{{ agency.location }}
                </div>
            </div>
        </div>
        <div class="grid grid-cols-4 gap-2">
            <div v-for="index in [0, 1, 2, 3]" :key="index">
                <el-image
                    :src="agency.products[index].image"
                    fit="fill"
                    style="aspect-ratio: 1/1"
                    class="rounded-md"
                >
                    <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline text-lg" />
                    </div>
                </el-image>
            </div>
        </div>
    </div>
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
