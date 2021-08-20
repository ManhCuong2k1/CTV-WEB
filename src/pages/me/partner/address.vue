<template>
    <div>
        <div class="flex justify-between items-center">
            <div class="text-lg font-bold">
                Địa chỉ của tôi
            </div>
            <el-button icon="el-icon-plus" type="primary" size="medium">
                Thêm địa chỉ
            </el-button>
        </div>
        <el-divider />
        <div>
            <AddressItem v-for="index in 6" :key="index" class="border-b py-2 last:border-0" />
        </div>
    </div>
</template>

<script>
    import AddressItem from '~/components/me/partner/address/Item.vue';

    export default {
        components: {
            AddressItem,
        },
    };
</script>
