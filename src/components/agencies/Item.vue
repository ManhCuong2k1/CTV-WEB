<template>
    <el-row :gutter="10" class="flex items-center">
        <el-col :xs="24" :sm="12" class="flex items-center">
            <div class="mr-4">
                <el-avatar :src="agency.avatar || defaultAvatar" :size="70" icon="el-icon-user-solid" />
            </div>
            <div>
                <div class="truncate my-1">
                    {{ agency.name }}
                </div>
                <div class="text-sm text-gray-400">
                    <i class="fas fa-map-marker-alt mr-1" />{{ location }}
                </div>
            </div>
        </el-col>
        <el-col :xs="24" :sm="12">
            <el-descriptions :column="1">
                <el-descriptions-item label="Ngày tham gia">
                    <span class="font-bold">{{ agency.createdAt | formatDate('dd/MM/yyyy') }}</span>
                </el-descriptions-item>
                <el-descriptions-item label="Sản phẩm">
                    <span class="font-bold">{{ agency.productCount | formatNumber }}</span>
                </el-descriptions-item>
            </el-descriptions>
        </el-col>
    </el-row>
</template>

<script>
    import _find from 'lodash/find';
    import systemMixin from '~/mixins/system';

    export default {
        mixins: [systemMixin],

        props: {
            agency: {
                type: Object,
                required: true,
            },
        },

        data: () => ({
            location: '',
            infoGeo: null,
            defaultAvatar: 'https://cdn.cotavi.vn/statics/gallery/202107/m8f3b8ea2-3f44-4d39-9382-81f11814f736250x250.Jpeg',
        }),

        async mounted() {
            await this.fetData();
            this.location = await this.getLocation();
        },

        methods: {
            async fetData() {
                this.infoGeo = await this.getInfoGeo();
            },

            async getLocation() {
                const city = _find(this.infoGeo, (item) => item.id === this.agency.CityId);
                const district = _find(city.Districts, (item) => item.id === this.agency.DistrictId);

                return `${district.name} - ${city.name}`;
            },
        },
    };
</script>
